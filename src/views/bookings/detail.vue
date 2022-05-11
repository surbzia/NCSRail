<template>
  <div>
    <div class="bread-c">
      <v-container>
        <v-breadcrumbs :items="breads" large></v-breadcrumbs>
      </v-container>
    </div>
    <v-card class="pt-3 pb-3 pr-3 pl-3">
      <div class="row">
        <div class="col-md-6">
          <v-card class="pt-3 pb-3 pr-3 pl-3">
            <h3>Contact Detail</h3>
            <hr />
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td><b>Full Name :</b></td>
                    <td>{{ form.full_name }}</td>
                  </tr>
                  <tr>
                    <td><b>Email :</b></td>
                    <td>{{ form.email }}</td>
                  </tr>
                  <tr>
                    <td><b>Mobile number :</b></td>
                    <td>{{ form.mobile_number }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </div>
        <div class="col-md-6">
          <v-card class="pt-3 pb-3 pr-3 pl-3">
            <span class="d-flex justify-md-space-between"
              ><h3>Amount Detail</h3>
              <v-checkbox
                v-model="form.amount_recived"
                style="margin-bottom: -17px"
                class="mt-0"
                :label="`Recived`"
              ></v-checkbox>
            </span>
            <hr />
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Type</th>
                    <th class="text-left">Qty</th>
                    <th class="text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Child</td>
                    <td>x 4</td>
                    <td>PKR 2700</td>
                  </tr>
                  <tr>
                    <td>Adult</td>
                    <td>x 4</td>
                    <td>PKR 2700</td>
                  </tr>
                  <tr>
                    <td>Disabled Person</td>
                    <td>x 4</td>
                    <td>PKR 2700</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>TOTAL</th>
                    <th>PKR, 50,0002</th>
                  </tr>
                </tfoot>
              </template>
            </v-simple-table>
          </v-card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h3>Traveler Details</h3>
          <hr />
          <v-data-table
            :headers="headers"
            :items="traveler_details"
            :loading="loading"
            class="elevation-1"
          >
          </v-data-table>
          <!-- <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Type</th>
                  <th class="text-left">Full Name</th>
                  <th class="text-left">CNIC Number</th>
                  <th class="text-left">Seat Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>sdfsd</td>
                  <td>sdfsd</td>
                  <td>sdfsd</td>
                  <td>23B</td>
                </tr>
                <tr>
                  <td>sdfsd</td>
                  <td>sdfsd</td>
                  <td>sdfsd</td>
                   <td>23B</td>
                </tr>
                <tr>
                  <td>sdfsd</td>
                  <td>sdfsd</td>
                  <td>sdfsd</td>
                   <td>23B</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table> -->
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        amount_recived: false,
        full_name: "Saleem Ur Rehman",
        email: "asdasdf@gmail.com",
        mobile_number: +923166889,
      },
      options: {},
      trains: [
        {
          id: 1,
          name: "Karachi",
        },
        {
          id: 2,
          name: "Lahore",
        },
        {
          id: 3,
          name: "Peshawar",
        },
      ],
      breads: [
        {
          text: "Dashboard",
          disabled: false,
          to: { name: "auth.dashboard" },
        },
        {
          text: "Bookings",
          disabled: true,
          to: { name: "auth.bookings.listing" },
        },
        {
          text: "Booking Details",
          disabled: true,
          href: "#",
        },
      ],
      headers: [
        {
          text: "Full Name",
          align: "start",
          sortable: true,
          value: "full_name",
        },
        {
          text: "CNIC Number",
          align: "start",
          sortable: true,
          value: "cnic_number",
        },
        {
          text: "Type",
          align: "start",
          sortable: true,
          value: "type",
        },
        {
          text: "Seat Number",
          align: "start",
          sortable: true,
          value: "seat_number",
        },
        // { text: "Actions", value: "actions", sortable: false },
      ],
      traveler_details: [
        {
          id: 1,
          full_name: "saleem 2342",
          cnic_number: "2341352353",
          type: "Audult",
          seat_number: "089",
        },
        {
          id: 2,
          full_name: "saleem 545",
          cnic_number: "2341352353",
          type: "Audult",
          seat_number: "6756",
        },
      ],
    };
  },
};
</script>