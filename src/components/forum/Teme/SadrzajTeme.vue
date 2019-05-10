<template lang="html">
  <div>
    <!---...........T E M A ............ -->
    <template  v-for='tema in teme'>
      <div  class="test">

          <div class="opt-background">
            <a href @click.prevent='saljiNaProfil(tema.username);' >
              <i class="fa fa-user" aria-hidden="true" id="opt-avatar"></i><span class="opt-naslov">  Autor: {{ tema.username }}, </span>   </a>

                <span class="opt-naslov" style="margin-left:100px;">{{ tema.tma_naslov }}</span>

              <!-- broj komentara-->
              <i class="fa fa-commenting-o" aria-hidden="true" id="opt-komentari"></i><span class="opt-br-komentari"> {{ tema.post_count }}</span>
              <!--datum komentara-->

              <!--Vreme kad je okacena tema-->
              <i class="fa fa-eye" aria-hidden="true" id="opt-vreme"></i><span class="opt-br-vreme">{{ tema.tma_br_pregleda }}</span>

          </div>

          <div class="short-info">
            <p v-if="podaci.komentari">{{ tema.tma_tekst }}</p>
            <p v-else>{{ tema.tma_sazetak }}<a href @click.prevent='pregled(tema);' class="read-more">&nbsp;saznaj&nbsp;više..</a></p>

            <div class="col text-right">
              <template v-if='$route.params.komentari'>
              <div class="pull-left">

                <button type="button" class="dugme prijavi"  v-if="user" @click='report(tema)'>Prijavi</button>
              </div>
              <div class="pull-right">
                  <div id="dugme">
             <button type="button" class="dugme odgovori" v-if="user" @click='flag=true;'>Novi komentar</button>

                   </div>
             </div>
              </template>
              <span>{{tema.tma_datum | dateToString}}</span><i class="fa fa-clock-o" aria-hidden="true" id="opt-calendar2"></i><span class="opt-br-calendar"></span>
              <span style="margin-right: -15px;"> <!--like-->{{ tema.likes_count }} likes&nbsp;

                <i v-bind:class="[(ifLiked.indexOf(tema.tma_id)!=-1)?'fa fa-thumbs-up':'fa fa-thumbs-o-up']" aria-hidden="true" style="color: rgb(26, 108, 230); padding-left: 10px; font-size:23px;" v-if="user" @click='likeTema(tema.tma_id)'></i>
                <i class="fa fa-thumbs-o-up" aria-hidden="true" style="color: rgb(26, 108, 230); padding-left: 10px; font-size:23px;" v-else ></i>

              </span>
            </div>
          </div>
        </div><!--testDiv-->
          <!--E N D - TEST-->
          <div v-if="flag" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
              <span class="close" v-on:click="flag=false;">&times;</span>
              <textarea cols='8' rows='6' v-model='sadrzajPoruke'></textarea>
              <button @click='sendComm(tema.tma_id)'>Pošalji</button>
            </div>
          </div>

    </template>

    <div v-if='teme==undefined' class="row odvoji">

      <div class="offset-md-1 col-md-10 bg-pozadina" id="opt-sadrzaj">
        <div class="row">
          <div class="col text-right" >
            <span id='first_theme' v-if='user'>Otvori novu temu</span>
            <span id='first_theme' v-else><router-link to="/register">Otvori novu temu</router-link></span>
          </div>
        </div>
      </div><!--row2-->
    </div>

      <!--E N D - TEMA-->

  </div>
</template>

<script>

