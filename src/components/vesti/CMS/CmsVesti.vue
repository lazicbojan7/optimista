<template lang="html">
  <div id="wrapper">
    <div class="container">
      <div class="nav">
        <ul>
          <li v-on:click="vestiM()" v-bind:class="{active:vesti}">Vesti</li>
          <li v-on:click="korisniciM()" v-bind:class="{active:korisnici}">Prijavljeni kor.</li>
          <li v-on:click="sviKorisniciM()" v-bind:class="{active:sviKorisnici}">Svi kor.</li>
          <li v-on:click="komentariM()" v-bind:class="{active:komentari}">Komentari</li>
          <li v-on:click="kategorijeM()" v-bind:class="{active:kategorije}">Kategorije</li>
          <li v-on:click="autoriM()" v-bind:class="{active:autori}">Autori</li>
          <li v-on:click="partneriM()" v-bind:class="{active:partneri}">Partneri</li> 
        </ul>
      </div>
      <button class="btn btn-danger" v-on:click="logout"><i class="fa fa-power-off" aria-hidden="true"></i></button>
      <button class="btn btn-danger" v-on:click="goToCmsForum">Forum</button>
    </div>
    <vesti v-if="vesti"></vesti>
    <korisnici v-if="korisnici"></korisnici>
    <svi-korisnici v-if="sviKorisnici"></svi-korisnici>
    <komentari v-if="komentari"></komentari>
    <autori v-if="autori"></autori>
    <kategorije v-if="kategorije"></kategorije>
    <partneri v-if="partneri"></partneri>




  </div>

</template>

<script>
  import axios from 'axios';
  import api from '@/api/vesti/axios_calls.js'
  import NeodobreneVesti from './NeodobreneVesti.vue'
  import PrijavljeniKorisnici from './PrijavljeniKorisnici.vue'
  import SviKorisnici from './SviKorisnici.vue'
  import PrijavljeniKomentari from './PrijavljeniKomentari.vue'
  import PotencijalniAutori from './PotencijalniAutori.vue'
  import Kategorije from './Kategorije.vue'
  import Partneri from './Partneri.vue'
  export default {
    components: {
      'vesti': NeodobreneVesti,
      'korisnici': PrijavljeniKorisnici,
      'svi-korisnici': SviKorisnici,
      'komentari': PrijavljeniKomentari,
      'autori': PotencijalniAutori,
      'kategorije': Kategorije,
      'partneri': Partneri
    },
    data() {
      return {
        vesti: true,
        korisnici: false,
        sviKorisnici: false,
        komentari: false,
        kategorije: false,
        autori: false,
        partneri: false
      }
    },
    computed: {
      pristupC: function() {
        return this.$store.getters.getPristup;
      }




    },
    methods: {
      goToCmsForum:function(){
        this.$router.push('/cms-forum');
      },
      logout: function() {
        var self = this;
        var sid = localStorage.getItem('sid');
        axios({
          url: 'http://vesti.mars-t.mars-hosting.com/api/logout',
          method: 'post',
          data: {
            sid: sid
          },
          params: {

          }
        }).then((response) => {
          if (response.data.status == false) {
            localStorage.clear();
            this.$router.push('/login');
          }
        });
      },

      vestiForum() {
        this.$router.push('/cms-forum');
      },

      proveraLogin() {
        var sid = localStorage.getItem('sid');
        if (sid == undefined) {
          alert("Niste ulogovani");
          this.$router.push('/login');
        } else {
          //  this.$store.dispatch('pravaPristupaA_F',sid);
          var self = this;
          api.proveraPristupaApi(sid).then((response) => {

            console.log('sid sa marsa' + response.data.response1);
            if (response.data.response1 == 'korisnik' || response.data.response1 == 'autor') {

              self.$router.push('/forum');
              setTimeout(function() {
                alert("Nemate pristup ovoj stranici");
              }, 500);
            }
            //console.log('ok');
            if (response.data.response1 == 'super') {
              self.$store.state.pristup = true;
              console.log(self.$store.state.pristup);
            }

          });
        }
      },


      vestiM() {
        this.vesti = true;
        this.korisnici = false;
        this.sviKorisnici = false;
        this.komentari = false;
        this.kategorije = false;
        this.autori = false;
        this.partneri = false;


      },
      korisniciM() {
        this.vesti = false;
        this.korisnici = true;
        this.sviKorisnici = false;
        this.komentari = false;
        this.kategorije = false;
        this.autori = false;
        this.partneri = false;

      },
      sviKorisniciM() {
        this.vesti = false;
        this.korisnici = false;
        this.sviKorisnici = true;
        this.komentari = false;
        this.kategorije = false;
        this.autori = false;
        this.partneri = false;

      },
      komentariM() {
        this.vesti = false;
        this.korisnici = false;
        this.sviKorisnici = false;
        this.komentari = true;
        this.kategorije = false;
        this.autori = false;
        this.partneri = false;

      },
      kategorijeM() {
        this.vesti = false;
        this.korisnici = false;
        this.sviKorisnici = false;
        this.komentari = false;
        this.kategorije = true;
        this.autori = false;
        this.partneri = false;

      },
      autoriM() {
        this.vesti = false;
        this.korisnici = false;
        this.sviKorisnici = false;
        this.komentari = false;
        this.kategorije = false;
        this.autori = true;
        this.partneri = false;

      },
      partneriM() {
        this.vesti = false;
        this.korisnici = false;
        this.sviKorisnici = false;
        this.komentari = false;
        this.kategorije = false;
        this.autori = false;
        this.partneri = true;

      }
    },
    created() {
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
    margin: 0px;
  }

  button {
    cursor: pointer;
  }
  /*------------------------------------------------------------------------------------------------------*/

  body {
    margin: 0;
    padding: 0;
    background: #ccc;
  }

  .nav ul {
    list-style: none;
    background-color: #444;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  .nav li {
    font-family: 'Oswald', sans-serif;
    font-size: 1.2em;
    line-height: 40px;
    height: 40px;
    border-bottom: 1px solid #888;
    cursor: pointer;
  }

  .nav li {
    text-decoration: none;
    color: #fff;
    display: block;
    transition: .3s background-color;
  }

  .nav li:hover {
    background-color: #005f5f;
  }

  .nav li.active {
    background-color: #eceeef;
    color: #444;
    cursor: default;
  }

  @media screen and (min-width: 600px) {
    .nav li {
      width: 150px;
      border-bottom: none;
      height: 50px;
      line-height: 50px;
      font-size: 1.4em;
    }
    /* Option 1 - Display Inline */
    .nav li {
      display: inline-block;
      margin-right: -4px;
    }
    /* Options 2 - Float
  .nav li {
    float: left;
  }
  .nav ul {
    overflow: auto;
    width: 600px;
    margin: 0 auto;
  }
  .nav {
    background-color: #444;
  }
  */
  }
</style>
