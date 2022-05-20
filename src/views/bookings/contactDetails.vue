<template>
  <div>
    <div class="container">
      <!-- <div class="row">
        <div class="col-md-12 mb-2">
          <div class="text-right">
            <v-btn :to="{ name: 'auth.users.listing' }" rounded dark>
              Back
            </v-btn>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="sec-heading">
          <v-container>
            <h2>Contact Details</h2>
          </v-container>
        </div>
        <v-container>
          <v-row>
            <v-col cols="4" md="4">
              <v-text-field
                v-model="contactDetail.fullName"
                :rules="[(v) => !!v || 'Name is required']"
                label="Full Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field
                v-model="contactDetail.email"
                :rules="[(v) => !!v || 'Email is required']"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field
                v-model="contactDetail.contactNumber"
                :rules="[(v) => !!v || 'Mobile number is required']"
                label="Mobile number"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="content-body">
        <div class="sec-heading">
          <v-container>
            <h2>Traveler Details</h2>
          </v-container>
        </div>
        <v-container >
          <v-row
            v-for="(traveler_detail, index) in travelerdata"
            :key="traveler_detail.SeatNo"
          >
            <v-col cols="2" md="2">
              
              <v-chip large>
                Passinger {{ index + 1 }} -   {{traveler_detail.seatNo}}
              </v-chip>
            </v-col>
            <v-col cols="3" md="3">
              <v-select
                :items="['Child', 'Adult', 'disabled Person']"
                label="Type"
                item-text="name"
                v-model="traveler_detail.type"
                item-value="id"
                dense
                filled
              ></v-select>
            </v-col>
            <v-col cols="3" md="3">
              <v-text-field
                v-model="traveler_detail.fullName"
                :rules="[(v) => !!v || 'Full Name is required']"
                label="Full Name"
                required
                dense
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field
                v-model="traveler_detail.cnic"
                :rules="[(v) => !!v || 'CNIC Number number is required']"
                label="CNIC Number"
                dense
                filled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-btn class="mr-4 btn-primary"  @click="confirm"> Submit </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>
<script>
import bookingService from "@/services/booking";
export default {
  data() {
    return {
      form: {
        type: [],
        fullname: [],
        tmobile: [],
      },
      contactDetail:{
          contactNumber:null,
          fullName:null,
          email:null,
          isAgreed:false,
      },
      travelerdata:[],
      bookingHoldDetails:{},
      
    };
  },
  methods:{
async confirm(){
    let searchPrams = this.$store.getters.GetSearchedRequest;
    let selectedSeat = this.$store.getters.GetSelectedSeats;
   let BookingHold = {
            searchPrams:searchPrams.selectedTrain, 
            selectedSeats:selectedSeat.selected_seats, 
            selectedTrain: {
                selectedTrain:this.$store.getters.GetSelectedTrain,
                selectedClass:this.$store.getters.GetSelectedClass,
                }, 
            };

 
 let res = await bookingService.BookingHold(BookingHold);
 if(res.status == 1){
     this.bookingHoldDetails = res.data;

        let PassengerInfo = {
            travelerdata:this.travelerdata, 
            contactDetail:this.contactDetail,
            bookingHoldDetails: this.bookingHoldDetails
            };
     let res1 = await bookingService.PassengerInfo(PassengerInfo);
   if(res1.status == 1){
     let res2 = await bookingService.Confirm({paymentType:'CASH',bookingDetails: res1.data.rspObj});
      if(res2.status == 1){
      this.$store.commit("setSearchedRequest", '');
      this.$store.commit("SetSelectedTrain", '');
      this.$store.commit("SetselectedClass", '');
      this.$store.commit("setSelectedSeats", '');
      this.$toaster.success("Booking successfull");
      this.$router.push({ name: "auth.bookings.listing" });
     }
     }
 }

}
  },
  mounted() {
    let traveler_details = this.$store.getters.GetSelectedSeats.selected_seats;
    traveler_details.forEach(item => {
    this.travelerdata.push({cnic:null,fullName:null,seatNo:item.seatNo,type:null,});
    });
    console.log(this.travelerdata);
    if (this.traveler_details == "") {
      this.$router.push({ name: "auth.bookings.add" });
    }
  },
};
</script>
