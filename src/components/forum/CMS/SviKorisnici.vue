<template lang="html">

  <div class="wrapper col-sm-12 col-md-12  col-lg-12">
    <div class="container col-sm-12 col-md-12 col-lg-12">
      <div class="jumbotron col-lg-12  offset-xl-2 col-xl-8" style="padding:30px 0;">
        <div class="offset-lg-3 col-lg-6"><!--Promena slike default korisnika-->
            <fieldset class="korisnik">
              <legend>Podrazumevana slika korisnika</legend>
              <div class="offset-sm-4 col-sm-4 offset-md-4 col-md-4 col-lg-6">
                <img v-bind:src="podrazumevanaSlikaPrikaz" ref='slikanova'/>

              </div>
              <div v-if="p" class="alert alert-success offset-sm-4 col-sm-4" role="alert">
            <strong>Uspesno ste promenili sliku!</strong>
              </div>
              <button class="btn btn-secondary btn-sm  btn-search offset-sm-4 col-sm-4" v-if="!promeniSliku" v-on:click="promeniSliku=!promeniSliku">Promeni Sliku</button>
              <div class="" v-if="promeniSliku">


              <label ref="imageFromLocal" class="btn btn-outline-primary btn-file offset-sm-4 col-sm-4" t="Unesi sliku">
                <i class="fa fa-file-image-o" aria-hidden="true"></i><input accept="image/*" v-on:change="insertImageFromLocal($event)" type="file" style="display: none;">

              </label>
                <button type="button" name="button" class="btn btn-primary offset-sm-4 col-sm-4" v-on:click="sacuvajSliku">Sacuvaj</button>
              </div>
            </fieldset>
        </div><!--Kraj promene slike default korisnika-->
        <div class="offset-lg-3 col-lg-6"><!--Pretraga korisnika-->
          <fieldset class="korisnik">
            <legend>Pretrazi korisnike</legend>
            <input id="search-input" class="col-sm-12" type="text" name="" value="" placeholder="Unesi ime korisnika" v-model="search">
          <button class="btn btn-secondary btn-sm  btn-search col-sm-12" v-on:click="pretraziKorisnike">Pretrazi korisnike</button>
          <button class="btn btn-secondary btn-sm  btn-search col-sm-12" v-on:click="ponisti">Ponisti pretragu</button>
          </fieldset>
        </div><!--Kraj pretrage korisnika-->
      </div>
    </div>
    <div id="tabela"><!--pocetak -->
      <div class="row">
        <div class="col-sm-12 col-lg-12">
          <div class="jumbotron offset-xl-2 col-xl-8">
           <table class="table table-striped" v-if="!flagSearch">
            <thead>
              <tr>
                <th>#</th>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Korisnicko ime</th>
                <!-- <th>Datum registracije</th> -->
                <th>Status</th>
                <th>Komentari</th>
                <th>Odobri</th>
                <th>Blokiraj</th>
                <th>Aktiviraj</th>
                <th v-if='pristupC'>Moderator</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(korisnik,index) in sviKorisniciC">
                <td scope="row">{{index+1}}</td>
                <td>{{ korisnik.osb_ime }}</td>
                <td>{{ korisnik.osb_prezime }}</td>
                <td>{{ korisnik.username }}</td>
                <!-- <td>{{ korisnik.osb_dtm_reg }}</td> -->
                <td v-if='korisnik.osb_nalog_prijava===0'>Aktivan</td>
                <td v-if='korisnik.osb_nalog_prijava===2'>Obrisan</td>
                <td v-if='korisnik.osb_nalog_prijava===1'>Prijavljen</td>
                <td v-if='korisnik.osb_nalog_prijava===3'>Moderator</td>
                <!-- The Modal -->
                <!-- Trigger/Open The Modal -->
                <!-- The Modal -->
                <div v-if="flag" class="modal">
                  <!-- Modal content -->
                  <div class="modal-content">
                    <span class="close" v-on:click="zatvori">&times;</span>
                    <div class="slikaKorisnika">
                      <img id="slikaPop" v-bind:src="slikaPop (trenutniId)" />
                    </div>
                    <table class="table-bordered prijavljeniKorisnici">
                      <thead>
                        <tr style="background-color:white">
                          <th>#</th>
                          <th>Tekst komentara</th>
                          <th>Datum objave</th>
                          <th>Vest</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(kom,index) in SviKomentariSvihKorisnikaC">
                          <td scope="row">{{index+1}}</td>
                          <td>{{kom.pst_tekst}}</td>
                          <td>{{ kom.pst_datum | dateTrans }}</td>
                          <td>{{kom.tma_naslov}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!-- Trigger/Open The Modal -->
                <td><button v-on:click="sviKomentariKorisnika(korisnik.osb_id)" type="button" name="button" class="btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i><span id="prikazi">Prikazi</span></button></td>
                <td><button class="btn btn-success" v-show="korisnik.osb_nalog_prijava===1" v-on:click="oznaciKorisnikaOk(korisnik.osb_id)" ><i class="fa fa-check-square-o" aria-hidden="true"></i></button></td>
                <td><button type="button" name="button" class="btn btn-danger"  v-show="korisnik.osb_nalog_prijava===1 || korisnik.osb_nalog_prijava===0" v-on:click="blokirajKorisnika(korisnik.osb_id)"><i class="fa fa-ban" aria-hidden="true"></i></button></td>
                <td><button type="button" name="button" class="btn btn-danger boja"  v-show="korisnik.osb_nalog_prijava===2" v-on:click="vratiKorisnikaUZivot(korisnik.osb_id)"><i class="fa fa-hand-o-up" aria-hidden="true" style="color:black"></i></button></td>
                <td v-if='pristupC'><button type="button" v-show="korisnik.osb_nalog_prijava===0" name="button" v-on:click="postaviModeratora(korisnik.osb_id)"><i class="fa fa-handshake-o" aria-hidden="true"></i></button>
                                    <button type="button" v-show="korisnik.osb_nalog_prijava===3" name="button" v-on:click="oznaciKorisnikaOk(korisnik.osb_id)"><i class="fa fa-times" aria-hidden="true"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- kraj prve tabele sviKorisnici -->

          <!-- pocetak druge tabele korisniciSearch -->
          <table class="table table-striped" v-if="flagSearch">
            <thead>
              <tr>
                <th>#</th>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Korisnicko ime</th>
                <!-- <th>Datum registracije</th> -->
                <th>Status korisnika</th>
                <th>Prikazi komentare</th>
                <th>Oznaci OK</th>
                <th>Blokiraj</th>
                <th>Ozivi korisnika</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pretraga,index) in korisniciSearchC">
                <td scope="row">{{index+1}}</td>
                <td>{{ pretraga.osb_ime }}</td>
                <td>{{ pretraga.osb_prezime }}</td>
                <td>{{ pretraga.username }}</td>
                <!-- <td>{{ korisnik.osb_dtm_reg }}</td> -->
                <td v-if='pretraga.osb_nalog_prijava===0'>Aktivan</td>
                <td v-if='pretraga.osb_nalog_prijava===2'>Obrisan</td>
                <td v-if='pretraga.osb_nalog_prijava===1'>Prijavljen</td>
                <!-- The Modal -->

                <!-- Trigger/Open The Modal -->
                <!-- The Modal -->
                <div v-if="flag" class="modal">
                  <!-- Modal content -->
                  <div class="modal-content">
                    <span class="close" v-on:click="zatvori">&times;</span>
                    <div class="slikaKorisnika">
                      <img id="slikaPop" v-bind:src="slikaPop (trenutniId)" />
                    </div>
                    <table class="table-bordered prijavljeniKorisnici">
                      <thead>
                        <tr style="background-color:white">
                          <th>#</th>
                          <th>Tekst komentara</th>
                          <th>Datum objave</th>
                          <th>Vest</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(kom,index) in SviKomentariSvihKorisnikaC">
                          <td scope="row">{{index+1}}</td>
                          <td>{{kom.pst_tekst}}</td>
                          <td>{{ kom.pst_datum | dateTrans }}</td>
                          <td>{{kom.tma_naslov}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!-- Trigger/Open The Modal -->
                <td><button v-on:click="sviKomentariKorisnika(pretraga.osb_id)" type="button" name="button" class="btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i><span id="prikazi">Prikazi</span></button></td>
                <td><button class="btn btn-success" v-show="pretraga.osb_nalog_prijava===1" v-on:click="oznaciKorisnikaOk(pretraga.osb_id)" ><i class="fa fa-check-square-o" aria-hidden="true"></i></button></td>
                <td><button type="button" name="button" class="btn btn-danger"  v-show="pretraga.osb_nalog_prijava===1 || pretraga.osb_nalog_prijava===0" v-on:click="blokirajKorisnika(pretraga.osb_id)"><i class="fa fa-ban" aria-hidden="true"></i></button></td>
                <td><button type="button" name="button" class="btn btn-danger boja"  v-show="pretraga.osb_nalog_prijava===2" v-on:click="vratiKorisnikaUZivot(pretraga.osb_id)"><i class="fa fa-hand-o-up" aria-hidden="true" style="color:black"></i></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button v-if="!flagDugme" v-on:click="uvecaj(); sviKorisnici();" type="button" name="button" class="btn btn-primary" style="margin:30px 47%;">Ucitaj jos</button>
      <!-- <button v-if="limit>10" v-on:click="umanji(); sviKorisnici();" type="button" name="button" class="btn btn-primary" style="margin:10px 750px;">ucitaj manje</button> -->
      <button v-if="(start+10)>10" v-on:click="umanji(); /*sviKorisnici();*/" type="button" name="button" class="btn btn-primary" style="margin:30px 46%;">ucitaj manje</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/vesti_forum/axios_calls.js';
import {axiosWithBaseUrlOnly} from '@/api/forum/config.js';
import axios from 'axios';

export default {
  data(){
    return{
      flag: false,
      search: '',
      limit: 10,
      start: 0,
      flagSearch: false,
      n: '',
      flagDugme: false,
      promenaFotke: '',
      podrazumevanaSlikaPrikaz: '',
      promeniSliku: false,
      p: false,
      trenutniId:''
    }
  },
  methods:{
  slikaPop: function(osbId) {
    return "http://vesti.mars-t.mars-hosting.com/api/podSlika/" + osbId;
  },
  insertImageFromLocal: function(event){
    var self = this;
    var file = event.target.files[0];
    var imageFL = this.$refs.imageFromLocal;
    var input = imageFL.getElementsByTagName('input')[0];
    imageFL.innerText = file.name;
    imageFL.appendChild(input);
    if(event.target.files.length > 0 && file.size <= 5*1024*1024){
      var img = this.$refs.slikanova;
      var fr = new FileReader();
      fr.onload = function(event2){
        img.src = event2.target.result;
        self.promenaFotke = img.src;
      }
      fr.readAsDataURL(file);
    }
  },
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
  sacuvajSliku: function(){
    if(this.promenaFotke == ""){
      alert('Niste izabrali novu sliku');
    }else{
      var self = this;
      var g = this.promenaFotke;
      var SlikaNova = this.dataUrlToBlob(g);
      var formData = new FormData();
      formData.append('slika', SlikaNova);
      var self = this;
      axios({
        url: 'http://vesti.mars-t.mars-hosting.com/api/postaviNovuSlikuDefKorisnika',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response)=>{
        if(response.status ==200){
          self.podrazumevanaSlika();
        }
      });
   this.promeniSliku=!this.promeniSliku;
   this.p = !this.p;
  }
  },
  podrazumevanaSlika: function(){
    var self = this;
      axios({
        url : 'http://vesti.mars-t.mars-hosting.com/api/prikazPodrazumevaneSlike',
        method: 'post'
      }).then((response)=>{
        self.podrazumevanaSlikaPrikaz = 'data:text/plain;base64,'+response.data.result;
      })
  },
  resetParams: function(){
    this.$store.dispatch('resetParamsA_F');
  },
  sviKorisnici: function(){
    var start = this.start;
    var limit = this.limit;
    var upit = {
      limit : limit,
      start : start
    }
    this.$store.dispatch('sviKorisniciA_F',upit);
  },
  sviKomentariKorisnika: function(id){
    this.$store.dispatch('sviKomentariSvihKorisnikaA_F',id);
    this.flag = true;
    this.trenutniId=id;
  },
  zatvori(){
    this.flag = false;
  },
  uvecaj(){
    if((this.start+20) > this.n){
      this.flagDugme = true;
    }else {
      this.flagDugme = false;
    }
    this.start += 10;
  },
  umanji(){
    if(this.start == 0){
      this.flagDugme = true;
    }else{
      this.flagDugme = false;
    }
    var start = this.start;
    var limit = this.limit;
    var upit = {
      limit : limit,
      start : start
    }
    this.$store.dispatch('sviKorisniciSmanjiA_F',upit);
    this.start -=10;
  },
  oznaciKorisnikaOk: function(id){
    var nesto = {
      id : id
    };
    this.$store.dispatch('oznaciKorisnikaOkA_F',nesto);
  },
  blokirajKorisnika: function(id){
    var nesto = {
      id : id
    };
    this.$store.dispatch('blokirajKorisnikaA_F',nesto);
  },
  vratiKorisnikaUZivot: function(id){
    var nesto = {
      id : id
    };
    this.$store.dispatch('vratiKorisnikaUZivotA_F',nesto);
  },
  pretraziKorisnike: function(){
    if(this.search !== ''){
      var search = this.search;
      this.flagSearch = !this.flagSearch;
      this.flagDugme = !this.flagDugme;
      this.$store.dispatch('pretraziKorisnikeA_F',search);
    }else{
      alert('Unesite nesto');
      this.flagSearch= false;
    }
  },
  ponisti: function(){
    if(this.search !== ''){
      this.flagSearch = !this.flagSearch;
      this.search = '';
    }else{
      alert('nema sta da se ponisti');
    }
  },
  ukupanBroj: function(){
    axios({
      url: 'http://vesti.mars-t.mars-hosting.com/api/ukupanBrojKorisnikaApi',
      method: 'post',
      data: {

      }
    }).then((response)=>{
      this.n = response.data.result.o;
    });
  },
  postaviModeratora: function(id){
    var nesto = {
      id : id
    };
    this.$store.dispatch('postaviModeratoraA_F',nesto);
  },
},
computed:{
  sviKorisniciC : function(){
    return this.$store.getters.sviKorisniciG_F;
  },
  SviKomentariSvihKorisnikaC : function(){
    return this.$store.getters.SviKomentariSvihKorisnikaG_F;
  },
  korisniciSearchC : function(){
    return this.$store.getters.korisniciSearchG_F;
  },
  pristupC : function(){
    return this.$store.getters.getPristup_F;
  }
},
created(){
  this.resetParams();
  this.sviKorisnici();
  this.ukupanBroj();
  this.podrazumevanaSlika();
 }
}
</script>

<style scoped>

.wrapper {
  max-width: 59%;
  margin: 30px auto;
}

.wrapper .container {
  margin: 30px auto;
}

input#search-input {
  border: 5px solid white;
  -webkit-box-shadow:
    inset 0 0 8px  rgba(0,0,0,0.1),
          0 0 16px rgba(0,0,0,0.1);
  -moz-box-shadow:
    inset 0 0 8px  rgba(0,0,0,0.1),
          0 0 16px rgba(0,0,0,0.1);
  box-shadow:
    inset 0 0 8px  rgba(0,0,0,0.1),
          0 0 16px rgba(0,0,0,0.1);
  padding: 5px;
  background: rgba(255,255,255,0.5);
  margin: -2px 0 10px 0;
}

