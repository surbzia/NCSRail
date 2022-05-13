<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="cities"
      :items-per-page=5
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="cityModel" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add City
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Add City</span>
              </v-card-title>
              <v-card-text>
                <v-form >
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="form.name"
                          :rules="nameRules"
                          label="City Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn class="mr-4 btn-primary" type="button" @click="addCity">
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
           <v-dialog v-model="cityModelEdit" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Update</span>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="6" md="6">
                        <v-text-field
                          v-model="editform.name"
                          :rules="nameRules"
                          label="City Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-checkbox
                        v-model="editform.isActive"
                        :label="`Active`"
                      ></v-checkbox>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn class="mr-4 btn-primary"  @click="UpdateCity">
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
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.isActive`]="{ item }">
        <v-btn rounded v-bind:color="item.isActive?'success' : 'error'"  small> {{item.isActive == true ? 'Active' : 'Not Active'}} </v-btn>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
          <v-btn rounded outlined color="info" v-on:click="edit(item)" small> Edit </v-btn>
        <v-btn rounded outlined color="error" v-on:click="deleteItem(item)" small> Delete </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import cityservice from "@/services/city";
export default {
  name: "auth.station.listing",
  data() {
    return {
      cityModel: false,
      cityModelEdit: false,
      search: "",
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Cities",
          to: { name: "auth.cities.listing" },
          disabled: false,
          exact: true,
        },
      ],
      items: [],
      loading: true,
      totalRecords: 0,
      form: {
        id: null,
        name: "",
      },
      editform: {
        id: null,
        name: "",
        isActive: "",
      },
      nameRules: [
        // (v) => !!v || "Name is required",
        // (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      valid: false,
      options: {},
      cities:[],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "cityID",
        },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Status",
          align: "start",
          sortable: true,
          value: "isActive",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  watch: { },
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    edit(item) {
      this.editform.id = item.cityID;
      this.editform.name = item.name;
      this.editform.isActive = item.isActive;
      this.cityModelEdit = true;
    },
   deleteItem(item) {
      if (confirm("Are you sure you want to delete this City.. ??")) {
         var res = cityservice.delete(item.cityID);
      //  if(res.status == 1){
      //   this.$toaster.success("City Added Successfully.");
      //    this.getDataFromApi();
      //    this.cityModel = false;
      //  }
      }
    },
   async addCity(){
       var res = await cityservice.create(this.form.name);
       if(res.status == 1){
        this.$toaster.success("City Added Successfully.");
         this.getDataFromApi();
         this.cityModel = false;
       }
    },
   async UpdateCity(){
//  var formData = new FormData();
// formData.append('name',this.editform.name);
// formData.append('is_active',this.editform.isActive);
let formData ={
  "id": this.editform.id,
  "name": this.editform.name,
}

       var res = await cityservice.update(formData,parseInt(this.editform.id));
       if(res.status == 1){
        this.$toaster.success("City Updated Successfully.");
         this.getDataFromApi();
         this.cityModelEdit = false;
       }
    },
        async getDataFromApi() {
      var res = await this.getAllBookings();
     this.cities = res.data;
      this.loading = false;
    },
   getAllBookings(){
     this.loading = true;
       var query = "";
      if (this.search != "") {
        query += "&search=" + this.search;
      }
     return  cityservice.getlist(query);
}
  },
  watch: {},
};
</script>