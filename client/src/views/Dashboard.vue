<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Items :editable="true" />
  </div>
</template>
<script>
import Items from "@/components/Items.vue";
export default {
  name: "dashboard",
  components: {
    Items
  }
};
</script>