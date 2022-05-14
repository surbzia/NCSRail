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
          <h2>Add City</h2>
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
                label="Select City"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn class="mr-4 btn-primary" type="submit">
                submit
              </v-btn>
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
    
    cityname: ["Karachi", "Lahore", "Rawalpindi", "Margalla"],
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "dashboard",
      },
      {
        text: "Add City",
        disabled: true,
        href: "#",
      },
      
    ],
  }),
};
</script>