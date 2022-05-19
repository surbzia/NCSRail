<template>
  <div>
    <div class="container" v-if="display">
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
                    {{ selectedTrain.trainCode }} )
                    <v-btn
                      rounded
                      color="info"
                      small
                      style="color: white !important"
                    >
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
                        <span>{{
                          date_formated(selectedTrain.arrivalTime)
                        }}</span>
                      </p>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="kh-rw">
                      <p>
                        {{ selectedTrain.toStationCode }}
                        <span>{{
                          date_formated(selectedTrain.departureTime)
                        }}</span>
                      </p>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="kh-rw">
                      <p>
                        Duration
                        <span>{{ get_duration(selectedTrain.duration) }}</span>
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
          <div class="row mt-1">
            <div
              class="coach" id="coach-div"
              v-for="trainCoach in trainCoachDTO"
              :key="trainCoach.coachNo"
              @click="selectCoach($event, trainCoach)"
            >
              Coach# {{ trainCoach.coachNo }} <br />
              Vacant: {{ trainCoach.vacantSeats }}
            </div>
          </div>
        </div>

        <div class="container">
          <h4>Seats</h4>
          <hr />
          <div class="row mt-1">
            <div
              class="seat"
              v-for="seat in parseInt(seatsCount)"
              :key="seat"
              @click="select($event,seat+'S')"
              :class="{ reserved: IsReserved(seat + 'S') }"
            >
              {{ seat }}S
            </div>
          </div>
        </div>
        <div class="container">
          <h4>Berth</h4>
          <hr />
          <div class="row mt-1">
            <div
              class="seat"
              v-for="berth in parseInt(berthCount)"
              :key="berth"
              @click="select($event,berth+'B')"
              :class="{ reserved: IsReserved(berth + 'B') }"
            >
              {{ berth }}B
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bookingService from "@/services/booking";
import EconomyClass from "@/components/EconomyClass.vue";
import moment from "moment";

export default {
  components: {
    EconomyClass,
  },
  data() {
    return {
      display:false,
      berthCount: 0,
      seatsCount: 0,
      count:{
        requested_count :0,
        selected_count :[],
      },
      selectedTrain: null,
      isActive: false,
      trainCoachDTO: [],
      trainCoachBookedDTOs: [],
    };
  },
  mounted() {
    this.selectTrainClass();
    this.GetSearchedRequest();
  },
  computed: {
    GetSearchedRequest() {
      const res =  this.$store.getters.GetSearchedRequest;
      this.count.requested_count = parseInt(res.selectedTrain.childernsCount) + parseInt(res.selectedTrain.adultsCount);
      return res;
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
        this.berthCount = this.trainCoachDTO[0].berthCount;
        this.seatsCount = this.trainCoachDTO[0].seatsCount;
      }
      this.display = true;
    },
    date_formated(date) {
      return moment(date).subtract(1, "days").format("h:mm a");
    },
    get_duration(date) {
      let time = moment(date).subtract(1, "days").format("h:mm a");
      let res = moment.duration(time, "hours").hours();
    },
    select(event,seat) {
      if (
        event.currentTarget.className == "seat" &&
        event.currentTarget.className != "seat reserved"
      ) {
        if(this.count.selected_count.length != this.count.requested_count){
        event.currentTarget.className = "booked";
        this.count.selected_count.push(seat);
        }else{
            this.$toaster.error("You can only select " +this.count.requested_count+ " Seats");
        }
      } else {
        if (event.currentTarget.className == "booked") {
          event.currentTarget.className = "seat";
           this.count.selected_count.splice(this.count.selected_count.indexOf(seat), 1);
        }
      }
    },
    IsReserved(num) {
      if (this.trainCoachBookedDTOs.find((x) => x.seatNo === num)) {
        return true;
      } else {
        return false;
      }
    },
    selectCoach(event, coach) {
      if (event.target.className == "coach") {
        event.currentTarget.className = "selected";
      } else {
        event.target.className = "coach";
      }
      this.trainCoachBookedDTOs = coach.trainCoachBookedDTOs;
      this.berthCount = coach.berthCount;
      this.seatsCount = coach.seatsCount;
    },
  },
};
</script>