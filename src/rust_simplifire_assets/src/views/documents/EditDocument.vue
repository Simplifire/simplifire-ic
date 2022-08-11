<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="mx-auto col-lg-12 col-12">
                <div class="mt-4 card card-body">
                    <div class="row">
                        <div class="col-lg-2 col-6 mt-2">
                            <h6 class="mb-0">Edit Document</h6>
                            <p class="mb-0 text-sm">Edit existing document</p>
                        </div>

                        <div class="col-lg-10 d-flex align-items-center justify-content-end">
                            <label
                                >Author: <span class="badge rounded-pill bg-dark">{{ display(author) }}</span></label
                            >

                            <button
                                v-if="!sharedWith"
                                type="button"
                                name="button"
                                class="m-2 btn bg-gradient-primary ms-2"
                                data-bs-toggle="modal"
                                data-bs-target="#shareModal"
                            >
                                Share
                            </button>

                            <label v-else
                                >Shared with:
                                <span class="badge rounded-pill bg-dark">{{ display(sharedWith) }}</span></label
                            >

                            <label v-if="sharedWith && !userIsCurrentEditor && !documentAgreed">
                                <span class="text-sm">Waiting for counter party</span>
                            </label>
                            <button
                                v-if="sharedWith && userIsCurrentEditor && !documentAgreed"
                                type="button"
                                name="button"
                                class="m-2 btn bg-gradient-primary ms-2"
                                @click="proposeChangesToDocument()"
                            >
                                Propose changes
                            </button>

                            <button
                                v-if="sharedWith && userIsCurrentEditor && !documentAgreed"
                                type="button"
                                name="button"
                                class="m-2 btn bg-gradient-info ms-2"
                                @click="acceptDocument()"
                            >
                                Agree
                            </button>

                            <label v-if="documentAgreed">
                                <span class="badge rounded-pill bg-info">Agreed</span>
                            </label>

                            <button
                                v-if="sharedWith && documentAgreed && !documentSigned"
                                type="button"
                                name="button"
                                class="m-2 btn bg-gradient-success ms-2"
                                data-bs-toggle="modal"
                                data-bs-target="#signModal"   
                            >
                                Sign
                            </button>

                            <label v-if="documentSigned && !documentSignedBothParties">
                                <span class="text-sm">Waiting for other signature</span>
                            </label>
                            <label v-if="documentSignedBothParties">
                                <span class="badge rounded-pill bg-success">Signed</span>
                            </label>
                        </div>
                    </div>
                    <hr class="my-3 horizontal dark" />
                    <div class="row">
                        
                    </div>
                    <strong>{{ editedDocument.name }}</strong>
                        <router-link :to="{ name: 'Document Clippets', params: {id: $route.params.id} }">
                            <small class="text-muted">version: {{ latestVersion.version_number }}</small>
                        </router-link>

                    <label class="mt-4">Document Content</label>

                    <!-- <p class="text-xs form-text text-muted ms-1">
            This is how others will learn about the project, so make it good!
          </p> -->
                    <div id="editor">
                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" :disabled="editorDisabled"></ckeditor>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <router-link :to="{ name: 'Documents' }">
                            <a type="button" name="button" class="m-0 btn btn-light">Cancel</a>
                        </router-link>
                        <button
                            v-if="userIsCurrentEditor && !documentAgreed"
                            type="button"
                            name="button"
                            class="m-0 btn bg-gradient-success ms-2"
                            @click="updateDocument"
                        >
                            Save Document
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="shareModalLabel">Share with</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row row-cols-4 row-cols-md-1 g-3">
                        <div class="row">
                            <user-card
                                v-for="user in users.filter(
                                    (u) => u.id !== this.$store.state.user_id && u.id !== this.author?.id
                                )"
                                :key="user.id"
                                :user="user"
                                @share="shareDocument(user.id)"
                            ></user-card>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="signModal" tabindex="-1" aria-labelledby="signModal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="signModalLabel">Sign document</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <vmd-input
                        class="form-control"
                        label="Signed as"
                        id="signedAs"
                        variant="dynamic"
                        v-model="signedAs"
                    />
                    <vmd-input
                        class="form-control"
                        label="Signed on behalf of"
                        id="signedAs"
                        variant="dynamic"
                        v-model="signedOnBehalfOf"
                    />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="signDocument(signedAs, signedOnBehalfOf)">Sign</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserCard from "components/UserCard.vue";
import VmdInput from "components/VmdInput.vue";
import Editor from "../../../assets/js/ckeditor";
import DocumentService from "../../services/DocumentService";

