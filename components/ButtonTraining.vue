<template>
  <div
    style="display: flex; justify-content: space-around; align-items: center"
  >
    <!-- </v-btn -->
    <!-- > -->
    <v-btn
      @click="setOpenDialogTraining(true)"
      class="neon"
      style="width: 15vw; height: 7vh; font-size: 0.9em"
      v-if="!submitButton"
      >START SESSION</v-btn
    >
    <v-btn
      class="neon"
      style="width: 15vw; height: 7vh; font-size: 0.9em"
      v-if="submitButton"
      @click="submitSession"
      >SUMBIT</v-btn
    >
    <!-- <v-btn
      to="/"
      class="neon"
      style="width: 15vw; height: 7vh; font-size: 0.9em"
      @click="setOpenDialogTraining(true)"
      >SUBMIT</v-btn
    > -->
    <v-btn
      to="/overview"
      class="neon"
      style="
        width: 15vw;
        height: 7vh;
        font-size: 0.9em;
        display: flex;
        justify-content: center;
        text-align: center;
      "
    >
      <!-- <router-link to="/trends"> View Trends </router-link> -->
      BACK TO HOME
    </v-btn>
    <!-- <v-card-subtitle
      > -->
    <!-- <router-link
      to="/trends"
      class="neon2"
      style="width: 100px; border-radius: 5px; padding: 5px 3px; margin: 0 3px"
    >
      View Trends →</router-link
    > -->
    <!-- <router-link to="/trends"> Go to Trends →</router-link> -->
    <!-- </v-card-subtitle
    > -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  methods: {
    ...mapMutations({
      setOpenDialogTraining: "setOpenDialogTraining",
      setOpenDialogTraining: "setOpenDialogTraining",
      setId: "setId",
      setClear: "setClear",
    }),
    startTraining: function () {
      this.action = true;
    },
    submitSession: function () {
      // setTimeout(() => {
      //   window.location.reload();
      // }, 100);

      this.$axios
        .$post("http://143.198.82.254:8000/api/training", null, {
          params: {
            userid: this.loggedInUser.id,
            accuratePoint: this.stateAccuratePoint,
            acceptablePoint: this.stateAcceptablePoint,
            failPoint: this.stateFailPoint,
            goodForce: this.stateGoodForce,
            exceedForce: this.stateExceedForce,
            goodInjection: this.stateGoodInjection,
            badInjection: this.stateBadInjection,
            failInjection: this.stateFailInjection,
          },
        })
        .then((response) => {
          // console.log(response);
          // console.log(this.arrayPerformance);
          // this.setFetchData(data);
          // this.setId(null);
          // this.setClear();
          // setTimeout(() => {
          window.location.reload();
          // }, 100);
        });
    },
    logout: async function () {
      await this.$auth.logout();
      // this.setDetailActive("");
      // this.doUnSubscribe();
      // this.resetState()
      this.action = false;
    },
    cancel: function () {
      this.rightDrawer = false;
      this.dialog2 = true;
    },
    doUnSubscribe() {
      const { topic } = this.subscription;
      this.client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
        }
      });
    },
  },
  data() {
    return {
      action: false,
    };
  },
  computed: {
    ...mapState({
      submitButton: (state) => state.submitButton,
      stateGoodInjection: (state) => state.stateGoodInjection,
      stateBadInjection: (state) => state.stateBadInjection,
      stateFailInjection: (state) => state.stateFailInjection,
      stateAccuratePoint: (state) => state.stateAccuratePoint,
      stateAcceptablePoint: (state) => state.stateAcceptablePoint,
      stateFailPoint: (state) => state.stateFailPoint,
      stateGoodForce: (state) => state.stateGoodForce,
      stateExceedForce: (state) => state.stateExceedForce,
    }),
    ...mapGetters(["loggedInUser", "isAuthenticated"]),
  },
  mounted() {
    this.setId(null);
    this.setClear();
  },
};
</script>

<style>
:root {
  --clr-neon: #14f7ff;
  --clr-bg: #001414;
  --font-size: 3rem;
}
.v-btn__content {
  white-space: normal;
  flex: unset !important;
}
a {
  text-decoration: none;
}
</style>
<style scoped>
.v-btn__content {
  color: var(--clr-neon);
}
.neon2 {
  color: var(--clr-neon);
  text-decoration: none;
}
.neon {
  /* margin-top: -150px; */
  font-size: var(--font-size);
  /* display: inline-block; */
  position: relative;
  cursor: pointer;
  border: var(--clr-neon) 0.125em solid;

  padding: 0.25em 1em;
  border-radius: 0.25em;
  text-shadow: 0 0 0.2em #fff7, 0 0 0.3em var(--clr-neon);
  box-shadow: inset 0 0 0.5em var(--clr-neon), 0 0 0.5em var(--clr-neon);
}

.neon::before {
  content: "";
  position: absolute;
  top: 140%;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--clr-neon);
  /* transform: perspective(1.2em) rotateX(10deg) scale(1.3, 0.4); */
  filter: blur(0.5em);
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 100ms linear;
}

.neon::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--clr-neon);
  box-shadow: 0 0 2em var(--clr-neon);
  z-index: -1;
  opacity: 0;
  transition: opacity 100ms linear;
}

.neon:hover::after {
  opacity: 1;
}
.neon:hover,
.neon:focus {
  color: white;
}
.neon:hover::before {
  opacity: 0.8;
}

.neon2::before {
  content: "";
  position: absolute;
  /* top: 140%;
  left: 0; */
  /* width: 100%;
  height: 100%; */
  background: var(--clr-neon);
  transform: perspective(0.2em) rotateX(10deg) scale(1.3, 0.4);
  filter: blur(0.5em);
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 100ms linear;
}

.neon2::after {
  content: "";
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
  background: var(--clr-neon);
  box-shadow: 0 0 2em var(--clr-neon);
  z-index: -1;
  opacity: 0;
  transition: opacity 100ms linear;
}

.neon2:hover::after {
  opacity: 1;
}
.neon2:hover,
.neon2:focus {
  color: white;
  box-shadow: 0 0 2em var(--clr-neon);
}
.neon2:hover::before {
  opacity: 0.8;
}
</style>
