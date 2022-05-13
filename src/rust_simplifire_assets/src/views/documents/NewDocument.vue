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
            <ckeditor
              :editor="editor"
              v-model="editorData"
              :config="editorConfig"
            ></ckeditor>
          </div>
          <div class="mt-4 d-flex justify-content-end">
            <button type="button" name="button" class="m-0 btn btn-light">
              Cancel
            </button>
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
import { rust_simplifire } from "../../../../declarations/rust_simplifire";
import VmdInput from "components/VmdInput.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "new-project",
  data() {
    return {
      name: "",
      editor: ClassicEditor,
      editorData: "<p></p>",
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
        ],
      },
    };
  },
  components: {
    VmdInput,
  },
  mounted() {},

  methods: {
    async addDocument() {
      console.log("add document");
      console.log(this.name);
      console.log(this.editorData);

      await rust_simplifire.add_doc(this.name, this.editorData);

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
