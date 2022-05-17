<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-container>
        <v-card style="padding: 29px 27px;">
      <v-row class="inline d-flex">
        <v-text-field
          v-model="filter.ticket_num"
          label="Ticket Number"
          class="mx-4"
        ></v-text-field>
        <v-text-field
          v-model="filter.cnic"
          label="CNIC Number"
          class="mx-4"
        ></v-text-field>
        <v-select
        :items="['BOOKED','PANDING']"
          label="Status"
          item-text="name"
          v-model="filter.status"
          item-value="id"
          dense
          class="pt-5"
        ></v-select>
      </v-row>
      <v-row>
        <v-col md="8">
           <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="filter.booking_date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="filter.booking_date"
            label="Booking Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="filter.booking_date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(filter.booking_date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
        </v-col>
     <v-col md="4" class="text-right">
      
          <v-btn elevation="1" color="primary" class="mt-5" raised v-on:click="applyFilter()"
          >Search Booking</v-btn
        >
     </v-col>
      </v-row>
        </v-card>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="bookings"
      :loading="loading"
       :options.sync="options"
      class="elevation-1"
    >
       <template v-slot:[`item.trainName`]="{ item }">
        <v-btn  rounded  color="light" small>
          {{item.trainName}}
         </v-btn>
      </template>
       <template v-slot:[`item.totalFare`]="{ item }">
          PKR, {{item.totalFare}}
      </template> 
       <template v-slot:[`item.invoiceStatus`]="{ item }">
        <v-btn  rounded  v-bind:color="item.invoiceStatus == 'Booked' ? 'success' : 'info'" small>
          {{item.invoiceStatus}}
         </v-btn>
      </template> 
       <template v-slot:[`item.actions`]="{ item }">
        <v-btn  :to="{ name: 'auth.bookings.detail', params: { id: item.bookingHASH } }"  class="ma-0"
      outlined rounded small
      
      color="teal">
          <!-- <v-icon>mdi-format-list-bulleted-square</v-icon> -->
          Detail
         </v-btn>
      </template> 
    </v-data-table>
  </div>
</template>
<script>
import bookingService from "@/services/booking";
export default {
  name: "auth.station.listing",
  data() {
    return {
      menu: false,
      filter: {
        ticket_num: "",
        cnic: "",
        booking_date: "",
        status: "",
      },
      search: "",
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Bookings",
          to: { name: "auth.bookings.listing" },
          disabled: false,
          exact: true,
        },
      ],
      loading: false,
      totalRecords: 0,
      valid: false,
      options: {},
      bookings:[],
     headers: [
        {
          text: "Booker Name",
          align: "start",
          sortable: true,
          value: "fullName",
        },
        {
          text: "Train Name",
          align: "start",
          sortable: true,
          value: "trainName",
        },
        {
          text: "Route",
          align: "start",
          sortable: true,
          value: "route",
        },
        {
          text: "Passengers",
          align: "start",
          sortable: true,
          value: "noOfPassengers",
        },
        {
          text: "Status",
          align: "start",
          sortable: true,
          value: "invoiceStatus",
        },
        {
          text: "Total",
          align: "start",
          sortable: true,
          value: "totalFare",
        },
        { text: "Actions",  align: 'end', value: "actions", sortable: false },
      ],
    };
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    applyFilter(){
      this.getDataFromApi();
    },
    async getDataFromApi() {
      var res = await this.getAllBookings();
     this.bookings = res.data;
      this.loading = false;
    },
   getAllBookings(){
     this.loading = true;
      var query = "?filter=true";
      if (this.filter.ticket_num != "") {
        query += "&ticket_num=" + this.filter.ticket_num;
      }
      if (this.filter.cnic != "") {
        query += "&cnic=" + this.filter.cnic;
      }
      if (this.filter.status != "") {
        query += "&status=" + this.filter.status;
      }
      if (this.filter.booking_date != "") {
        query += "&booking_date=" + this.filter.booking_date;
      }
     return  bookingService.getlist(query);
}
  },
};
</script>