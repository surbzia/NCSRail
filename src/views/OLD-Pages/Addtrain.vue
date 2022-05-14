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
          <h2>Add Train</h2>
        </v-container>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="train"
                :rules="nameRules"
                label="Train"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="traincode"
                :rules="nameRules"
                label="Train Code"
                required
              ></v-text-field>
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
    train: "",
    traincode: "",
    nameRules: [
      // (v) => !!v || "Name is required",
      // (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "#",
      },
      {
        text: "Add Train",
        disabled: true,
        href: "#",
      },
      
    ],
  }),
};
</script>