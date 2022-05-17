<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="coaches"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:top>
       <div class="row">
         <div class="col-md-12 text-right">
             <v-btn color="primary" dark class="mb-2"  :to="{ name: 'auth.coaches.add' }">
                Add Coach
              </v-btn>
         </div>
       </div>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
          <template v-slot:[`item.isReserved`]="{ item }">
        <v-btn rounded v-bind:color="item.isReserved?'success':'error'" small>{{item.isReserved}}</v-btn>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn rounded outlined color="info" :to="{ name: 'auth.coaches.edit',params: { id: item.id }  }" small>
          Edit
        </v-btn>
        <v-btn
          rounded
          outlined
          color="error"
          v-on:click="deleteItem(item)"
          small
        >
          Delete
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import CoachService from "@/services/coaches";
import cityservice from "@/services/city";
export default {
  name: "auth.station.listing",
  data() {
    return {
      stationModel: false,
      stationModelEdit: false,
      search: "",
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Train Coaches",
          to: { name: "auth.coaches.listing" },
          disabled: false,
          exact: true,
        },
      ],
      items: [],
      loading: true,
      button: "Submit",
      title: "Add Station",
      totalRecords: 0,
      form: {
        id: null,
        name: "",
        code: "",
        city: "",
      },
      edit_form: {
        id: null,
        name: "",
        code: "",
        city: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
      valid: false,
      options: {},
      cities: [],
      coaches: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "Class Type",
          align: "start",
          sortable: true,
          value: "classType",
        },
        {
          text: "Seats",
          align: "start",
          sortable: true,
          value: "seatsCount",
        },
        {
          text: "Seat(Child)",
          align: "start",
          sortable: true,
          value: "seatChildFare",
        },
        {
          text: "Seat(Adult)",
          align: "start",
          sortable: true,
          value: "seatAdultFare",
        },
        {
          text: "Berth(Child)",
          align: "start",
          sortable: true,
          value: "berthChildFare",
        },
        {
          text: "Berth(Adult)",
          align: "start",
          sortable: true,
          value: "berthAdultFare",
        },
        {
          text: "Berth Count",
          align: "start",
          sortable: true,
          value: "berthCount",
        },
        {
          text: "Berth in Cabin",
          align: "start",
          sortable: true,
          value: "berthinCabin",
        },
        {
          text: "Cabin Count",
          align: "start",
          sortable: true,
          value: "cabinCount",
        },
        {
          text: "Reserved",
          align: "start",
          sortable: true,
          value: "isReserved",
        },
         { text: "Actions",  align: 'end', value: "actions", sortable: false },
      ],
    };
  },
  watch: {
    search() {
      this.getDataFromApi();
    },
  },
  mounted() {
    this.getDataFromApi();
    this.getCities();
  },
  methods: {
    edit(item) {
      this.edit_form.id = item.id;
      this.edit_form.name = item.title;
      this.edit_form.code = item.code;
      this.edit_form.city = item.cityID;
      this.stationModelEdit = true;
    },
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this station.. ??")) {
        var res = CoachService.delete(parseInt(item.id));
         if (res.status == 1) {
          this.$toaster.success("Coach has been deleted Successfully.");
          this.getDataFromApi();
          this.stationModel = false;
        }else{
          this.$toaster.error(res.data);
            this.getDataFromApi();
        }
      }
    },
    addStation: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        var res = await CoachService.create({
          title: this.form.name,
          code: this.form.code,
          CityID: this.form.city,
        });
        if (res.status == 1) {
          this.$toaster.success("Station Added Successfully.");
          this.getDataFromApi();
          this.stationModel = false;
        }
      }
    },
    async getCities() {
      let res = await cityservice.getlist("");
      this.cities = res.data;
    },
    updateStation: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        let formData = {
          id: this.edit_form.id,
          title: this.edit_form.name,
          code: this.edit_form.code,
          CityID: this.edit_form.city,
        };

        var res = await CoachService.update(
          formData,
          parseInt(this.edit_form.id)
        );
        if (res.status == 1) {
          this.$toaster.success("Train Updated Successfully.");
          this.getDataFromApi();
          this.stationModelEdit = false;
        }
      }
    },
    async getDataFromApi() {
      var res = await this.getAllTrainCoaches();
      this.coaches = res.data;
      this.loading = false;
    },
    getAllTrainCoaches() {
      this.loading = true;
      var query = "";
      if (this.search != "") {
        query += "?search=" + this.search;
      }
      return CoachService.getlist(query);
    },
  },
};
</script>