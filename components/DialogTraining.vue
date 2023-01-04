<template>
  <v-row justify="center">
    <v-scroll-y-transition>
      <v-dialog v-model="state" persistent max-width="290">
        <v-card style="background: rgba(0, 0, 0, 0.7)">
          <v-card-title class="text-h5"> ACTION </v-card-title>
          <v-card-text>Please select device.</v-card-text>
          <div style="width: 70%; margin: auto">
            <v-select
              item-disabled="disable"
              item-text="name"
              :items="items"
              label="Device"
              outlined
              item-color="warning"
              placeholder="Device"
              @change="onChange($event)"
              v-model="selectedDevice"
            >
            </v-select>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              :disabled="!selectedDevice"
              color="green darken-1"
              text
              @click="selectDevice"
            >
              Confirm
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              @click="
                setOpenDialogTraining(false);
                selectedDevice = null;
              "
            >
              <!-- @click="setOpenDialogTraining(false), console.log("here")" -->
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-scroll-y-transition>
  </v-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      setOpenDialogTraining: "setOpenDialogTraining",
      setSubmitButton: "setSubmitButton",
      setId: "setId",
    }),
    onChange(e) {
      // console.log(e);
      this.selectedDevice = e;
    },
    getDevice: function (id) {
      this.$axios
        .$get("http://143.198.82.254:8000/api/data/device", {})
        .then((response) => {
          console.log(response);
          // let data;
          // if (response[0].attempts == null) {
          //   data = null;
          // } else {
          //   data = response[0];
          // }
          // this.setSummaryCard(data);
          // this.setFetchData(data);
          // this.SET_WEATHER(response);
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectDevice() {
      this.socket.emit("test", this.selectedDevice);
      this.socket.emit("device", this.selectedDevice);
      this.setOpenDialogTraining(false);
      this.setSubmitButton(true);
      let a = this.items.filter((item) => item.name == this.selectedDevice);
      // console.log(a[0]);
      this.setId(a[0].deviceId);
    },
  },
  data() {
    return {
      items: [
        {
          name: "Device 1",
          deviceId: 1,
          disable: false,
        },
        {
          name: "Device 2",
          deviceId: 2,
          disable: false,
        },
        {
          name: "Device 3",
          deviceId: 3,
          disable: false,
        },
        {
          name: "Device 4",
          deviceId: 4,
          disable: false,
        },
      ],
      selectedDevice: null,
      connection: {
        host: "txio.live",
        port: 8083,
        endpoint: "/mqtt",
        clean: true, // Reserved session
        connectTimeout: 4000, // Time out
        reconnectPeriod: 4000, // Reconnection interval
      },
      subscription: {
        // topic: "geyzer/#",
        topic: "geyzer/data/#",
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
    };
  },
  async mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/",
    });
    /* Listen for events: */
    this.socket.on("test", (msg, cb) => {
      /* Handle event */
      // socket.emit("test", "hello");
      console.log(msg);
    });
    this.socket.on("error", (msg, cb) => {
      /* Handle event */
      // console.log(msg);
    });
    this.socket.on("room", (msg, cb) => {
      /* Handle event */
      console.log(msg.length);
      if (msg.length === 0) return;
      if (msg != null || msg.length !== 0) {
        const found = this.items.find((element) => element.name == msg);
        // console.log(found.name, "found");
        var index = this.items
          .map(function (item) {
            return item.name;
          })
          .indexOf(found.name);
        // console.log(index);
        this.items[index].disable = true;
        // console.log(this.items[index].disable);
      }
    });
    this.socket.on("roomclear", (msg, cb) => {
      /* Handle event */
      console.log(msg);
      if (msg != null) {
        const found = this.items.find((element) => element.name == msg);
        // console.log(found.name, "found");
        var index = this.items
          .map(function (item) {
            return item.name;
          })
          .indexOf(found.name);
        // console.log(index);
        this.items[index].disable = false;
        // console.log(this.items[index].disable);
      }
    });
    this.socket.on("roomclearall", (msg, cb) => {
      /* Handle event */
      console.log(msg);
      this.items.forEach((element) => {
        element.disable = false;
      });
      if (msg.length === 0) return;

      msg.forEach((element) => {
        console.log(element);
        var index = this.items
          .map(function (item) {
            return item.name;
          })
          .indexOf(element);
        console.log(index);
        this.items[index].disable = true;
      });
    });
    this.getDevice();
  },
  props: ["state"],
};
</script>

<style></style>
