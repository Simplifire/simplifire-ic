<template>
  <div class="card">
    <div class="card-body">
      <div class="text-center shadow icon icon-shape bg-gradient-success">
        <i class="material-icons opacity-10" aria-hidden="true">refresh</i>
      </div>
      <h5 class="mt-3 mb-0">
        754
        <span class="text-sm text-secondary">{{ unit }}</span>
      </h5>
      <p class="mb-0">{{ location }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "mini-info-card",
  props: {
    unit: {
      type: String,
      default: "m",
    },
    location: {
      type: String,
      default: "New York City",
    },
  },
};
</script>
