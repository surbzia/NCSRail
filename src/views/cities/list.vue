<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="CitiesComputed"
      :items-per-page="5"
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
                <v-form
                  ref="form"
                  lazy-validation
                  @submit="addCity"
                  id="check-city-form"
                >
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="form.name"
                          :rules="[rules.required]"
                          label="City Name"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-col cols="12" md="4">
                    <v-btn
                      class="mr-4 btn-primary"
                      type="submit"
                      form="check-city-form"
                    >
                      Submit
                    </v-btn>
                  </v-col>
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
                <v-form  ref="form"
                  lazy-validation
                  @submit="UpdateCity"
                  id="updatecity_form">
                  <v-container>
                    <v-row>
                      <v-col cols="6" md="6">
                        <v-text-field
                          v-model="editform.name"
                          :rules="[rules.required]"
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
                        <v-btn class="mr-4 btn-primary" type="submit" form="updatecity_form">
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
        <v-btn rounded v-bind:color="item.isActive ? 'success' : 'error'" small>
          {{ item.isActive == true ? "Active" : "In-Active" }}
        </v-btn>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
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
      valid: false,
      options: {},
      cities: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "index",
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
        { text: "Actions",  align: 'end', value: "actions", sortable: false },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
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
  computed:{
     CitiesComputed () {
        return this.cities.map((item, index) => {
          item.index = index +1;
          return item;
        })
      }
  },
  methods: {
    edit(item) {
      this.editform.id = item.id;
      this.editform.name = item.name;
      this.editform.isActive = item.isActive;
      this.cityModelEdit = true;
    },
    async deleteItem(item) {
      if (confirm("Are you sure you want to delete this City.. ??")) {
        var res = await cityservice.delete(item.id);
       if(res.status == 1){
          this.$toaster.success("City has been deleted successfully.");
          this.getDataFromApi();
       }
      }
    },
    addCity: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        var res = await cityservice.create(this.form.name);

        if (res.status == 1) {
          this.$toaster.success("City Added Successfully.");
          this.getDataFromApi();
          this.cityModel = false;
        }
      }
    },
    UpdateCity: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        let formData = {
          name: this.editform.name,
          isActive: this.editform.isActive,
        };

        var res = await cityservice.update(
          formData,
          parseInt(this.editform.id)
        );
        if (res.status == 1) {
          this.$toaster.success("City Updated Successfully.");
          this.getDataFromApi();
          this.cityModelEdit = false;
        }
      }
    },
    async getDataFromApi() {
      var res = await this.getAllCities();
      this.cities = res.data;
      this.loading = false;
    },
    getAllCities() {
      this.loading = true;
      var query = "";
      if (this.search != "") {
        query += "?search=" + this.search;
      }
      return cityservice.getlist(query);
    },
  },
};
</script>