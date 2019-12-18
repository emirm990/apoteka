<template>
  <div>
    <div class="edit-container" v-if="auth">
      <img class="item-image" :src="url" />
      <form v-on:submit.prevent="uploadPhoto" class="image-form">
        <input type="file" name="photo" ref="photo" id="photo" v-on:change="handleFileUpload" />
        <!--<input type="submit" value="Submit" />-->
      </form>
      <form class="text-form" v-on:submit.prevent="addNewItem">
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
            v-model="description"
            rows="4"
            cols="50"
          />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" name="price" id="price" step="0.05" v-model="price" />
        </div>
        <div class="form-group">
          <label for="stock">Stock</label>
          <input type="number" name="stock" id="stock" v-model="stock" />
        </div>
        <div class="form-group">
          <input class="submit" type="submit" value="Save" />
        </div>
      </form>
      <div v-if="message">
        <p>{{message}}</p>
      </div>
    </div>
    <div v-else>
      <p>You don't have an acces to this page!</p>
    </div>
  </div>
</template>
<script>
import NewItemService from "../../NewItemService";
import UploadService from "../../UploadService";
export default {
  name: "NewItem",
  props: {
    auth: Boolean
  },
  data() {
    return {
      name: "",
      description: "",
      price: "",
      stock: "",
      message: "",
      url: "",
      id: ""
    };
  },
  methods: {
    async addNewItem() {
      let response = await NewItemService.addItem(
        this.name,
        this.description,
        Number(this.price),
        Number(this.stock)
      );
      //eslint-disable-next-line no-console
      console.log(response);
      this.id = await response.data.insertId;
      if ((await response.data.affectedRows) == 1) {
        this.message = "Item succesfully added!";
      }
      await this.uploadPhoto();
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },
    async uploadPhoto() {
      let formData = new FormData();
      formData.append("photo", this.photo);
      //eslint-disable-next-line no-console
      await UploadService.uploadPhoto(this.id, formData);
      let image = await UploadService.getPhoto(this.id);
      this.url = "http://localhost:3000/images/" + image.data.item[0].picture;
    },
    handleFileUpload() {
      this.photo = this.$refs.photo.files[0];
    },
    clearMessage() {
      this.message = "";
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