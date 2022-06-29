<template>
  <div class="page-header bg-gradient-info align-items-start min-vh-100">
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Sign in
                </h4>
              </div>
            </div>
            <div class="card-body">
              <form role="form" class="text-start mt-3">
                <div class="mb-3">
                  <vmd-input
                    type="email"
                    label="Email"
                    name="email"
                    required
                    v-model="email"
                  />
                </div>
                <!--<div class="mb-3">
                  <vmd-input type="password" label="Password" name="password" />
                </div>-->
                <!--<vmd-switch id="rememberMe">Remember me</vmd-switch>-->
                <div class="text-center">
                  <router-link :to="{ name: 'Dashboard' }">
                    <vmd-button
                      class="my-4 mb-2"
                      variant="gradient"
                      color="primary"
                      fullWidth
                      >Sign in</vmd-button
                    >
                  </router-link>
                </div>
                <!--<p class="mt-4 text-sm text-center">
                  Don't have an account?
                  <a
                    href="../../../pages/authentication/signup/illustration.html"
                    class="text-success text-gradient font-weight-bold"
                    >Sign up</a
                  >
                </p>-->
              </form>
            </div>
            <ConnectButton></ConnectButton>
            <ConnectDialog></ConnectDialog>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer position-absolute bottom-2 py-2 w-100">
      <div class="container">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col-12 col-md-6 my-auto">
            <div class="copyright text-center text-sm text-white text-lg-start">
              © {{ new Date().getFullYear() }}, made with
              <i class="fa fa-heart" aria-hidden="true"></i> by Simplifire Team.
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { rust_simplifire } from "../../../../../declarations/rust_simplifire";
import VmdInput from "components/VmdInput.vue";
import VmdButton from "components/VmdButton.vue";
import { ConnectButton, ConnectDialog } from "@connect2ic/vue"


export default {
  name: "signin-basic",
  components: {
    VmdInput,
    VmdButton,
    ConnectButton,
    ConnectDialog,
  },
  data() {
    return {
      email: "",
    };
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
  },
  async beforeRouteLeave() {
      if (this.email) {
        const users = await rust_simplifire.get_users([]);

        if (users.some(u => u.email === this.email)) {
            this.$store.state.user_id = users.find(u => u.email === this.email).id;
        } else {
            this.$store.state.user_id = await rust_simplifire.add_user(0, "", "", this.email ?? "");
        }
        localStorage.user_track = btoa(this.email);
        this.$store.state.email = this.email;
      } else {
        return false;
      }
  },
};
</script>
