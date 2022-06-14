<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="mt-4 col-sm-4 mt-sm-0">
                <div class="card">
                    <div class="p-3 card-body position-relative">
                        <div class="row">
                            <div class="col-7 text-start">
                                <p class="mb-1 text-sm text-capitalize font-weight-bold">Documents</p>
                                <h5 class="mb-0 font-weight-bolder">{{ numberOfDocuments }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4 col-sm-4 mt-sm-0">
                <div class="card">
                    <div class="p-3 card-body position-relative">
                        <div class="row">
                            <div class="col-7 text-start">
                                <p class="mb-1 text-sm text-capitalize font-weight-bold">Connected Users</p>
                                <h5 class="mb-0 font-weight-bolder">{{ numberOfUsers }}</h5>
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

export default {
    name: "dashboard-default",
    data() {
        return {
            numberOfDocuments: 0,
            numberOfUsers: 0,
        };
    },
    components: { VmdInput, VmdButton },
    computed: {
        userDocs () {
            return this.$store.getters.userDocs;
        }
    },

    async mounted() {
        const user_docs = await this.userDocs;
        this.numberOfDocuments = await user_docs?.length ?? 0;
    },
};
</script>
