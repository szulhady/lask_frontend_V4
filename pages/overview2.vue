<template>
  <section>
    <v-row class="mx-2" style="margin-top: 1vh">
      <v-col
        v-for="(summary, index) in summaryCardLecturer"
        :key="index"
        cols="4"
      >
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
        <v-card class="mb-3 rounded-lg" style="background: rgba(0, 0, 0, 0.5)">
          <ClassList />
        </v-card>

        <v-card style="background: rgba(0, 0, 0, 0.5)" class="rounded-lg">
          <v-card-subtitle
            class="sidebar rounded-lg pt-3 pb-3 pl-10"
            style="color: white"
          >
            Students
          </v-card-subtitle>
          <div
            style="
              display: flex;
              width: 100%;
              max-height: 32vh;
              min-height: 32vh;
              overflow: hidden;
            "
          >
            <Status2 />
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
            Sessions - ({{ activeStudentName }})
          </v-card-subtitle>
          <div style="min-height: 58vh">
            <Status />
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
import Status from "~/components/Status3.vue";
import ClassList from "~/components/ClassList.vue";
import Status2 from "~/components/Status2.vue";
import Pie from "~/components/Pie.vue";
import Button from "~/components/Button2.vue";
export default {
  layout: "default",
  middleware: ["isLecturer"],
  components: {
    Header,
    Summary,
    Status,
    Status2,
    ClassList,
    Pie,
    Button,
  },
  computed: {
    ...mapState({
      summaryCard: (state) => state.summaryCard,
      summaryCardLecturer: (state) => state.summaryCardLecturer,
      activeStudentName: (state) => state.activeStudentName,
      classs: (state) => state.classs,
    }),
    ...mapGetters(["loggedInUser", "isAuthenticated"]),
  },
  methods: {
    getOverview: function (id) {
      this.$axios
        .$get("http://143.198.82.254:8000/api/data/overview", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          // console.log(response);
          let data;
          if (response[0].attempts == null) {
            data = null;
          } else {
            data = response[0];
          }
          this.setSummaryCard(data);
          // this.SET_WEATHER(response);
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getClasss: function (id) {
      this.$axios
        .$get("http://143.198.82.254:8000/api/data/classs", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          // console.log(response);
          let data = [];
          // if (response.length > 1) {
          for (let i = 0; i < response.length; i++) {
            data.push(response[i].class);
          }
          // }
          // console.log(data);
          this.setClasss(data);
          this.setCardLecturerClass(response.length);

          this.getLecturer(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLecturer: function (classs) {
      this.$axios
        .$get("http://143.198.82.254:8000/api/data/lecturer", {
          params: {
            classs: classs,
          },
        })
        .then((response) => {
          console.log(response);
          let data = [];
          // if (response.length > 1) {
          // for (let i = 0; i < response.length; i++) {
          //   data.push(response[i].class);
          // }
          // }
          // console.log(data);
          // this.setClasss(data);
          this.setCardLecturerStudents(response[0].students);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ...mapMutations({
      setClasss: "setClasss",
      setSummaryCard: "setSummaryCard",
      setUserLecturer: "setUserLecturer",
      setCardLecturerClass: "setCardLecturerClass",
      setCardLecturerStudents: "setCardLecturerStudents",
    }),
  },
  async mounted() {
    this.getClasss(this.loggedInUser.id);
    this.getOverview(this.loggedInUser.id);
    this.setUserLecturer(this.loggedInUser);

    console.log(this.classs);
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
