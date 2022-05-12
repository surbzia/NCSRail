<template>
  <v-app>
    <!-- <v-app-bar app></v-app-bar> -->
    <side-bar :showsidebar="sideBarStatus" ></side-bar>
    <v-main>
      <v-container :fluid="sideBarStatus" class="mt-5">
        <router-view />
      </v-container>
      <notifications
        :notificaitontext="notificaitontext"
        :notificaitonstatus="notificaitonstatus"
      />
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar";
import notifications from "@/components/notifications";
require("@/assets/style.css");
export default {
  name: "App",
  components: {
    SideBar,
    notifications,
  },
  data: () => ({}),
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    sideBarStatus() {
      return this.$store.getters.sideBarStatus;
    },
    notificaitontext() {
      return this.$store.getters.notificationText;
    },
    notificaitonstatus() {
      return this.$store.getters.notificationStatus;
    },
  },
  watch: {
    $route() {
      if (this.$route.meta.showsidebar) {
        this.$store.commit("setSideBarStatus", true);
      } else {
        this.$store.commit("setSideBarStatus", false);
      }
    },
  },
  mounted() {
    if (this.$route.meta.showsidebar) {
      this.$store.commit("setSideBarStatus", true);
    } else {
      this.$store.commit("setSideBarStatus", false);
    }
  },
};
</script>
