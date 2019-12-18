<template>
  <div>
    <Items v-if="auth" :editable="true" :auth="this.auth" />
    <div v-else>
      <p>You don't have an acces to this page!</p>
    </div>
  </div>
</template>
<script>
import Items from "@/components/Items.vue";
export default {
  name: "EditItems",
  props: {
    auth: Boolean
  },
  components: {
    Items
  }
};
</script>
