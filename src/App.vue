<template>
  <div id="app">
    <CronLogs />
  </div>
</template>

<script>
import CronLogs from "./components/CronLogs.vue";

export default { components: { CronLogs  } };
</script>

<style>
/* global stiller varsa buraya */
body{font-family:Inter,system-ui,Arial,Helvetica,sans-serif;background:#fafafa;color:#222}
</style>