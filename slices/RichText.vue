<template>
  <div class="rich-text">
    <prismic-rich-text :field="slice.primary.text" />
  </div>
</template>

<script>
export default {
  name: "RichText",
  props: {
    slice: Object
  }
};
</script>

<style lang="scss" scoped>
.rich-text {
  margin: 20px 0px;
  line-height: 1.6em;
  /deep/ {
    p + p {
      margin-top: $paragraph-break;
    }
    ul {
      margin-left: 24px;
      margin: $soft-break 0 $soft-break 24px;
      li + li {
        margin-top: $soft-break;
      }
    }
    a {
      box-shadow: 0px -1px 0px 0px inset white, 0px -3px 0px 0px inset #c9c9c9;
      text-shadow: 1px 1px white, 1px -1px white, -1px 1px white,
        -1px -1px white;
      transition: box-shadow 0.2s;
      &:hover {
        box-shadow: 0px -1px 0px 0px inset white, 0px -3px 0px 0px inset #a5a5a5;
      }
    }
  }
}
</style>
