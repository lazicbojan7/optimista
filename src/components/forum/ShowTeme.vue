<template lang="html">
  <div class="bg-color container">
  <naslov-teme></naslov-teme>


  <otvori-temu></otvori-temu>
  <navigacija></navigacija>
  <sadrzaj-teme></sadrzaj-teme>



  <paginacija></paginacija>

</div><!--root-->
</template>

<script>
import NaslovTeme from './Teme/NaslovTeme.vue'
import SadrzajTeme from './Teme/SadrzajTeme.vue'
import navigacija from './Teme/Nav_tema.vue'
import OtvoriTemu from './Teme/OtvoriTemu.vue'
import paginacija from './paginacija.vue'



export default {
  components: {
    'naslov-teme': NaslovTeme,
    'navigacija': navigacija,
    'sadrzaj-teme' : SadrzajTeme,
    'otvori-temu' : OtvoriTemu,
    'paginacija': paginacija


  },
  data(){
    return{

    }
  }
}
</script>

<style lang="css" scoped>

.bg-color {
  background: inherit;
  box-shadow: 0 0 10px rgb(113, 113, 113);
  position: relative;
  z-index: 10;
  overflow: hidden;
}
.bg-color::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0; right: 0; bottom: 0; left: 0;
  background: inherit;
  box-shadow: inset 0 0 3000px rgba(255, 255, 255, 0.99);
  filter: blur(20px);
  margin: -20px;
}
.bg-color::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(255,255,255,0.7);
}

a, router-link, a:hover, router-link:hover {
    text-decoration: none;
  }
</style>
