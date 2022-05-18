<template>
  <div>
    <v-container>
      <v-card style="padding: 29px 27px">
        <v-row class="inline d-flex" style="margin-bottom: -47px">
          <!-- <v-select
            :items="stations"
            label="From Station"
            item-text="title"
            v-model="form.fromStation"
            item-value="title"
            dense
            class="pt-5"
          ></v-select> -->
          <v-autocomplete
            v-model="form.fromStation"
            :items="stations"
            item-text="title"
            item-value="title"
            class="pt-5 mr-1"
            dense
            filled
            label="From Station"
          ></v-autocomplete>
          <!-- <v-select
            :items="stations"
            label="To Station"
            item-text="title"
            v-model="form.toStation"
            item-value="title"
            dense
            class="pt-5"
          ></v-select> -->
          <v-autocomplete
            v-model="form.toStation"
            :items="stations"
            item-text="title"
            item-value="title"
            class="pt-5 mr-1"
            dense
            filled
            label="To Station"
          ></v-autocomplete>
          <v-text-field
            v-model="form.adultsCount"
            label="Adult Count"
            class="pt-5 mr-1"
            dense
            filled
          ></v-text-field>
          <v-text-field
            v-model="form.childernsCount"
            label="Child Count"
            class="pt-5 mr-1"
            dense
            filled
          ></v-text-field>
        </v-row>
        <v-row class="mt-0">
          <v-col md="8">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="form.date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  style="margin-left: -12px"
                  v-model="form.date"
                  label="Date Of Journey"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="pt-5 mr-1"
                  dense
                  filled
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(form.date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col md="4" class="text-right">
            <v-btn
              elevation="1"
              color="primary"
              class="mt-5 col-md-12 pa-6"
              raised
              v-on:click="CheckAvailabeTrains()"
              >Search Booking</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <AvailabeTrains
      v-if="availableTrainsSection"
      :data="{ trains: trains }"
    ></AvailabeTrains>
  </div>
</template>
<script>
import bookingService from "@/services/booking";
import Stationservice from "@/services/station";
import AvailabeTrains from "@/components/AvailabeTrains.vue";
export default {
  components: {
    AvailabeTrains,
  },
  data() {
    return {
      availableTrainsSection: false,
      CoachesSection: false,
      menu: false,
      trainCoachDTO: [],
      form: {
        fromStation: "",
        toStation: "",
        date: "",
        childernsCount: 0,
        adultsCount: 0,
      },
      stations: [],
      expanded: [],
      singleExpand: true,
      trains: [],
    };
  },
  methods: {
    async CheckAvailabeTrains() {
      let res = await bookingService.checkAvailableTrains(this.form);
      if (res.status == 1) {
        this.availableTrainsSection = true;
        this.trains = res.data;
      } else {
        this.$toaster.error(res.data);
        this.form.fromStation = "";
        this.form.toStation = "";
        this.form.date = "";
        this.form.childernsCount = "";
        this.form.adultsCount = "";
      }
    },
    async getAllStations() {
      let res = await Stationservice.getlist("");
      this.stations = res.data;
    },
    //    async selectTrainClass(selectedTrain,selectedClass) {
    //      let res = await bookingService.GetTrainDetails({selectedTrain:selectedTrain,selectedClass:selectedClass});
    //      if(res.status){
    //          this.availableTrainsSection = false;
    //          this.CoachesSection = true;
    //         this.trainCoachDTO = res.trainCoachDTO;
    //      }
    //     },
  },
  mounted() {
    this.getAllStations();
  },
  computed: {},
};
</script>