<template>
  <div class="code">
    <!-- prettier-ignore -->
    <vue-code-highlight>{{ $prismic.asText(slice.primary.code)}}</vue-code-highlight>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";

export default {
  name: "CodeSnippet",
  components: {
    VueCodeHighlight
  },
  props: {
    slice: Object
  }
};
</script>

<style lang="scss" scoped>
.code {
  pre {
    width: 100%;
  }
}
</style>
