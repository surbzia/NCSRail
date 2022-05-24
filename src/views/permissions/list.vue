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
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:top>
      <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="PermissionModel" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Permission
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Add Permission</span>
              </v-card-title>
              <v-card-text>
                <v-form @submit="addPermission" ref="form" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="6" md="6">
                        <v-text-field
                          v-model="form.permissionTitle"
                          :rules="[(v) => !!v || 'Permission Title is required']"
                          label="Permission Title"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-text-field
                          v-model="form.permissionSubTitle"
                          :rules="[(v) => !!v || 'Module Name is required']"
                          label="Module Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="6">
                           <v-checkbox
                        v-model="form.isActive"
                        label="Status"
                      ></v-checkbox>
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
          <v-dialog v-model="PermissionEditModel" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Update Permission</span>
              </v-card-title>
              <v-card-text>
               <v-form @submit="updatePermission" ref="form" lazy-validation>
                  <v-container>
                   <v-row>
                     <v-col cols="6" md="6">
                        <v-text-field
                          v-model="edit_form.permissionTitle"
                          :rules="[(v) => !!v || 'Permission Title is required']"
                          label="Permission Title"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-text-field
                          v-model="edit_form.permissionSubTitle"
                          :rules="[(v) => !!v || 'Module Name is required']"
                          label="Module Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="6">
                           <v-checkbox
                        v-model="edit_form.isActive"
                        label="Status"
                      ></v-checkbox>
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
      <template v-slot:[`item.actions`]="{ item }">
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
import PermissionService from "@/services/permission";
export default {
  name: "auth.permissions.listing",
  data() {
    return {
      search: "",
      PermissionModel:false,
      PermissionEditModel:false,
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Permissions",
          to: { name: "auth.permissions.listing" },
          disabled: false,
          exact: true,
        },
      ],
      loading: true,
      valid: false,
      options: {},
      form:{
        permissionId:null,
        permissionTitle:'',
        permissionSubTitle:'',
        isActive:true,
      },
      edit_form:{
        permissionId:null,
        permissionTitle:'',
        permissionSubTitle:'',
        isActive:true,
      },
      roles: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "permissionId",
        },
        {
          text: "Permission Title",
          align: "start",
          sortable: true,
          value: "permissionSubTitle",
        },
        {
          text: "Slug",
          align: "start",
          sortable: true,
          value: "permissionSubTitle",
        },
        {
          text: "Module",
          align: "start",
          sortable: true,
          value: "permissionTitle",
        },
        { text: "Actions", align: "end", value: "actions", sortable: false },
      ],
    };
  },
  watch: {},
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    edit(item) {
      this.edit_form.permissionId = item.permissionId;
      this.edit_form.permissionTitle = item.permissionSubTitle;
      this.edit_form.permissionSubTitle = item.permissionTitle;
      this.edit_form.isActive = item.isActive;
      this.PermissionEditModel = true;  
    },
   async deleteItem(item) {
      if (confirm("Are you sure you want to delete this Permission.. ??")) {
        var res = await PermissionService.delete(parseInt(item.permissionId));
        if (res.status == 1) {
          this.$toaster.success("Permission has been deleted Successfully.");
          this.getDataFromApi();
        } else {
          this.$toaster.error(res.data);
          this.getDataFromApi();
        }
      }
    },
    addPermission: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        var res = await PermissionService.create({
          permissionTitle: this.form.permissionSubTitle,
          permissionSubTitle : this.form.permissionTitle,
          isActive: this.form.isActive,
        });
        if (res.status == 1) {
          this.$toaster.success("Permission has been added successfully.");
          this.getDataFromApi();
          this.PermissionModel = false;
          this.form.permissionId = null;
          this.form.permissionTitle = '';
          this.form.permissionSubTitle = '';
          this.form.isActive = false;
        }
      }
    },
    updatePermission: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        let data = {
          permissionTitle: this.edit_form.permissionSubTitle,
          permissionSubTitle : this.edit_form.permissionTitle,
          isActive: this.edit_form.isActive,
        };

        var res = await PermissionService.update(
          data,
          parseInt(this.edit_form.permissionId)
        );
        if (res.status == 1) {
          this.$toaster.success("Permission Updated Successfully.");
          this.getDataFromApi();
          this.PermissionEditModel = false;
        }
      }
    },
    async getDataFromApi() {
      var res = await this.getAllRoles();
      this.roles = res.data;
      this.loading = false;
    },
    getAllRoles() {
      this.loading = true;
      var query = "";
      if (this.search != "") {
        query += "&search=" + this.search;
      }
      return PermissionService.getlist(query);
    },
  },
};
</script>