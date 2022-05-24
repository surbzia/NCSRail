<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-row>
          <v-col md="12" class="text-right">
            <v-btn
              link
              color="primary"
              dark
              class="mb-2"
              :to="{ name: 'auth.employees.add' }"
            >
             Add Employee
            </v-btn>
          </v-col>
        </v-row>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-switch
      v-model="item.isActive"
       color="info"
       @change="updateEmployeeStatus(item)"
    ></v-switch>
        </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          rounded
          outlined
          color="info"
          :to="{ name: 'auth.employees.edit', params: { id: item.employeeID } }"
          small
        >
          Edit
        </v-btn>
        <v-btn
          rounded
          outlined
          color="error"
          v-on:click="deleteItem(item)"
          small
        >
          Delete
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import EmployeeService from "@/services/employee";
export default {
  name: "auth.station.listing",
  data() {
    return {
      search: "",
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Employees",
          to: { name: "auth.users.listing" },
          disabled: false,
          exact: true,
        },
      ],
      loading: true,
      valid: false,
      options: {},
      users: [],
      routes: [],
      headers: [
        { text: "Status", align: "start", value: "status", sortable: true },
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "employeeID",
        },
        // {
        //   text: "Employee ID",
        //   align: "start",
        //   sortable: true,
        //   value: "emp_id",
        // },
        {
          text: "User Name",
          align: "start",
          sortable: true,
          value: "fullName",
        },
        {
          text: "Email",
          align: "start",
          sortable: true,
          value: "email",
        },
        {
          text: "CNIC",
          align: "start",
          sortable: true,
          value: "cnic",
        },
        {
          text: "Mobile",
          align: "start",
          sortable: true,
          value: "mobileNumber",
        },
        { text: "Actions", align: "end", value: "actions", sortable: false },
      ],
    };
  },
   watch: {
    search() {
      this.getDataFromApi();
    },
  },
  mounted() {
    this.getDataFromApi();
  },
  methods: {
  async deleteItem(item) {
      if (confirm("Are you sure you want to delete this User.. ??")) {
        var res = await EmployeeService.delete(parseInt(item.employeeID));
        if (res.status == 1) {
          this.$toaster.success("User has been deleted Successfully.");
          this.getDataFromApi();
        } else {
          this.$toaster.error(res.data);
          this.getDataFromApi();
        }
      }
    },

  
    updateEmployeeStatus: async function (item) {
         let data = {
          isActive: item.isActive,
        };
        var res = await EmployeeService.update(
          data,
          parseInt(item.employeeID)
        );
        if (res.status == 1) {
          this.$toaster.success("User status has been updated successfully.");
          this.getDataFromApi();
        }
      
    },
    async getDataFromApi() {
      var res = await this.getAllUsers();
      this.users = res.data;
      this.loading = false;
    },
    getAllUsers() {
      this.loading = true;
      var query = "";
      if (this.search != "") {
        query += "&search=" + this.search;
      }
      return EmployeeService.getlist(query);
    },
  },
};
</script>