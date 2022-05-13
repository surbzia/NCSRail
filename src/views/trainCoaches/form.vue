<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="items" large></v-breadcrumbs>
      </v-container>
    </div>
    <div class="row">
      <div class="col-md-12 mb-2">
        <div class="text-right">
          <v-btn :to="{ name: 'auth.coaches.listing' }" rounded dark>
            Back
          </v-btn>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="sec-heading">
        <v-container>
          <h2>Train Coaches</h2>
        </v-container>
      </div>
      <v-form ref="form" lazy-validation @submit="addTrainCoach">
        <v-container>
          <v-row>
            <v-col cols="6" md="6">
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

            <v-col cols="6" md="6">
              <v-select
                v-model="form.ClassType"
                :items="traintype"
                :rules="[(v) => !!v || 'Item is required']"
                label="Train Type"
                required
              ></v-select>
              <p v-if="errors.ClassType.length > 0" class="red--text">
                {{ this.errors.ClassType[0] }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.coach_num"
                :rules="nameRules"
                label="Coach No"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.berth_count"
                :rules="nameRules"
                label="Berth Count"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.cabin_count"
                :rules="nameRules"
                label="Cabin Count"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.seat_count"
                :rules="nameRules"
                label="Seat Count"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.berth_in_cabin"
                :rules="nameRules"
                label="Berth in Cabin"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.seat_adult"
                :rules="nameRules"
                label="Seat Fare Adult"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.berth_adult"
                :rules="nameRules"
                label="Berth Fare Adult"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.seat_child"
                :rules="nameRules"
                label="Seat Fare Child"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="3" md="3">
              <v-text-field
                v-model="form.berth_child"
                :rules="nameRules"
                label="Berth Fare Child"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="9">
              <v-text-field
                v-model="form.ReserveNote"
                :rules="nameRules"
                label="Reserve Note"
                required
              ></v-text-field>
              <p v-if="errors.ReserveNote.length > 0" class="red--text">
                {{ this.errors.ReserveNote[0] }}
              </p>
            </v-col>
            <v-col cols="6" md="6">
              <v-checkbox
                v-model="form.is_reserved"
                label="Is Already Reserve"
              ></v-checkbox>
            </v-col>

            <v-col cols="6" md="6" class="text-right">
              <v-btn class="mr-4 btn-primary" type="submit"> Save </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>
<script>
import TrainService from "@/services/train";
import CoachService from "@/services/coaches";
export default {
  data: () => ({
    valid: false,
    form: {
      id: "",
      train: "",
      ClassType: "",
      coach_num: "",
      berth_count: "",
      cabin_count: "",
      seat_count: "",
      berth_in_cabin: "",
      seat_adult: "",
      berth_adult: "",
      seat_child: "",
      berth_child: "",
      ReserveNote: "",
      is_reserved: false,
    },
    errors: {
      train: [],
      ClassType: [],
      coach_num: [],
      berth_count: [],
      cabin_count: [],
      seat_count: [],
      berth_in_cabin: [],
      seat_adult: [],
      berth_adult: [],
      seat_child: [],
      berth_child: [],
      ReserveNote: [],
      is_reserved: false,
    },
    trains: [],
    nameRules: [
      // (v) => !!v || "Name is required",
      // (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    traintype: ["Economy", "Power Plant", "AC Business"],
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
        text: "add",
        disabled: true,
        href: "#",
      },
    ],
  }),
  methods: {
    async getallTrains() {
      let res = await TrainService.getlist("");
      this.trains = res.data;
    },
    addTrainCoach: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        var res = await CoachService.create(this.form);
        if (res.status == 1) {
          this.$toaster.success("Train Coach Added Successfully.");
          this.getDataFromApi();
          this.$router.push({ name: "auth.coaches.listing" });
        } else {
          if (res.data.errors) {
            let error = res.data.errors;
            if (error.ClassType) {
              this.errors.ClassType = error.ClassType;
            }
            if (error.ReserveNote) {
              this.errors.ReserveNote = error.ReserveNote;
            }
          }
        }
      }
    },
  },
  mounted() {
    this.getallTrains();
  },
};
</script>