.btn-search {
  width:49%;
}

.boja {
  background-color: yellow;
}

.search {
  padding: 0;
  float: left;
}
/* The Modal (background) */
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
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}
.modal-content table {
      margin: 10px auto;
      display: block;
      width: 64%;
}

.modal-content th {
      width: 240px;
}

/* The Close Button */
.close {
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

.button {
  margin: 0 50%;
}

#ptrZag {
  overflow: hidden;
}

#levi {
float: left;
}

#desni {
float: desni;
margin-top:131px;
}

form {
  margin: 20px;
}

.slikaKorisnika {
  text-align:center;
  margin-bottom: 10px;
}

fieldset {
  border: 1px solid #ddd !important;
  margin: 0 0 10px 0;
  xmin-width: 0;
  padding: 10px;
  position: relative;
  border-radius:4px;
  background-color:#f5f5f5;
  padding-left:10px!important;
}

legend {
  font-size:14px;
  font-weight:bold;
  margin-bottom: 0px;
  width: 50%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 5px 5px 10px;
  background-color: #ffffff;
}

#slikaPop {
  width: 200px;
  height: 200px;
}

@media only screen and (min-width : 1201px) {
  .korisnik {
    min-height: 150px;
    padding-top: 20px;
  }

  table th {
    font-size: 16px;
  }
}

