<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="stations"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="stationModel" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Station
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ title }}</span>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.name"
                          :rules="nameRules"
                          label="Station Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.code"
                          :rules="nameRules"
                          label="Station Code"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12">
                        <v-select
                          v-model="form.city"
                          :items="cities"
                          item-text="name"
                          item-value="cityID"
                          label="Select City"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn class="mr-4 btn-primary" type="button" @click="addStation">
                        Submit
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Save
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="stationModelEdit" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Update Station</span>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="edit_form.name"
                          :rules="nameRules"
                          label="Station Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="edit_form.code"
                          :rules="nameRules"
                          label="Station Code"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12">
                        <v-select
                          v-model="edit_form.city"
                          :items="cities"
                          item-text="name"
                          item-value="cityID"
                          label="Select City"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn class="mr-4 btn-primary" @click="updateStation" type="button">
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
import Stationservice from "@/services/station";
import cityservice from "@/services/city";
export default {
  name: "auth.station.listing",
  data() {
    return {
      stationModel: false,
      stationModelEdit: false,
      search: "",
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Stations",
          to: { name: "auth.stations.listing" },
          disabled: false,
          exact: true,
        },
      ],
      items: [],
      loading: true,
      button: "Submit",
      title: "Add Station",
      totalRecords: 0,
      form: {
        id: null,
        name: "",
        code: "",
        city: "",
      },
      edit_form: {
        id: null,
        name: "",
        code: "",
        city: "",
      },
      nameRules: [
        // (v) => !!v || "Name is required",
        // (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      valid: false,
      options: {},
      cities: [],
      stations: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "stationID",
        },
        {
          text: "Station Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Station Code",
          align: "start",
          sortable: true,
          value: "code",
        },
        {
          text: "City",
          align: "start",
          sortable: true,
          value: "city",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  watch: {},
  mounted() {
    this.getDataFromApi();
    this.getCities();
  },
  methods: {
    edit(item) {
      this.edit_form.id = item.stationID;
      this.edit_form.name = item.name;
      this.edit_form.code = item.code;
      this.edit_form.city = item.cityID;
      this.stationModelEdit = true;
    },
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this station.. ??")) {
        var res = Stationservice.delete(parseInt(item.stationID));
      }
    },
    async addStation() {
      var res = await Stationservice.create({
        "title":this.form.name,
        "code":this.form.code,
        "CityID": this.form.city
      });
      if (res.status == 1) {
        this.$toaster.success("Station Added Successfully.");
        this.getDataFromApi();
        this.stationModel = false;
      }
    },
    async getCities() {
      let res = await cityservice.getlist("");
      this.cities = res.data;
    },
    async updateStation() {
      let formData = {
        "id":this.edit_form.id,
        "title":this.edit_form.name,
        "code":this.edit_form.code,
        "CityID": this.edit_form.city
      };

      var res = await Stationservice.update(
        formData,
        parseInt(this.edit_form.id)
      );
      if (res.status == 1) {
        this.$toaster.success("Station Updated Successfully.");
        this.getDataFromApi();
        this.stationModelEdit = false;
      }
    },
    async getDataFromApi() {
      var res = await this.getAllBookings();
      this.stations = res.data;
      this.loading = false;
    },
    getAllBookings() {
      this.loading = true;
      var query = "";
      if (this.search != "") {
        query += "&search=" + this.search;
      }
      return Stationservice.getlist(query);
    },
  },
  watch: {},
};
</script>