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
//import * as myCanister from "canisters/myCanister";
import { createClient } from "@connect2ic/core";
import { AstroX } from "@connect2ic/core/providers/astrox";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import { NFID } from "@connect2ic/core/providers/nfid";
import { Connect2ICProvider, useConnect } from "@connect2ic/vue";

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
      /*canisters: {
        counter,
      },*/
  
      host: window.location.origin,
      providers: [
        new AstroX({ dev: true }),
        new InternetIdentity({ providerUrl: "https://identity.ic0.app" }),
        new NFID()
      ],
      globalProviderConfig: {
        // Determines whether root key is fetched
        // Should be enabled while developing locally & disabled in production
        dev: true,
        // The host
        host: "https://localhost:8000",
        // Certain providers require specifying an app name
        appName: "rust_simplifire",
        // Certain providers require specifying which canisters are whitelisted
        // Array<string>
        whitelist: ["ryjl3-tyaaa-aaaaa-aaaba-cai"],
        // Certain providers allow you to specify a canisterId for the Ledger canister
        // For example when running it locally
        ledgerCanisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
        // Certain providers allow you to specify a host for the Ledger canister
        // For example when running it locally
        ledgerHost: "https://localhost:8000"
      },
    });
    client.on("connect", () => {
      // Connected  
      console.log('connected');
      console.log(client.activeProvider);
      console.log(client.principal);
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
