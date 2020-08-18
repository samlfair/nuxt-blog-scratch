<template>
  <div class="layout">
    <div class="col-left"></div>
    <div class="col-middle">
      <!-- <Nav /> -->
      <Nuxt />
    </div>
    <div class="col-right"></div>
  </div>
</template>

<script>
// import Nav from "../components/Nav";

// export default {
//   components: {
//     Nav
//   }
// };
</script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: calc(100vh - 2em);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .col-left {
    flex: 3 1 20px;
    max-width: 200px;
  }
  .col-middle {
    flex: 2 1 400px;
    max-width: 700px;
  }
  .col-right {
    flex: 5 1 20px;
  }
}
</style>
