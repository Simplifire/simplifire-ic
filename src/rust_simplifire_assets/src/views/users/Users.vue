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
                    Principal
                  </th>
                  
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Provider ID
                  </th>
                  <!--
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Last name
                  </th>
                  -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in users" :key="u.id">
                <td class="text-sm font-weight-normal">{{ u.principal_id }}</td>
                <td class="text-sm font-weight-normal">{{ u.provider_id }}</td>
                  <!--<td class="text-sm font-weight-normal"></td>
                  <td class="text-sm font-weight-normal"></td>-->
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
    this.users = (await this.$store.getters.users).filter(u => u.id !== this.$store.state.user_id);
  },
};
</script>
