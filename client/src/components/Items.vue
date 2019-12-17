<template>
  <div>
    <ul>
      <Item
        v-for="item in items"
        v-bind:key="item.id"
        :id="item.id"
        :name="item.name"
        :description="item.description"
        :price="item.price"
        :stock="item.stock"
        :picture="item.picture"
        :extension="item.extension"
        :editable="editable"
      />
    </ul>
  </div>
</template>

<script>
import ItemsService from "../../ItemsService";
import Item from "./Item";
import { EventBus } from "../event-bus";
export default {
  name: "Items",
  components: {
    Item
  },
  props: {
    editable: Boolean
  },
  data() {
    return {
      items: [],
      error: false
    };
  },

  async created() {
    try {
      this.items = await ItemsService.getItems();
    } catch (err) {
      this.error = err;
    }
    EventBus.$on("itemAdded", this.reload);
  },
  methods: {
    async reload() {
      // eslint-disable-next-line no-console
      console.log("works!");
      this.items = await ItemsService.getItems();
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
