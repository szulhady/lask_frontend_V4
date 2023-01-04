<template>
  <section style="display: flex">
    <div class="left">
      <div class="model">
        <Model :position="position" />
      </div>
    </div>
    <div class="right">
      <v-card style="background: rgba(0, 0, 0, 0.3); margin: 1vw">
        <SingleLineChart :data="forceArray" :time="timeArray" />
      </v-card>
      <v-card style="background: rgba(0, 0, 0, 0.3); margin: 1vw">
        <BarChartHorizontal
          :acceptable="acceptable"
          :accurate="accurate"
          :fail="fail"
        />
      </v-card>
      <ButtonTraining />
    </div>
    <DialogTraining :state="openDialogTraining" />
  </section>
</template>

<script>
import mqtt from "mqtt";

import Model from "~/components/Model";
import SingleLineChart from "~/components/SingleLineChart.vue";
import BarChartHorizontal from "~/components/BarChartHorizontal.vue";
import ButtonTraining from "~/components/ButtonTraining.vue";
import DialogTraining from "~/components/DialogTraining.vue";
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

import { mapState, mapMutations } from "vuex";
export default {
  middleware: ["isStudent"],
  transition: {
    name: "home",
    mode: "out-in",
  },
  components: {
    Model,
    SingleLineChart,
    BarChartHorizontal,
    ButtonTraining,
    DialogTraining,
    Logo,
    VuetifyLogo,
  },
  computed: {
    ...mapState({
      openDialogTraining: (state) => state.openDialogTraining,
      id: (state) => state.id,
    }),
  },
  async mounted() {},
  watch: {
    id() {
      // console.log("Foo Changed!");
      // console.log(this.id);
      if (this.id !== null) {
        this.createConnection();
        this.doSubscribe();
      }
    },
  },
  data() {
    return {
      connection: {
        // host: "broker.mqttdashboard.com",
        host: "www.txio.live",
        // port: 1883,
        port: 8083,
        endpoint: "/mqtt",
        clean: true, // Reserved session
        connectTimeout: 4000, // Time out
        reconnectPeriod: 4000, // Reconnection interval
      },
      subscription: {
        topic: "lask/data",
        // topic: "debug/data/lask",
        qos: 0,
      },
      receiveNews: "",
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
      position: 0,
      accurate: 0,
      acceptable: 0,
      fail: 0,
      inject: true,
      injectForce: false,
      // injectCount: false,
      force: 0,
      realTime: "",
      timeArray: [],
      pressureData: "",
      forceArray: [],
      forceArrayInjection: [],
      timeStart: null,
      timeStop: "",
      positionAccutate: 0, //center
      positionAcceptable: 0, //inner ring
      positionFailed: 0, //outer ring
      forceAcceptable: 0, //in range force (0.83N to 1.34N)
      forceExceed: 0, //exceed force (more than 1.34N)
      forceAverage: 0,
      lastPosition: "",
      goodInjection: 0,
      badInjection: 0,
      failInjection: 0,
      injectionCount: false,
      count: 0,
      forceSum: 0,
    };
  },

  methods: {
    // Create connection
    createConnection() {
      const { host, port, endpoint, ...options } = this.connection;
      const connectUrl = `wss://${host}:${port}${endpoint}`;
      try {
        this.client = mqtt.connect(connectUrl, options);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }
      this.client.on("connect", () => {
        console.log("Connection succeeded!");
      });
      this.client.on("error", (error) => {
        console.log("Connection failed", error);
      });
      this.client.on("message", (topic, message) => {
        // if (topic === "testtopic/mqtt_yein") {
        //   message = JSON.parse(message);

        //   console.log(message);
        // }
        if (topic === "lask/data") {
          message = JSON.parse(message);
          // console.log(message);

          // message.position = message.point;
          if (message.id == this.id) {
            if (this.timeArray.length >= 10) {
              this.forceArray.splice(0, 1);
              this.forceArray.push(message.force);
              this.timeArray.splice(0, 1);
              this.timeArray.push(this.realTime);
            } else {
              this.forceArray.push(message.force);
              this.timeArray.push(this.realTime);
            }

            this.position = message.point;
            this.force = message.force;

            // if (this.force != 0) {
            //   this.injectForce = true;
            //   this.injectCount = true;
            // }

            if (this.position == "N/A") {
              this.inject = true;
              // console.log("N/A");
              // this.injectCount = false;
              this.timeStop = new Date().getTime();
              // console.log(this.timeStop);
              if (this.timeStart) {
                // console.log(this.timeStop - this.timeStart);
              }
              //reset time start

              if (this.count > 0) {
                this.forceAverage = this.forceSum / this.count;
                // console.log("Sum : ", this.forceSum);
                // console.log("Count : ", this.count);
                // console.log("Avg : ", this.forceAverage);

                if (
                  this.lastPosition == "Center" ||
                  this.lastPosition == "Inner Ring"
                ) {
                  if (this.forceAverage < 0.83 && this.forceAverage > 0.013) {
                    this.goodInjection = this.goodInjection + 1;
                    this.setStateGoodInjection(this.goodInjection);
                    this.setStateGoodForce(this.goodInjection);
                  } else {
                    this.badInjection = this.badInjection + 1;
                    this.setStateBadInjection(this.badInjection);
                    this.setStateExceedForce(this.badInjection);
                  }
                } else if (this.lastPosition == "Outer Ring") {
                  this.failInjection = this.failInjection + 1;
                  this.setStateFailInjection(this.failInjection);
                }
              }
              this.count = 0;
              this.forceSum = 0;
              this.lastPosition = "N/A";
            }

            // change state inject force

            // position 1 logicc
            if (
              this.position == "Outer Ring" &&
              this.inject == true &&
              message.force != 0
            ) {
              this.fail = this.fail + 1;
              this.setStateFailPoint(this.fail);
              this.inject = false;
            }
            if (
              this.position == "Outer Ring" &&
              message.force != 0 &&
              this.injectForce == true
            ) {
              this.timeStart = new Date().getTime();
              this.injectForce = false;
            }
            if (this.position == "Outer Ring" && message.force != 0) {
              // this.forceArrayInjection.push(parseFloat(this.force));
              this.forceSum = this.forceSum + parseFloat(this.force);
              this.count = this.count + 1;
              this.lastPosition = "Outer Ring";
            }
            // position 2 logic
            if (
              this.position == "Inner Ring" &&
              this.inject == true &&
              message.force != 0
            ) {
              this.acceptable = this.acceptable + 1;
              this.setStateAcceptablePoint(this.acceptable);
              this.inject = false;
            }
            if (
              this.position == "Inner Ring" &&
              message.force != 0 &&
              this.injectForce == true
            ) {
              this.timeStart = new Date().getTime();
              // this.forceArrayInjection = [];
              // this.forceAverage = 0;
              this.injectForce = false;
            }
            if (this.position == "Inner Ring" && message.force != 0) {
              // this.forceArrayInjection.push(parseFloat(this.force));
              this.forceSum = this.forceSum + parseFloat(this.force);
              this.count = this.count + 1;
              this.lastPosition = "Inner Ring";
            }
            //position 3 logic
            if (
              this.position == "Center" &&
              this.inject == true &&
              message.force != 0
            ) {
              this.accurate = this.accurate + 1;
              this.setStateAccuratePoint(this.accurate);
              this.inject = false;
            }
            if (
              this.position == "Center" &&
              message.force != 0 &&
              this.injectForce == true
            ) {
              this.timeStart = new Date().getTime();
              // this.forceArrayInjection = [];
              // this.forceAverage = 0;
              this.injectForce = false;
            }
            if (this.position == "Center" && message.force != 0) {
              // this.forceArrayInjection.push(parseFloat(this.force));
              this.forceSum = this.forceSum + parseFloat(this.force);
              this.count = this.count + 1;
              this.lastPosition = "Center";
            }

            // console.log("Good Injection : ", this.goodInjection);
            // console.log("Bad Injection : ", this.badInjection);
            // console.log("Fail Injection : ", this.failInjection);
          }
        }
      });
    },
    doSubscribe() {
      const { topic, qos } = this.subscription;
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          return;
        }
        this.subscribeSuccess = true;
      });
    },
    doUnSubscribe() {
      const { topic } = this.subscription;
      this.client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
        }
      });
    },
    adddata: function () {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      // add a zero in front of numbers<10
      m = checkTime(m);
      s = checkTime(s);
      this.realTime = h + ":" + m + ":" + s;
      // this.getCurrentTimeArray(this.realTime)
    },
    ...mapMutations({
      setOpenDialogTraining: "setOpenDialogTraining",
      setSubmitButton: "setSubmitButton",
      setStateGoodInjection: "setStateGoodInjection",
      setStateBadInjection: "setStateBadInjection",
      setStateFailInjection: "setStateFailInjection",
      setStateAccuratePoint: "setStateAccuratePoint",
      setStateAcceptablePoint: "setStateAcceptablePoint",
      setStateFailPoint: "setStateFailPoint",
      setStateGoodForce: "setStateGoodForce",
      setStateExceedForce: "setStateExceedForce",
      setId: "setId",
    }),
  },
  mounted() {
    setInterval(this.adddata, 1000);
    // this.createConnection();
    // this.doUnSubscribe();
    this.setOpenDialogTraining(false);
    this.setSubmitButton(false);
    this.setId(null);
  },
};
</script>

<style lang="scss">
.home-enter-active,
.home-leave-active {
  transition: opacity 0.5s;
}
.home-enter,
.home-leave-active {
  opacity: 0;
}
.left {
  width: 60vw !important;
  height: calc(100vh - 46px - 10vh);
}
.right {
  width: 40vw !important;
  height: calc(100vh - 46px - 10vh);
}
.model {
  @include frame-border;
  // width: 60vw !important;
  margin: 1vh;
  // height: 80vh;
  height: calc(100vh - 65px);
  // height: calc(80vh + 20px);
  overflow: hidden;
}
</style>
