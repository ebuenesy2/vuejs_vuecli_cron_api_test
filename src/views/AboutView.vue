<template>
  <div>
    <h1> Hakkımızda Sayfası </h1>
    <p class="yazi"> Name: {{name}} </p>

    <p> Sayi: {{sayi}} </p>
    <button v-on:click="sayiarttir"> Arttır </button>
    <button v-on:click="sayiazalt"> Azalt </button>

  </div>
</template>


<script>

export default {
  name: 'AboutView',
  created() {
    //alert("Çalıştı");
    console.log("Çalıştı");
  },
  data() {
    return {
      name: "Ebu Enes",
      sayi:0
    }
  },
  methods: {
    sayiarttir() { this.sayi++; },
    sayiazalt() { this.sayi--; }
  }
}

</script>


<style scoped>
.yazi {
  color: #42b983;
  font-size: 14px;
  font-weight: 700px;
}
</style>
