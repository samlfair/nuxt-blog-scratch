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
    ul,
    ol {
      margin-left: 24px;
      margin: $soft-break 0 $soft-break 24px;
      li + li {
        margin-top: $soft-break;
      }
    }
    ul a,
    ol a,
    p a {
      box-shadow: -2px -1px 0px 0px inset white,
        0px -8px 0px 0px inset $lightgrey;
      padding-left: 2px;
      margin-left: -2px;
      transition: box-shadow 0.2s;
      &:hover {
        box-shadow: -2px -1px 0px 0px inset white,
          0px -8px 0px 0px inset #dddddd;
      }
    }
  }
}
</style>
