<template>
  <form v-on:submit.prevent="addNewItem">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" v-model="name" />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        type="text"
        name="description"
        id="description"
        rows="4"
        cols="50"
        v-model="description"
      />
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input
        type="number"
        step="0.05"
        name="number"
        id="number"
        v-model="price"
      />
    </div>
    <div class="form-group">
      <label for="stock">Stock</label>
      <input type="number" name="stock" id="stock" v-model="stock" />
    </div>
    <div class="form-group">
      <input type="submit" value="Create" />
    </div>
  </form>
</template>
<script>
import NewItemService from "../../NewItemService";
import { EventBus } from "../event-bus";
export default {
  name: "NewItem",
  data() {
    return {
      name: "",
      description: "",
      price: "",
      stock: "",
      message: ""
    };
  },
  methods: {
    async addNewItem() {
      await NewItemService.addItem(
        this.name,
        this.description,
        Number(this.price),
        Number(this.stock)
      );
      EventBus.$emit("newItem");
    }
  }
};
</script>
