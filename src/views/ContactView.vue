<template>
    <div id="appClass">
        <h1> İletişim Sayfası </h1>
         <UserInfoVue />
    </div>
</template>


<script>

import UserInfoVue from '../components/UserInfo.vue'

export default {
    name: 'ContactView',
    components: {
        UserInfoVue
    }
}
</script>
