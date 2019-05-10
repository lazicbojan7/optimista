<template lang="html">
  <div class="root-div">
    <app-nav></app-nav>
    <div class="container bg-color">
    <div class="odvoji"></div>
          <button v-on:click.prevent="odgovorPor('')" class="posalji" id="pos_por">Pošalji poruku</button>
          <span v-bind:style="porukaBazeStyle">{{porukaBaze}}</span>
          <div class="row history-poruke" >
<template v-for="poruka in poruke">
              <div class="offset-md-1 col-md-10 korisnici" v-bind:style="poruka.procitana">
              <p class="vreme"><i class="fa fa-clock-o" aria-hidden="true" id="opt-calendar"></i> {{poruka.por_vreme}}</p>
              <p v-on:click="procitajPoruku(poruka)" class="pp-procitaj">{{poruka.procitajPor}}</p>
              <p v-if="poruka.username==null">Moderator</p>
              <p v-else>{{poruka.username}}</p>
              <p class="remove" v-on:click="obrisiPoruku(poruka)">x</p>
              <div class="sadrzaj-poruke" v-if="poruka.prikazi">
                <p>{{poruka.por_tekst}}</p><button class="posalji" v-on:click.prevent="odgovorPor(poruka.username)">odgovori</button>
              </div>
              </div>

</template>
      </div>
      <div class="odvoji"></div>
    </div>

    <div class="por-popup" v-if="popup">
      <p class="close-popup" v-on:click="popup=!popup">x</p>
      <label for="ks" class="label-ks">Unesite korisničko ime korisnika kome zelite da posaljete poruku:</label>
      <input type="text" class="kome-saljes" id="ks" v-model="sendUsername">
      <label for="txt-poruke" class="label-ks">Unesite tekst poruke:</label>
      <textarea class="tekst-poruke" id="txt-poruke" v-model="popupTekst"></textarea>
      <button class="posalji" v-on:click="posaljiPoruku">pošalji</button>
    </div>
    <div class="overlay" v-if="popup"></div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import {store} from '../../store/store.js';
import sha256 from 'sha256';
import router from '../../router/router.js';
import {bus} from '../../main.js';
import {mapGetters} from 'vuex';
import api from '../../api/vesti_forum/axios_calls.js';
import {axiosWithBaseUrlOnly} from '@/api/forum/config.js';
import axios from 'axios';

export default {
  data(){
    return {
      popup: false,
      sendUsername: '',
      procitajPor: 'procitaj poruku',
      popupTekst: '',
      porukaBaze: '',
    }
  },
  computed: {
    porukaBazeStyle(){
      if(this.porukaBaze == 'Poruka poslata'){
        return 'color: rgb(89, 153, 1);';
      }
      else {
        return 'color: rgb(181, 0, 0);';
      }
    },
    poruke(){
      return this.$store.getters.getPoruke;
    },
    senders(){
      return this.$store.getters.getSenders;
    }
  },
  methods: {
    izlistajPoruke(){
      this.$store.dispatch('izlistajPorukeAction');
    },
    odgovorPor(username){
      this.popup=!this.popup
      this.sendUsername = username;

    },
    obrisiPoruku(poruka){
        this.$store.dispatch('obrisiPorukuAction', poruka.por_id);
    },
    procitajPoruku(poruka){

      poruka.procitana = '';
      poruka.prikazi=!poruka.prikazi;
      if(poruka.procitajPor == 'zatvori poruku'){
        poruka.procitajPor = 'procitaj poruku';
      }
      else {
        poruka.procitajPor='zatvori poruku';
      }
      this.$store.dispatch('procitajPorukuAction', poruka.por_id);
      this.$store.dispatch('novePorukeAction', localStorage.getItem('sid'));
    },
    posaljiPoruku(){
      this.popup=!this.popup
      var self = this;
      var param = {
        sid: localStorage.getItem('sid'),
        popupTo: this.sendUsername,
        popupTekst: this.popupTekst
      }
      this.$store.dispatch('posaljiPorukuAction', param);
      bus.$on('odgovorPosaljiPoruku', function(odgovor){
        self.porukaBaze = odgovor;
      });
    }
  },
  created(){
    this.izlistajPoruke();
  }
}
</script>

<style lang="css" scoped>
.odvoji {
  height: 150px;
}
.close-popup {
  position: absolute;
  right: 20px;
  top: 5px;
  font-size: 20px;
  cursor: pointer;
}
#pos_por {
  padding: 5px 100px;
  margin-left: 80px;
  margin-top: 20px;
  margin-bottom: -50px;
}
.pp-procitaj {
  position: absolute;
  cursor: pointer;
  right: 40px;
}
.por-popup {
  position: fixed;
  border: 1px solid rgb(119, 0, 193);
  background-color: rgb(182, 233, 255);
  border-radius: 15px;
  box-shadow: 0 0 55px rgb(0, 0, 0);
  z-index: 300;
  width: 600px;
  height: 700px;
  padding: 40px;
  left: 35%;
  top: 15%;
}
.root-div {
  background: inherit;
}
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
.label-ks {
  padding: 10px 0 5px 5px;
  font-size: 17px;
  margin-top: 50px;
}
.kome-saljes {
  width: 500px;
  padding: 10px;
  border: 1px solid rgb(68, 123, 173);
  border-radius: 5px;
  outline: 0;
  margin-bottom: -15px;
}
.tekst-poruke {
  width: 500px;
  height: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid rgb(68, 123, 173);
  border-radius: 5px;
  resize: none;
}
.posalji {
  border: 1px solid rgb(91, 128, 209);
  color: rgb(91, 128, 209);
  background-color: rgb(117, 185, 255);
  border-radius: 5px;
  padding: 5px 25px;
  margin: 5px 0 5px 0;
}
.posalji:hover {
  border: 1px solid rgb(117, 185, 255);
  color: rgb(117, 185, 255);
  background-color: rgb(91, 128, 209);
}
button:focus{
  outline: 0;
}
p {
  color: rgb(0, 0, 0);
  margin: 0;
  padding-left: 0;
}
.vreme {
  position: absolute;
  left: 10px;
  top: 10px;
}
.remove {
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
}
.korisnici{
  position: relative;
  text-align: center;
  margin-bottom: 5px;
  padding: 10px 0;
}
.korisnici:nth-child(3n-2) {
  background-color: rgb(247,148,30);
}
.korisnici:nth-child(3n+2) {
  background-color: rgb(140,198,63);
}
.korisnici:nth-child(3n+0) {
  background-color: rgb(2,175,239);
}
.history-poruke:nth-child(1) .korisnici{
  margin-top: 7px;
}
.korisnici p {
  color: rgb(255, 255, 255);
  font-size: 20px;
}
/**/
.history-poruke {
  overflow-y: scroll;
  max-height: 830px;
  margin-top: 58px;
  margin-bottom: 58px;
}
.history-poruke::-webkit-scrollbar {
    width: 7px;
}
.sadrzaj-poruke {
  background-color: rgba(78, 78, 78, 0.7);
}
.sadrzaj-poruke p{
  font-size: 20px;
}
/*OVERLAY*/
.overlay {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 290;
    cursor: pointer;
}
/*END OVERLAY*/

</style>
