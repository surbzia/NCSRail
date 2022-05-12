<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="bookings"
      :loading="loading"
       :options.sync="options"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
       <template v-slot:[`item.totalFare`]="{ item }">
          PKR, {{item.totalFare}}
      </template> 
       <template v-slot:[`item.invoiceStatus`]="{ item }">
        <v-btn  rounded v-bind:color="item.invoiceStatus == 'Booked' ? 'success' : 'info'" small>
          {{item.invoiceStatus}}
         </v-btn>
      </template> 
       <template v-slot:[`item.actions`]="{ item }">
        <v-btn  :to="{ name: 'auth.bookings.detail', params: { id: item.bookingHASH } }"  class="ma-0"
      outlined
      
      color="teal">
          <v-icon>mdi-format-list-bulleted-square</v-icon>
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
      loading: true,
      totalRecords: 0,
      nameRules: [
        // (v) => !!v || "Name is required",
        // (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
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
          text: "Passingers",
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
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  watch: {
    $route() {
         this.getDataFromApi();
    },
    perpage() {
         this.getDataFromApi();
    },
    options: {
      handler() {
         this.getDataFromApi();
      },
      deep: true,
    },
     search() {
      this.getDataFromApi();
    },
  },
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    // del{eteuser: async function (id) {
    //   const isConfirmed = await Swal.fire({
    //     title: "Are you sure?",
    //     text: "You won't be able to revert this!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, delete it!",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       return true;
    //     }
    //   });
    //   if (isConfirmed) {
    //     await brandservice.delete({
    //       id: id,
    //     });
    //     Swal.fire("Deleted!", "Your record has been deleted.", "success");
    //     this.getDataFromApi();
    //   }
    // },
    async getDataFromApi() {
      var res = await this.getAllBookings();
     this.bookings = res.data;
      // try {
      //   this.totalRecords = res.meta.total;
      // } catch (ex) {}
      this.loading = false;
    },
    // fakeApiCall() {
    //   this.loading = true;
    //   var query = "";
    //   var page = this.options.page;
    //   query += "?page=" + page;
    //   if (this.options.sortBy.length > 0) {
    //     query += "&sortCol=" + this.options.sortBy[0];
    //   }
    //   if (this.options.sortDesc.length > 0) {
    //     query += "&sortByDesc=" + (this.options.sortDesc[0] == true ? 1 : 0);
    //   }
    //   query += "&perpage=" + this.options.itemsPerPage;
    //   if (this.search != "") {
    //     query += "&search=" + this.search;
    //   }
    //   return brandservice.getlist(query);
    // },

   getAllBookings(){
     this.loading = true;
    var query = "";
      var page = this.options.page;
      query += "?page=" + page;
          if (this.options.sortBy.length > 0) {
        query += "&sortCol=" + this.options.sortBy[0];
      }
      if (this.options.sortDesc.length > 0) {
        query += "&sortByDesc=" + (this.options.sortDesc[0] == true ? 1 : 0);
      }
      query += "&perpage=" + this.options.itemsPerPage;
      if (this.search != "") {
        query += "&search=" + this.search;
      }
     return  bookingService.getlist(query);
}
  },
};
</script>