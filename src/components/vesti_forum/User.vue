<template lang="html">
  <div style="background: inherit;">

    <div class="container bgg">

      <div class="odvoji"></div>
      <div class="row bgg">

        <div class="offset-lg-1 col-lg-9 bg-login">
          <uni-nav></uni-nav>
          <div class="row">
            <div class="col-lg-3 col-md-6 levi-deo">
              <div class="row">

                <div class="col-sm-12">
                  <!--bla-->

                    <croppa v-model="myCroppa" canvas-color="transparent" id="croppa" v-if="promeniSliku"></croppa>
                    <button @click="send" v-if="promeniSliku" class="generate" >Generate</button>

                  <!--bla-->
                    <img :src="osoba.osb_slika" alt="" class="avatar" v-if="!promeniSliku">

            </div>
            <div class="col-sm-12">
            <template v-if='flag'>
              <button class="promeni-sliku" v-if="!promeniSliku" v-on:click="promeniSliku=!promeniSliku">Promeni Sliku</button>
            </template>
              <div class="licni-podatci">
                <p>Ime: {{osoba.osb_ime}}</p>
                <p>Prezime: {{osoba.osb_prezime}}</p>
                <p>E-mail: {{osoba.osb_email}}</p>
                <template v-if='flag'>
                  <span>private profile: </span>
                  <button v-on:click="profilePrivate" :class="klasa">{{ private }}</button>
              </template>
              </div>
            </div>

            </div>
            </div>
            <div class="col-lg-4 col-md-6 lagan">
              <p>Informacije korisnika:
                <template v-if='flag'>
                  <button id='izmeni' v-on:click="izmeniClick" v-if="izmeniSacuvaj">izmeni</button>
                  <button id='izmeni' v-on:click="sacuvajClick" v-if="!izmeniSacuvaj">sacuvaj</button>
                </template>
              </p>
              <div class="info" v-if="info">
                <p>
                  {{osoba.osb_info}}
                </p>
              </div>
              <textarea class="info" style="height: 400px;"v-if="!info" v-model="osoba.osb_info">

              </textarea>

              <p v-bind:style="stil">{{message}}</p>


            </div>
            <div class="col-lg-5 col-md-12">

              <div class="awards-div">
                <img class="awwards" v-bind:src="getAwwardUserLikes" alt="REALNI" >
              </div>
              <div class="awards-div">
                <img class="awwards" v-bind:src="getAwwardUserViews" alt="REALNI" >
              </div>

              <div><!--Teme-->
                <p class="pos-teme">Posljednje tri teme</p>
                <div class="posts" v-for="tema in teme">
                    <div class="pst-card">
                      <div class="pst-naslov"><p><i class="fa fa-user opt-user-icon" aria-hidden="true" style="color: rgb(255, 92, 0);"></i> {{ tema.tma_naslov }}</p></div>
                      <p class="short-text">
                        {{ tema.tma_sazetak }}<router-link to="">procitaj vise...</router-link>
                      </p>
                    </div>
                </div>
              </div>


              <div><!--komentari-->
                <p class="pos-teme">Posljednja tri komentara</p>
                <div class="posts" v-for="komentar in komentari">
                  <div class="pst-card koment" style="overflow:hidden;">
                    <div class="col-lg-3" style="float:left;">
                      <img src="../../assets/user.png" alt="avatar" style="width: 60px; margin-top: 5px;">
                      <p>korime</p>
                    </div>
                    <div class="col-lg-8" style="float:right;">
                      {{komentar.pst_tekst}}
                    </div><!--sadrzaj-->
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
      <div class="odvoji"></div>

    </div>
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
import Vue from 'vue'
import Croppa from 'vue-croppa'
import uniNav from './uniNav';

Vue.use(Croppa)

