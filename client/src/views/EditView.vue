<template>
  <div class="about">
    <h1>This is an Edit View</h1>
    <EditItem :id="id" />
  </div>
</template>
<script>
import EditItem from "@/components/EditItem.vue";

export default {
  name: "EditView",
  components: {
    EditItem
  },
  props: {
    id: Number
  }
};
</script>