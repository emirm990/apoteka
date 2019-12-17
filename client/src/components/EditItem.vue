<template>
  <div class="edit-container">
    <img class="item-image" :src="url" />
    <form v-on:submit.prevent="uploadPhoto" class="image-form">
      <input type="file" name="photo" ref="photo" id="photo" v-on:change="handleFileUpload" />
      <input type="submit" value="Submit" />
    </form>
    <form class="text-form" v-on:submit.prevent="editItem">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" v-model="item.name" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          v-model="item.description"
          rows="4"
          cols="50"
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" name="price" id="price" step="0.05" v-model="item.price" />
      </div>
      <div class="form-group">
        <label for="stock">Stock</label>
        <input type="number" name="stock" id="stock" v-model="item.stock" />
      </div>
      <div class="form-group">
        <input class="submit" type="submit" value="Save" />
      </div>
    </form>
  </div>
</template>

<script>
import EditItem from "../../EditService";
import UploadService from "../../UploadService";
export default {
  name: "EditItem",
  props: {
    id: Number
  },
  data() {
    return {
      item_id: this.id,
      item: {},
      url: "",
      photo: "",
      message: "",
      error: false
    };
  },
  async created() {
    let response = await EditItem.getItem(this.id);
    this.item = response.data.item[0];
    this.url = "http://localhost:3000/images/" + this.item.picture;
  },
  methods: {
    async uploadPhoto() {
      let formData = new FormData();
      formData.append("photo", this.photo);
      //eslint-disable-next-line no-console
      await UploadService.uploadPhoto(this.id, formData);
      let image = await UploadService.getPhoto(this.id);
      this.url = "http://localhost:3000/images/" + image.data.item[0].picture;
      //eslint-disable-next-line no-console
      console.log(image.data.item[0].picture);
    },
    handleFileUpload() {
      this.photo = this.$refs.photo.files[0];
    },
    async editItem() {
      await EditItem.saveItem(
        this.item.id,
        this.item.name,
        this.item.description,
        this.item.price,
        this.item.stock
      );
      let response = await EditItem.getItem(this.id);
      this.item = response.data.item[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-container {
  max-width: 1280px;
  .item-image {
    max-width: 150px;
    max-height: 150px;
    object-fit: cover;
  }
  .text-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .form-group {
      display: flex;
      flex-direction: column;
      width: 50%;
      input {
        text-align: center;
      }
      input,
      textarea {
        padding: 10px;
      }
      label {
        margin-top: 25px;
        margin-bottom: 10px;
      }
    }
    .submit {
      margin-top: 25px;
      width: 100px;
      align-self: center;
    }
  }
}
</style>