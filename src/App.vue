<template>
  <h2>{{ $store.state.name }}</h2>
  <router-link to="/login">login</router-link>
  <router-link to="/main">main</router-link>
  <router-view></router-view>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
});
</script>
