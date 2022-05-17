<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="breads" large></v-breadcrumbs>
      </v-container>
    </div>
    <div class="row">
      <div class="col-md-12 ">
      <div class="text-right">
          <v-btn :to="{ name: 'auth.trains.listing' }" rounded dark>
          Back
        </v-btn>
      </div>
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
          <v-simple-table dense>
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
                <tr>
                  <td><b>Status :</b></td>
                  <td><v-btn rounded  v-bind:color="bookingDetail.status == 'Booked' ? 'success' : 'info'" small> {{bookingDetail.status}} </v-btn></td>
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
              <div class="row">
                  <div class="col-md-8">
                      <h2>Coaches</h2>
                  </div>
                  <div class="col-md-4">
 <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="TrainModel" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark  v-bind="attrs" v-on="on" class="mt-3 mr-3">
                Add Coach
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Add Coach</span>
              </v-card-title>
              <v-card-text>
                <v-form @submit="addTrain" ref="form" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.name"
                         :rules="[rules.required]"
                          label="Train Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.code"
                          :rules="[rules.required]"
                          label="Train Code"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn class="mr-4 btn-primary" type="submit" >
                         Submit
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
                  </div>
              </div>
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
       bookingHash:'',
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
        form: {
        id: null,
        name: "",
        code: "",
      },
          rules: {
        required: (value) => !!value || "Required.",
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
          text: "Trains",
          disabled: false,
          to: { name: "auth.trains.listing" },
        },
        {
          text: "Details",
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
      this.bookingDetail.bookingHash = res.bookingHash;
      this.bookingDetail.contactDetail = res.contactDetail;
      this.bookingDetail.passengerDetails = res.passengerDetails;
      this.bookingDetail.fares = res.fares;
      this.bookingDetail.status = res.status;
      this.bookingDetail.totalAmount = res.totalAmount;
    },
   async paynow(){
      let hash =  this.bookingDetail.bookingHash;
      const res = await bookingService.pay(hash);
      if(res.data.code == 200){
        this.$toaster.success("Payment recived successfully, status updated to Booked.");
        this.getBookingDetail();
      }
    }
  },
   mounted() {
    this.getBookingDetail();
  },
};
</script>