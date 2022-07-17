<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="mx-auto col-lg-12 col-12">
                <div class="mt-4 card card-body">
                    <h6 class="mb-0">New Document</h6>
                    <p class="mb-0 text-sm">Create new document</p>
                    <hr class="my-3 horizontal dark" />
                    <vmd-input
                        class="form-control"
                        label="Document Name"
                        id="documentName"
                        variant="dynamic"
                        v-model="name"
                    />

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
                            @click="addDocument"
                        >
                            Create Document
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VmdInput from "components/VmdInput.vue";
import DocumentService from "../../services/DocumentService";
import Editor from "../../../assets/js/ckeditor";

export default {
    name: "new-project",
    data() {
        return {
            name: "",
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
                    ]
	            },
            }
        };
    },
    components: {
        VmdInput,
    },
    mounted() {
    },

    methods: {
        async addDocument() {
            const documentId = await DocumentService.addDocument(this.$store.state.user_id, this.name, this.editorData);
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