export default {
    name: "new-project",
    data() {
        return {
            editor: Editor,
            editorData: "<p></p>",
            editorConfig: {
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'blockQuote',
                        'insertTable',
                        'undo',
                        'redo',
                        '|',
                        'exportPdf'
                    ]
	            },
                exportPdf: {
                    fileName: 'simplifire-demo-document.pdf',
                    converterOptions: {
                        format: 'Tabloid',
                        margin_top: '20mm',
                        margin_bottom: '20mm',
                        margin_right: '24mm',
                        margin_left: '24mm',
                        page_orientation: 'portrait'
                    },
                    // PROVIDE CORRECT VALUES HERE:
                    tokenUrl: ''
                },
            },
            editedDocument: {},
            latestVersion: {},
            users: [],
            author: null,
            sharedWith: null,
            userIsCurrentEditor: false,
            documentAgreed: false,
            documentSigned: false,
            documentSignedBothParties: false,
            editorDisabled: false,
            signedAs: "",
            signedOnBehalfOf: ""
        };
    },
    components: {
        VmdInput,
        UserCard,
    },
    async mounted() {
        this.loadDocument();
        this.users = await this.$store.getters.users;
    },

    methods: {
        async loadDocument() {
            const documentToEdit = await DocumentService.getDocumentById(this.$route.params.id);
            if (documentToEdit) {
                this.editedDocument = documentToEdit;
                this.editorData = this.editedDocument.content;
            } else {
                console.error("Document not found");
            }

            if(this.$store.state.user_id == documentToEdit.current_editor_id) {
                this.userIsCurrentEditor = true;
            } else {
                this.userIsCurrentEditor = false;
            }

            const allDocVersions = await DocumentService.getAllDocumentVersions(this.editedDocument.id);
            allDocVersions.sort(function compareFn(a, b) {
                return b.version_number - a.version_number;
            });

            this.latestVersion = allDocVersions[0] ?? null;

            if (!this.latestVersion) {
                console.error("Missing version");
            }

            this.editorData = this.latestVersion.content;

            const this_doc_user_docs = await DocumentService.getDocumentUsers(this.editedDocument.id);
            if (this_doc_user_docs && this_doc_user_docs.length > 0) {
                const author_user_doc = this_doc_user_docs.find((d) => d.role === "author");
                const counter_party = this_doc_user_docs.find((d) => d.role === "counter_party");

                if (author_user_doc?.agreed && counter_party?.agreed) {
                    this.documentAgreed = true;
                }
                if ((author_user_doc?.user_id === this.$store.state.user_id) && author_user_doc?.signed_as) {
                    this.documentSigned = true;
                } else if ((counter_party?.user_id === this.$store.state.user_id) && counter_party?.signed_as) {
                    this.documentSigned = true;
                }

                if (author_user_doc?.signed_as && counter_party?.signed_as) {
                    this.documentSignedBothParties = true;
                }

                this.author = this.users.find((u) => u.id === author_user_doc?.user_id);
                this.sharedWith = this.users.find((u) => u.id === counter_party?.user_id);
            } else {
                console.error("Document user not found");
            }
            if (this.documentAgreed || this.documentSignedBothParties || (!this.documentAgreed && !this.userIsCurrentEditor)) {
                this.editorDisabled = true;
            }
        },
        async updateDocument() {
            await DocumentService.saveDocumentChanges(this.editedDocument.id, this.$store.state.user_id, this.editorData);
            this.$router.push({ name: "Documents" });
        },
        async shareDocument(userId) {
            await DocumentService.shareDocumentWithUser(this.editedDocument.id, userId);

            this.sharedWith = this.users.find((u) => u.id === userId);
            this.$router.push({ name: "Documents" });
        },
        async proposeChangesToDocument() {

            if(this.$store.state.user_id == this.sharedWith.id) {
                await DocumentService.saveDocumentChanges(this.editedDocument.id, this.author.id, this.editorData);
            } else {
                await DocumentService.saveDocumentChanges(this.editedDocument.id, this.sharedWith.id, this.editorData);
            }
            await DocumentService.revertAcceptance(this.editedDocument.id, this.$store.state.user_id);
            this.$router.push({ name: "Documents" });
        },
        async acceptDocument() {
            if(this.$store.state.user_id == this.sharedWith.id) {
                await DocumentService.saveDocumentChanges(this.editedDocument.id, this.author.id, this.editorData);
            } else {
                await DocumentService.saveDocumentChanges(this.editedDocument.id, this.sharedWith.id, this.editorData);
            }
            if (this.latestVersion.content !== this.editorData) {
                await DocumentService.revertEveryAcceptance(this.editedDocument.id);
            }
            await DocumentService.acceptDocument(this.editedDocument.id, this.$store.state.user_id);
            this.$router.push({ name: "Documents" });
        },
        async signDocument(signedAs, signedOnBehalfOf) {

            const appendText = `<hr><p>Signed as ${signedAs} on behalf of ${signedOnBehalfOf}</p>`;
            if(this.$store.state.user_id == this.sharedWith.id) {
                await DocumentService.saveDocumentChanges(this.editedDocument.id, this.author.id, this.editorData + appendText);
            } else {
                await DocumentService.saveDocumentChanges(this.editedDocument.id, this.sharedWith.id, this.editorData + appendText);
            }
            await DocumentService.signDocument(this.editedDocument.id, this.$store.state.user_id, signedAs, signedOnBehalfOf);
            this.$router.push({ name: "Documents" });
        },
        display(user) {
            if (user?.first_name && user?.last_name && user?.email) {
                return user.first_name + ' ' + user.last_name + ' ' + user.email;
            } else if (user?.principal_id && user?.provider_id) {
                return user.principal_id.substring(0, 8) + '... | ' + user.provider_id;
            } else {
                return "";
            }
        }
    },
};
</script>
<style>
.ck-editor__editable {
    min-height: 400px;
}
</style>
