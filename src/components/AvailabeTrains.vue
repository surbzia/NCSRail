<template>
  <div>
    <v-row>
      <v-col md="12">
        <v-data-table
          :headers="trainsHeader"
          :items="data.trains"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="hash"
          show-expand
          class="elevation-1"
        >
          <template v-slot:[`item.fromStationCode`]="{ item }">
            {{ item.fromStationCode }} - {{ item.toStationCode }}
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td
              :colspan="headers.length"
              v-if="item.fares.length > 0"
              class="pa-0"
            >
              <v-simple-table dense style="background-color: #dfdfdf">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Class Type</th>
                      <th>Coaches</th>
                      <th>Vacant Seats</th>
                      <th>Berth Fare PKR</th>
                      <th>Seats Fare PKR</th>
                      <th>Berth Count</th>
                      <th>Seats Count</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="fare in item.fares" :key="fare.hash">
                      <td>{{ fare.classType }}</td>
                      <td>{{ fare.coachesCount }}</td>
                      <td>{{ fare.vacantSeats }}</td>
                      <td>{{ fare.fareBerthAdult }}</td>
                      <td>{{ fare.fareSeatAdult }}</td>
                      <td>{{ fare.berthCount }}</td>
                      <td>{{ fare.seatsCount }}</td>
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
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import bookingService from "@/services/booking";
export default {
  props: {
    data: {
      default: {},
      type: Object,
    },
  },
  data() {
    return {
      expanded: [],
      singleExpand: true,
      trainCoachDTO:[],
       trainsHeader: [
        {
          text: "Train Name",
          align: "start",
          sortable: true,
          value: "trainName",
        },
        {
          text: "Train Code",
          align: "start",
          sortable: true,
          value: "trainCode",
        },
        {
          text: "Route",
          align: "start",
          sortable: true,
          value: "fromStationCode",
        },
        {
          text: "Duration",
          align: "start",
          sortable: true,
          value: "duration",
        },
        {
          text: "Stops",
          align: "start",
          sortable: true,
          value: "stops",
        },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  methods:{
    selectTrain(train,classType){
      this.$store.commit("SetSelectedTrain", train);
      this.$store.commit("SetselectedClass", classType);
      this.$router.push({ name: "auth.bookings.seats" });
    }
  },
 
};
</script>