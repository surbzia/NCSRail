<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="bread" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-data-table
      :headers="headers"
      :items="trains"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="TrainModel" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Train
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Add Train</span>
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
         <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="TrainModelEdit" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Update Train</span>
              </v-card-title>
              <v-card-text>
                <v-form @submit="updateTrain" ref="form" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="edit_form.name"
                          :rules="[rules.required]"
                          label="Train Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="edit_form.code"
                         :rules="[rules.required]"
                          label="Train Code"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn class="mr-4 btn-primary" type="submit" >
                         Update
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
      <template v-slot:[`item.actions`]="{ item }">
          <v-btn rounded outlined color="info" v-on:click="edit(item)" small> Edit </v-btn>
        <v-btn rounded outlined color="error" v-on:click="deleteItem(item)" small> Delete </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import TrainService from "@/services/train";
export default {
  name: "auth.station.listing",
  data() {
    return {
      TrainModel: false,
      TrainModelEdit: false,
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
      totalRecords: 0,
      form: {
        id: null,
        name: "",
        code: "",
      },
      edit_form: {
        id: null,
        name: "",
        code: "",
      },
      valid: false,
      options: {},
      trains:[],
   
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
       { text: "Actions",  align: 'end', value: "actions", sortable: false },
      ],
         rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  watch: {
     search() {
      this.getDataFromApi();
    },
  },
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    edit(item) {
      this.edit_form.id = item.id;
      this.edit_form.name = item.name;
      this.edit_form.code = item.code;
      this.TrainModelEdit = true;
    },
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this station.. ??")) {
        var res = TrainService.delete(parseInt(item.id));
      }
    },
      addTrain: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
      var res = await TrainService.create({
        "name":this.form.name,
        "code":this.form.code,
      });
      if (res.status == 1) {
        this.$toaster.success("Station Added Successfully.");
        this.getDataFromApi();
        this.TrainModel = false;
      }
      }
    },
      updateTrain: async function (event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
      let formData = {
        "name":this.edit_form.name,
        "code":this.edit_form.code,
      };

      var res = await TrainService.update(formData,parseInt(this.edit_form.id));
      if (res.status == 1) {
        this.$toaster.success("Station Updated Successfully.");
        this.getDataFromApi();
        this.stationModelEdit = false;
      }
      }
    },
    async getDataFromApi() {
      var res = await this.getAllBookings();
      this.trains = res.data;
      this.loading = false;
    },
    getAllBookings() {
      this.loading = true;
      var query = "";
      if (this.search != "") {
        query += "&search=" + this.search;
      }
      return TrainService.getlist(query);
    },
  },

};
</script>