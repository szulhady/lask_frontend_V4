<template>
  <div class="level">
    <div
      id="pie"
      style="width: 25vw; height: 30vh"
      :fetchDataAcceptable="fetchDataAcceptable"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "15%",
          // left: "center",
          orient: "vertical",
          right: 50,
          textStyle: {
            fontSize: 14,
            color: "#fff",
          },
          itemGap: 40,
        },
        series: [
          {
            name: "Attempts",
            type: "pie",
            radius: ["50%", "80%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
                color: "white",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.fetchDataAccurate, name: "Accurate" },
              { value: this.fetchDataAcceptable, name: "Acceptable" },
              { value: this.fetchDataFail, name: "Fail" },
            ],
            center: ["25%", "50%"],
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      var myChart = this.$echarts.init(document.getElementById("pie"));
      myChart.setOption(this.option, true);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }, 1);
  },
  updated() {
    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "15%",
        // left: "center",
        orient: "vertical",
        right: 50,
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
        itemGap: 40,
      },
      series: [
        {
          name: "Attempts",
          type: "pie",
          radius: ["50%", "80%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "16",
              fontWeight: "bold",
              color: "white",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: this.fetchDataAccurate, name: "Accurate" },
            { value: this.fetchDataAcceptable, name: "Acceptable" },
            { value: this.fetchDataFail, name: "Fail" },
          ],
          center: ["25%", "50%"],
        },
      ],
    };
    var myChart = this.$echarts.init(document.getElementById("pie"));
    myChart.setOption(option, true);
    // console.log(this.data)
  },

  props: [
    "fetchDataAcceptable",
    "fetchDataAccurate",
    "fetchDataFail",
    "yAxis",
    "max",
    "time",
  ],
};
</script>

<style scoped>
.v-card__subtitle {
  font-size: 0.9em;
  padding: 0px 0px 0px 40px;
  color: aliceblue;
}

canvas {
  width: 100%;
  z-index: 10;
}
</style>
