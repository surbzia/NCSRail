<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="haz-exp">
           <div class="row">
              <div class="col-md-5">
                <div class="dn">
                  <img
                    src="https://nscrail.himsportal.com/images/minitrain.png"
                    alt="train"
                  />
                  <h4>
                    {{ selectedTrain.trainName }} (
                    {{ selectedTrain.trainCode }} )  <v-btn rounded color="info" small style="color:white !important;">
                    {{ selectedTrain.fares[0].classType }}
                  </v-btn>
                    <br />
                    <span
                      >Traveling from {{ selectedTrain.fromStationCity }} to
                      {{ selectedTrain.toStationCity }}</span
                    >
                  </h4>
                </div>
              </div>

              <div class="col-md-7">
                  <div class="row">
                         <div class="col-md-3">
                <div class="kh-rw">
                  <p>
                    {{ selectedTrain.fromStationCode }}
                    <span>{{date_formated(selectedTrain.arrivalTime)}}</span>
                  </p>
                </div>
              </div>

              <div class="col-md-3">
                <div class="kh-rw">
                  <p>
                    {{ selectedTrain.toStationCode }}
                    <span>{{ date_formated(selectedTrain.departureTime) }}</span>
                  </p>
                </div>
              </div>

              <div class="col-md-3">
                <div class="kh-rw">
                  <p>
                    Duration <span>{{ get_duration(selectedTrain.duration) }}</span>
                  </p>
                </div>
              </div>

              <div class="col-md-3">
                <div class="kh-rw st">
                  <p>
                    Stops <span>{{ selectedTrain.stops }}</span>
                  </p>
                </div>
              </div>
                  </div>
              </div>
            </div>

          </div>
        </div>

        <div class="col-md-12"> 
          <div class="all-coach">
            <div
              class="coach-9"
              v-for="(trainCoach, index) in trainCoachDTO"
              :key="index"
               @click="selectCoach($event,trainCoach)"
            >
              <p class="par">
                Coach #{{ trainCoach.coachNo }}
                <span>Vacant: {{ trainCoach.vacantSeats }}</span>
              </p>
           
            </div>
          </div>
        </div>
           <div class="col-md-12">
              <div class="container" v-if="selectedTrain.fares[0].classType == 'Economy'"> 
             <EconomyClass></EconomyClass>
            </div> 
           </div>
      </div>
    </div>
  </div>
</template>
<script>
import bookingService from "@/services/booking";
import EconomyClass from "@/components/EconomyClass.vue";
import moment from 'moment'

export default {
  components:{
    EconomyClass,
},
  data() {
    return {
      selectedTrain: null,
      isActive: false,
      trainCoachDTO: [],
      coach:{
        trainCoachBookedDTOs:[],
      }
    };
  },
  mounted() {
    this.selectTrainClass();
  },
  computed: {
    GetSearchedRequest() {
      return this.$store.getters.GetSearchedRequest;
    },
    },
  methods: {
    async selectTrainClass() {
      let selectedTrain = this.$route.params.selectedTrain;
      let selectedClass = this.$route.params.selectedClass;
      let res = await bookingService.GetTrainDetails({
        selectedTrain: selectedTrain,
        selectedClass: selectedClass,
      });
      if (res.status) {
        this.selectedTrain = res.data.selectedTrain;
        this.trainCoachDTO = res.data.trainCoachDTO;
      }
    },
    date_formated(date){
        return moment(date).subtract(1,'days').format('h:mm a')
    },
    get_duration(date){
        let time = moment(date).subtract(1,'days').format('h:mm a');
        let res = moment.duration(time,"hours").hours();
        console.log(res);
    },
      selectCoach(event,coach) {
      if (event.currentTarget.className == "coach-9") {
        event.currentTarget.className = "coach-9 selected";
      } else {
        event.currentTarget.className = "coach-9";
      }
       this.coach.trainCoachBookedDTOs =  coach.trainCoachBookedDTOs;
    },
  },
};
</script>