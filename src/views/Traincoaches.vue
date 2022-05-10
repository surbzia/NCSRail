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
                v-model="select"
                :items="trainname"
                :rules="[(v) => !!v || 'Item is required']"
                label="Train"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="12">
              <v-select
                v-model="select"
                :items="traintype"
                :rules="[(v) => !!v || 'Item is required']"
                label="Train Type"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="coachno"
                :rules="nameRules"
                label="Coach No"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="berthcount"
                :rules="nameRules"
                label="Berth Count"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="cabincount"
                :rules="nameRules"
                label="Cabin Count"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="seatcount"
                :rules="nameRules"
                label="Seat Count"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="brthincab"
                :rules="nameRules"
                label="Berth in Cabin"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="seatfareadult"
                :rules="nameRules"
                label="Seat Fare Adult"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="berthfareadult"
                :rules="nameRules"
                label="Berth Fare Adult"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="seatfarechild"
                :rules="nameRules"
                label="Seat Fare Child"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="berthfarechild"
                :rules="nameRules"
                label="Berth Fare Child"
                required
              ></v-text-field>
            </v-col>

            

            <v-col cols="12" md="6">
              <v-text-field
                v-model="reservenote"
                :rules="nameRules"
                label="Reserve Note"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox
                v-model="alreadyreserve"
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
export default {
  data: () => ({
    valid: false,
    stationname: "",
    stationcode: "",
    nameRules: [
      // (v) => !!v || "Name is required",
      // (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    cityname: ["Karachi", "Lahore", "Rawalpindi", "Margalla"],
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "#",
      },
      {
        text: "Train Coaches",
        disabled: true,
        href: "#",
      },
    ],
  }),
};
</script>