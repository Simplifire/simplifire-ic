<template>
  <div id="app">
    <div>{{ greeting || 'Loading message from Internet Computer...' }}</div>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import { rust_simplifire } from "../../declarations/rust_simplifire";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: "App",
  data: () => {
    return {
      editor: ClassicEditor,
      editorData: '<p>CKEditor for Simplifire.</p>',
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
      },
      greeting: ''
    };
  },
  created() {
    rust_simplifire.greet(window.prompt("Enter your name:")).then(greeting => {
      this.greeting = greeting;
      this.editorData = greeting;
    });
  }
}
</script>

<style scoped>

</style>