<template>
  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-3"
    :class="`${
      this.$store.state.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start ms-3'
    } ${this.$store.state.sidebarType}`"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="m-0 navbar-brand text-center" href="/">
        <img
          src="/assets/img/logos/logo.svg"
          class="navbar-brand-img"
          alt="Simplifire IC Logo"
        />
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2" />
    <sidenav-list />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "assets/img/SimplifireLogo.png";
import logoDark from "assets/img/logo-ct-dark.png";

export default {
  name: "index",
  components: {
    SidenavList,
  },
  data() {
    return {
    };
  },
  props: ["custom_class"],
};
</script>
