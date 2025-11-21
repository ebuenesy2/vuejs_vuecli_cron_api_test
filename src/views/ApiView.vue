<template>
    <div id="ApiView">
        <h1> Api Sayfası </h1>
         <ApiInfo />
    </div>
</template>


<script>

import ApiInfo from '../components/ApiInfo.vue'

export default {
    name: 'ApiView',
    components: {
        ApiInfo
    }
}
</script>
