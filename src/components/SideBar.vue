<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img :src="require('@/assets/logorail.jpg')" />
      </div>

      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'auth.dashboard' }" text>
        <span class="mr-2">Dashboard</span>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn text @click="logout">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-menu
        bottom
        left
        transition="slide-y-transition"
        open-on-hover
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon offset-y v-bind="attrs" v-on="on">
            <v-icon>mdi-anchor</v-icon>
          </v-btn>
        </template>

        <v-list>
          <!-- <v-list-item link :to="{ name: 'auth.users.add' }">
            <v-list-item-title
              ><v-icon>mdi-plus</v-icon>Users</v-list-item-title
            >
          </v-list-item> -->
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-hover v-slot="{ hover }">
      <v-navigation-drawer
        v-model="drawer"
        permanent
        absolute
        expand-on-hover
        class=""
        v-if="!showsidebar"
        dark
        :color="!hover ? 'primary' : undefined"
      >
        <v-system-bar></v-system-bar>
        <v-system-bar></v-system-bar>
        <v-system-bar></v-system-bar>
        <v-list-item class="px-2" link :to="{ name: 'auth.dashboard' }">
          <v-list-item-avatar>
            <v-img
              :src="'https://randomuser.me/api/portraits/men/85.jpg'"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-title>Login</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item class="px-2" link :to="{ name: 'auth.bookings.listing' }">
            <v-list-item-title> Bookings</v-list-item-title>
          </v-list-item>
           <v-list-item
            class="px-2"
            link
            :to="{ name: 'auth.stations.listing' }"
          >

            <v-list-item-title>Station</v-list-item-title>
          </v-list-item> 
          <v-list-item class="px-2" link :to="{ name: 'auth.cities.listing' }">
            <v-list-item-title>Cities</v-list-item-title>
          </v-list-item>
          <v-list-item class="px-2" link :to="{ name: 'auth.trains.listing' }">
            <v-list-item-title>Trains</v-list-item-title>
          </v-list-item>
          <v-list-item class="px-2" link :to="{ name: 'auth.routes.listing' }">
            <v-list-item-title>Routes</v-list-item-title>
          </v-list-item>

          
          <!-- <v-list-item class="px-2" link :to="{ name: 'auth.addstation' }">
            <v-list-item-title>Add Station</v-list-item-title>
          </v-list-item>

          <v-list-item class="px-2" link :to="{ name: 'auth.addtrain' }">
            <v-list-item-title>Add Train</v-list-item-title>
          </v-list-item>
          <v-list-item class="px-2" link :to="{ name: 'auth.addcity' }">
            <v-list-item-title>Add City</v-list-item-title>
          </v-list-item>
          <v-list-item class="px-2" link :to="{ name: 'auth.addroutes' }">
            <v-list-item-title>Add Routes</v-list-item-title>
          </v-list-item>
          <v-list-item class="px-2" link :to="{ name: 'auth.traincoaches' }">
            <v-list-item-title>Train Coaches</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-navigation-drawer>
    </v-hover>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  components: {},
  props: ["showsidebar"],
  data: () => ({
    drawer: false,
    mini: true,
  }),
  methods: {
        logout() {
      this.$store.commit("setLoginStatus", false);
      this.$store.commit("setAuthToken", "");
      // this.$store.commit("setloggedInUser", {});
      this.$router.push({ name: "auth.login" });
    },
  },
    computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    permissions(){
      return this.$store.getters.getPermissions
    }
  },
};
</script>