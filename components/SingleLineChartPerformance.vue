<template>
  <div class="level">
    <v-card-subtitle class="sidebar rounded-lg pt-3 pb-3">
      Performance
    </v-card-subtitle>
    <div
      v-show="attempts"
      id="single"
      style="width: 40vw; height: 30vh"
      :arrayDate="arrayDate"
    ></div>
    <div v-show="!attempts" class="zero">No data</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: { show: true, title: "Save" },
        //   },
        // },
        legend: {
          data: ["Success Rate"],
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
        xAxis: {
          name: "Time",
          offset: 20,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 12,
            color: "#fff",
          },
          axisLabel: {
            fontSize: 12,
            verticalAlign: "bottom",
            textStyle: {
              color: "#fff",
            },
          },
          type: "category",
          data: this.arrayDate,
        },
        yAxis: {
          nameTextStyle: {
            fontSize: 12,
            color: "#fff",
          },
          name: "%",
          type: "value",
          min: 0,
          max: 100,
          axisLabel: {
            // formatter: "{value} cm",
            fontSize: 12,
            textStyle: {
              color: "#fff",
            },
          },
        },

        series: [
          {
            //min data set
            name: "Success Rate",
            data: this.arrayPerformance,
            type: "line",
            fontSize: 30,
            color: "#36c25b",
            areaStyle: { color: "rgba(135, 211, 124, 1)" },
            label: {
              color: "black",
              fontSize: 15,
              formatter: function (d) {
                return d.name + d.data;
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      var myChart = this.$echarts.init(document.getElementById("single"));
      myChart.setOption(this.option, true);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }, 1);
  },
  updated() {
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: { show: true, title: "Save" },
      //   },
      // },
      legend: {
        data: ["Success Rate"],
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
      xAxis: {
        name: "Time",
        offset: 20,
        nameLocation: "center",
        nameTextStyle: {
          fontSize: 12,
          color: "#fff",
        },
        axisLabel: {
          fontSize: 12,
          verticalAlign: "bottom",
          textStyle: {
            color: "#fff",
          },
        },
        type: "category",
        data: this.arrayDate,
      },
      yAxis: {
        nameTextStyle: {
          fontSize: 12,
          color: "#fff",
        },
        name: "%",
        type: "value",
        min: 0,
        max: 100,
        axisLabel: {
          // formatter: "{value} cm",
          fontSize: 12,
          textStyle: {
            color: "#fff",
          },
        },
      },

      series: [
        {
          //min data set
          name: "Success Rate",
          data: this.arrayPerformance,
          type: "line",
          fontSize: 30,
          color: "#36c25b",
          areaStyle: { color: "rgba(135, 211, 124, 1)" },
          label: {
            color: "black",
            fontSize: 15,
            formatter: function (d) {
              return d.name + d.data;
            },
          },
        },
      ],
    };
    var myChart = this.$echarts.init(document.getElementById("single"));
    myChart.setOption(option, true);
    // console.log(this.data)
  },
  computed: {
    ...mapState({
      attempts: (state) => state.attempts,
    }),
  },
  props: ["arrayPerformance", "arrayDate", "yAxis", "max", "time"],
};
</script>

<style scoped>
.v-card__subtitle {
  font-size: 0.9em;
  padding: 0px 0px 0px 40px;
  color: aliceblue;
}
.zero {
  width: 40vw;
  height: 30vh;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
