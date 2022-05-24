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
                <v-form @submit="addRole" ref="form" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="6" md="6">
                        <v-text-field
                          v-model="form.roleName"
                          :rules="[(v) => !!v || 'Role Name is required']"
                          label="Role Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-checkbox
                          v-model="form.isActive"
                          label="Active"
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
          <v-dialog v-model="RoleEditModel" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Update Role</span>
              </v-card-title>
              <v-card-text>
                <v-form @submit="updateStation" ref="form" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="6" md="6">
                        <v-text-field
                          v-model="edit_form.roleName"
                          :rules="[(v) => !!v || 'Role Name is required']"
                          label="Role Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-checkbox
                          v-model="edit_form.isActive"
                          label="Active"
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
      <template v-slot:[`item.status`]="{ item }">
        <v-switch
          v-model="item.isActive"
          @change="updateRoleStatus(item)"
          color="info"
        ></v-switch>
      </template>
      <template v-slot:[`item.isActive`]="{ item }">
        <v-chip v-bind:color="item.isActive == true ? 'success' : 'error'">
          {{ item.isActive == true ? "Active" : "In-Active" }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          rounded
          outlined
          color="light"
          :to="{ name: 'auth.roles.permissions', params: { id: item.roleId } }"
          small
        >
          Manage Permissions
        </v-btn>
        <v-btn rounded outlined color="info" v-on:click="edit(item)" small>
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
import RoleService from "@/services/role";
export default {
  name: "auth.station.listing",
  data() {
    return {
      search: "",
      RoleModel: false,
      RoleEditModel: false,
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
      form: {
        roleId: null,
        roleName: "",
        isActive: false,
      },
      edit_form: {
        roleId: null,
        roleName: "",
        isActive: false,
      },
      roles: [],
      routes: [],
      headers: [
        { text: "Status", align: "start", value: "status", sortable: false },
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "roleId",
        },
        {
          text: "Role Name",
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
  watch: {},
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    edit(item) {
      this.edit_form.roleId = item.roleId;
      this.edit_form.roleName = item.roleName;
      this.edit_form.isActive = item.isActive;
      this.RoleEditModel = true;
    },
    async deleteItem(item) {
      if (confirm("Are you sure you want to delete this Role.. ??")) {
        var res = await RoleService.delete(parseInt(item.roleId));
        if (res.status == 1) {
          this.$toaster.success("User has been deleted Successfully.");
          this.getDataFromApi();
        } else {
          this.$toaster.error(res.data);
          this.getDataFromApi();
        }
      }
    },
    addRole: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        var res = await RoleService.create({
          roleName: this.form.roleName,
          isActive: this.form.isActive,
        });
        if (res.status == 1) {
          this.$toaster.success("Role Added Successfully.");
          this.getDataFromApi();
          this.RoleModel = false;
        }
      }
    },
    updateStation: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        let formData = {
          roleName: this.edit_form.roleName,
          isActive: this.edit_form.isActive,
        };

        var res = await RoleService.update(
          formData,
          parseInt(this.edit_form.roleId)
        );
        if (res.status == 1) {
          this.$toaster.success("Role Updated Successfully.");
          this.getDataFromApi();
          this.RoleEditModel = false;
        }
      }
    },
    updateRoleStatus: async function (item) {
      let data = {
        roleName: item.roleName,
        isActive: item.isActive,
      };
      var res = await RoleService.update(data, parseInt(item.roleId));
      if (res.status == 1) {
        this.$toaster.success("Role status has been updated successfully.");
        this.getDataFromApi();
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
      return RoleService.getlist(query);
    },
  },
};
</script>