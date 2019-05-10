<template lang="html">
  <div class="opt-nav">
      <span class="opt-naslov" v-bind:style="naslov">{{ this.filter }}</span>


      <i class="fa fa-thumbs-o-up" v-bind:style="like" aria-hidden="true" id="opt-like" @click='filtriraj(filters[0]);stilizacija(0);'></i><span  class="opt-br-calendar"></span>
      <!-- broj komentara-->
      <i class="fa fa-commenting-o" v-bind:style="komentari" aria-hidden="true" id="opt-komentari" @click='filtriraj(filters[1]);stilizacija(1);'></i><span  class="opt-br-komentari"></span>
      <!--datum komentara-->
      <i class="fa fa-clock-o" v-bind:style="calendar" aria-hidden="true" id="opt-calendar" @click='filtriraj(filters[2]);stilizacija(2);'></i><span  class="opt-br-calendar"></span>
      <!--Vreme kad je okacena tema-->
      <i class="fa fa-eye" v-bind:style="vreme" aria-hidden="true" id="opt-vreme" @click='filtriraj(filters[3]);stilizacija(3);'></i><span  class="opt-br-vreme"></span>
  </div>
</template>

<script>
import {bus} from "@/main.js"
export default {
  data(){
    return{
      filter:'Sortiraj po: ',
      filters:['lajkovi','komentari','datumi','pregledi'],
      kategorija: this.$route.params.tema, /*viditi da li treba ipak koristiti state podatak iz bezbednosnih razloga*/
      like:'',
      komentari:'',
      calendar:'',
      vreme:'',
      naslov:''
    }
  },
  methods:{
    filtriraj(par){

      var params = {
        filter : par,
        tema : this.kategorija
      };
      this.$store.dispatch('dodajFilterA',par);
      bus.$emit('resetPage',params);

    },
    stilizacija(par){
      if(par === 0){
        this.naslov='right: 690px !important';
        this.like='right: 660px !important';
        this.komentari='right: 15px;';
        this.calendar='right: 95px;';
        this.vreme='right: 55px;';
      }
      if(par === 1){
        this.naslov='right: 690px !important';
        this.komentari='right: 660px !important';
        this.like='right: 135px;';
        this.calendar='right: 95px;';
        this.vreme='right: 55px;';
      }
      if(par === 2){
        this.naslov='right: 690px !important';
        this.calendar='right: 660px !important';
        this.like='right: 135px;';
        this.komentari='right: 15px;';
        this.vreme='right: 55px;';
      }
      if(par === 3){
        this.naslov='right: 690px !important';
        this.vreme='right: 660px !important';
        this.like='right: 135px;';
        this.komentari='right: 15px;';
        this.calendar='right: 95px;';
      }
    }
  }
}
</script>

<style lang="css" scoped>
.opt-nav{
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 5px;
  padding: 7px 5px 0 5px;
  position: relative;
  height: 45px;
}
#opt-vreme {

  transition: 1s;
  position: absolute;
  right: 55px;
  top: 10px;
  color: rgb(27, 187, 237);
  font-size: 23px;
  cursor: pointer;
}
#opt-like {
  transition: 1s;
  position: absolute;
  right: 135px;
  top: 10px;
  color: rgb(26, 108, 230);
  font-size: 23px;
  cursor: pointer;
}
#opt-calendar {
  transition: 1s;
  position: absolute;
  right: 95px;
  top: 10px;
  color: rgb(129, 186, 24);
  font-size: 23px;
  cursor: pointer;
}

#opt-calendar2 {
  top: 10px;
  color: rgb(129, 186, 24);
  font-size: 23px;
}
#opt-komentari {

  transition: 1s;
  position: absolute;
  right: 15px;
  top: 10px;
  color: rgb(117, 21, 203);
  font-size: 23px;
  cursor: pointer;
  /*font-weight: bold;*/
}
.opt-naslov {
  position: absolute;
  right: 170px;
  color: rgb(42, 91, 112);
}
span {
  font-family: 'Ropa Sans', sans-serif;
  font-size: 20px;
  color: rgb(42, 91, 112);
  margin-left: 5px;
}

</style>
