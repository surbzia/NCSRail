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
                  v-model="form.name"
                  :rules="[(v) => !!v || 'Name is required']"
                  label="Full Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="form.email"
                  :rules="[(v) => !!v || 'Email is required']"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="form.mobile"
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
          <v-container v-if="traveler_details.length > 0">
            <v-row v-for="(traveler_detail,index) in traveler_details" :key="traveler_detail.SeatNo">
              <v-col cols="2" md="2">
               <v-chip large>
                   Passinger {{index +1}} - {{traveler_detail.SeatNo}}
               </v-chip>
              </v-col>
              <v-col cols="3" md="3">
                 <v-select
            :items="['Child', 'Adult','disabled Person']"
            label="Type"
            item-text="name"
            v-model="form.type"
            item-value="id"
            dense
            filled
          ></v-select>
              </v-col>
             <v-col cols="3" md="3">
                <v-text-field
                  v-model="form.name"
                  :rules="[(v) => !!v || 'Full Name is required']"
                  label="Full Name"
                  required
                  dense
            filled
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="form.mobile"
                  :rules="[(v) => !!v || 'CNIC Number number is required']"
                  label="CNIC Number"
                   dense
            filled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="12">
                <v-btn class="mr-4 btn-primary" type="submit"> Submit </v-btn>
              </v-col>
            </v-row>
          </v-container>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      traveler_details: [
          {CoachID:6,SeatNo:"8B"},
          {CoachID:6,SeatNo:"9B"},
          {CoachID:6,SeatNo:"2B"},
          {CoachID:6,SeatNo:"5B"}
      ],
      form: {
        name: null,
        email: null,
        mobile: null,
      },
    };
  },
  mounted() {
    let traveler_details = this.$store.getters.GetSelectedSeats.selected_seats;
    this.traveler_details.push(traveler_details);
    if (this.traveler_details == "") {
      this.$router.push({ name: "auth.bookings.add" });
    }
  },
};
</script>
