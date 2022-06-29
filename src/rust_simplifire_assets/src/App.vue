<template>
<Connect2ICProvider
  :client="client">

  <sidenav
    :custom_class="this.$store.state.mcolor"
    :class="[this.$store.state.isRTL ? 'fixed-end' : 'fixed-start']"
    v-if="this.$store.state.showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg overflow-x-hidden"
  >
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="this.$store.state.showNavbar"
    />
    <router-view />
    <app-footer v-show="this.$store.state.showFooter" />
    <!-- <configurator
      :toggle="toggleConfigurator"
      :class="[
        this.$store.state.showConfig ? 'show' : '',
        this.$store.state.hideConfigButton ? 'd-none' : '',
      ]"
    /> -->
  </main>
  </Connect2ICProvider>
</template>
<script>
import Sidenav from "./examples/Sidenav/Sidenav.vue";
import Configurator from "examples/Configurator.vue";
import Navbar from "examples/Navbars/Navbar.vue";
import AppFooter from "examples/Footer.vue";
import { mapMutations } from "vuex";
import * as rust_simplifire from "../../declarations/rust_simplifire";
import { createClient } from "@connect2ic/core";
import { AstroX } from "@connect2ic/core/providers/astrox";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import { NFID } from "@connect2ic/core/providers/nfid";
import { Connect2ICProvider } from "@connect2ic/vue";

import "@connect2ic/core/style.css";

export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
    AppFooter,
    Connect2ICProvider
  },
  data() {
    
    const client = createClient({
      canisters: {
        rust_simplifire,
      },
  
      host: window.location.origin,
      providers: [
        new AstroX({ dev: true }),
        new InternetIdentity({ dev: true, providerUrl: "https://identity.ic0.app" }),
        new NFID()
      ],
      globalProviderConfig: {
        // Determines whether root key is fetched
        // Should be enabled while developing locally & disabled in production
        dev: true,
        // The host
        host: "http://127.0.0.1:8000",
        // Certain providers require specifying an app name
        appName: "rust_simplifire",
        // Certain providers require specifying which canisters are whitelisted
        // Array<string>
        whitelist: ["rrkah-fqaaa-aaaaa-aaaaq-cai"],
        // Certain providers allow you to specify a canisterId for the Ledger canister
        // For example when running it locally
        ledgerCanisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai",
        // Certain providers allow you to specify a host for the Ledger canister
        // For example when running it locally
        ledgerHost: "http://127.0.0.1:8000"
      },
    });
    this.$store.state.connectClient = client;
    client.on("connect", () => {
      this.$store.state.provider_id = client.activeProvider.meta.id;
      this.$store.state.principal_id = client.principal;
      this.$router.push({ name: 'Dashboard'});
    });
    client.on('disconnect', () => {
      console.log('disconnected from the client');
    });
      return {
        client: client,
      };
    },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky": this
          .$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4 mt-4": !this.$store.state.isAbsolute,
      };
    },

  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";

    const sidenav = document.getElementsByClassName("g-sidenav-show")[0];

    if (window.innerWidth > 1200) {
      sidenav.classList.add("g-sidenav-pinned");
    }

  },

};
</script>
