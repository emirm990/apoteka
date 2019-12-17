<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/dashboard/edit">Edit Items</router-link>
    <router-link to="/dashboard/new">New Item</router-link>
  </div>
</template>
<script>
export default {
  name: "dashboard"
};
</script>
