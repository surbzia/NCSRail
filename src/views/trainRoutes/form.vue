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
          <h2>{{title}}</h2>
        </v-container>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row  style="margin-bottom: -37px;">
            <v-col cols="6" md="6">
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                label="Route Name"
                required
                 dense
                  filled
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
              <v-select
                v-model="form.train"
                :items="trains"
                :rules="[(v) => !!v || 'Item is required']"
                label="Select Train"
                 item-text="name"
                item-value="id"
                required
                 dense
                  filled
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="mt-0 pt-0">
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
                    v-model="date"
                    label="Arrival Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                     dense
                      filled
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" md="6">
              <v-menu
                ref="arrival_time"
                v-model="arrival_time_modal"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
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
                  v-model="time"
                  full-width
                  @click:minute="$refs.arrival_time.save(time)"
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
            v-for="(station, index) in form.stations"
            :key="index"
            class="mt-3"
          >
            <v-col cols="2" md="2">
              <v-text-field
                v-model="station.sort_order"
                label="Sort Order"
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-select
                v-model="station.station"
                :items="stationlist"
                :rules="[(v) => !!v || 'Item is required']"
                label="Select Station"
                required
              ></v-select>
            </v-col>
            <v-col cols="4" md="4">
              <v-menu
                ref="waiting_time_menu"
                v-model="waiting_time_picker"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="station.waiting_time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="station.waiting_time"
                    label="Waiting Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="waiting_time_picker"
                  v-model="station.waiting_time"
                  full-width
                  @click:minute="$refs.waiting_time_menu[index].save(station.waiting_time)"
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
                color="primary"
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
                color="primary"
              >
                <v-icon dark> mdi-minus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-btn class="mr-4 btn-primary" type="submit"> {{button}} </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>
<script>
import TrainService from '@/services/train';
import RouteService from '@/services/routes';
export default {
  data: () => ({
    valid: false,
    title: 'Add Route',
    button: 'Submit',
    time: null,
    waiting_time_picker: false,
    form: {
      id: null,
      name: "",
      train: "",
      stations: [
        { id: 1,sort_order: 1, station: '',  waiting_time: '' },
      ],
      arrival_date: "",
      arrival_time: "",
      waiting_time: [],
    },
    arrival_time_modal: false,
    waiting_time_modal: false,
    nameRules: [
      // (v) => !!v || "Name is required",
      // (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    trains: [],
    stationlist: ["Karachi Cantt", "Lahore Junction"],
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
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    menu2: false,
  }),
  methods: {
    addStation(item) {
      this.form.stations.push({
        id: item.id + 1,
        sort_order: item.sort_order + 1,
        station: null,
        waiting_time: null,
      });
    },
    removeStation(item) {
      this.form.stations.splice(this.form.stations.indexOf(item), 1);
    },
    close(time) {
      this.form.arrival_time =  time;
      // this.arrival_time_modal = false;
    },
   async getTrains() {
       let res = await TrainService.getlist('');
       this.trains = res.data;
    },
   async getRouteByTrainId() {
       let res = await RouteService.get(this.form.id);
       console.log(res);
    },
  },
    mounted(){
        this.getTrains();
     if (this.$route.params.id) {
    this.form.id = this.$route.params.id;
     this.is_edit = true;
     this.title= 'Update Route';
     this.button = 'Update';
    this.getRouteByTrainId();
      this.items.push({text:'Update',disabled:true,href:'#'});
     }else{
      this.items.push({text:'Add',disabled:true,href:'#'});
     }
  }
};
</script>