@media only screen and (min-width : 1200px) {
  table th {
    font-size: 16px;
  }
}

@media only screen and (min-width : 992px) {
  table th {
    font-size: 16px;
  }
}

@media only screen and (min-width : 768px) {
  .wrapper {
    max-width: 100%;
  }

 .wrapper .container {
   width: 100%;
   margin: 0px;
 }

 .jumbotron {
   padding: 0px;
 }

 img {
   max-width: 150px;
 }

 table td {
  font-size: 14px;
  padding: 0px;
  text-align: center;
  vertical-align: middle;
 }

 table th {
  font-size: 8px;
 }

 table td, table th {
  text-align: center;
  padding: 0;
 }

 table span#prikazi {
  display: none;
 }

 table button {
  max-width: 39px;
 }

}

@media only screen and (max-width : 767px) {
  .wrapper {
    max-width: 100%;
  }

 .wrapper .container {
   width: 100%;
   margin: 0px;
 }

 .jumbotron {
   padding: 0px;
 }

 img {
   max-width: 70px;
 }

 table td {
  font-size: 14px;
  padding: 0px;
  text-align: center;
  vertical-align: middle;
 }

 table th {
  font-size: 8px;
 }

 table td, table th {
  text-align: center;
  padding: 0;
 }

 table span#prikazi {
  display: none;
 }

 table button {
  max-width: 39px;
 }

}
</style>
