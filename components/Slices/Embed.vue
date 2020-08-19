<template>
  <div class="embed" v-html="Slice.primary.embed.html"></div>
</template>

<script>
export default {
  name: "Embed",
  props: {
    Slice: Object
  }
};
</script>

<style lang="scss" scoped>
.rich-text {
  border: 1px solid black;
}
</style>
