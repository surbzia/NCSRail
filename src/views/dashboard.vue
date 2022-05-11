<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2>DASHBOARD</h2>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
         <div class="d-flex justify-md-space-between">
            <h4>Cities</h4>
          <v-btn color="primary">Add City</v-btn>
         </div>
     <v-simple-table dense>
     
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Id
          </th>
          <th class="text-left">
           City Name
          </th>
          <th class="text-left">
           Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in trains"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
             <v-icon v-on:click="edit(item)">mdi-pencil-plus</v-icon>
              <v-icon v-on:click="deleteItem(item)">mdi-delete-outline</v-icon>
          </td>
         
        </tr>
      </tbody>
    </template>
  </v-simple-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
trains:[
  {
    id:1,
    name:'Karachi',
  },
  {
    id:2,
    name:'Lahore',
  },
  {
    id:3,
    name:'Peshawar',
  }
]
    };
  }
}
</script>