<template lang="html">
  <div class="wrapper">
    <div class="container">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-8 offset-xl-2">

        <div class="nav">
          <ul class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <li class="col-sm-12 col-md-12 col-lg-2 col-xl-2" v-on:click="vestiM()" v-bind:class="{active:teme}">Teme</li>
            <li class="col-sm-12 col-md-12 col-lg-2 col-xl-2" v-on:click="korisniciM()" v-bind:class="{active:korisnici}">Prijavljeni korisnici</li>
            <li class="col-sm-12 col-md-12 col-lg-2 col-xl-2" v-on:click="sviKorisniciM()" v-bind:class="{active:sviKorisnici}">Svi korisnici</li>
            <li class="col-sm-12 col-md-12 col-lg-2 col-xl-2" v-on:click="komentariM()" v-bind:class="{active:komentari}">Komentari</li>
            <li class="col-sm-12 col-md-12 col-lg-2 col-xl-2" v-on:click="kategorijeM()" v-bind:class="{active:kategorije}">Kategorije</li>
            <li class="btn-warning col-sm-12 col-lg-2 col-xl-2" v-on:click="vestiForum"><a href="#" >Vesti</a></li>
          </ul>
        </div>
        <button v-on:click="logout" style="margin-top:5px; margin-bottom:5px;"><i class="fa fa-power-off" aria-hidden="true"></i></button>
        <button v-on:click="prikaziPorukeM()" style="float:right; margin-top:5px; margin-bottom:5px;"><i class="fa fa-envelope-o" aria-hidden="true"></i></button>
        
      </div>
     </div>

    <teme v-if="teme"></teme>
    <kategorije v-if="kategorije"></kategorije>
    <prijavljeni-komentari v-if="komentari"></prijavljeni-komentari>
    <prijavljeni-korisnici v-if="korisnici"></prijavljeni-korisnici>
    <svi-korisnici v-if="sviKorisnici"></svi-korisnici>
    <poruke v-if="privatnePoruke"></poruke>

    <!-- <p>{{ pristup_F }}</p> -->
    </div>
  </div>
</template>

<script>
import api from '@/api/forum/axios_calls.js'
import Teme from './NeodobreneTeme.vue'
import Kategorije from './Kategorije.vue'
import PrijavljeniKomentari from './PrijavljeniKomentari.vue'
import PrijavljeniKorisnici from './PrijavljeniKorisnici.vue'
import Poruke from './Poruke.vue'
import SviKorisnici from './SviKorisnici.vue'
import axios from 'axios';
export default {

  components: {
    'teme': Teme,
    'kategorije' : Kategorije,
    'prijavljeni-komentari' : PrijavljeniKomentari,
    'prijavljeni-korisnici' : PrijavljeniKorisnici,
    'svi-korisnici' : SviKorisnici,
    'poruke' : Poruke
  },
  data(){
    return{
    teme: true,
    korisnici:false,
    komentari:false,
    kategorije:false,
    sviKorisnici:false,
    privatnePoruke:false
  }
  },
  methods: {
    vestiForum() {
      this.$router.push('/cms-vesti');
    },
    poruke(){
      console.log('ok');
    },
    proveraLogin() {
      var sid = localStorage.getItem('sid');
      if(sid == undefined){
        alert('Niste ulogovani')
        this.$router.push('/login');
      }else{
        var self = this;
        api.proveraPristupaApi(sid).then((response)=>{
         if(response.data.response1 == 'korisnik' || response.data.response1 == 'autor'){
           self.$router.push('/forum');
           setTimeout(function(){ alert("Nemate pristup ovoj stranici"); }, 500);
         }
        if(response.data.response1 == 'super'){
          self.$store.state.pristup_F = true;
        }
      });
      }
    },
    logout: function() {
      var self = this;
      var sid = localStorage.getItem('sid');
      axios({
        url:'http://vesti.mars-t.mars-hosting.com/api/logout',
        method: 'post',
        data:{
          sid:sid
        },
        params: {

        }
      }).then((response)=>{
        if(response.data.status == false){
          // localStorage.clear();
          this.$router.push('/login');
        }
      });
    },
    vestiM() {
      this.teme = true;
      this.korisnici = false;
      this.sviKorisnici = false;
      this.komentari = false;
      this.kategorije = false;
      this.privatnePoruke = false;
    },
    korisniciM() {
      this.teme = false;
      this.korisnici = true;
      this.sviKorisnici = false;
      this.komentari = false;
      this.kategorije = false;
      this.privatnePoruke = false;
    },
    sviKorisniciM() {
      this.teme = false;
      this.korisnici = false;
      this.sviKorisnici = true;
      this.komentari = false;
      this.kategorije = false;
      this.privatnePoruke = false;
    },
    komentariM() {
      this.teme = false;
      this.korisnici = false;
      this.sviKorisnici = false;
      this.komentari = true;
      this.kategorije = false;
      this.privatnePoruke = false;
    },
    kategorijeM() {
      this.teme = false;
      this.korisnici = false;
      this.sviKorisnici = false;
      this.komentari = false;
      this.kategorije = true;
      this.privatnePoruke = false;
    },
    prikaziPorukeM(){
      this.teme = false;
      this.korisnici = false;
      this.sviKorisnici = false;
      this.komentari = false;
      this.kategorije = false;
      this.privatnePoruke = true;
    }
  },
  computed : {

},
 created(){
  this.proveraLogin();
 }
}
</script>