export default {
  components: {
    'uni-nav': uniNav
  },
  data(){
    return {
      username:this.$route.params.id,
      osoba: '',
      private: 'on',
      klasa: 'privater',
      teme: '',
      komentari: '',
      info: true,
      izmeniSacuvaj: true,
      message: '',
      stil: '',
      /*Image Upload Params*/
      image: '',
      file:'',
      promeniSliku: false,
      myCroppa: null,
      imgUrl: '',
      flag:false,
      bus:true
    }
  },

  computed: {
    ...mapGetters([
      'getAwwardUserLikes',
      'getAwwardUserViews'
    ])
  },
  methods: {
    profilePrivate(){
      if (this.private == 'on'){
        this.private = 'off';
        this.klasa = 'privateg';
      }
      else if (this.private == 'off'){
        this.private = 'on';
        this.klasa = 'privater';
      }
    },

    osobaInfo(userParam){
      var self = this;
      var params = {sid:localStorage.getItem('sid'),username:userParam};
      api.osobaInfoApi(params).then(function(response){
        self.osoba = response.data.osoba;
        self.flag = response.data.myProfile;
        if(self.osoba.osb_slika==null){
          self.osoba.osb_slika='http://vesti.mars-t.mars-hosting.com/api/takeUserImage/'+self.osoba.username;
        }
        else{
          self.osoba.osb_slika = 'data:image/png;base64,'+self.osoba.osb_slika;
        }
        api.userTeme(self.osoba.username).then(function(response1){
          self.teme = response1.data.teme;
        });
        api.userKomentari(self.osoba.username).then(function(response2){
          self.$store.dispatch('awwardsAction',self.osoba.username);
          self.komentari = response2.data.komentari;
        });
      })
    },
    izmeniClick(){
      this.izmeniSacuvaj = !(this.izmeniSacuvaj);
      this.info = !(this.info);
    },
    sacuvajClick(){
      if(this.osoba.osb_info.length < 1024){
        var self = this;
        var param = {
          sid: localStorage.getItem('sid'),
          osobaInformacije: this.osoba.osb_info
        }
        api.updateInfoApi(param).then(function(resposne){
          self.message = 'Uspesna izmena';
          self.stil = 'color: rgb(34, 113, 27);';
          setTimeout(function(){ self.message = ''; }, 5000);
        }).catch(function(error){
          self.message = 'Neuspesna izmena';
          self.stil = 'color: rgb(213, 44, 44);';
          setTimeout(function(){ self.message = ''; }, 5000);
        })
        this.izmeniSacuvaj = !(this.izmeniSacuvaj);
        this.info = !(this.info);
      }
      else {
        this.message = 'Informacije mogu imati najvise 1024 karaktera, smanjite vase informacije';
        this.stil = 'color: rgb(213, 44, 44);';
      }
    },
    /*Image Upload*/

    dataUrlToBlob: function(dataURI){
      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ab], {type: mimeString});
      return blob;
    },
    send: function(){
      /*Generate*/
      var url = this.myCroppa.generateDataUrl();
      if (!url) {
      	alert('no image')
        return
      }
      /*endGenerate*/
      /*toblob*/
      var slikaBlob =  this.dataUrlToBlob(url);
      /*endToBlob*/
       var self = this;
       var formData = new FormData();
       formData.append("image", slikaBlob);
       var sid = localStorage.getItem("sid");
       formData.append("sid", sid);
       axios.post('http://vesti.mars-t.mars-hosting.com/api/unesiSliku', formData, {
         headers: {
         'Content-Type' : 'multipart/form-data'
           }
         }).then(function(response){
           self.osobaInfo(self.username);
         });
         this.promeniSliku=!this.promeniSliku;
    },
    createImage: function(file) {
       var reader = new FileReader ();
       this.file = file;
       reader.readAsDataURL(file);
     },
    pustanjeNaStranu(){
      if(localStorage.getItem('sid') == undefined){
        router.push('/login');
      }
      else if(this.username==undefined){
        this.username=localStorage.getItem('user');
        router.push('/user/'+this.username);

      }
    },

    awwards(){
      this.$store.dispatch('awwardsAction',localStorage.getItem('sid'));
    },
  },
  created(){
      bus.$on('profile',(data)=>{
        this.osobaInfo(data);
        this.bus=false;
      })

      if(this.bus){
        this.pustanjeNaStranu();
        this.osobaInfo(this.username);
      }
  }

}
</script>

<style lang="css" scoped>
/*FILE*/

canvas {
  width: 180px !important;
  height: 180px !important;
}
.croppa-container {
  background-color: rgb(164, 217, 255);
  border: 5px solid rgb(125, 160, 233);
  border-radius: 50%;
  overflow: hidden;
  height: 200px;
  width: 200px;
  margin-left: -20px;
  cursor: move;
}

