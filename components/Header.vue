<template>
  <h1 class="header">{{ header }}</h1>
</template>

<script>
export default {
  props: ["header"],
};
</script>

<style>
.header {
  color: #eee;
  padding: 20px;
}
</style>
