<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="mx-auto col-lg-12 col-12">
                <div class="mt-4 card card-body">
                    
                    <div class="row">
                        <strong>{{ document.name }}</strong>
                    </div>
                    
                    <div class="row">
                        <div v-html="diff"></div>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <router-link :to="{ name: 'Edit Document', params: {id: $route.params.id} }">
                            <a type="button" name="button" class="m-0 btn btn-light">Go Back</a>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserCard from "components/UserCard.vue";
import VmdInput from "components/VmdInput.vue";
import DocumentService from "../../services/DocumentService";
import HtmlDiff from "htmldiff-js";

export default {
    name: "new-project",
    data() {
        return {
            document: {},
            diff: "",
        };
    },
    components: {
        VmdInput,
        UserCard,
    },
    async mounted() {
        this.loadVersions();
    },

    methods: {
        async loadVersions() {
            const documentToEdit = await DocumentService.getDocumentById(this.$route.params.id);
            if (documentToEdit) {
                this.document = documentToEdit;
            } else {
                console.error("Document not found");
            }

            const allDocVersions = await DocumentService.getAllDocumentVersions(documentToEdit.id);
            allDocVersions.sort(function compareFn(a, b) {
                return b.version_number - a.version_number;
            });

            this.currentVersion = allDocVersions[0];
            this.previousVersion = allDocVersions[1];
            
            if (!this.currentVersion) {
                console.error("Missing current version");
            }
            if (!this.previousVersion) {
                console.error("Missing previous version");
            }

            this.diff = HtmlDiff.execute(this.previousVersion?.content, this.currentVersion?.content);
        },
    },
};
</script>
<style>
.ck-editor__editable {
    min-height: 400px;
}
</style>
