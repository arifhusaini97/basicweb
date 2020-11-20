<template>
  <div class="home">
    <h1>Home</h1>
    <div class="users-list">
      <router-link
        v-for="user in users"
        :to="{ name: 'UserProfile', params: { userId: user.id } }"
        :key="user.id"
      >
        {{ user.username }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { users } from "../assets/users";
export default {
  name: "Home",
  setup() {
    return { users };
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  padding: 50px 5%;

  h1 {
    display: flex;
    justify-content: flex-start;
  }

  .users-list {
    display: flex;
    flex-direction: column;
    a {
      display: flex;
      justify-content: flex-start;
    }
  }
}
</style>
