<template>
  <div style="width: 100%">
    <v-data-table
      :headers="headers"
      :items="students"
      :items-per-page="4"
      class="table-font elevation-10 mx-5"
    >
      <template v-slot:item="{ item }">
        <tr
          style="width: 10% !important"
          @click="getStudentDataButton(item.id, item.fullname.toUpperCase())"
          class="row-pointer"
        >
          <td style="width: 70%">
            <div class="text-truncate" style="max-width: 300px">
              {{ item.fullname.toUpperCase() }}
            </div>
          </td>
          <td style="width: 30%">{{ item.user_id }}</td>
        </tr>
      </template>
    </v-data-table>
    <!-- <hr /> -->
    <!-- <Duration :duration="duration" /> -->
  </div>
</template>

<script>
// import Duration from "~/components/Duration";
import { mapState, mapMutations } from "vuex";
// import { status } from "~/src/class";
export default {
  data() {
    return {
      arraySessions: [],
      // headers: [
      //   {
      //     text: "Jetty",
      //     align: "start",
      //     sortable: false,
      //     value: "name",
      //   },
      //   { text: "Status", value: "calories" },
      // ],
      // items: [
      //   {
      //     name: "Petrochemical Jetty",
      //     calories: "sdfsdfsdfsdfvdsf fkdsmfksod ",
      //   },
      //   {
      //     name: "Ammonia Wharf Jetty",
      //     calories: "sdfsdfsdfsdfvdsf fkdsmfksod ",
      //   },
      //   {
      //     name: "MP10 Jetty",
      //     calories: "sdfsdfsdfsdfvdsf fkdsmfksod ",
      //   },
      //   {
      //     name: "DG Yard",
      //     calories: "sdfsdfsdfsdfvdsf fkdsmfksod ",
      //   },
      //   {
      //     name: "LNG ISO Tank Yard",
      //     calories: "sdfsdfsdfsdfvdsf fkdsmfksod ",
      //   },
      //   {
      //     name: "Jelly bean",
      //     calories: 375,
      //   },
      //   {
      //     name: "Lollipop",
      //     calories: 392,
      //   },
      //   {
      //     name: "Honeycomb",
      //     calories: 408,
      //   },
      //   {
      //     name: "Donut",
      //     calories: 452,
      //   },
      //   {
      //     name: "KitKat",
      //     calories: 518,
      //   },
      // ],
    };
  },
  components: {
    // Duration,
  },

  computed: {
    ...mapState({
      headers: (state) => state.headers2,
      status: (state) => state.status2,
      students: (state) => state.students,
    }),
  },
  // props: ["headers", "status"],
  mounted() {
    // console.log(this.status);
    // this.setStatus([
    //   new status("Petrochemical Jetty", "Good"),
    //   new status("Ammonia Wharf Jetty", "Good"),
    //   new status("OBB Jetty", "Good"),
    //   new status("DG Yard", "Good"),
    //   new status("LNG ISO Tank Yard", "Good"),
    // ]);
  },
  methods: {
    getStudentDataButton: function (id, name) {
      // console.log(this.detail);
      this.getStudentData(id);
      this.setActiveStudentName(name);
    },
    getStudentData: function (id) {
      this.$axios
        .$get("http://143.198.82.254:8000/api/data/details", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          console.log(response);

          let data;
          if (response.length < 1) {
            this.setArraySessionStudent([]);
            return (data = null);
          } else {
            data = response[0];
          }
          this.arraySessions = [];
          for (let i = 0; i < response.length; i++) {
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
          this.setArraySessionStudent(this.arraySessions);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ...mapMutations({
      setStudents: "setStudents",
      setArraySessionStudent: "setArraySessionStudent",
      setActiveStudentName: "setActiveStudentName",
    }),
  },
};
</script>

<style>
.row-pointer:hover {
  cursor: pointer;
}
hr {
  margin: 0 20px;
}
.custom-class2 {
  width: 50px;
}
.text-start {
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  white-space: nowrap !important;
}
.v-application--is-ltr .v-data-footer__select .v-select {
  display: none;
  color: transparent;
}
.v-data-footer__select {
  /* display: none; */
  color: transparent;
}
/* Table */
.v-data-table.table-font.theme--dark {
  background-color: transparent !important;
  border-radius: 10px;
  overflow: hidden;
}
tr {
  /* background-color: rgb(162, 216, 224); */
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0px !important;
  font-size: 0.9em;
  height: 5vh !important;
  width: 100%;
}

tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.4);
  /* background-color: red; */
  /* background-color: rgb(255, 255, 255); */
  padding: 0px !important;
  color: #eee;
  height: 5vh !important;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 0.9em !important;
  height: 5.3vh !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 0.9em !important;
  height: 5.3vh !important;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.3);
  /* background-color: rgb(230, 242, 244); */
  padding: 0px !important;
  color: #eee;
  height: 5vh !important;
}
.v-data-table__wrapper {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  /* text-overflow: ellipsis !important;
  overflow: hidden !important;
  white-space: nowrap !important; */
}
/* End of table */

/* Pixel 2/ Iphone 6/7/8 Plus */
@media (max-width: 500px) {
  .v-data-table__mobile-row__header {
    font-size: 0.8rem;
  }
  .v-data-table__mobile-row__cell {
    font-size: 0.8rem;
  }
  th {
    background-color: rgb(255, 255, 255);
  }
  .v-data-table__mobile-row:nth-of-type(odd) {
    background-color: rgb(230, 242, 244);
  }
}
/* MOTO G4/ Galaxy S5*/
@media (max-width: 360px) {
  .v-data-table__mobile-row__header {
    font-size: 0.8rem;
  }
  .v-data-table__mobile-row__cell {
    font-size: 0.8rem;
  }
}

/* Iphone 5/SE */
@media (max-width: 320px) {
  .v-data-table__mobile-row__header {
    font-size: 0.7rem;
  }
  .v-data-table__mobile-row__cell {
    font-size: 0.7rem;
  }
}

/* Galaxy Fold */
@media (max-width: 300px) {
  .v-data-table__mobile-row__header {
    font-size: 0.65rem;
  }
  .v-data-table__mobile-row__cell {
    font-size: 0.65rem;
  }
}
</style>
