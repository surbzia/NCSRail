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
          <h2>Add Routes</h2>
        </v-container>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="6" md="6">
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
                :items="cityname"
                :rules="[(v) => !!v || 'Item is required']"
                label="Select Train"
                required
              ></v-select>
            </v-col>

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
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
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
                    label="Waiting Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="arrival_time_modal"
                  v-model="form.arrival_time"
                  full-width
                  @click:minute="$refs.menu.save(form.arrival_time)"
                ></v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <h1>Add Stations</h1>
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
                ref="menu"
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
                  @click:minute="$refs.menu[index].save(station.waiting_time)"
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
              <v-btn class="mr-4 btn-primary" type="submit"> Save </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    waiting_time_picker: false,
    form: {
      id: null,
      name: "",
      train: "",
      stations: [
        { id: 1, station: "23423", sort_order: 1, waiting_time: null },
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
    cityname: ["Karachi", "Lahore", "Rawalpindi", "Margalla"],
    stationlist: ["Karachi Cantt", "Lahore Junction"],
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "#",
      },
      {
        text: "Add Routes",
        disabled: true,
        href: "#",
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
  },
};
</script>