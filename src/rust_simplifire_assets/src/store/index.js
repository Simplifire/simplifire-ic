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

      
      const all_users = await rust_simplifire.get_users([]);

      user_docs?.forEach(d => {
          if (all_docs.some(ad => ad.id === d.document_id)) {
            const document = all_docs.find(ad => ad.id === d.document_id);
            const all_user_docs_for_this_document = all_user_docs.filter(a => a.document_id === d.document_id);

            document.author = all_users?.find(u => u.id === all_user_docs_for_this_document.find(x => x.role === "author")?.user_id)?.principal_id;
            document.sharedWith = all_users?.find(u => u.id === all_user_docs_for_this_document.find(x => x.role === "counter_party")?.user_id)?.principal_id;
            document.agreed = all_user_docs_for_this_document.every(d => d.agreed) ? "Agreed" : "";
            document.signed = all_user_docs_for_this_document.every(d => d.signed_as) ? "Signed" : "";
            
            documents.push(document);
          }
      });
      
      return documents;
    },
    async users () {
      const all_users = await rust_simplifire.get_users([]);

      return all_users;
    }
  },
});
