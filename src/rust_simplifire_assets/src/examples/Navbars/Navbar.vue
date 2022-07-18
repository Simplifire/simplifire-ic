<template>
  <nav
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
    :class="this.$store.state.isAbsolute ? 'mt-4' : 'mt-0'"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" :textWhite="textWhite" />

      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <!--<vmd-input label="Search here" />-->
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
             <router-link
              :to="{ name: 'Signin Basic' }"
              class="px-0 nav-link font-weight-bold lh-1"
              :class="textWhite ? textWhite : 'text-body'"
            >
              <i
                class="material-icons"
                :class="this.$store.state.isRTL ? 'ms-sm-2' : 'me-sm-1'"
              >
                account_circle
              </i>
             </router-link>
          </li>
          <li class="nav-item d-flex align-items-center">
            <router-link
              :to="{ name: 'Signin Basic' }"
              class="px-0 nav-link font-weight-bold lh-1"
              :class="textWhite ? textWhite : 'text-body'"
            >
              <span class="badge rounded-pill bg-info">{{ this.user }}</span>
            </router-link>
            
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              href="#"
              @click="toggleSidebar"
              class="p-0 nav-link text-body lh-1"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
          <li
            class="nav-item dropdown d-flex align-items-center"
            :class="this.$store.state.isRTL ? 'ps-2' : 'pe-2'"
          >
            <a
              href="#"
              class="p-0 nav-link lh-1"
              :class="[
                textWhite ? textWhite : 'text-body',
                showMenu ? 'show' : '',
              ]"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="showMenu = !showMenu"
            >
              <i class="material-icons cursor-pointer"> notifications </i>
            </a>
            <ul
              class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
              :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton"
            >
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">No new messages</span>
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import VmdInput from "components/VmdInput.vue";
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      user: "",
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  async mounted() {
    this.user = await this.$store.getters.thisUserDisplay;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),

    toggleSidebar() {
      this.navbarMinimize();
    },
  },
  components: {
    Breadcrumbs,
    VmdInput
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>
