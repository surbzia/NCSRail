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
          <h2>Add Routes</h2>
        </v-container>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-select
                v-model="select"
                :items="cityname"
                :rules="[(v) => !!v || 'Item is required']"
                label="Select Train"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="12">
              <v-select
                v-model="select"
                :items="stationlist"
                :rules="[(v) => !!v || 'Item is required']"
                label="Select Station"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="routename"
                :rules="nameRules"
                label="Route Name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Arrival Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="6">
              <h4>Arrival Time:</h4>
              <v-time-picker v-model="start" :max="end"></v-time-picker>
            </v-col>
            <v-col cols="12" md="6">
              <h4>Waiting Time:</h4>
              <v-time-picker v-model="end" :min="start"></v-time-picker>
            </v-col>
            

            <v-col cols="12" md="4">
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
    stationlist: ["Karachi Cantt", "Lahore Junction"],
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "#",
      },
      {
        text: "Add Routes",
        disabled: true,
        href: "#",
      },
    ],
    start: null,
    end: null,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      menu2: false,
  }),
};
</script>