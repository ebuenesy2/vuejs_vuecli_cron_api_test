<template>
    <div class="apiInfo">
        <h1> {{ title }}  </h1>
    </div>
</template>


<script>

export default {
    name: 'ApiInfo',
    created() {
        //alert("Çalıştı");
        console.log("Çalıştı");
    },
    data() {
        return {
            title: "Api Kullanımı"
        }
    }
}

</script>
