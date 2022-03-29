import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import VueTilt from "vue-tilt.js";
import VueSweetalert2 from "vue-sweetalert2";
import MaterialDashboard from "./material-dashboard";

// const doc = ({
//       id: 1,
//       docName: "Employment Contract",
//       docText: "This employment agreement is made and effective as of 25th January 2020 by and between Employer and Employee",
//       date_created: "2022/01/03"        
//   })

// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const name = document.getElementById("name").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   console.log("doc: ",  doc);
//   console.log("name: ",  name);
//   const greeting = await rust_simplifire.greet(name);
//   // const addDocument = await rust_simplifire.addDoc(doc);
  
//   console.log("Greet function has been called: ", name);

//   button.removeAttribute("disabled");

//   console.log("Setting reply:", greeting);
//   document.getElementById("greeting").innerText = greeting;

//   return false;
// });

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(VueTilt);
appInstance.use(VueSweetalert2);
appInstance.use(MaterialDashboard);
appInstance.mount("#app");
