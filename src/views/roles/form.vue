<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
      <div class="row">
      <div class="col-md-12 mb-2">
      <div class="text-right">
          <v-btn :to="{ name: 'auth.users.listing' }" rounded dark>
          Back
        </v-btn>
      </div>
      </div>
    </div>
    <div class="content-body">
      <div class="sec-heading">
        <v-container>
          <h2>{{ title }}</h2>
        </v-container>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="form.name"
                :rules="[(v) => !!v || 'Name is required']"
                label="User Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="form.email"
                :rules="[(v) => !!v || 'Email is required']"
                label="User Email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" md="3">
              <v-select
                v-model="form.role_id"
                :items="roles"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Role is required']"
                label="Select Role"
                required
              ></v-select>
            </v-col>
            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.employee_id"
                :rules="[(v) => !!v || 'Employee Id is required']"
                label="Employee Id"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="form.password"
                :rules="[(v) => !!v || 'Password is required']"
                label="Password"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
               <v-file-input
               v-model="form.image"
               show-size
               label="File input"
             ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-btn class="mr-4 btn-primary" type="submit">
                {{ button }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    is_edit :false,
    title: "Add User",
    button: "Submit",
    roles: [
      { id: 1, name: "admin" },
      { id: 2, name: "Sub-Admin" },
      { id: 3, name: "Customer" },
    ],
    form: {
      id: null,
      name: "",
      email: "",
      image: undefined,
      role_id: "",
      employee_id: "",
      password: "",
    },
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Users",
          to: { name: "auth.users.listing" },
          disabled: false,
          exact: true,
        },
      ],
  }),
  methods: {

  },
  mounted(){
     if (this.$route.params.id) {
     this.is_edit = true;
     this.title= 'Update User';
     this.button = 'Update';
      this.bread.push({text:'Update',disabled:true,href:'#'});
     }else{
      this.bread.push({text:'Add',disabled:true,href:'#'});
     }
  }
};
</script>