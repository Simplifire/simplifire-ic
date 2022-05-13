<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card mb-4">
                    <div class="d-flex">
                        <div
                            class="icon icon-shape icon-lg bg-gradient-success shadow text-center border-radius-xl mt-n3 ms-4"
                        >
                            <i class="material-icons opacity-10" aria-hidden="true">language</i>
                        </div>
                        <h6 class="mt-3 mb-2 ms-3">Testing</h6>
                    </div>
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-lg-6 col-md-7">
                                <form role="form" class="text-start mt-3">
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <input
                                                class="form-control"
                                                name="name"
                                                v-model="name"
                                                placeholder="Document name"
                                                style="border: 1px solid #778899; padding: 5px"
                                            />
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                                            <!--<input
                                                class="form-control"
                                                name="content"
                                                v-model="content"
                                                placeholder="Content"
                                                style="border: 1px solid #778899; padding: 5px"
                                            />-->
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="button" fullWidth class="btn mb-0 my-4 mb-2" @click="addDocument" style="border: 1px solid #778899">
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-lg-6 col-md-5">
                                <h1>Documents</h1>

                                <div v-for="doc in documents" :key="doc">
                                    <hr/>
                                    <div style="font-weight: bold">{{ doc.name }} [{{ doc.id }}]</div>
                                    <div>{{ doc.content }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row"></div>
    </div>
</template>
<script>
import "assets/js/world.js";

import VmdInput from "components/VmdInput.vue";
import VmdButton from "components/VmdButton.vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { rust_simplifire } from "../../../../declarations/rust_simplifire";

export default {
    name: "dashboard-default",
    data() {
        return {
            documents: [],
            name: "",
            editor: ClassicEditor,
            editorData: '<p>CKEditor for Simplifire.</p>',
            editorConfig: {
                toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
            },
        };
    },
    components: { VmdInput, VmdButton },

    async mounted() {
        console.log("hey its me3");
        this.documents = await rust_simplifire.get_docs([]);

        console.log(this.documents);
    },

    methods: {
        async addDocument() {
            console.log("add document");
            console.log(this.name);
            console.log(this.editorData);

            await rust_simplifire.add_doc(this.name, this.editorData);

            this.documents = await rust_simplifire.get_docs([]);
        },
    },
};
</script>
