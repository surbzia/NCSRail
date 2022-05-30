<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="items" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-row>
      <v-col md="12" class="text-right mb-2">
        <v-btn :to="{ name: 'auth.routes.listing' }" rounded dark> Back </v-btn>
      </v-col>
    </v-row>
    <div class="content-body">
      <div class="sec-heading">
        <v-container>
          <h2>{{ title }}</h2>
        </v-container>
      </div>
      <v-form ref="form" lazy-validation @submit="SubmitRoutes">
        <v-container style="padding: 0px 0px 0px 0px">
          <v-row style="margin-bottom: -37px">
            <v-col cols="6" md="6">
              <v-text-field
                v-model="form.route.routeName"
                label="Route Name"
                required
                dense
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
              <v-autocomplete
                v-model="form.route.trainID"
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
                    v-model="form.route.arrivalTime"
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
                  v-model="form.route.arrivalTime"
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
                    v-model="form.route.departureTime"
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
                  v-model="form.route.departureTime"
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
            v-for="(station, key, index) in form.stations"
            :key="key"
            class="mt-3"
            style="margin-bottom: -51px"
            v-if="station.isActive"
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
                  @click:minute="
                    $refs.waiting_time_menu[key].save(station.waiting)
                  "
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
                v-if="
                  form.stations != null &&
                  key == Object.keys(form.stations).length - 1
                "
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>

              <v-btn
                v-if="index != 0"
                @click="removeStation(station, key)"
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
      route: {
        trainID: "",
        routeName: "",
        departureTime: "",
        arrivalTime: "",
      },
      stations: [],
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
  methods: {
    addStation(item) {
      this.form.stations.push({
        id: 0,
        seq: item.seq + 1,
        sort: item.sort + 1,
        stationID: null,
        waiting: null,
        isActive: true,
      });
    },
    removeStation(item) {
      
      if (item.id == 0) {
        this.form.stations.splice(this.form.stations.indexOf(item), 1);
      } else {
        let res2 = this.form.stations.map((v) => 
        ({
          id: v.id,
          seq: v.seq,
          sort: (item.stationID == v.stationID)? false : (!v.isActive? false:true),
          stationID: v.stationID,
          waiting: v.waiting,
          isActive: (item.stationID==v.stationID) ? false : (!v.isActive? false:true),
        }));

        this.form.stations = res2;
      }
     
      this.removeSta();
    },
    SubmitRoutes: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        let res = null;
        if (!this.is_edit) {
          res = await RouteService.create(this.form);
        } else {
          res = await RouteService.update(this.form, this.form.route.trainID);
        }
        if (res.status == 1) {
          if (!this.is_edit) {
            this.$toaster.success("Route has been added successfully.");
          } else {
            this.$toaster.success("Route has been updated successfully.");
          }
          this.$router.push({ name: "auth.routes.listing" });
        }
      }
    },

    removeSta() {
      let count = 1;
      let res1 = this.form.stations.map((v) => (
        {
        id: v.id,
        seq: v.seq,
        sort: v.sort == false ? false : count++,
        stationID: v.stationID,
        waiting: v.waiting,
        isActive: v.isActive == false ? false : true,
      }));
      this.form.stations = res1;
    },
    async getTrains() {
      let res1 = await TrainService.getlist("");
      this.trains = res1.data;
      let res2 = await StationService.getlist("");
      this.stations = res2.data;
    },
    async getRouteByTrainId() {
      let query =
        "?TrainID=" +
        this.form.route.trainID +
        "&RouteName=" +
        this.form.route.routeName;
      let res = await RouteService.getRouteByTrainId(query);
      this.form.route.routeName = res.routeName;
      this.form.route.trainID = res.trainID;
      this.form.stations = res.routes;
      this.station_count = res.routes.length;
      this.form.route.arrivalTime = res.arrivalTime;
      this.form.route.departureTime = res.departureTime;

      let count = 1;
      let res1 = res.routes.map((v) => ({
        ...v,
        isWaiting: false,
        isActive: true,
        sort: count++,
      }));
      this.form.stations = res1;
    },
  },
  mounted() {
    this.getTrains();
    if (this.$route.params.id) {
      this.form.route.trainID = this.$route.params.id;
      this.form.route.routeName = this.$route.params.name;
      this.is_edit = true;
      this.title = "Update Route";
      this.button = "Update";
      console.log(this.form);
      this.getRouteByTrainId();
      this.items.push({ text: "Update", disabled: true, href: "#" });
    } else {
      this.stations.push({ text: "Add", disabled: true, href: "#" });
      this.form.stations.push({
        id: 0,
        stationID: null,
        seq: 1,
        sort: 1,
        waiting: null,
        isActive: true,
      });
    }
  },
};
</script>