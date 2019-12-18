<template>
  <li>
    <h2>{{ name }}</h2>
    <p>{{ description }}</p>
    <p>{{ price }}</p>
    <p>{{ stock }}</p>
    <img :src="url" />
    <button v-if="editable">
      <router-link
        :to="{path: `/dashboard/edit/${this.id}`, params: {auth: this.auth, id: this.id}}"
        :id="this.id"
      >Edit</router-link>
    </button>
    <button v-if="editable" @click="deleteItem" :id="this.id">Delete</button>
  </li>
</template>

<script>
import EditService from "../../EditService";
export default {
  name: "Item",
  props: {
    id: Number,
    name: String,
    description: String,
    price: Number,
    stock: Number,
    picture: String,
    extension: String,
    editable: Boolean,
    auth: Boolean
  },
  data() {
    return {
      url: "http://localhost:3000/images/" + this.picture,
      item_id: this.id,
      item_name: this.name,
      item_description: this.description,
      item_stock: this.stock,
      item_price: this.price
    };
  },
  methods: {
    /*async getItem() {
      let itemDetails = await EditService.getItem(this.id);
      //eslint-disable-next-line no-console
      console.log(itemDetails.data);
    },*/
    async deleteItem() {
      await EditService.deleteItem(this.id);
      this.$emit("itemDeleted");
    }
  }
};
</script>
<style lang="scss" scoped>
li {
  flex-basis: 23%;
  margin-left: 1%;
  margin-right: 1%;
  overflow: hidden;
  border: 1px solid grey;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>
