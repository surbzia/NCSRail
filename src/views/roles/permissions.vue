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
      <div class="col-md-12">
           <v-row>
      <v-col md="3" v-for="permission in permissions" :key="permission.id">
        <v-checkbox
      v-model="form.permissions"
       v-bind:id="permission.id"
                v-bind:value="permission.id"
      :label="permission.name"
    ></v-checkbox>
      </v-col>
    </v-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
permissions:[],
            },
permissions:[
    {id:1,name:'Permission 1'},
    {id:2,name:'Permission 2'},
    {id:3,name:'Permission 3'},
    {id:4,name:'Permission 4'},
    {id:5,name:'Permission 5'},
    {id:6,name:'Permission 6'},
    {id:7,name:'Permission 7'},
    {id:8,name:'Permission 8'},
]
        };
    }
}
</script>