import api from '@/api/forum/axios_calls.js';
import { router } from '@/router/router.js'
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  data(){
    return{
      podaci: this.$route.params,
      flag:false,
      sadrzajPoruke:'',
      user:localStorage.getItem('sid')
    }
  },
  computed:{
    ...mapGetters({categories:'getKat_f',teme:'getTemaShow',ifLiked:'usersLikes_temaG'}),

  },
  methods: {
    likeTema(data){
      var params =  Object.assign({id:data},this.podaci);
      this.$store.dispatch('likeTemaA',params);
    },
    report(param){
      api.reporForumtApi(param);
    },
    filtriraj(params){
      this.$store.dispatch('temaShowA',params);
    }, //videti da li moze da se optimizuje//
    sendComm(id){
        var params = {pst_tekst:this.sadrzajPoruke,tma_id:id};
       this.$store.dispatch('sendFirstCommA',params);
         this.flag = false;
         this.sadrzajPoruke='';
    },
    pregled(param){
      var self = this;
      api.dodajPregledApi(param.tma_id).then((response)=>{
        self.$router.push({ path: '/forum/'+param.ktg_naziv+'/'+param.tma_id});
      })
    },
    saljiNaProfil(param){
      this.$router.push({ path: '/user/'+param});
    }
  },
  created(){
   this.filtriraj(this.podaci);
  }
}
</script>

<style lang="css" scoped>
/*dugme samo na strani gde se izlistavaju komentari*/
.dugme {
  border-radius: 5px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  padding: 2px 15px;
  margin-left: 50px;
}
.odgovori {
  background-color: rgb(87, 180, 113);
  border: 1px solid rgb(0, 135, 74);
}
.odgovori:hover {
  background-color: rgb(0, 135, 74);
}
.prijavi {
  background-color: rgb(255, 99, 99);
  border: 1px solid rgb(255, 0, 0);
}
.prijavi:hover {
  background-color: rgba(255, 0, 0, 0.8);
}
/*stilizacija text forme */
.modal {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.2); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: 100px auto 0;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
    min-width: 300px;

}

/* The Close Button */
.close {
    text-align:right;
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
/*
  font-family: 'Ropa Sans', sans-serif;
  font-size: 20px;
  color: rgb(34, 86, 201);
  font-weight: bold;
  */
.read-more {
    display: inline;
  }
.short-info {
  /*background-color: rgba(255, 255, 255. 0.97);*/
  margin: 0 20px 0 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
.short-info p {
  color: rgba(0, 0, 0, 0.97);
  font-size: 17px;
  padding: 10px;
}

.opt-nav{

  background-color: rgb(255, 255, 255);
  margin-bottom: 5px;
  padding: 7px 5px 0 5px;
  position: relative;
  height: 45px;
  box-shadow: 4px 4px 3px rgba(40, 36, 36, 0.5);
}

.opt-background {
  /*background: linear-gradient(rgb(250, 250, 250), rgb(240, 240, 240)) !important;*/
  /*border: 1px solid rgba(0, 0, 0, 0.2);*/
  /*border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);*/
  background-color: rgb(255, 255, 255);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 5px;
  padding: 7px 5px 0 5px;
  position: relative;
  height: 45px;
  box-shadow: 0 3px 5px rgba(231, 231, 231, 1);
}
.opt-background:hover {
  /*box-shadow: 0 0 10px rgb(199, 199, 199);*/
}
/*POZICIJA TEMA*/
/*RIGHT*/
.opt-br-vreme {
  position: absolute;
  right: 100px;
  color: rgb(42, 91, 112);
}

.bg-pozadina {
  background-color: rgba(255, 255, 255, 0.97);
  padding: 15px;
  box-shadow: 0 0 15px rgb(143, 143, 143);
}

#opt-vreme {
  position: absolute;
  right: 145px;
  top: 4px;
  color: rgb(27, 187, 237);
  font-size: 23px;
}
.opt-br-calendar {
  position: absolute;
  left: 510px;
  text-align: center;
  color: rgb(42, 91, 112);
}

#opt-like {
  position: absolute;
  right: 405px;
  top: 4px;
  color: rgb(26, 108, 230);
  font-size: 23px;
}

#opt-calendar {
  position: absolute;
  right: 275px;
  top: 4px;
  color: rgb(129, 186, 24);
  font-size: 23px;
}

#opt-calendar2 {
  top: 4px;
  color: rgb(129, 186, 24);
  font-size: 23px;
}

