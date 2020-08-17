<template>
  <div class="layout">
    <Nuxt />
  </div>
</template>

<style lang="scss">
.layout {
  max-width: 700px;
  margin: auto;
  padding: 10vw 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .container {
    align-self: stretch;
  }
  > .wide {
    width: 100vw;
  }
}
</style>
