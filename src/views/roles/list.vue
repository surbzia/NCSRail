<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="roles"
      :loading="!loading"
      class="elevation-1"
    >
      <template v-slot:top>
      <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="RoleModel" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Role
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Add Role</span>
              </v-card-title>
              <v-card-text>
                <v-form @submit="addStation" ref="form" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="form.role"
                          :rules="[(v) => !!v || 'Role Name is required']"
                          label="Role Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12">
                        <v-btn class="mr-4 btn-primary" type="submit">
                          Submit
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="RoleEditModel" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Update Role</span>
              </v-card-title>
              <v-card-text>
               <v-form @submit="updateStation" ref="form" lazy-validation>
                  <v-container>
                   <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="edit_form.role"
                          :rules="[(v) => !!v || 'Role Name is required']"
                          label="Role Name"
                          required
                        ></v-text-field>
                      </v-col>
                     </v-row>
                     <v-row>
                      <v-col cols="12" md="12">
                        <v-btn class="mr-4 btn-primary" type="submit">
                          Submit
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
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
          color="light"
          :to="{ name: 'auth.roles.permissions', params: { id: item.id } }"
          small
        >
          Manage Permissions
        </v-btn>
        <v-btn
          rounded
          outlined
          color="info"
         v-on:click="edit(item)"
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
      RoleModel:false,
      RoleEditModel:false,
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Roles",
          to: { name: "auth.roles.listing" },
          disabled: false,
          exact: true,
        },
      ],
      loading: true,
      valid: false,
      options: {},
      form:{
        role:'',
      },
      edit_form:{
        role:'',
      },
      roles: [
        {
          id: 1,
          name: "ABCD",
          is_active:true,
        },
        {
          id: 2,
          name: "ABCD",
          is_active:false,
        },
        {
          id: 3,
          name: "ABCD",
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
          text: "Role Name",
          align: "start",
          sortable: true,
          value: "name",
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
    edit(item) {
      this.edit_form.role = item.name;
      this.RoleEditModel = true;  
    },
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this Role.. ??")) {
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