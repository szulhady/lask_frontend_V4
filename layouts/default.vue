<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      height="46px"
      app
      class="top-header"
    >
      <img src="syringe.ico" alt="syringe icon" width="30px" />
      <v-toolbar-title v-text="title" class="title-main" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <!-- <v-container> -->
      <nuxt />
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      title: "Local Anaesthesia Simulator Kit",
    };
  },
};
</script>

<style lang="scss">
html {
  overflow-y: hidden;
}
* {
  font-family: "Orbitron", sans-serif;
  letter-spacing: 1px;
}
body {
  // margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}
.top-header {
  @include header-background;
}
.v-application::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: transparent;
  background-image: url(~/assets/pattern.png);
  background-size: 4.6875rem;
  background-repeat: repeat;
  background-attachment: initial;
}
.v-application {
  @include main-background;
  z-index: 2;
}
.title-main {
  font-size: 1rem;
  color: white;
  padding-left: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
}
.v-main__wrap::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: -5;
  // background: linear-gradient(180deg, rgba(200, 200, 200, 0.9) 0, #333 100%);
  background: linear-gradient(180deg, rgba(50, 70, 80, 0.9) 0, #0d101b 100%);
}
.v-main__wrap::after {
  content: "";
  position: fixed;
  top: 0;
  height: 100%;
  left: 0;
  right: 0;
  z-index: -10;
  background-color: #273136;
  background-image: linear-gradient(
    180deg,
    rgba(50, 70, 80, 0.9) 0,
    #0d101b 100%
  );
  background-image: url("/cover5.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: initial;
  height: 100%;
  transition: background 0.2s linear;
  background-size: cover;
}
</style>
