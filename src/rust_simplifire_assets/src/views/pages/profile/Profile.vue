<template>
  <div class="container-fluid">
    <div
      class="page-header min-height-300 border-radius-xl mt-4"
      style="
        background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
      "
    >
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="card card-body mx-3 mx-md-4 mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img
              src="~/assets/img/bruce-mars.jpg"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{ first_name }} {{ last_name }}</h5>
            <p class="mb-0 font-weight-normal text-sm">{{ email }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="mt-3 row">
          <div class="col-12 col-md-12 col-xl-12 mt-md-0 mt-4 position-relative">
            <div class="card card-plain h-100">
              <div class="p-3 pb-0 card-header">
                <div class="row">
                  <div class="col-md-8 d-flex align-items-center">
                    <h6 class="mb-0">Profile Information</h6>
                  </div>
                </div>
              </div>
              <div class="p-3 card-body">
                <hr class="my-4 horizontal gray-light" />
                <div class="input-group input-group-dynamic form-control mb-5" :class="{'is-filled': first_name != null}">
                  <label class="form-label">First name</label>
                  <input type="text" class="form-control form-control-default" id="firstName" v-model="first_name" />
                </div>
                <div class="input-group input-group-dynamic form-control mb-5" :class="{'is-filled': last_name != null}">
                  <label class="form-label">Last name</label>
                  <input type="text" class="form-control form-control-default" id="firstName" v-model="last_name" />
                </div>
                 <div class="input-group input-group-dynamic form-control mb-5" :class="{'is-filled': email != null}">
                  <label class="form-label">Email</label>
                  <input type="text" class="form-control form-control-default" id="firstName" v-model="email" />
                </div>
              </div>
              <button
                type="button"
                name="button"
                class="m-0 btn bg-gradient-success ms-2"
                @click="saveProfile">Save Profile</button>
            </div>
            <hr class="vertical dark" />
            
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import VmdSwitch from "components/VmdSwitch.vue";
import VmdAvatar from "../../../components/VmdAvatar.vue";
import VmdInput from "../../../components/VmdInput.vue";
import setNavPills from "assets/js/nav-pills.js";
import setTooltip from "assets/js/tooltip.js";

import { rust_simplifire } from "../../../../../declarations/rust_simplifire";


export default {
  name: "profile-overview",
  data() {
    return {
      showMenu: false,
      first_name: null,
      last_name: null,
      email: null,
    };
  },
  components: {
    VmdInput,
    VmdSwitch,
    VmdAvatar,
  },
  async mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();

    const user = await this.$store.getters.thisUser;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;    
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  methods: {
    async saveProfile() {
      const user = await this.$store.getters.thisUser;
      await rust_simplifire.update_user(user.id, this.first_name, this.last_name, this.email);
      
      this.$store.state.navbarComponentKey++;
      console.log(this.$store.state.navbarComponentKey);
      
      this.$router.push({ name: "Dashboard" });
    }
  },
};
</script>
