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
      <v-form @submit="AddUser" ref="form" lazy-validation>
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
              <v-autocomplete
                v-model="form.role_id"
                :items="roles"
                item-text="roleName"
                item-value="roleId"
                :rules="[(v) => !!v || 'Role is required']"
                label="Select Role"
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="3" md="3">
              <!-- <v-text-field
                v-model="form.employee_id"
                :rules="[(v) => !!v || 'Employee Id is required']"
                label="Employee Id"
                required
              ></v-text-field> -->
              <v-autocomplete
                v-model="form.employee_id"
                :items="employees"
                item-text="fullName"
                item-value="employeeID"
                :rules="[(v) => !!v || 'Employee is required']"
                label="Select Employee"
                @change="selectEmployee()"
                required
                :disabled="form.employee_id!= null && is_edit?true:false"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="form.password"
                :rules="[(v) => !!is_edit || 'Password is required']"
                :label="password_placeholder"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8" md="8">
               <v-file-input
               v-model="form.image"
               show-size
               label="File input"
             ></v-file-input>
            </v-col>
            <v-col cols="4" md="4">
                <v-checkbox
                    v-model="form.isActive"
                    label="Active"
                  ></v-checkbox>
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
import UserService from "@/services/user";
import RoleService from "@/services/role";
import EmployeeService from "@/services/employee";
export default {
  data: () => ({
    is_edit :false,
    password_placeholder :'Password',
    title: "Add User",
    button: "Submit",
    roles: [],
    employees: [],
    form: {
      id: null,
      name: "",
      email: "",
      image: undefined,
      role_id: "",
      employee_id: null,
      password: "",
      isActive: "",
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
async getUser(){
 let res = await UserService.get(this.form.id);
 this.password_placeholder = 'Write if want to change password';
 this.form.id = res.systemUserID;
 this.form.name = res.fullName;
 this.form.email = res.email;
 this.form.role_id = res.roleID;
 this.form.employee_id = res.employeeID;
 this.form.isActive = res.isActive;
},
    AddUser: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        let data = {
          fullName: this.form.name,
          email: this.form.email,
          roleID: this.form.role_id,
          employeeID: this.form.employee_id,
          password: this.form.password,
          isActive: this.form.isActive,
          image: this.form.image,
        };
         let res = null;
       if(!this.is_edit){
           res = await UserService.create(data);
       }else{
            res = await UserService.update(data,this.form.id);
       }
        if (res.status == 1) {
         
            if(!this.is_edit){
          this.$toaster.success("User has been added Successfully.");
          }else{
          this.$toaster.success("User has been updated Successfully.");
          }
          this.$router.push({ name: "auth.users.listing" });
          
        }
      }
    },
   async selectEmployee(){
    let data = await EmployeeService.get(this.form.employee_id);
    this.form.name = data.fullName;
    this.form.email = data.email;
    // console.log(data);
    },
   async getAllRoles(){
    let res = await RoleService.getlist('?isActive=true');
    this.roles = res.data;
    let res1 = await EmployeeService.getlist('?isActive=true');
    this.employees = res1.data;
    }
  },
  mounted(){
    this.getAllRoles();
     if (this.$route.params.id) {
    this.form.id = this.$route.params.id;
     this.is_edit = true;
     this.title= 'Update User';
     this.button = 'Update';
     this.getUser();
      this.bread.push({text:'Update',disabled:true,href:'#'});
     }else{
      this.bread.push({text:'Add',disabled:true,href:'#'});
     }
  }
};
</script>