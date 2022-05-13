<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="mx-auto col-lg-12 col-12">
                <div class="mt-4 card card-body">
                    <h6 class="mb-0">Edit Document</h6>
                    <p class="mb-0 text-sm">Edit existing document</p>
                    <hr class="my-3 horizontal dark" />
                    <strong>{{ editedDocument.name }}</strong>

                    <label class="mt-4">Document Content</label>
                    <!-- <p class="text-xs form-text text-muted ms-1">
            This is how others will learn about the project, so make it good!
          </p> -->
                    <div id="editor">
                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <router-link :to="{ name: 'Documents' }">
                            <a type="button" name="button" class="m-0 btn btn-light">Cancel</a>
                        </router-link>
                        <button
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
</template>

<script>
import { rust_simplifire } from "../../../../declarations/rust_simplifire";
import VmdInput from "components/VmdInput.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
        };
    },
    components: {
        VmdInput,
    },
    mounted() {
        console.log(this.$route.params.id);
        this.loadDocument();
    },

    methods: {
        async loadDocument() {
            //TODO: Get document by id
            const documents = await rust_simplifire.get_docs([]);

            const matchingDoc = documents.filter((d) => d.id == this.$route.params.id);
            if (matchingDoc && matchingDoc.length > 0) {
                this.editedDocument = matchingDoc[0];
                this.editorData = this.editedDocument.content;
            } else {
                alert("Document not found");
            }
        },
        async updateDocument() {
            await rust_simplifire.update_doc(this.editedDocument.id, this.editorData);
            this.$router.push({ name: "Documents" });
        },
    },
};
</script>
<style>
.ck-editor__editable {
    min-height: 500px;
}
</style>
