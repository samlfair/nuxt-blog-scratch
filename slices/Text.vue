<template>
  <div class="rich-text">
    <prismic-rich-text :field="slice.primary.text" />
  </div>
</template>

<script>
export default {
  name: "Text",
  props: {
    slice: Object
  }
};
</script>

<style lang="scss" scoped>
.rich-text {
  margin: 20px 0px;
  line-height: 1.6em;
}
</style>
