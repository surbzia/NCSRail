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
      :loading="!loading"
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
      <template v-slot:[`item.is_active`]="{ item }">
        <v-btn
          rounded
          v-bind:color="item.is_active?'success':'error'"
          small
        >
        {{item.is_active?'Active' : 'In-Active'}}
        </v-btn>
        </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          rounded
          outlined
          color="info"
          :to="{ name: 'auth.users.edit', params: { id: item.id } }"
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
import RouteService from "@/services/routes";
import TrainService from "@/services/train";
import Stationservice from "@/services/station";
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
      users: [
        {
          id: 1,
          name: "ABCD",
          emp_id: "ABCD",
          email: "abcd@gmail.com",
          role: "Admin",
          is_active:true,
        },
        {
          id: 2,
          name: "EFG",
          emp_id: "EFG",
          email: "abcd@gmail.com",
          role: "Sub-Admin",
          is_active:false,
        },
        {
          id: 3,
          name: "HIJ",
          emp_id: "HIJ",
          email: "abcd@gmail.com",
          role: "Customer",
          is_active:true,
        },
      ],
      routes: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "Employee ID",
          align: "start",
          sortable: true,
          value: "emp_id",
        },
        {
          text: "User Name",
          align: "start",
          sortable: true,
          value: "name",
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
          value: "role",
        },
        {
          text: "Status",
          align: "start",
          sortable: true,
          value: "is_active",
        },
        { text: "Actions", align: "end", value: "actions", sortable: false },
      ],
    };
  },
  watch: {},
  mounted() {},
  methods: {
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this User.. ??")) {
        var res = RouteService.delete(parseInt(item.id));
        if (res.status == 1) {
          this.$toaster.success("User has been deleted Successfully.");
          this.getDataFromApi();
        } else {
          this.$toaster.error(res.data);
          this.getDataFromApi();
        }
      }
    },
    addStation: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        var res = await RouteService.create({
          title: this.form.name,
          code: this.form.code,
          CityID: this.form.city,
        });
        if (res.status == 1) {
          this.$toaster.success("Station Added Successfully.");
          this.getDataFromApi();
          this.stationModel = false;
        }
      }
    },
    updateStation: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        let formData = {
          id: this.edit_form.id,
          title: this.edit_form.name,
          code: this.edit_form.code,
          CityID: this.edit_form.city,
        };

        var res = await RouteService.update(
          formData,
          parseInt(this.edit_form.id)
        );
        if (res.status == 1) {
          this.$toaster.success("Train Updated Successfully.");
          this.getDataFromApi();
          this.stationModelEdit = false;
        }
      }
    },
    async getDataFromApi() {
      var res = await this.getAllTrainRoutes();
      this.routes = res.data;
      this.loading = false;
    },
    getAllTrainRoutes() {
      this.loading = true;
      var query = "";
      if (this.search != "") {
        query += "&search=" + this.search;
      }
      return RouteService.getlist(query);
    },
  },
};
</script>