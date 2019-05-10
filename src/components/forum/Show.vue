<template lang="html">
      <div class="bg-color container">
        <welcome-message></welcome-message>
        <card-category></card-category>
        <paginacija></paginacija>
      </div>

</template>

<script>
import WelcomeMessage from './Pocetna/WelcomeMessage.vue'
import cardCategory from './Pocetna/cardCategory.vue'
import paginacija from './paginacija.vue'

export default {
  components: {
    'welcome-message': WelcomeMessage,
    'card-category': cardCategory,
    'paginacija': paginacija
  },
  data(){
    return{
    }
  },
  methods: {

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
</style>
