<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="mx-auto col-lg-12 col-12">
                <div class="mt-4 card card-body">
                    <div class="row">
                        <div class="col-lg-6 col-6 mt-2">
                            <h6 class="mb-0">Edit Document</h6>
                            <p class="mb-0 text-sm">Edit existing document</p>
                        </div>

                        <div class="col-lg-6 d-flex align-items-center justify-content-end">
                            <label
                                >Author: <span class="badge rounded-pill bg-dark">{{ author?.email }}</span></label
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

                            <button
                                v-if="sharedWith && userIsCurrentEditor"
                                type="button"
                                name="button"
                                class="m-2 btn bg-gradient-primary ms-2"
                                @click="proposeChangesToDocument()"
                            >
                                Propose changes
                            </button>

                            <button
                                v-if="sharedWith && userIsCurrentEditor"
                                type="button"
                                name="button"
                                class="m-2 btn bg-gradient-info ms-2"
                                @click="acceptDocument()"
                            >
                                Agree
                            </button>

                            <label v-else
                                >Shared with:
                                <span class="badge rounded-pill bg-dark">{{ sharedWith?.email }}</span></label
                            >
                        </div>
                    </div>
                    <hr class="my-3 horizontal dark" />
                    <strong>{{ editedDocument.name }}</strong><small class="text-muted">version: {{ latestVersion.version_number }}</small>

                    <label class="mt-4">Document Content</label>

                    <!-- <p class="text-xs form-text text-muted ms-1">
            This is how others will learn about the project, so make it good!
          </p> -->
                    <div id="editor">
                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" :disabled="!userIsCurrentEditor"></ckeditor>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <router-link :to="{ name: 'Documents' }">
                            <a type="button" name="button" class="m-0 btn btn-light">Cancel</a>
                        </router-link>
                        <button
                            v-if="userIsCurrentEditor"
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
    <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Share with</h5>
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
</template>

<script>
import UserCard from "components/UserCard.vue";
import VmdInput from "components/VmdInput.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DocumentService from "../../services/DocumentService";

export default {
    name: "new-project",
    data() {
        return {
            editor: ClassicEditor,
            editorData: "<p></p>",
            editorConfig: {
                toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote"],
            },
            editedDocument: {},
            latestVersion: {},
            users: [],
            author: null,
            sharedWith: null,
            userIsCurrentEditor: false
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

                this.author = this.users.find((u) => u.id === author_user_doc?.user_id);
                this.sharedWith = this.users.find((u) => u.id === counter_party?.user_id);
            } else {
                console.error("Document user not found");
            }
        },
        async updateDocument() {
            await this.saveDocumentChanges(this.$store.state.user_id);
            this.$router.push({ name: "Documents" });
        },
        async shareDocument(userId) {
            await DocumentService.shareDocumentWithUser(this.editedDocument.id, userId);

            this.sharedWith = this.users.find((u) => u.id === userId);
            this.$router.push({ name: "Documents" });
        },
        async proposeChangesToDocument() {

            if(this.$store.state.user_id == this.sharedWith.id) {
                await DocumentService.saveDocumentChanges(this.editedDocument.id, this.$store.state.user_id, this.author.id, this.editorData);
            } else {
                await DocumentService.saveDocumentChanges(this.editedDocument.id, this.$store.state.user_id, this.sharedWith.id, this.editorData);
            }

            this.$router.push({ name: "Documents" });
        },
        async acceptDocument() {
            await DocumentService.acceptDocument(this.editedDocument.id, this.$store.state.user_id);
        },

        async saveDocumentChanges(target_user_id) {
            await DocumentService.saveDocumentChanges(this.editedDocument.id, this.$store.state.user_id, target_user_id, this.editorData);
        },
    },
};
</script>
<style>
.ck-editor__editable {
    min-height: 400px;
}
</style>
