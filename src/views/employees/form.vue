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
          <v-btn :to="{ name: 'auth.employees.listing' }" rounded dark>
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
                label="Full Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="form.email"
                :rules="[(v) => !!v || 'Email is required']"
                label="Employee Email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" md="4">
            <v-text-field
                v-model="form.cnic"
                :rules="[(v) => !!v || 'CNIC  is required']"
                label="CNIC"
                required
              ></v-text-field>

            </v-col>
              <v-col cols="4" md="4">
              <v-text-field
                v-model="form.contactNumber"
                :rules="[(v) => !!v || 'Contact Number is required']"
                label="Contact Number"
                required
              ></v-text-field>
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
import EmployeeService from "@/services/employee";
export default {
  data: () => ({
    is_edit :false,
    title: "Add Employee",
    button: "Submit",
    form: {
      id: null,
      name: "",
      email: "",
      cnic: "",
      contactNumber: "",
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
          text: "Employee",
          to: { name: "auth.employees.listing" },
          disabled: false,
          exact: true,
        },
      ],
  }),
  methods: {
async getUser(){
 let res = await EmployeeService.get(this.form.id);
 this.password_placeholder = 'Write if want to change password';
 this.form.id = res.systemUserID;
 this.form.name = res.fullName;
 this.form.email = res.email;
 this.form.cnic = res.cnic;
 this.form.contactNumber = res.contactNumber;
 this.form.isActive = res.isActive;
},
    AddUser: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        let data = {
          fullName: this.form.name,
          email: this.form.email,
          cnic: this.form.cnic,
          contactNumber: this.form.contactNumber,
          isActive: this.form.isActive,
        };
       if(!this.is_edit){
          var res = await EmployeeService.create(data);
       }else{
           var res = await EmployeeService.update(data,this.form.id);
       }
        if (res.status == 1) {
            if(!this.is_edit){
          this.$toaster.success("Employee has been added Successfully.");
          }else{
          this.$toaster.success("Employee has been updated Successfully.");
          }
          this.$router.push({ name: "auth.employees.listing" });
          
        }
      }
    },
  },
  mounted(){
     if (this.$route.params.id) {
    this.form.id = this.$route.params.id;
     this.is_edit = true;
     this.title= 'Update Employee';
     this.button = 'Update';
     this.getUser();
      this.bread.push({text:'Update',disabled:true,href:'#'});
     }else{
      this.bread.push({text:'Add',disabled:true,href:'#'});
     }
  }
};
</script>