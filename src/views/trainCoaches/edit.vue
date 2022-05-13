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
          <h2>Train Coaches</h2>
        </v-container>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-select
                v-model="form.train"
                :items="trains"
                  item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Item is required']"
                label="Train"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="12">
              <v-select
                v-model="form.train_type"
                :items="traintype"
                :rules="[(v) => !!v || 'Item is required']"
                label="Train Type"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.coach_num"
                :rules="nameRules"
                label="Coach No"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.berth_count"
                :rules="nameRules"
                label="Berth Count"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.cabin_count"
                :rules="nameRules"
                label="Cabin Count"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.seat_count"
                :rules="nameRules"
                label="Seat Count"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.berth_in_cabin"
                :rules="nameRules"
                label="Berth in Cabin"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.seat_adult"
                :rules="nameRules"
                label="Seat Fare Adult"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.berth_adult"
                :rules="nameRules"
                label="Berth Fare Adult"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.seat_child"
                :rules="nameRules"
                label="Seat Fare Child"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.berth_child"
                :rules="nameRules"
                label="Berth Fare Child"
                required
              ></v-text-field>
            </v-col>

            

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.reserve_note"
                :rules="nameRules"
                label="Reserve Note"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox
                v-model="form.is_reserved"
                label="Is Already Reserve"
              ></v-checkbox>
            </v-col>

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
import CoachService from "@/services/coaches";
import TrainService from "@/services/train";
export default {
  data: () => ({
     trains:[],
    valid: false,
    form:{
      id:'',
      train:'',
      train_type:'',
      coach_num:'',
      berth_count:'',
      cabin_count:'',
      seat_count:'',
      berth_in_cabin:'',
      seat_adult:'',
      berth_adult:'',
      seat_child:'',
      berth_child:'',
      reserve_note:'',
      is_reserved:false
    },
  
    cityname: ["Karachi", "Lahore", "Rawalpindi", "Margalla"],
    items: [
      {
        text: "Dashboard",
        disabled: false,
        to: { name: "auth.dashboard" },
      },
      {
        text: "Train Coaches",
        disabled: false,
         to: { name: "auth.coaches.listing" },
      },
      {
        text: "edit",
        disabled: true,
        href: "#",
      },
    ],
  }),
  methods:{
    async getallTrains(){
 let res = await TrainService.getlist('');
  this.trains = res.data;
},
       getCoachDetails: async function(){
      let id = this.$route.params.id;
      const res = await CoachService.get(id);
      this.form.id = res.trainCoachID;
      this.form.train = res.trainID;
      this.form.coach_num = res.coachNo;
      this.form.berth_count = res.berthCount;
      this.form.cabin_count = res.cabinCount;
      this.form.seat_count = res.seatCount;
      this.form.berth_in_cabin = res.berthinCabin;
      this.form.seat_adult = res.seatFareAdult;
      this.form.berth_adult = res.berthFareAdult;
      this.form.seat_child = res.seatFareChild;
      this.form.berth_child = res.berthFareChild;
      this.form.reserve_note = res.reservedNote;
      this.form.is_reserved = res.isAlreadyReserved;
    },
  },
  mounted(){
    this.getCoachDetails();
    this.getallTrains();
  }
};
</script>