<template>
  <section>
    <!-- <Header header="OVERVIEW" /> -->
    <v-row class="mx-2" style="margin-top: 1vh">
      <v-col v-for="(summary, index) in summaryCard" :key="index" cols="3">
        <Summary
          :icon="summary.icon"
          :description="summary.text"
          :data="summary.data"
          :classIn="summary.class"
        />
      </v-col>
    </v-row>
    <div style="width: 100vw; display: flex; margin-top: 2vh">
      <div class="right mx-5" style="flex-direction: column">
        <v-card class="mb-5 rounded-lg" style="background: rgba(0, 0, 0, 0.5)">
          <SingleLineChartPerformance
            :arrayPerformance="arrayPerformance"
            :arrayDate="arrayDate"
          />
        </v-card>

        <v-card style="background: rgba(0, 0, 0, 0.5)" class="rounded-lg">
          <v-card-subtitle
            class="sidebar rounded-lg pt-3 pb-3 pl-10"
            style="color: white"
          >
            Attempts
          </v-card-subtitle>
          <div v-show="attempts" style="display: flex">
            <div
              style="
                width: 15vw;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <v-card-subtitle style="font-size: 2em">
                {{ attempts }}
              </v-card-subtitle>
              <v-card-subtitle style="font-size: 1.4em">
                Attempts
              </v-card-subtitle>
            </div>
            <Pie
              :fetchDataAcceptable="fetchDataAcceptable"
              :fetchDataAccurate="fetchDataAccurate"
              :fetchDataFail="fetchDataFail"
            />
          </div>
          <div
            v-show="!attempts"
            style="
              display: flex;
              height: 30vh;
              justify-content: center;
              align-items: center;
            "
          >
            No data
          </div>
        </v-card>
      </div>
      <div class="left mx-5">
        <v-card
          class="mb-2 rounded-lg"
          style="background: rgba(0, 0, 0, 0.5); width: 100%"
        >
          <v-card-subtitle
            class="sidebar rounded-lg pt-3 pb-3 pl-10"
            style="color: white"
          >
            Sessions
          </v-card-subtitle>
          <div v-show="attempts" style="min-height: 58vh; max-height: 58vh">
            <Status :arraySessions="arraySessions" />
          </div>
          <div
            v-show="!attempts"
            style="
              min-height: 58vh;
              justify-content: center;
              align-items: center;
              display: flex;
            "
          >
            No data
          </div>
        </v-card>
        <div class="mt-4">
          <Button />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Header from "~/components/Header";
import Summary from "~/components/Summary";
import Status from "~/components/Status.vue";
import SingleLineChartPerformance from "~/components/SingleLineChartPerformance.vue";
import Pie from "~/components/Pie.vue";
import Button from "~/components/Button.vue";
export default {
  middleware: ["isStudent"],
  layout: "default",
  data() {
    return {
      arrayPerformance: [],
      arrayDate: [],
      arraySessions: [],
    };
  },
  components: {
    Header,
    Summary,
    Status,
    SingleLineChartPerformance,
    Pie,
    Button,
  },
  computed: {
    ...mapState({
      summaryCard: (state) => state.summaryCard,
      attempts: (state) => state.attempts,
      fetchDataAcceptable: (state) => state.fetchDataAcceptable,
      fetchDataAccurate: (state) => state.fetchDataAccurate,
      fetchDataAttempts: (state) => state.fetchDataAttempts,
      fetchDataCount: (state) => state.fetchDataCount,
      fetchDataFail: (state) => state.fetchDataFail,
      fetchDataPass: (state) => state.fetchDataPass,
    }),
    ...mapGetters(["loggedInUser", "isAuthenticated"]),
  },

  async mounted() {
    console.log(this.loggedInUser);
    this.getOverview(this.loggedInUser.id);
    this.setUser(this.loggedInUser);
    this.getDetails(this.loggedInUser.id);
  },
  methods: {
    getOverview: function (id) {
      this.$axios
        .$get("http://143.198.82.254:8000/api/data/overview", {
          params: {
            id: this.loggedInUser.id,
          },
        })
        .then((response) => {
          console.log(response);
          let data;
          if (response[0].attempts == null) {
            data = null;
          } else {
            data = response[0];
          }
          this.setSummaryCard(data);
          this.setFetchData(data);
          // this.SET_WEATHER(response);
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetails: function (id) {
      this.$axios
        .$get("http://143.198.82.254:8000/api/data/details", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          console.log(response);
          let data;
          if (response[0].attempts == null) {
            return (data = null);
          } else {
            data = response[0];
          }
          for (let i = 0; i < response.length; i++) {
            this.arrayPerformance.push(
              ((response[i].pass / response[i].attempts) * 100).toFixed(2)
            );
            this.arrayDate.push(response[i].timestamp.slice(0, 10));

            this.arraySessions.push({
              date: response[i].timestamp.slice(0, 10),
              attempts: response[i].attempts,
              accurate: response[i].accuratepoint,
              acceptable: response[i].acceptablepoint,
              fail: response[i].failpoint,
              goodforce: response[i].goodforce,
              exceedforce: response[i].exceedforce,
              goodinjection: response[i].goodinjection,
              badinjection: response[i].badinjection,
              failinjection: response[i].failinjection,
              // fail: response[i].failpoint,
              rate: ((response[i].pass / response[i].attempts) * 100).toFixed(
                2
              ),
            });
          }
          console.log(this.arrayPerformance);
          // this.setFetchData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ...mapMutations({
      setUser: "setUser",
      setSummaryCard: "setSummaryCard",
      setFetchData: "setFetchData",
    }),
  },
};
</script>

<style scoped>
.left {
  width: 60vw;
  height: calc(75vh);
  min-height: calc(75vh);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  overflow: hidden;
}
.right {
  width: 40vw;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
>
