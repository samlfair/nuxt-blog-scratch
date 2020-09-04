<template>
  <div class="info-box">
    <div class="icon">
      ℹ︎
    </div>
    <prismic-rich-text :field="slice.primary.text" />
  </div>
</template>

<script>
export default {
  name: "InfoBox",
  props: {
    slice: Object
  }
};
</script>

<style lang="scss" scoped>
.info-box {
  background: $lightgrey;
  padding: 16px;
  border-radius: 10px;
  margin: 0;
  display: flex;
  flex-direction: row;
  color: $grey;
  line-height: 1.6em;

  .icon {
    margin: 2px 15px 0px 2px;
    line-height: 1em;
    border-radius: 50%;
    align-self: flex-start;
    padding: 3px 7px 6px 7px;
    border: 2px solid $grey;
  }

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
      color: #6b6b6b;
      box-shadow: -2px -1px 0px 0px inset $lightgrey,
        0px -8px 0px 0px inset $dimgrey;
      padding-left: 2px;
      margin-left: -2px;
      transition: box-shadow 0.2s;
      &:hover {
        box-shadow: -2px -1px 0px 0px inset $lightgrey,
          0px -8px 0px 0px inset #dddddd;
      }
    }
  }
}
</style>
