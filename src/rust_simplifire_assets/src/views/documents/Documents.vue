<template>
    <div class="container-fluid py-4">
        <div class="mb-2">
            <router-link :to="{ name: 'New Document' }">
                <vmd-button color="primary" variant="gradient">New document</vmd-button>
            </router-link>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Documents</h5>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-flush" id="documents-table">
                            <thead class="thead-light">
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Name
                                    </th>

                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Create date
                                    </th>

                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Author
                                    </th>

                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Shared with
                                    </th>

                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Agreed
                                    </th>

                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Signed
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="doc in documents" :key="doc">
                                    <td class="text-sm font-weight-normal">
                                        <router-link :to="{ name: 'Edit Document', params: {id: doc.id} }">{{ doc.name }}</router-link>
                                    </td>
                                    <td class="text-sm font-weight-normal">{{ formatDate(doc.added) }}</td>
                                    <td class="text-sm font-weight-normal"><span class="badge rounded-pill bg-dark">{{ doc.author }}</span></td>
                                    <td class="text-sm font-weight-normal"><span class="badge rounded-pill bg-dark">{{ doc.sharedWith }}</span></td>
                                    <td class="text-sm font-weight-normal">
                                        <span 
                                            v-if="doc.agreed"
                                            class="badge rounded-pill bg-info" >
                                                {{ doc.agreed }}
                                        </span>
                                    </td>
                                    <td class="text-sm font-weight-normal">
                                        <span 
                                            v-if="doc.agreed"
                                            class="badge rounded-pill bg-success">
                                                {{ doc.signed }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { rust_simplifire } from "../../../../declarations/rust_simplifire";

// import { DataTable } from "simple-datatables";
import VmdButton from "components/VmdButton.vue";
export default {
    name: "Documents",
    components: {
        VmdButton,
    },
    data() {
        return {
            documents: [],
        };
    },
    computed: {
        userDocs () {
            return this.$store.getters.userDocs;
        }
    },
    async mounted() {
        // if (document.getElementById("documents-table")) {
        //   const dataTableSearch = new DataTable("#documents-table", {
        //     searchable: true,
        //     fixedHeight: false,
        //     perPageSelect: false,
        //   });
        // }

        this.documents = await this.userDocs;
    },
    methods: {
        formatDate(time) {
            const timeInSeconds = Math.floor(Number(time) / 1000000);
            const date = new Date(timeInSeconds);
            return date.toLocaleString();
        },
    },
};
</script>
