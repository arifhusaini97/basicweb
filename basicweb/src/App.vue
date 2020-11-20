<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Arif Husaini Web!"/> -->
    <nav>
      <router-link to="/">
        <div class="navigation_logo">Twotter</div>
      </router-link>
      <div class="navigation_user" v-if="user">
        {{ user.username }}
      </div>
    </nav>
    <!--<UserProfile />-->
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import UserProfile from "./components/UserProfile";
import{useStore} from 'vuex';
import {computed} from 'vue';

export default {
  name: "App",
  // components: {
  //   UserProfile,
  // },
  // data() {
  //   return {
  //     user: {
  //       username: "arifhusaini97",
  //     },
  //   };
  // },
  setup() {
    const store = useStore();
    const user=computed(()=>store.state.User.user);
    return{
      user
    }
  },
  // components: {
  //   HelloWorld
  // }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f3f5fa;
  /*display: flex;
    flex-direction: column;*/
  /* margin-top: 60px; */

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5%;
    background-color: deeppink;
    color: white;
    .navigation_logo {
      font-weight: bold;
      font-size: 24px;
    }
    .navigation_user {
      font-weight: bold;
    }
  }
}
</style>