/*END FILE*/
.koment p {
  font-size: 15px;
  text-align: center;
}
.pst-card {
  background-color: rgb(255, 255, 255);
  padding: 10px 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 0 0 15px rgb(186, 186, 186);
}
.posts .pst-naslov {
  background-color: rgb(215, 215, 215);
}
.posts .pst-naslov p {
  text-align: center;
  color: rgb(42, 91, 112)
}
.pos-teme {
  color: rgb(24, 119, 189);
  font-family: 'Acme', sans-serif;
}
 p {
  font-size: 17px;
  color: rgb(42, 91, 112)
}
.lagan {
  padding: 5px;
}
.bgg {
  background: inherit;
}
.bg-login {
  padding: 30px;
  margin:0 auto;
  border-radius: 10px;
  background: inherit;
  box-shadow: 0 0 30px rgb(113, 113, 113);
  position: relative;
  z-index: 10;
  overflow: hidden;
}
.bg-login:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0; right: 0; bottom: 0; left: 0;
  background: inherit;
  box-shadow: inset 0 0 3000px rgba(255, 255, 255, 1);
  filter: blur(20px);
  margin: -20px;
}
.bg-login:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(255,255,255,0.6);
}
.odvoji {
  height: 240px;
}
h2, p {
  color: rgb(0, 0, 0);
}
.avatar {
  background-color: rgb(164, 217, 255);
  border: 5px solid rgb(125, 160, 233);
  border-radius: 50%;
  overflow: hidden;
  height: 200px;
  width: 200px;
  margin-left: -15px;
  margin-bottom: 10px;
}
.info {
  word-wrap: break-word;
  background-color: rgba(235, 235, 235, 0.54);
  width: 250px;
  border: 1px solid rgb(153, 153, 153);
  padding: 8px;
}
/*Private*/
/*GREEN*/
.privateg {
  border: 1px solid rgb(0, 173, 33);
  color: rgb(0, 173, 33);
  background-color: rgb(11, 112, 24);
  border-radius: 5px;
}
.privateg:hover {
  border: 1px solid rgb(11, 112, 24);
  color: rgb(11, 112, 24);
  background-color: rgb(0, 173, 33);
}
/*RED*/
.privater {
  border: 1px solid rgb(255, 97, 97);
  color: rgb(255, 97, 97);
  background-color: rgb(120, 27, 18);
  border-radius: 5px;
}
.privater:hover {
  border: 1px solid rgb(120, 27, 18);
  color: rgb(120, 27, 18);
  background-color: rgb(255, 97, 97);
}
#izmeni {
  border: 1px solid rgb(91, 128, 209);
  color: rgb(91, 128, 209);
  background-color: rgb(117, 185, 255);
  border-radius: 5px;
}
#izmeni:hover {
  border: 1px solid rgb(117, 185, 255);
  color: rgb(117, 185, 255);
  background-color: rgb(91, 128, 209);
}
button:focus{
  outline: 0;
}
/*menjaj sliku dugme*/
.promeni-sliku {
  border: 1px solid rgb(91, 128, 209);
  color: rgb(91, 128, 209);
  background-color: rgb(117, 185, 255);
  border-radius: 5px;
  margin-left: 30px;
  margin-bottom: 20px;

}
.generate {
  border: 1px solid rgb(91, 128, 209);
  color: rgb(91, 128, 209);
  background-color: rgb(117, 185, 255);
  border-radius: 5px;
  margin-left: 40px;
  margin-bottom: 20px;
  margin-top: 10px;

}
.promeni-sliku:hover {
  border: 1px solid rgb(117, 185, 255);
  color: rgb(117, 185, 255);
  background-color: rgb(91, 128, 209);
}

.generate:hover {
  border: 1px solid rgb(117, 185, 255);
  color: rgb(117, 185, 255);
  background-color: rgb(91, 128, 209);
}
.licni-podatci {
  border: 1px solid rgb(91, 128, 209);
  text-align: center;
  padding: 5px;
  border-radius: 15px;
  margin-left: -7px;
}
.upload-forma {
  border: 2px solid rgb(78, 129, 215);
  overflow: hidden;
  width: 96px;
  height: 30px;
  margin-left: 40px;
  margin-bottom: 15px;
  margin-top: -3px;
  border-radius: 15px;
}
.upload-forma input {
  font-family: 'Ubuntu', sans-serif;
  color: rgb(254, 43, 66) !important;
  margin-left: -2px;
}

.awwards {
    width: 350px;
    margin-left: -40px;
    margin-top: -10px;
}
.awards-div {
  width: 270px;
  height: 170px;
  margin-left: 20px;
  overflow: hidden;
}






</style>
