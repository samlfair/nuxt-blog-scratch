<template>
  <div>
    <div v-for="(slice, index) in SliceZone" :key="index">
      <div v-if="slice.slice_type === 'text'">
        <RichText :slice="slice" />
      </div>
      <div v-if="slice.slice_type === 'quote'">
        <Quote :slice="slice" />
      </div>
      <div v-if="slice.slice_type === 'image_with_caption'">
        <ImageWithCaption :slice="slice" />
      </div>
    </div>
  </div>
</template>

<script>
import RichText from "./Slices/RichText";
import Quote from "./Slices/Quote";
import ImageWithCaption from "./Slices/ImageWithCaption";

export default {
  name: "SliceZone",
  components: {
    RichText,
    Quote,
    ImageWithCaption
  },
  props: {
    SliceZone: Array
  }
};
</script>
