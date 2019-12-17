<template>
  <Items :editable="true" />
</template>
<script>
import Items from "@/components/Items.vue";
export default {
  name: "EditItems",
  components: {
    Items
  }
};
</script>
