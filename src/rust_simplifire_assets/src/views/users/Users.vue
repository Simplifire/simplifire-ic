<template>
  <div class="container-fluid py-4">
    <!-- <div class="mb-2">
      <router-link :to="{ name: 'New Document' }">
        <vmd-button color="primary" variant="gradient">New document</vmd-button>
      </router-link>
    </div> -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Users</h5>
          </div>
          <div class="table-responsive">
            <table class="table table-flush" id="documents-table">
              <thead class="thead-light">
                <tr>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    First name
                  </th>

                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Last name
                  </th>

                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr v-for="doc in documents" :key="doc.id">
                  <td class="text-sm font-weight-normal">{{ doc.name }}</td>
                  <td class="text-sm font-weight-normal">{{ doc.added }}</td>
                </tr> -->
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

import { DataTable } from "simple-datatables";
import VmdButton from "components/VmdButton.vue";
export default {
  name: "Users",
  components: {
    VmdButton,
  },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {

  },
};
</script>
