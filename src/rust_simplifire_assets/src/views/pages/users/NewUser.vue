<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="multisteps-form mb-9">
          <div class="row">
            <div class="col-12 col-lg-8 mx-auto my-5"></div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-8 m-auto">
              <div class="card">
                <div
                  class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                >
                  <div
                    class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
                  >
                    <div class="multisteps-form__progress">
                      <button
                        class="multisteps-form__progress-btn"
                        type="button"
                        title="User Info"
                        @click="activeStep = 0"
                        :class="activeStep >= 0 ? activeClass : ''"
                      >
                        <span>User Info</span>
                      </button>
                      <button
                        class="multisteps-form__progress-btn"
                        type="button"
                        title="Address"
                        @click="activeStep = 1"
                        :class="activeStep >= 1 ? activeClass : ''"
                      >
                        Address
                      </button>
                      <button
                        class="multisteps-form__progress-btn"
                        type="button"
                        title="Socials"
                        @click="activeStep = 2"
                        :class="activeStep >= 2 ? activeClass : ''"
                      >
                        Socials
                      </button>
                      <button
                        class="multisteps-form__progress-btn"
                        type="button"
                        title="Profile"
                        @click="activeStep = 3"
                        :class="activeStep >= 3 ? activeClass : ''"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <form class="multisteps-form__form">
                    <!--single form panel-->
                    <user-info :class="activeStep === 0 ? activeClass : ''" />
                    <!--single form panel-->
                    <Address :class="activeStep === 1 ? activeClass : ''" />
                    <!--single form panel-->
                    <socials :class="activeStep === 2 ? activeClass : ''" />
                    <!--single form panel-->
                    <profile :class="activeStep === 3 ? activeClass : ''" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "./components/UserInfo.vue";
import Address from "./components/Address.vue";
import Socials from "./components/Socials.vue";
import Profile from "./components/Profile.vue";

export default {
  name: "new-user",
  components: {
    UserInfo,
    Address,
    Socials,
    Profile,
  },
  data() {
    return {
      showMenu: false,
      activeClass: "js-active position-relative",
      activeStep: 0,
      formSteps: 3,
    };
  },
  methods: {
    nextStep() {
      if (this.activeStep < this.formSteps) {
        this.activeStep += 1;
      } else {
        this.activeStep -= 1;
      }
    },
    prevStep() {
      if (this.activeStep > 0) {
        this.activeStep -= 1;
      }
    },
  },
};
</script>
