<template lang="html">
  <!-- NAVIGACIJA -->
  <div id="stilnav">
    <div class="container">


        <nav class="navbar navbar-expand-lg navbar-light ">
          <router-link to="/" class="nav-link" href="#"><img src="../../assets/logo1.png" alt="optimista.rs" id="logo"></router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>


          <div class="collapse navbar-collapse opt-navbar" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/forum">Početna Forum</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/contact">Kontakt</router-link>

              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="">Pomoć</router-link>
              </li>
            </ul>
            <div class="my-2 my-lg-0">
              <ul class="navbar-nav mr-auto nav-optimista">
                <li class="nav-item" v-if="!getLog.ulogovan">
                  <router-link class="nav-link opt-link" to="/login">Prijavi se</router-link>
                </li>
                <li class="nav-item" v-if="!getLog.ulogovan">
                  <router-link class="nav-link opt-link" to="/register">Registracija</router-link>
                </li>
                <li class="nav-item" v-if="getLog.ulogovan" @click="saljiNaProfil(getLog.korisnik)">
                <router-link class="nav-link opt-link" to="" @click.prevent="saljiNaProfil(getLog.korisnik)"> Korisnik {{ getLog.korisnik }} </router-link>          <!--TREBA DA SALJE NA USER PAGE-->
                </li>
                <li class="nav-item" v-if="getLog.ulogovan">
                  <router-link class="nav-link opt-link" id="por-stil"to="/poruke">poruke<div class="newMessage" v-if="getPorukeNove>0"><p>{{getPorukeNove}}</p></div></router-link>
                </li>
                <li class="nav-item" v-if="getLog.ulogovan" >
                  <a class="nav-link opt-link" href="forum" v-on:click.prevent="logout"><!--TREBA DA SALJE NA USER PAGE-->Odjavi se</a>
                </li>
                <li>

                  <input class="form-control mr-sm-2 search col-md-12 col-sm-12" type="text" placeholder="Pretraga" id="opt-search" v-on:keyup.enter="searchBox">

                </li>
              </ul>
            </div>


          </div>
        </nav>

    </div>
  </div>
</template>

<script>
import {store} from '../../store/store.js';
import {bus} from '../../main.js';
import api from '../../api/vesti_forum/axios_calls.js';
import router from '../../router/router.js';
import {mapGetters} from 'vuex';

export default {
  data(){
    return{
      search:'',
      results:[]
    }
  },
  computed: {
    ...mapGetters(['getLog','getPorukeNove'])
  },
  methods: {
    logout(){
      var params = {
        sid : localStorage.getItem('sid'),
        path: this.$route.path
      }
      this.$store.dispatch('logoutAction', params);
    },
    proveriKorisnika(){
        this.$store.dispatch('proveriKorisnikaAction', localStorage.getItem('sid'));
    },
    novePoruke(){
      this.$store.dispatch('novePorukeAction', localStorage.getItem('sid'));
    },
    saljiNaProfil(param){
        bus.$emit('profile',param);
        router.push('/user/'+param);
    },
    searchBox (){
        console.log('searchForum');

    }
  },
  created(){
    this.novePoruke();
    this.proveriKorisnika();
  }
}
</script>

<style lang="css" scoped>

.nav-item {
    font-family: 'Ubuntu', sans-serif !important;
    font-weight: bold;
    font-size: 18px;
}

#por-stil {
  position: relative;
}
.newMessage{
  position: absolute;
  top: -3px;
  right: -7px;
  box-shadow: 0 0 15px rgb(74, 8, 8);
  background-color: rgba(255, 29, 0, 0.7);
  border-radius: 50%;
  width: 25px;
  height: 23px;
}
.newMessage p{
  position: absolute;
  left: 10.2px;
  top: 0.4px;
  color: rgb(238, 238, 238);
}
#stilnav {
  /*border-bottom: 1px solid rgba(0, 0, 0, 0.1);/*1px solid rgb(255, 255, 255);*/
  background-color: rgba(255, 255, 255, 0.97);
  position: relative;
  box-shadow: 0 0 5px rgb(152, 152, 152);
  z-index: 100;
}

#logo {
  height: 70px;
  padding: 5px;
  border-radius: 10px;
  transition: 1s;
  margin-left: -25px;

}
a:hover #logo, router-link:hover #logo {
  background-color: rgba(0, 0, 0, 0.05);
}
.nav-optimista {
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  font-size: 18px;
}
.nav-optimista ul {
  margin-bottom: 10px;
 }
.nav-optimista ul li a, .nav-optimista ul li router-link {

 color: rgb(93, 93, 93);
}
.nav-optimista a:hover, .nav-optimista router-link:hover, .nav-item a:hover, .nav-item router-link:hover {

  border-bottom: 1px solid rgb(93, 93, 93);
}
.nav-optimista a:active, .nav-optimista router-link:active {
  color: rgb(0, 0, 0);
}
.search {
  border: 1px solid rgb(40, 40, 40);
  background-color: rgba(0, 0, 0, 0.15);
  transition: 1s;
}
.search:hover, .search:focus {
  background-color: rgba(0,0,0,0.02);
  outline: none;
}
#opt-search {
  margin-left: 10px;
}
/* END NAVIGACIJE*/
/*@media screen and (min-width: 995px){
  #opt-form {
    margin-left: 500px;
  }
}*/
@media screen and (min-width: 250px){
  .xs-dugme{
    margin: 8px 0px;
    height: 70px;
    width: 90px;
    border: 1px solid rgb(40, 40, 40);
    background-color: rgba(0, 0, 0, 0.05);
  }
  .opt-navbar ul a {
    text-align: center;
  }
  #logo {
    margin-left: -30px;
  }
}

</style>
