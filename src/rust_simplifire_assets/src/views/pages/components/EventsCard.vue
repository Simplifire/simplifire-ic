<template>
  <div class="card">
    <div class="card-header p-3 pb-0">
      <h6 class="mb-0">{{ title }}</h6>
      <p class="text-sm mb-0 text-capitalize font-weight-bold">
        {{ subTitle }}
      </p>
    </div>
    <div class="card-body border-radius-lg p-3">
      <div class="d-flex">
        <div>
          <div
            class="icon icon-shape bg-gradient-dark icon-md text-center border-radius-md shadow-none"
          >
            <i class="material-icons text-white opacity-10" aria-hidden="true"
              >savings</i
            >
          </div>
        </div>
        <div :class="this.$store.state.isRTL ? 'me-3' : 'ms-3'">
          <div class="numbers">
            <h6 class="mb-1 text-dark text-sm">{{ eventTitle }}</h6>
            <span class="text-sm">{{ eventDate }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex mt-4">
        <div>
          <div
            class="icon icon-shape bg-gradient-dark icon-md text-center border-radius-md shadow-none"
          >
            <i class="material-icons text-white opacity-10" aria-hidden="true"
              >notifications_active</i
            >
          </div>
        </div>
        <div :class="this.$store.state.isRTL ? 'me-3' : 'ms-3'">
          <div class="numbers">
            <h6 class="mb-1 text-dark text-sm">{{ eventTitle2 }}</h6>
            <span class="text-sm">{{ eventDate2 }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex mt-4">
        <div>
          <div
            class="icon icon-shape bg-gradient-dark icon-md text-center border-radius-md shadow-none"
          >
            <i class="material-icons text-white opacity-10" aria-hidden="true"
              >task</i
            >
          </div>
        </div>
        <div :class="this.$store.state.isRTL ? 'me-3' : 'ms-3'">
          <div class="numbers">
            <h6 class="mb-1 text-dark text-sm">{{ eventTitle3 }}</h6>
            <span class="text-sm">{{ eventDate3 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "events-card",
  props: {
    title: {
      type: String,
      default: "Upcoming events",
    },
    subTitle: {
      type: String,
      default: "Joined",
    },
    eventTitle: {
      type: String,
      default: "Cyber Week",
    },
    eventDate: {
      type: String,
      default: "27 March 2020, at 12:30 PM",
    },
    eventTitle2: {
      type: String,
      default: "Meeting with Marry",
    },
    eventDate2: {
      type: String,
      default: "24 March 2020, at 10:00 PM",
    },
    eventTitle3: {
      type: String,
      default: "Tasks planification",
    },
    eventDate3: {
      type: String,
      default: "24 March 2020, at 12:30 AM",
    },
  },
};
</script>
