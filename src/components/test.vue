<template>
  <div class="w-64 bg-black text-white p-3 m-5 relative arrow-bottom">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, aspernatur similique?
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() { },
  mounted() { },
  methods: {},
});
</script>


<style scoped>
.arrow-bottom:after {
  content: " ";
  position: absolute;
  right: 30px;
  bottom: -25px;
  border-top: 25px solid black;
  border-right: 25px solid transparent;
  border-left: 25px solid transparent;
  border-bottom: none;
}
</style>


