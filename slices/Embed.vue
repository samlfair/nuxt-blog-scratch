<template>
  <div class="embed" v-html="slice.primary.embed.html"></div>
</template>

<script>
export default {
  name: "Embed",
  props: {
    slice: Object
  }
};
</script>

<style lang="scss" scoped>
.rich-text {
  border: 1px solid black;
}
</style>
