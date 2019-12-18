<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form @submit.prevent="login" v-if="!auth">
      <div class="form-group">
        <label for="name">email</label>
        <input type="text" name="name" id="name" v-model="name" autocomplete="username" />
      </div>
      <div class="form-group">
        <label for="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          autocomplete="current-password"
        />
      </div>
      <div class="form-group">
        <input type="submit" name="submit" id="submit" value="login" />
      </div>
    </form>
    <div v-if="auth">
      <button @click="logout">Logout</button>
    </div>
    <div v-if="auth">
      <button>
        <router-link :to="{ name: 'edit', params: {auth: this.auth}}">Edit Items</router-link>
      </button>
      <button>
        <router-link :to="{ name: 'new', params: {auth: this.auth}}">New Item</router-link>
      </button>
    </div>
  </div>
</template>
<script>
import AuthService from "../../AuthService";
import SessionService from "../../SessionService";
export default {
  name: "dashboard",
  data() {
    return {
      name: "",
      password: "",
      auth: false
    };
  },
  created() {
    this.checkSession();
  },
  methods: {
    async login() {
      let response = await AuthService.login(this.name, this.password);
      if (response.data == "Authenticated") {
        this.auth = true;
      }
    },
    async logout() {
      let response = await AuthService.logout();
      // eslint-disable-next-line no-console
      console.log(response);
      if (response.data == "Logout succesful") {
        this.auth = false;
      }
    },
    async checkSession() {
      let response = await SessionService.sessionActive();
      if (response.data == "Authenticated") {
        this.auth = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
button {
  margin: 0 10px;
  a {
    padding: 10px 20px;
    display: inline-block;
  }
}
</style>