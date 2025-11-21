<template>
    <div class="userInfo">
        <h1> {{ title }}  </h1>
    </div>
</template>


<script>

export default {
    name: 'UserInfo',
    created() {
        //alert("Çalıştı");
        console.log("Çalıştı");
    },
    data() {
        return {
            title: "Kullanıcı Bilgileri"
        }
    }
}

</script>
