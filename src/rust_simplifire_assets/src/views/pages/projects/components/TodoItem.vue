<template>
  <li
    class="py-0 mb-3 border-0 list-group-item flex-column align-items-start ps-0"
  >
    <div class="checklist-item checklist-item-primary ps-2 ms-3">
      <div class="d-flex align-items-center">
        <vmd-checkbox :name="title" :id="checkboxId" :checked="checked" />
        <h6 class="mb-0 text-sm text-dark font-weight-bold">{{ title }}</h6>
        <div class="dropdown float-lg-end ms-auto pe-4">
          <a
            href="#"
            class="cursor-pointer"
            :class="{ show: showMenu }"
            :id="dropdownTableId"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            @click="showMenu = !showMenu"
          >
            <i class="fa fa-ellipsis-h text-secondary" aria-hidden="true"></i>
          </a>
          <ul
            class="px-2 py-3 dropdown-menu ms-sm-n4 ms-n5"
            :class="{ show: showMenu }"
            :aria-labelledby="dropdownTableId"
            style=""
          >
            <li>
              <a class="dropdown-item border-radius-md" href="#">Action</a>
            </li>
            <li>
              <a class="dropdown-item border-radius-md" href="#"
                >Another action</a
              >
            </li>
            <li>
              <a class="dropdown-item border-radius-md" href="#"
                >Something else here</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-3 d-flex align-items-center ms-4 ps-1">
        <div>
          <p class="mb-0 text-xs text-secondary font-weight-bold">Date</p>
          <span class="text-xs font-weight-bolder">{{ date }}</span>
        </div>
        <div class="ms-auto">
          <p class="mb-0 text-xs text-secondary font-weight-bold">Project</p>
          <span class="text-xs font-weight-bolder">{{ projectId }}</span>
        </div>
        <div class="mx-auto">
          <p class="mb-0 text-xs text-secondary font-weight-bold">Company</p>
          <span class="text-xs font-weight-bolder">{{ company }}</span>
        </div>
      </div>
    </div>
    <hr class="mt-4 mb-0 horizontal dark" />
  </li>
</template>

<script>
import VmdCheckbox from "components/VmdCheckbox.vue";

export default {
  name: "todo-item",
  data() {
    return {
      showMenu: false,
    };
  },
  props: {
    title: String,
    checkboxId: String,
    dropdownTableId: String,
    date: String,
    projectId: String,
    company: String,
    checked: Boolean,
  },
  components: {
    VmdCheckbox,
  },
};
</script>
