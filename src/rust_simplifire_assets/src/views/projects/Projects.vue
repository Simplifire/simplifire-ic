<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Projects</h5>
          </div>
          <div class="table-responsive">
            <table class="table table-flush" id="datatable-basic">
              <thead class="thead-light">
                <tr>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Name
                  </th>

                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Create date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="doc in documents" :key="doc.id">
                  <td class="text-sm font-weight-normal">{{ doc.name }}</td>
                  <td class="text-sm font-weight-normal">{{ doc.added}}</td>
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
export default {
  name: "Projects",
  components: {},
  data() {
    return {
      documents: [],
    };
  },
  async mounted() {
    console.log("hey its projects view");
    this.documents = await rust_simplifire.get_docs([]);

    console.log(this.documents);
  },
};
</script>
