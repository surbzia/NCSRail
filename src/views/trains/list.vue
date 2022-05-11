<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="data"
      :loading="!loading"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="cityModel" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Train
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ title }}</span>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.name"
                          :rules="nameRules"
                          label="Train Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.code"
                          :rules="nameRules"
                          label="Train Code"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn class="mr-4 btn-primary" type="submit">
                          {{ button }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon v-on:click="edit(item)">mdi-pencil-plus</v-icon>
        <v-icon v-on:click="deleteItem(item)">mdi-delete-outline</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: "auth.station.listing",
  data() {
    return {
      cityModel: false,
      search: "",
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "Trains",
          to: { name: "auth.trains.listing" },
          disabled: false,
          exact: true,
        },
      ],
      items: [],
      loading: true,
      button: "Submit",
      title: "Add Train",
      totalRecords: 0,
      form: {
        id: null,
        name: "",
        code: "",
      },
      nameRules: [
        // (v) => !!v || "Name is required",
        // (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      valid: false,
      options: {},
      data: [
        {
          id: 1,
          name: "Karachi",
          code: 23234,
        },
        {
          id: 2,
          name: "Lahore",
           code: 23234,
        },
        {
          id: 3,
          name: "Rawalpindi",
           code: 23234,
        },
      ],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "Train Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Train Code",
          align: "start",
          sortable: true,
          value: "code",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  watch: {
    $route() {
      //   this.getDataFromApi();
    },
    perpage() {
      //   this.getDataFromApi();
    },
    options: {
      handler() {
        // this.getDataFromApi();
      },
      deep: true,
    },
  },
  mounted() {
    // this.getDataFromApi();
  },
  methods: {
    edit(item) {
      this.form.id = item.id;
      this.form.name = item.name;
      this.form.code = item.code;
      this.button = "Update";
      this.title = "Update Train";
      this.cityModel = true;
    },
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this Train.. ??")) {
        alert("Your Train has been deleted successfully");
      }
    },
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
    // async getDataFromApi() {
    //   var data = await this.fakeApiCall();
    //   this.items = data.data;
    //   try {
    //     this.totalRecords = data.meta.total;
    //   } catch (ex) {}
    //   this.loading = false;
    // },
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
  },
  watch: {
    // options: {
    //   handler() {
    //     this.getDataFromApi();
    //   },
    //   deep: true,
    // },
    // search() {
    //   this.getDataFromApi();
    // },
  },
};
</script>