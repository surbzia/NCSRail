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
              :to="{ name: 'auth.users.add' }"
            >
              Add User
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
       @change="updateUserStatus(item)"
    ></v-switch>
        </template>
        <template v-slot:[`item.roleName`]="{ item }">
         <v-chip
         outlined
      color="dark"
    >
    {{item.roleName}}
    </v-chip>
        </template>
        <template v-slot:[`item.isActive`]="{ item }">
         <v-chip
       v-bind:color="item.isActive == true?'success' :'error'"
    >
    {{item.isActive == true?'Active' :'In-Active'}}
    </v-chip>
        </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          rounded
          outlined
          color="info"
          :to="{ name: 'auth.users.edit', params: { id: item.systemUserID } }"
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
import UserService from "@/services/user";
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
          text: "Users",
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
          value: "systemUserID",
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
          text: "Role",
          align: "start",
          sortable: true,
          value: "roleName",
        },
        {
          text: "Status",
          align: "start",
          sortable: true,
          value: "isActive",
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
        var res = await UserService.delete(parseInt(item.systemUserID));
        if (res.status == 1) {
          this.$toaster.success("User has been deleted Successfully.");
          this.getDataFromApi();
        } else {
          this.$toaster.error(res.data);
          this.getDataFromApi();
        }
      }
    },

  
    updateUserStatus: async function (item) {
         let data = {
          fullName: item.fullName,
          email: item.email,
          roleID: item.roleID,
          employeeID: item.employeeID,
          password: item.password,
          isActive: item.isActive,
        };
        if(item.password == null){
          data.password = '';
        }
        var res = await UserService.update(
          data,
          parseInt(item.systemUserID)
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
      return UserService.getlist(query);
    },
  },
};
</script>