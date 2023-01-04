<template>
  <div class="level">
    <v-card-subtitle class="sidebar rounded-lg pt-3 pb-3">
      Class
    </v-card-subtitle>
    <div style="display: flex; max-width: 40vw; width: 40vw; height: 30vh">
      <div class="left2">
        <div style="width: 60%; margin: auto">
          <div class="my-1">
            <v-text-field label="Add Class" v-model="class2"></v-text-field>
            <v-btn
              class="neon3"
              style="width: 10vw; height: 4vh; font-size: 0.9em"
              @click="addClass"
              >Add</v-btn
            >
          </div>
          <div class="my-1">
            <v-text-field label="Delete Class" v-model="class3"></v-text-field>
            <v-btn
              class="neon3"
              style="width: 10vw; height: 4vh; font-size: 0.9em"
              @click="deleteClass"
              >Delete</v-btn
            >
          </div>
        </div>
      </div>
      <div class="right2">
        <div class="classContainer">
          <v-row v-if="classs.length > 0" style="justify-content: space-evenly">
            <v-col
              v-for="(summary, index) in classs"
              :key="index"
              style="flex-grow: 0"
            >
              <ClassButton :detail="summary" />
            </v-col>
          </v-row>
          <div
            v-else
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100% !important;
              overflow: hidden !important;
            "
          >
            No Class
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassButton from "~/components/ClassButton";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      class2: "",
      class3: "",
      summaryButton: [
        {
          name: "Class 1",
        },
        {
          name: "Class 2",
        },
        {
          name: "Class 3",
        },
        {
          name: "Class 4",
        },
        {
          name: "Class 5",
        },
        {
          name: "Class 6",
        },
        {
          name: "Class 7",
        },
        {
          name: "Class 8",
        },
        {
          name: "Class 9",
        },
        {
          name: "Class 10",
        },
      ],
    };
  },
  mounted() {},
  updated() {},
  components: {
    ClassButton,
  },
  computed: {
    ...mapState({
      classs: (state) => state.classs,
    }),
    ...mapGetters(["loggedInUser", "isAuthenticated"]),
  },
  methods: {
    addClass: function () {
      this.addClasss(this.loggedInUser.id, this.class2);
    },
    deleteClass: function () {
      this.deleteClasss(this.loggedInUser.id, this.class3);
    },
    addClasss: function (id, class2) {
      this.$axios
        .$post(
          "http://143.198.82.254:8000/api/data/classs",
          {},
          {
            params: {
              id: id,
              classs: class2,
            },
          }
        )
        .then((response) => {
          // console.log(response);
          // let data;
          // if (response[0].attempts == null) {
          //   data = null;
          // } else {
          //   data = response[0];
          // }
          setTimeout(() => {
            window.location.reload();
          }, 200);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteClasss: function (id, class2) {
      this.$axios
        .$delete("http://143.198.82.254:8000/api/data/classs", {
          params: {
            id: id,
            classs: class2,
          },
        })
        .then((response) => {
          // console.log(response);
          // let data;
          // if (response[0].attempts == null) {
          //   data = null;
          // } else {
          //   data = response[0];
          // }
          setTimeout(() => {
            window.location.reload();
          }, 200);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.v-card__subtitle {
  font-size: 0.9em;
  padding: 0px 0px 0px 40px;
  color: aliceblue;
}

.classContainer {
  /* overflow: scroll; */
  height: 100%;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px 10px white;
  /* box-shadow: inset 0 0 10px 10px green; */
  border: solid 3px transparent;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px 10px rgb(2, 90, 115);
  /* box-shadow: inset 0 0 10px 10px red; */
  border: solid 3px transparent;
}

.left2 {
  width: 40%;

  display: flex;
  flex-direction: column;
}
.right2 {
  width: 60%;
  /* overflow: scroll; */
  overflow-x: hidden;
  /* overflow: scroll; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
