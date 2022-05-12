<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="breads" large></v-breadcrumbs>
      </v-container>
    </div>
    <div class="row">
      <div class="col-md-12 text-right">
        <v-btn :to="{ name: 'auth.bookings.listing' }" rounded dark>
          Back
        </v-btn>
        &nbsp;
        <v-btn rounded color="info" dark> Receive </v-btn>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-md-6">
        <v-card class="pt-3 pb-3 pr-3 pl-3">
          <div class="sec-heading">
            <v-container>
              <h2>Contact Detail</h2>
            </v-container>
          </div>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td><b>Full Name :</b></td>
                  <td>{{ bookingDetail.contactDetail.fullName }}</td>
                </tr>
                <tr>
                  <td><b>Email :</b></td>
                  <td>{{ bookingDetail.contactDetail.email }}</td>
                </tr>
                <tr>
                  <td><b>Mobile number :</b></td>
                  <td>{{  bookingDetail.contactDetail.mobileNo }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </div>
      <div class="col-md-6">
        <v-card class="pt-3 pb-3 pr-3 pl-3">
          <div class="sec-heading">
            <v-container>
              <span class="d-flex justify-md-space-between">
                <h2>Fare Detail</h2>
              </span>
            </v-container>
          </div>

          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Type</th>
                  <th class="text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(fare,index ) in bookingDetail.fares" :key="index">
                  <td>{{fare.type}}</td>
                  <td>PKR, {{fare.total}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>TOTAL</th>
                  <th>PKR, {{bookingDetail.totalAmount}}</th>
                </tr>
              </tfoot>
            </template>
          </v-simple-table>
        </v-card>
      </div>
    </div>
    <v-card class="pt-3 pb-3 pr-3 pl-3">
      <div class="row">
        <div class="col-md-12">
          <div class="sec-heading">
            <v-container>
              <h2>Passingers Details</h2>
            </v-container>
          </div>
          <v-data-table
            :headers="headers"
            :items="bookingDetail.passengerDetails"
            :loading="loading"
            class="elevation-1"
          >
          </v-data-table>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import bookingService from "@/services/booking";
export default {
  data() {
    return {
      loading: false,
     bookingDetail:{
      contactDetail: {
        fullName: null,
        email: null,
        mobileNo: null,
      },
      passengerDetails:[],
      fares:[],
      status:null,
      totalAmount:null,
     },
      options: {},
      trains: [
        {
          id: 1,
          name: "Karachi",
        },
        {
          id: 2,
          name: "Lahore",
        },
        {
          id: 3,
          name: "Peshawar",
        },
      ],
      breads: [
        {
          text: "Dashboard",
          disabled: false,
          to: { name: "auth.dashboard" },
        },
        {
          text: "Bookings",
          disabled: false,
          to: { name: "auth.bookings.listing" },
        },
        {
          text: "Booking Details",
          disabled: true,
          href: "#",
        },
      ],
      headers: [
        {
          text: "Full Name",
          align: "start",
          sortable: true,
          value: "fullName",
        },
        {
          text: "CNIC Number",
          align: "start",
          sortable: true,
          value: "cnic",
        },
        {
          text: "Type",
          align: "start",
          sortable: true,
          value: "type",
        },
        {
          text: "Seat Number",
          align: "start",
          sortable: true,
          value: "seatNo",
        },
        // { text: "Actions", value: "actions", sortable: false },
      ],
      
    };

  },
  methods:{
   async getBookingDetail(){
      let id = this.$route.params.id;
      const res = await bookingService.get(id);
      this.bookingDetail.contactDetail = res.contactDetail;
      this.bookingDetail.passengerDetails = res.passengerDetails;
      this.bookingDetail.fares = res.fares;
      this.bookingDetail.status = res.status;
      this.bookingDetail.totalAmount = res.totalAmount;
    }
  },
   mounted() {
    this.getBookingDetail();
  },
};
</script>