<style scoped>

.wrapper {
  background-color: white;
}

.container {
  margin-top: 12px;
}

.btn {
  margin:0px;
}

button {
  cursor: pointer;
}

.nav {
  padding-left: 0px;
  padding-right: 0px;
}

.nav ul {
  list-style: none;
  background-color: #444;
  text-align: center;
  margin: 0 auto;
  padding: 0px;
}

.nav li {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2em;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid #888;
  text-decoration: none;
  color: #fff;
  transition: .3s background-color;
}

.nav li:hover {
  background-color: #005f5f;
  color: white;
}

.nav li.active {
  background-color: #fff;
  color: black;
  background-color: grey;
  cursor: default;
}

@media only screen and (min-width : 1200px) {
  .wrapper {
    max-width: 100%;
  }

  .wrapper .container {
    max-width: 100%;
    margin: 0px;
  }

  .nav {
    padding: 0px;
  }

  .nav ul li {
    display: inline-block;
    font-size: 18px;
  }
}
@media only screen and (min-width : 992px) {
  .wrapper {
    max-width: 100%;
  }

 .wrapper .container {
  max-width: 100%;
  margin: 0px;
 }

 .nav {
  padding: 0;
 }

 .nav ul li{
  display: inline-block;
  font-size: 15px;
 }
}

@media only screen and (min-width : 768px) {
  .wrapper {
    max-width: 100%;
  }

 .wrapper .container {
  max-width: 100%;
  margin: 0px;
 }

 .nav li {
   width: 185px;
   border-bottom: none;
   height: 50px;
   line-height: 50px;
   font-size: 1.4em;
   padding: 0;
 }

  /* Option 1 - Display Inline */
 .nav li {
   display: block;
   margin-right: -4px;
   font-size: 22px;
   width: 100%;
 }
}

@media only screen and (max-width : 767px) {
  .wrapper {
    max-width: 100%;
  }

  .wrapper .container {
   max-width: 100%;
   margin: 0px;
  }

 .nav li {
   width: 185px;
   border-bottom: none;
   height: 50px;
   line-height: 50px;
   font-size: 1.4em;
  padding: 0;
}

  /* Option 1 - Display Inline */
 .nav li {
   display: block;
   margin-right: -4px;
   font-size: 22px;
  width: 100%;
 }
}

</style>
