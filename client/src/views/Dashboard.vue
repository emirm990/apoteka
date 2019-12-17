<template >
  <div class="about">
    <h1>This is an about page</h1>
    <Items :editable="true" />
    <NewItem />
  </div>
</template>
<script>
import Items from "@/components/Items.vue";
import NewItem from "@/components/NewItem.vue";
export default {
  name: "dashboard",
  components: {
    Items,
    NewItem
  }
};
</script>