<template>
  <div>
    <v-row no-gutters class="pa-10">
      <v-col md="12" offset="3"  d-flex align-content-center>
        <img src="https://nscrail.himsportal.com/images/logo.png" alt="" />
      </v-col>
    </v-row>

    <v-container class="grey lighten-5 loginscreen">
      <v-card class="d-flex align-content-center flex-wrap " style="padding: 22px;" outlined tile>
        <v-row>
          <v-col md="6" offset="3">
            <div class="justify-center">
              <v-form ref="form" v-model="loading" lazy-validation>
                <v-text-field
                  v-model="login_username"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                  clearable
                ></v-text-field>
                <v-text-field
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="show3 ? 'text' : 'password'"
                  name="input-10-2"
                  label="Password"
                  value=""
                  v-model="login_password"
                  class="input-group--focused"
                  @click:append="show3 = !show3"
                  clearable
                ></v-text-field>
                <v-btn
                  elevation="1"
                  @click="dologin"
                  color="primary"
                  large
                  raised
                  :loading="btnloading"
                  :disabled="btnloading"
                  >Login</v-btn
                >
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <v-snackbar v-model="snackbar">
        {{ erorrs.email }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import loginservice from "@/services/login";
export default {
  name: "Login",
  components: {},
  mounted() {
    this.$nextTick(function () {
      // this.$store.commit("setAppCls", "login-screen-main");
    });
  },
  data() {
    return {
      loader: null,
      loading: false,
      btnloading: false,
      snackbar: false,
      login_username: "",
      login_password: "",
      show3: false,
      password: "Password",
      erorrs: {
        email: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    dologin: async function () {
      if (this.$refs.form.validate()) {
        this.btnloading = true;
        var logindetail = await loginservice.dologin(
          this.login_username,
          this.login_password
        );
        this.btnloading = false;

        if (logindetail.status) {
          this.$toaster.success("You have login successfully.");
          this.$store.commit("setLoginStatus", true);
          this.$store.commit("setAuthToken", logindetail.data);
          // var user = await loginservice.me();
          // this.$store.commit("setloggedInUser", user);
          // if (user.permissions.length > 0) {
          //   let permissions = user.permissions.map((e) => {
          //     return e.permission_id;
          //   });
          //   this.$store.commit("setPermissions", permissions);
          // }
          // this.$router.push({ name: "auth.dashboard" });
          this.$router.push({ name: "auth.dashboard" });
        }
      }
    },
  },
  watch: {},
};
</script>