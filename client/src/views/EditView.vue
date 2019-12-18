<template>
  <div class="about">
    <h1>This is an Edit View</h1>
    <EditItem :id="this.id" :auth="this.auth" />
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
    id: Number,
    auth: Boolean
  }
};
</script>