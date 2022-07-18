<template>
  <div class="card text-center w-45 m-2">
    <div class="card-header">{{ displayName(user) }}</div>
    <!--<img src="..." class="card-img-top" alt="...">-->
    <div class="card-body">
        
        <p class="card-text">
            <span class="badge rounded-pill bg-dark">{{ display(user) }}</span>
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
    },
    
  },
  methods: {
      share(userId) {
          this.$emit('share', userId);
      },
      display(user) {
        if (user?.email) {
          return user.email;
        } else if (user?.principal_id && user?.provider_id) {
          return user.principal_id.substring(0, 8) + '... | ' + user.provider_id;
        } else {
          return "";
        }
      },
      displayName(user) {
        if (user?.first_name && user?.last_name) {
          return user.first_name + ' ' + user.last_name;
        } else {
          return "Simplifire user";
        }
      }
  },
};
</script>
