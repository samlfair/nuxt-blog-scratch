<template>
  <div
    class="image-with-caption"
    :style="{ backgroundImage: `url(${Slice.primary.image.url})` }"
  >
    <div class="caption">
      <prismic-rich-text :field="Slice.primary.caption" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageWithCaption",
  props: {
    Slice: Object
  }
};
</script>

<style lang="scss" scoped>
.image-with-caption {
  height: 400px;
  background-size: cover;
  background-position: center center;
  margin: 40px 0px;
  display: flex;
  align-items: flex-end;
  border-radius: 4px;
  overflow: hidden;
  .caption {
    color: white;
    font-weight: bold;
    opacity: 0%;
    transition: all 0.2s;
    padding: 30px;
    text-shadow: 0 0 70px rgb(80, 80, 80);
  }
  &:hover .caption {
    opacity: 100%;
  }
}
</style>
