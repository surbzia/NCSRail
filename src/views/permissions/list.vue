<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="permissions"
      :loading="loading"
      class="elevation-1"
      dense
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
                        <v-select
                          v-model="form.permissionTitle"
                          :items="modules"
                          :rules="[(v) => !!v || 'Module is required']"
                          label="Select Module"
                        ></v-select>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-text-field
                          v-model="form.permissionSubTitle"
                          :rules="[
                            (v) => !!v || 'Permission Title is required',
                          ]"
                          label="Permission Title"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" md="6">
                        <v-text-field
                          v-model="form.permissionTitle"
                          :rules="[
                            (v) => !!v || 'Add Permission Module is required',
                          ]"
                          label="Add Module"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-checkbox
                          v-model="form.isActive"
                          label="Status"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row>
                     <v-col cols="12" md="12" class="text-right">
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
                <span class="text-h5"
                  >Update Permission for <b>{{ edit_form.module }}</b>
                </span>
              </v-card-title>
              <v-card-text>
                <v-form @submit="updatePermission" ref="form" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="edit_form.permission"
                          :rules="[
                            (v) => !!v || 'Permission Title is required',
                          ]"
                          label="Permission Title"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12" class="text-right">
                        <v-btn class="mr-4 btn-primary" type="submit">
                          Update
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <template v-slot:[`item.permissionTitle`]="{ item }">
        <b> {{item.permissionTitle}}</b>

      </template>
      <template v-slot:[`item.subPermissions`]="{ item }">
        <!-- <v-chip
          v-for="permission in item.subPermissions"
          
          class="ma-2"
          @click="edit(permission, item)"
           color="dark"
          text-color="black"
          close
          @click:close="deleteItem(permission)"
        >
          {{ permission.title }} &nbsp;
        </v-chip> -->
        <v-btn
      class="ma-1"
      rounded
      
      color="light"
      v-for="permission in item.subPermissions"
      :key="permission.id"
    >
     {{ permission.title }} &nbsp;
      <v-icon rounded left @click="edit(permission, item)">
        mdi-pencil
      </v-icon>
      &nbsp;
      <v-icon rounded left @click="deleteItem(permission)">
        mdi-delete
      </v-icon>
      
    </v-btn>
   
      </template>

      <!-- <template v-slot:[`item.actions`]="{ item }">
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
      </template> -->
    </v-data-table>
  </div>
</template>
<script>
import PermissionService from "@/services/permission";
export default {
  data() {
    return {
      search: "",
      PermissionModel: false,
      PermissionEditModel: false,
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
      form: {
        permissionId: null,
        permissionTitle: "",
        permissionSubTitle: "",
        isActive: true,
      },
      edit_form: {
        permissionId: null,
        module: "",
        permission: "",
      },
      permissions: [],
      modules: [],
      headers: [
        {
          text: "Module",
          align: "start",
          sortable: true,
          value: "permissionTitle",
        },
        {
          text: "Permissions",
          align: "start",
          sortable: true,
          value: "subPermissions",
        },
        // { text: "Actions", align: "end", value: "actions", sortable: false },
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
    edit(permission, module) {
      this.edit_form.permissionId = permission.id;
      this.edit_form.module = module.permissionTitle;
      this.edit_form.permission = permission.title;
      this.PermissionEditModel = true;
    },
    async deleteItem(item) {
      if (confirm("Are you sure you want to delete this Permission.. ??")) {
        var res = await PermissionService.delete(parseInt(item.id));
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
          permissionTitle: this.form.permissionTitle,
          permissionSubTitle: this.form.permissionSubTitle,
          isActive: this.form.isActive,
        });
        if (res.status == 1) {
          this.$toaster.success("Permission has been added successfully.");
          this.getDataFromApi();
          this.PermissionModel = false;
          this.form.permissionId = null;
          this.form.permissionTitle = "";
          this.form.permissionSubTitle = "";
          this.form.isActive = false;
        }
      }
    },
    updatePermission: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        let data = {
          isActive: true,
          permissionTitle: this.edit_form.module,
          PermissionSubTitle: this.edit_form.permission,
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
      var res = await this.getAllPermissions();
      this.permissions = res.data;

      let mod = res.data.map((e) => {
        return e.permissionTitle;
      });
      this.modules = mod;

      this.loading = false;
    },
    getAllPermissions() {
      this.loading = true;
      return PermissionService.getPermissions('');
    },
  },
};
</script>