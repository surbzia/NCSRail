<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="items" large></v-breadcrumbs>
      </v-container>
    </div>
    <div class="content-body">
      <div class="sec-heading">
        <v-container>
          <h2>{{ title }}</h2>
        </v-container>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row style="margin-bottom: -37px">
            <v-col cols="6" md="6">
              <v-text-field
                v-model="form.routeName"
                label="Route Name"
                required
                dense
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
               <v-autocomplete
                v-model="form.trainID"
                :items="trains"
                :rules="[(v) => !!v || 'Item is required']"
                label="Select Train"
                item-text="name"
                item-value="id"
                required
                dense
                filled
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="mt-0 pt-0">
            <v-col cols="6" md="6">
              <v-menu
                ref="arrival_time"
                v-model="arrival_time_modal"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time2"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.arrivalTime"
                    label="Arrival Time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    dense
                    filled
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="arrival_time_modal"
                  v-model="form.arrivalTime"
                  full-width
                  @click:minute="$refs.arrival_time.save(time2)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" md="6">
              <v-menu
                ref="departure_time"
                v-model="departure_time_modal"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time1"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.departureTime"
                    label="Departure Time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    dense
                    filled
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="departure_time_modal"
                  v-model="form.departureTime"
                  full-width
                  ampm-in-title
                  @click:minute="$refs.departure_time.save(time1)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>





          <div class="sec-heading">
            <v-container>
              <h2>Add Stations</h2>
            </v-container>
          </div>
          <hr class="mb-3" />
          <v-row
            v-for="(station, key, index) in form.routes"
            :key="key"
            class="mt-3"
            style="margin-bottom: -51px;"
          >
            <v-col cols="2" md="2">
              <v-text-field
                v-model="station.sort"
                label="Sort Order"
                 dense
            filled
            small
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-autocomplete
                v-model="station.stationID"
                :items="stations"
                 item-text="title"
                item-value="id"
                :rules="[(v) => !!v || 'Item is required']"
                label="Select Station"
                required
                dense
            filled
              ></v-autocomplete>
            </v-col>
            <v-col cols="4" md="4">
              <v-menu
              
                ref="waiting_time_menu"
                v-model="station.isWaiting"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="station.waiting"
                    label="Waiting Time"
                    v-bind="attrs"
                    v-on="on"
                     dense
                     small
                    filled
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="station.isWaiting"
                  v-model="station.waiting"
                  full-width
                  @click:minute="$refs.waiting_time_menu[key].save(station.waiting)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="2" md="2">
              <v-btn
                @click="addStation(station)"
                class="mx-2"
                fab
                dark
                small
                color="info"
                v-if="form.routes != null && key ==Object.keys(form.routes).length - 1"
              >
           
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
         
              <v-btn
                v-if="index != 0"
                @click="removeStation(station)"
                class="mx-2"
                fab
                dark
                small
                color="error"
              >
                <v-icon dark> mdi-minus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" class="text-right">
              <v-btn class="mr-4 btn-primary" type="submit">
                {{ button }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>
<script>
import TrainService from "@/services/train";
import RouteService from "@/services/routes";
import StationService from "@/services/station";
export default {
  data: () => ({
    valid: false,
    title: "Add Route",
    button: "Submit",
    time1: null,
    time2: null,
    checkDate: null,
    waiting_time_picker: false,
    station_count: null,
    form: {
      id: null,
      routeName: "",
      trainID: "",
      routes: [],
      arrivalTime: "",
      departureTime: "",
    },
    arrival_time_modal: false,
    departure_time_modal: false,
    waiting_time_modal: false,
    trains: [],
    stations: [],
    items: [
      {
        text: "Dashboard",
        disabled: false,
        to: { name: "auth.dashboard" },
      },
      {
        text: "Routes",
        disabled: false,
        to: { name: "auth.routes.listing" },
      },
    ],
    start: null,
    end: null,
    menu: false,
    menu2: false,
    menu3: false,
  }),
  computed: {},
  watch:{
    questions(){
  
    }
  },
  methods: {
    addStation(item) {
      this.form.routes.push({
        arrival: null,
        departure: null,
        id: null,
        seq: item.seq + 1,
        sort: item.sort + 1,
        stationID: null,
        stationName: null,
        waiting: null,
      });
    },
    removeStation(item) {
      this.form.routes.splice(this.form.routes.indexOf(item), 1);
      this.removeSta();
    },
    removeSta() {
      // let res1 = this.form.routes.map((v,index) => ({...v, isWaiting: false, sort:index+1}));
      let res1 = this.form.routes.map((v,index) => ({
        arrival: v.arrival,
        departure: v.departure,
        id: v.id,
        seq: v.seq,
        sort: index +1,
        stationID: v.stationID,
        stationName: v.stationName,
        waiting: v.waiting,
        }));
        this.form.routes = res1;
    },
    async getTrains() {
      let res1 = await TrainService.getlist("");
      this.trains = res1.data;
      let res2 = await StationService.getlist("");
      this.stations = res2.data;
    },
    async getRouteByTrainId() {
      let query = "?TrainID=" + this.form.id + "&RouteName=" + this.form.routeName;
      let res = await RouteService.getRouteByTrainId(query);
      this.form.routeName = res.routeName;
      this.form.trainID = res.trainID;
      this.form.routes = res.routes;
      this.station_count = res.routes.length;
      this.form.arrivalTime = res.arrivalTime;
      this.form.departureTime = res.departureTime;

      let res1 =  res.routes.map((v,index) => ({...v, isWaiting: false, sort:index+1}));
        this.form.routes = res1;
    },
  },
  mounted() {
    this.getTrains();
    if (this.$route.params.id) {
      this.form.id = this.$route.params.id;
      this.form.routeName = this.$route.params.name;
      this.is_edit = true;
      this.title = "Update Route";
      this.button = "Update";
      this.getRouteByTrainId();
      this.items.push({ text: "Update", disabled: true, href: "#" });
    } else {
      this.stations.push({ text: "Add", disabled: true, href: "#" });
        this.form.routes.push({
        arrival: null,
        departure: null,
        id: null,
        seq: 1,
        sort: 1,
        stationID: null,
        stationName: null,
        waiting: null,
      });
    }
  },
};
</script>