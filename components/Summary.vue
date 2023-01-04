<template>
  <section>
    <v-card
      class="elevation-10 rounded-lg"
      style="background: rgba(0, 0, 0, 0.5); height: 12vh; overflow: hidden"
    >
      <div style="display: flex; height: 100%">
        <div cols="4" class="icon-center" style="width: 30%">
          <v-icon class="display-2" :color="classIn">
            {{ icon }}
          </v-icon>
        </div>
        <div cols="8" class="data" style="width: 70%">
          <div>
            <h4
              class="text"
              style="
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              "
            >
              {{ description }}
            </h4>
          </div>
          <div>
            <h2 class="text text2">{{ data }}</h2>
          </div>
        </div>
      </div>
    </v-card>
  </section>
</template>

<script>
export default {
  props: ["icon", "description", "data", "classIn"],
};
</script>

<style scoped>
.icon-center {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 15px; */
}

.data {
  text-align: right;
  padding-right: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}
.text {
  color: white;
  font-size: 1em !important;
}
.text2 {
  color: white;
  font-size: 1.2em !important;
}
</style>
