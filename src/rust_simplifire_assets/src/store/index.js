import { createStore } from "vuex";
import { rust_simplifire } from "../../../declarations/rust_simplifire";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-gradient-dark",
    isRTL: false,
    mcolor: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    isDarkMode: false,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenavShow = document.getElementsByClassName("g-sidenav-show")[0];

      if (sidenavShow.classList.contains("g-sidenav-pinned")) {
        sidenavShow.classList.remove("g-sidenav-pinned");
        sidenavShow.classList.add("g-sidenav-hidden");
        state.isPinned = true;
      } else {
        sidenavShow.classList.remove("g-sidenav-hidden");
        sidenavShow.classList.add("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
  },
  getters: {
    async userDocs (state) {
      const user_id = state.user_id;
      const all_user_docs = await rust_simplifire.get_user_documents([]);
      const user_docs = all_user_docs.filter(d => d.user_id === user_id);
      const all_docs = await rust_simplifire.get_docs([]);
      const documents = [];

      user_docs?.forEach(d => {
          if (all_docs.some(ad => ad.id === d.document_id)) {
              documents.push(all_docs.find(ad => ad.id === d.document_id));
          }
      });
      
      return documents;
    }
  },
});
