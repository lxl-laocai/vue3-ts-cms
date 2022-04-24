<template>
  <h2>{{ $store.state.name }}</h2>
  <router-link to="/login">login</router-link>
  <router-link to="/main">main</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
});
</script>
