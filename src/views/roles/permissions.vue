<template>
  <div>
    <v-row>
      <v-col md="12" class="text-right">
        <v-btn :to="{ name: 'auth.roles.listing' }" rounded dark> Back </v-btn>
        &nbsp;
        <v-btn color="primary" rounded> Update </v-btn>
      </v-col>
    </v-row>
    <div class="row">
      <h4>Permissions</h4>
      <hr />
      <br />
      <br />
      <br />
      <div class="col-md-12 container">
        <v-row class="mb-1" v-for="permission in permissions" :key="permission.permissionId">
          <v-col cols="3" md="3" class="permission-title"> Module </v-col>
          <v-col cols="9" md="9" class="permission-body d-flex">
            <v-checkbox
              class="permissions"
              v-model="form.permissions"
              label="Permission Name"
            ></v-checkbox>
            <v-checkbox
              class="permissions"
              v-model="form.permissions"
              label="Permission Name"
            ></v-checkbox>
          </v-col>
        </v-row>
        <!--<v-row class="mb-1">
           <v-col md="4" lg="4" class="permission-div">
                 <div class="permission-title">Module</div>
                 <div class="permission-body">
                   <v-checkbox
                   class="permissions"
                    v-model="form.permissions"
                    label="Permission Name"
                  ></v-checkbox>
                   <v-checkbox
                    class="permissions"
                    v-model="form.permissions"
                    label="Permission Name"
                  ></v-checkbox>
                   <v-checkbox
                    class="permissions"
                    v-model="form.permissions"
                    label="Permission Name"
                  ></v-checkbox>
                 </div>
             </v-col>
        </v-row> -->
      </div>
    </div>
  </div>
</template>
<script>
import PermissionService from "@/services/permission";
export default {
  data() {
    return {
      form: {
        permissions: [],
      },
      permissions: [],
    };
  },
  methods:{
     async getAllPermissions() {
      let res = await PermissionService.getPermissions();
      this.permissions = res.data;
    },
  },
  mounted(){
    this.getAllPermissions();
  }
};
</script>