<template>
  <div class="card text-center w-45 m-2">
    <div class="card-header">Simplifire user</div>
    <!--<img src="..." class="card-img-top" alt="...">-->
    <div class="card-body">
        
        <p class="card-text">
            <span class="badge rounded-pill bg-dark">{{ user?.principal_id }}</span>
        </p>
        <a href="#" 
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="share(user?.id)">Share</a>
    </div>
</div>
</template>

<script>
export default {
  name: "user-card",
  props: {
    user: {
      id: String,
      email: String,
    },
    
  },
  methods: {
      share(userId) {
          this.$emit('share', userId);
      }
  },
};
</script>
