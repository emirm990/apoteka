<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <Items :editable="false" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Items from "@/components/Items.vue";
export default {
  name: "home",
  components: {
    HelloWorld,
    Items
  }
};
</script>