.opt-br-komentari {
  position: absolute;
  right: 5px;
  color: rgb(42, 91, 112);
}
#opt-komentari {
  position: absolute;
  right: 45px;
  top: 4px;
  color: rgb(117, 21, 203);
  font-size: 23px;
  /*font-weight: bold;*/
}
/*RIGHT*/
/*LEFT*/
  .opt-naslov {
    position: absolute;
    left: 50px;
    color: rgb(42, 91, 112);
  }
  #opt-avatar {
    position: absolute;
    left: 7px;
    top: 4px;
    color: rgb(255, 92, 0);
    font-size: 23px;
  }
  #first_theme {
    text-align: center;
    display: block;
    margin: 120px auto;
    font-size: 25px;
  }
/*LEFT*/
/*KRAJ POZICIJA TEME*/
.opt-vest {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2px;
}
.kategorija {
  padding: 10px;
  background-color: rgb(245, 245, 245);
  position: relative;
  height: 70px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  transition: 1s;
}
.opt-ime {
  color: rgb(42, 91, 112);
  /*transition: 0.5s;*/
}
.kategorija:hover {
  /*background-color: rgba(255, 255, 255, 0.99);*/
  border-top-right-radius: 30px;
  background-color: rgb(42, 91, 112);
}
.kategorija:hover .opt-ime{
  /*color: rgba(0, 0, 0, 0.9);*/
  color: rgb(245, 245, 245);
}
.test {
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  margin-bottom: 10px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid rgba(154, 154, 154, 0.2);
  box-shadow: 0 3px 5px rgba(207, 207, 207, 1);
}
.ikonica {
  position: absolute;
  left: 60px;
}
.ime {
  position: absolute;
  left: 120px;
  top: 20px;
}
i {
  font-size: 30px;
  padding: 5px;
}
p {
  font-family: 'Ropa Sans', sans-serif;
  color: rgb(0, 0, 0);
}
span {
  font-family: 'Ropa Sans', sans-serif;
  font-size: 20px;
  color: rgb(42, 91, 112);
  margin-left: 5px;
}
a, a:hover {
  font-family: 'Ropa Sans', sans-serif;
  color: rgb(36, 114, 246);
}
.fa-user {
    transition: transform .8s ease-in-out;

}
.fa-user:hover{
    transform:rotate(360deg);
    -ms-transform:rotate(360deg);
    -webkit-transform:rotate(360deg);
}

/*==========  Mobile First Method  ==========*/

    /* Custom, iPhone Retina */
    /*@media only screen and (min-width : 220px) {
      .category {
        margin-left: 0;
        margin-right: 0;

      }
    }

    /* Extra Small Devices, Phones */
    /*@media only screen and (min-width : 480px) {

    }*/

    /* Small Devices, Tablets */
@media only screen and (max-width : 1200px) {
  /*POZICIJA TEMA*/
  .opt-br-calendar {
    left: 375px;
  }
  #opt-calendar {
    right: 275px;
    top: 4px;
  }
  /*KRAJ POZICIJA TEME*/
}
@media only screen and (max-width : 770px) {
  /*POZICIJA TEMA*/
  .opt-br-calendar {
    display: none;
  }
  #opt-calendar {
    display: none;
  }
  .opt-br-vreme {
    display: none;
  }
  #opt-vreme {
    display: none;
  }
  /*KRAJ POZICIJA TEME*/
}
@media only screen and (max-width : 400px) {
  .opt-br-komentari {
    display: none;
  }
  #opt-komentari {
    display: none;
  }
}


    /* Medium Devices, Desktops */
    /*@media only screen and (min-width : 992px) {

    }

    /* Large Devices, Wide Screens
    @media only screen and (min-width : 1200px) {

    }

    /*==========  Non-Mobile First Method  ==========*/

    /* Large Devices, Wide Screens
    @media only screen and (max-width : 1200px) {

    }

    /* Medium Devices, Desktops
    @media only screen and (max-width : 992px) {

    }

    /* Small Devices, Tablets
    @media only screen and (max-width : 768px) {

    }

    /* Extra Small Devices, Phones
    @media only screen and (max-width : 480px) {

    }

    /* Custom, iPhone Retina
    @media only screen and (max-width : 320px) {

    }*/
</style>
