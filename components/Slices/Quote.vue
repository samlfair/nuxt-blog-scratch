<template>
  <div class="quote">
    <q>
      {{ $prismic.asText(Slice.primary.quote) }}
    </q>
  </div>
</template>

<script>
export default {
  name: "Quote",
  props: {
    Slice: Object
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 500px) {
  .quote {
    width: 140%;
    margin: 50px 0px 50px -50px;
  }
}

q {
  margin: 20px 0px;
  line-height: 2em;
  font-size: 1.6em;
  font-style: italic;
  font-family: "Lora", serif;
  margin-left: -1ch;
  quotes: "“" "”";
  &:before {
    content: open-quote;
  }
  &:after {
    content: close-quote;
  }
}
</style>
