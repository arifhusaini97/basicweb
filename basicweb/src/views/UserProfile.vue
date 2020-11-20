<template>
  <div class="user-profile">
    <div class="user-profile_sidebar">
      <div class="user-profile_user-panel">
        <h1 class="user-profile_username">@{{ state.user.username }}</h1>
        <div class="user-profile_admin-badge" v-if="state.user.isAdmin">
          Admin
        </div>
        <div class="user-profile_admin-badge" v-else-if="!state.user.isAdmin">
          Not Admin
        </div>
        <div class="user-profile_admin-badge" v-else>Unknown</div>
        <div class="user-profile_follower">
          <div class="user-profile_follower-count">
            <strong>Followers: </strong> {{ state.followers }}
          </div>
          <div class="user-profile_add-follower">
            <button @click="followUser">Add Follower</button>
          </div>
        </div>
      </div>
      <CreateTwootPanel @add-twoot="addTwoot" />
    </div>
    <!--<div class="user-profile_twoots-wrapper">
        <div class="user-profile_twoot" v-for="twoot in user.twoots" :key="twoot.id">
            {{ twoot.content }}
        </div>
        <div class="user-profile_twoot" v-for="(twoot, index) in user.twoots":key="twoot.index">{{twoot.content}}</div>
    </div>-->
    <div class="user-profile_twoots-wrapper">
      <TwootItem
        v-for="twoot in state.user.twoots"
        :key="twoot.id"
        :username="state.user.username"
        :twoot="twoot"
        @favourite="toggleFavourite"
      />
    </div>
  </div>
</template>

<script>
import TwootItem from "../components/TwootItem";
import CreateTwootPanel from "../components/CreateTwootPanel";
import { useRoute } from "vue-router";
import {users} from "../assets/users";
import { reactive, computed, onMounted, watch} from "vue";

export default {
  name: "UserProfile",
  components: {
    CreateTwootPanel,
    TwootItem,
  },
  setup() {

    const route=useRoute();

    // if (userId) => fetchUserFromApi(userId)

    const userId=computed(()=>route.params.userId)

    const state = reactive({
      followers: 0,
      // Need to use .value because it is in the setup and still computed
      user: users[userId.value-1] || users[0]
    });

    const fullName = computed(
      () => `${state.user.firstName} ${state.user.lastName}`
    );

    // const followers = watch((newFollowerCount, oldFollowerCount) =>
    //   oldFollowerCount < newFollowerCount
    //     ? console.log(`${this.user.username} has gained a follower!`)
    //     : null
    // );

    watch(
      // getter
      () => state.followers,
      // callback
      (newFollowerCount, oldFollowerCount) => {
        oldFollowerCount < newFollowerCount
          ? console.log(`${state.user.username} has gained a follower!`)
          : null;
      },
      // watch Options
      {
        lazy: false, // immediate: true
      }
    );

    onMounted(() => {
      followUser();
    });

    function followUser() {
      state.followers++;
      // console.log(`Fullname: ${fullName.value}`);
    }

    function toggleFavourite(id) {
      console.log(`Favourited Tweet #${id}`);
    }
  
    function addTwoot(twoot) {
      state.user.twoots.unshift({
        id: state.user.twoots.length + 1,
        content: twoot,
      });
    }

    return {
      state,
      followUser,
      toggleFavourite,
      addTwoot,
      fullName,
      userId,
    };
  },
  // data() {
  //   return {
  //     followers: 0,
  //     user: {
  //       id: 1,
  //       username: "arifhusaini97",
  //       firstName: "Nur Arif Husaini",
  //       lastName: "Norwaza",
  //       email: "chemist.arif.husaini@gmail.com",
  //       isAdmin: true,
  //       twoots: [
  //         {
  //           id: 1,
  //           content: "Arif is Amazing",
  //         },
  //         {
  //           id: 2,
  //           content: "Let's just do it!",
  //         },
  //       ],
  //     },
  //   };
  // },
  // watch: {
  //   followers(newFollowerCount, oldFollowerCount) {
  //     if (oldFollowerCount < newFollowerCount) {
  //       console.log(`${this.user.username} has gained a follower!`);
  //     }
  //   },
  // },
  // computed: {
  //   fullName() {
  //     return `${this.user.firstName} ${this.user.lastName}`;
  //   },
  // },
  // methods: {
  //   followUser() {
  //     this.followers++;
  //   },
  //   toggleFavourite(id) {
  //     console.log(`Favourited Tweet #${id}`);
  //   },
  //   // this.user.twoots.unshift({
  //   //       id: this.user.twoots.length + 1,
  //   //       content: this.newTwootContent,
  //   //     });
  //   addTwoot(twoot) {
  //     this.user.twoots.unshift({
  //       id: this.user.twoots.length + 1,
  //       content: twoot,
  //     });
  //   },
  // },
  //run everytime the page reload
  // mounted() {
  //   this.followUser();
  // },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  //   width: 50%;
  grid-gap: 50px;
  padding: 50px 5%;

  .user-profile_sidebar {
    display: grid;
    grid-gap: 20px;
    margin-bottom: auto;

    .user-profile_user-panel {
      display: grid;
      grid-gap: 10px;
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      border: 1px solid #dfe3e8;
      margin-bottom: auto;

      h1 {
        margin: 0;
      }

      .user-profile_username {
        margin-right: auto;
        padding: 10 10px;
        font-weight: bold;
      }

      .user-profile_admin-badge {
        background-color: rebeccapurple;
        color: white;
        border-radius: 5px;
        margin-right: auto;
        padding: 0 10px;
        font-weight: bold;
      }

      .user-profile_follower {
        display: flex;
        justify-content: space-between;

        .user-profile_follower-count {
          display: flex;
          justify-content: space-between;
        }

        button {
          padding: 5px 5px;
          margin: auto 0;
          border-radius: 5px;
          border: none;
          background-color: deeppink;
          color: white;
          font-weight: bold;
        }
      }
    }
  }

  .user-profile_twoots-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
}
</style>
