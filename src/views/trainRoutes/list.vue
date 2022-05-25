<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      
      </v-container>
    </div>
    <!-- <v-data-table
      :headers="headers"
      :items="routes"
      :loading="loading"
      class="elevation-1"
    > -->
    <v-data-table
          :headers="headers"
          :items="routes"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="routeName"
          show-expand
          class="elevation-1"
        >
         
          <template v-slot:expanded-item="{ headers, item }">
            <td
              :colspan="headers.length"
              v-if="item.routes.length > 0"
              class="pa-0"
            >
              <v-simple-table dense style="background-color: #dfdfdf">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Seq#</th>
                      <th>Station Name</th>
                      <th>Departure</th>
                      <th>Waiting</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="station in item.routes" :key="station.seq">
                      <td>{{ station.seq }}</td>
                      <td>{{ station.stationName }}</td>
                      <td>{{ station.departure }}</td>
                      <td>{{ station.waiting }}</td>
                      <td>
                        <v-btn
                         @click="selectTrain(item,fare)"
                          class="ma-0"
                          outlined
                          rounded
                          small
                          color="teal"
                        >
                          Select
                        </v-btn>
                      </td>
                    </tr>
                  </tbody> 
                </template>
              </v-simple-table>
            </td>
            <td :colspan="headers.length" v-else>No Data Found</td>
          </template>
      <template v-slot:top>
        <div class="row">
          <div class="col-md-12 text-right">
             <v-btn link :to="{ name: 'auth.routes.add' }" color="primary" dark class="mb-2">
                Add Routes
              </v-btn>
          </div>
        </div>
        <!-- <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="RouteModel" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn link :to="{ name: 'auth.routes.add' }" color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Routes
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
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="form.name"
                          :rules="nameRules"
                          label="Route Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-select
                          v-model="form.train"
                          :items="trains"
                          :rules="[(v) => !!v || 'Item is required']"
                          label="Select Train"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-select
                          v-model="form.station"
                          :items="stations"
                          :rules="[(v) => !!v || 'Item is required']"
                          label="Select Station"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" md="6">
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.arrival_date"
                              label="Arrival Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.arrival_date"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="6" md="6">
                        <v-dialog
                          ref="dialog"
                          v-model="arrival_time_modal"
                          :return-value.sync="form.arrival_time"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.arrival_time"
                              label="Arrival time"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="arrival_time_modal"
                            v-model="form.arrival_time"
                            full-width
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="arrival_time_modal = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(form.arrival_time)"
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                    <v-row>
                       <v-col cols="6" md="6">
                        <v-dialog
                          ref="dialog"
                          v-model="waiting_time_modal"
                          :return-value.sync="form.waiting_time"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.waiting_time"
                              label="Waiting time"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="waiting_time_modal"
                            v-model="form.waiting_time"
                            full-width
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="waiting_time_modal = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(form.waiting_time)"
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-btn class="mr-4 btn-primary" type="submit">
                          {{ button }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row> -->
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
          <v-btn rounded outlined color="info" v-on:click="edit(item)" small> Edit </v-btn>
        <v-btn rounded outlined color="error" v-on:click="deleteItem(item)" small> Delete </v-btn>
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
       expanded: [],
      singleExpand: true,
      RouteModel: false,
      RouteEditModel: false,
      search: "",
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Routes",
          to: { name: "auth.routes.listing" },
          disabled: false,
          exact: true,
        },
      ],
      items: [],
      loading: true,
      button: "Submit",
      title: "Add Route",
      totalRecords: 0,
      menu2: false,
      menu: false,
      arrival_time_modal: false,
      waiting_time_modal: false,
      form: {
        id: null,
        name: "",
        train: "",
        station: "",
        arrival_date: "",
        arrival_time: "",
        waiting_time: "",
      },
      edit_form: {
        id: null,
        name: "",
        train: "",
        station: "",
        arrival_date: "",
        arrival_time: "",
        waiting_time: "",
      },
      nameRules: [
        // (v) => !!v || "Name is required",
        // (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      valid: false,
      options: {},
      // trains: ["Karachi", "Lahore", "Rawalpindi", "Margalla"],
      // stations: ["Karachi", "Lahore", "Rawalpindi", "Margalla"],
    routes:[],
      headers: [
        {
          text: "Route Name",
          align: "start",
          sortable: true,
          value: "routeName",
        },
        {
          text: "Train",
          align: "start",
          sortable: true,
          value: "trainName",
        },
        {
          text: "Arrival",
          align: "start",
          sortable: true,
          value: "arrivalTime",
        },
        {
          text: "Departure Time",
          align: "start",
          sortable: true,
          value: "departureTime",
        },
        { text: "Actions",  align: 'end', value: "actions", sortable: false },
          { text: "Stations", value: "data-table-expand" },
      ],
    };
  },
  watch: {

  },
  mounted() {
   this.getDataFromApi();
   this.getTrains_Stations();
  },
  methods: {
    edit(item) {
      this.edit_form.id = item.id;
      this.edit_form.name = item.routeName;
      this.edit_form.train = item.trainID;
      this.edit_form.station = item.stationID;
      this.edit_form.arrival_date = item.departure;
      this.edit_form.waiting_time = item.waiting;
      this.RouteEditModel = true;
    },
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this Route.. ??")) {
           var res = RouteService.delete(parseInt(item.id));
         if (res.status == 1) {
          this.$toaster.success("Route has been deleted Successfully.");
          this.getDataFromApi();
        }else{
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
    async getCities() {
      let res = await cityservice.getlist("");
      this.cities = res.data;
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
      // console.log(res.data[0]);
      this.routes = res.data;
      this.loading = false;
    },
    async getTrains_Stations(){
      let trains = await TrainService.getlist('');
      this.trains = trains.data;
      let stations = await Stationservice.getlist('');
      this.stations = stations.data;
      
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