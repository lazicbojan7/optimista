<template lang="html">
  <div class="wrapper">
    <div class="container">
      <div class="jumbotron col-xs-12" id="ptrZag">
        <div id="levi" class="search col-md-6">
          <fieldset>
            <legend>Podrazumevana slika usera</legend>


            <img v-bind:src="slika" />






            <div v-if="p" class="alert alert-success" role="alert">
              <strong>{{y}}</strong>
            </div>


<button class="btn btn-secondary btn-sm  btn-search" v-if="!promeniSliku" v-on:click="promeniSliku=!promeniSliku">Promeni Sliku</button>
            <div id="app-upload" v-if="promeniSliku">
              <form enctype="multipart/form-data" method="post">
                <input id="x" type="file" name="avatar" class="file" />
                <br>
                <button class="btn btn-secondary" v-on:click="send" type="button" name="button">Sacuvaj</button>
              </form>
            </div>
          </fieldset>





        </div>

        <div id="desni" class="search col-md-6">
          <fieldset>
            <legend>Pretrazi tabelu</legend>
            <input id="unos" class="col-md-12" type="text" name="" value="" placeholder="Unesi ime korisnika" v-model="search">
            <button class="btn btn-secondary btn-sm  btn-search" v-on:click="pretraziKorisnike">Pretrazi korisnike</button>
            <button class="btn btn-secondary btn-sm  btn-search" v-on:click="ponisti">Ponisti pretragu</button>
          </fieldset>
        </div>
      </div>
      <div id="tabela">
        <!--pocetak -->
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

            <table class="table table-striped" v-if="!flagSearch">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Korisnicko ime</th>
                  <!-- <th>Datum registracije</th> -->
                  <th>Status</th>
                  <th>Prikazi</th>
                  <th>Odobri</th>
                  <th>Blokiraj</th>
                  <th>Aktiviraj</th>
                  <th v-if="pristupC">Moderator</th>
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
                       <img id="slikaPop" v-bind:src="slikaPop (trenutniId)" />
                      <table class="table-bordered">
                        <thead>
                          <tr style="background-color:white">
                            <th>#</th>
                            <th>Tekst komentara</th>
                            <th>Datum objave</th>
                            <th>Vest</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(kom,index) in sviKomentariSvihKorisnikaC">
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
                  <td>
                    <button v-on:click="sviKomentariSvihKorisnika(korisnik.osb_id)" type="button" name="button" class="btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i><span id="prikazi">Prikazi</span></button>
                  </td>
                  <td>
                    <button class="btn btn-success" v-show="korisnik.osb_nalog_prijava===1" v-on:click="oznaciKorisnikaOk(korisnik.osb_id)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                  </td>
                  <td>
                    <button type="button" name="button" class="btn btn-danger" v-show="korisnik.osb_nalog_prijava===1 || korisnik.osb_nalog_prijava===0" v-on:click="blokirajKorisnika(korisnik.osb_id)"><i class="fa fa-ban" aria-hidden="true"></i></button>
                  </td>
                  <td>
                    <button type="button" name="button" class="btn btn-danger boja" v-show="korisnik.osb_nalog_prijava===2" v-on:click="vratiKorisnikaUZivot(korisnik.osb_id)"><i class="fa fa-hand-o-up" aria-hidden="true" style="color:black"></i></button>
                  </td>
                  <td v-if="pristupC">
                    <button type="button" v-show="korisnik.osb_nalog_prijava===0" name="button" v-on:click="postaviModeratora(korisnik.osb_id)"><i class="fa fa-handshake-o" aria-hidden="true"></i></button>
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
                       <img id="slikaPop" v-bind:src="slikaPop (trenutniId)" />
                      <table class="table-bordered">
                        <thead>
                          <tr style="background-color:white">
                            <th>#</th>
                            <th>Tekst komentara</th>
                            <th>Datum objave</th>
                            <th>Vest</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(kom,index) in sviKomentariSvihKorisnikaC">
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
                  <td>
                    <button v-on:click="sviKomentariSvihKorisnika(pretraga.osb_id)" type="button" name="button" class="btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i><span id="prikazi">Prikazi</span></button>
                  </td>
                  <td>
                    <button class="btn btn-success" v-show="pretraga.osb_nalog_prijava===1" v-on:click="oznaciKorisnikaOk(pretraga.osb_id)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                  </td>
                  <td>
                    <button type="button" name="button" class="btn btn-danger" v-show="pretraga.osb_nalog_prijava===1 || pretraga.osb_nalog_prijava===0" v-on:click="blokirajKorisnika(pretraga.osb_id)"><i class="fa fa-ban" aria-hidden="true"></i></button>
                  </td>
                  <td>
                    <button type="button" name="button" class="btn btn-danger boja" v-show="pretraga.osb_nalog_prijava===2" v-on:click="vratiKorisnikaUZivot(pretraga.osb_id)"><i class="fa fa-hand-o-up" aria-hidden="true" style="color:black"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        <button v-if="!flagDugme" v-on:click="uvecaj(); sviKorisnici();" type="button" name="button" class="btn btn-primary" style="margin:30px 47%;">Ucitaj jos</button>
        <!-- <button v-if="limit>10" v-on:click="umanji(); sviKorisnici();" type="button" name="button" class="btn btn-primary" style="margin:10px 750px;">ucitaj manje</button> -->
        <button v-if="(start+10)>10" v-on:click="umanji(); /*sviKorisnici();*/" type="button" name="button" class="btn btn-primary" style="margin:30px 46%;">ucitaj manje</button>

      </div>

      <!-- <p style="color:red">flag {{ flagDugme}}</p>
    <p style="color:red">n {{ n}}</p>
    <p style="color:red">start {{ start}}</p> -->
    <p>{{pristupC}}</p>
    </div>
  </div>
</template>

<script>
  import api from '@/api/vesti/axios_calls.js';
  import {
    axiosWithBaseUrlOnly,
    axiosWithBaseUrlParams
  }
  from '@/api/forum/config.js';
  import axios from 'axios';
  export default {
    data() {
        return {
          flag: false,
          search: '',
          limit: 10,
          start: 0,
          flagSearch: false,
          n: '',
          flagDugme: false,

          /*Image Upload Params*/
          image: '',
          file: '',
          y: '',
          p: false,
          slika: '',
          promeniSliku: false,
          trenutniId:''


        }
      },
      // computed: {
      //   pristupC : function(){
      //
      //         return this.$store.getters.getPristup;
      //       },
      //
      //
      //   getSlika() {
      //     return this.slika;
      //   }
      // },
      methods: {





        slikaPop: function(osbId) {
          return "http://vesti.mars-t.mars-hosting.com/api/podSlika/" + osbId;

        },


        slikaCms: function() {
          var self = this;
          console.log("radis li globo????????????");
          api.slikaCms().then((response) => {

            console.log(response.data.slika);
            self.slika = 'data:text/plain;base64,' + response.data.slika;
            console.log('promenljiva slika ' + self.slika);
          });

        },


        /*Image Upload*/
        send: function(e) {
          var self = this;

          var files = document.getElementById('x').files[0];
          console.log(files);

          if (!files) {
            alert("Niste ucitali sliku");
          } else {
            console.log("jeste uzeta");
          }
          this.createImage(files);
          var formData = new FormData();
          formData.append("image", this.file);
          console.log("doslo do axiosa");
          axios.post('http://vesti.mars-t.mars-hosting.com/api/podrazumevanaSlika', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(function(response) {
            //ponovo ucitvanje podrazumevane jer je promenjena
            self.slikaCms();
            console.log(response.data.ok);
            self.p = true;
            self.y = "Uspesno ste promenili sliku";


            console.log(self.y);
          });
          this.promeniSliku=!this.promeniSliku;

        },
        createImage: function(file) {
          var reader = new FileReader();
          this.file = file;
          reader.readAsDataURL(file);
        },


        dateTrans: function(date) {
          var data = date.split(" ");
          var d = data[0];
          var transformed = d.split("-").reverse().join(' - ');
          return transformed;
        },
        sviKorisnici: function() {
          var start = this.start;
          var limit = this.limit;
          var upit = {
            limit: limit,
            start: start
          }
          this.$store.dispatch('sviKorisniciA', upit);
          //this.limit +=10;
        },
        sviKomentariSvihKorisnika: function(id) {
          this.$store.dispatch('sviKomentariSvihKorisnikaA', id);
          this.flag = true;
          this.trenutniId=id;

        },
        zatvori() {
          this.flag = false;
        },
        uvecaj() {

          if ((this.start + 20) > this.n) {
            this.flagDugme = true;
          } else {
            this.flagDugme = false;
          }

          this.start += 10;
        },
        umanji() {
          if (this.start == 0) {
            this.flagDugme = true;
          } else {
            this.flagDugme = false;
          }
          var start = this.start;
          var limit = this.limit;
          var upit = {
            limit: limit,
            start: start
          }
          this.$store.dispatch('sviKorisniciSmanjiA', upit);
          this.start -= 10;

        },
        resetParams() {
          this.$store.dispatch('resetParamsA');
        },
        oznaciKorisnikaOk: function(id) {
          var nesto = {
            id: id
          };
          this.$store.dispatch('oznaciKorisnikaOkA', nesto);
          //limit = this.limit+=10;
          // for(var i = 0; i<this.$store.getters.sviKorisniciG.length;i++){
          //    //console.log(this.$store.getters.sviKorisniciG[i].osb_id);
          //    if(this.$store.getters.sviKorisniciG[i].osb_id == id){
          //      this.$store.getters.sviKorisniciG[i].osb_nalog_prijava = 0;
          //      //console.log(this.$store.getters.sviKorisniciG[i].osb_nalog_prijava);
          //      console.log(this.$store.state.sviKorisnici);
          //    }
          //    }
        },
        blokirajKorisnika: function(id) {
          var nesto = {
            id: id
          };
          this.$store.dispatch('blokirajKorisnikaA', nesto);
        },
        vratiKorisnikaUZivot: function(id) {
          var nesto = {
            id: id
          };
          this.$store.dispatch('vratiKorisnikaUZivotA', nesto);
        },
        pretraziKorisnike: function() {
          if (this.search !== '') {
            var search = this.search;
            // axios({
            //   url:'http://vesti.mars-t.mars-hosting.com/api/searchApi',
            //   method: 'POST',
            //   data: {
            //     search : search
            //   }
            // }).then((response)=>{
            //   //console.log(response.data.result);
            //   this.pretragaNiz=response.data.result;
            //   console.log(this.pretragaNiz);
            this.flagSearch = !this.flagSearch;
            this.flagDugme = !this.flagDugme;
            // });
            this.$store.dispatch('pretraziKorisnikeA', search);
          } else {
            alert('Unesite nesto');
            this.flagSearch = false;
          }
        },
        ponisti: function() {
          this.flagSearch = !this.flagSearch;
          this.search = '';
        },
        ukupanBroj: function() {
          axios({
            url: 'http://vesti.mars-t.mars-hosting.com/api/ukupanBrojKorisnikaApi',
            method: 'post',
            data: {

            }
          }).then((response) => {
            this.n = response.data.result.o;

          });
        },
        postaviModeratora: function(id) {
          var nesto = {
            id: id
          };
          this.$store.dispatch('postaviModeratoraA', nesto);
        }
      },
      computed: {
        pristupC : function(){

                return this.$store.getters.getPristup;
              },
        sviKorisniciC: function() {
          return this.$store.getters.sviKorisniciG;
        },
        sviKomentariSvihKorisnikaC: function() {
          //console.log(this.$store.getters.SviKomentariSvihKorisnikaG);
          return this.$store.getters.getSviKomentariSvihKorisnikaG;
        },
        korisniciSearchC: function() {
          return this.$store.getters.korisniciSearchG;
        }
      },
      created() {
        this.resetParams();
        this.sviKorisnici();
        this.ukupanBroj();
        this.slikaCms();

      }
  }
</script>

<style scoped>

#slikaPop{
  width: 200px;
  height: 200px;
}


  fieldset {
    border: 1px solid #ddd !important;
    margin: 0;
    xmin-width: 0;
    padding: 10px;
    position: relative;
    border-radius: 4px;
    background-color: #f5f5f5;
    padding-left: 10px!important;
  }

  legend {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0px;
    width: 35%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px 5px 5px 10px;
    background-color: #ffffff;
  }

  h3 {
    color: black;
    display: block;
    text-align: center;
    margin-bottom: 40px;
  }
  /*input {
  border-radius: 5px;
  height: 38px;
  margin-top: -4px;
}*/

  #unos {
    border: 5px solid white;
    -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1), 0 0 16px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1), 0 0 16px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1), 0 0 16px rgba(0, 0, 0, 0.1);
    padding: 15px;
    background: rgba(255, 255, 255, 0.5);
    margin: -2px 0 10px 0;
    height: 20px;
  }

  #ptrZag {
    overflow: hidden;
  }

  .wrapper {
    margin: 30px 50px;
  }

  .boja {
    background-color: yellow;
  }

  #levi {
    float: left;
  }

  #desni {
    float: desni;
    margin-top: 107px;
  }

  .search {
    float: right;
    padding: 0px 20px 20px;
  }
  /* The Modal (background) */

  .modal {
    display: block;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    padding-top: 100px;
    /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
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

  #app-upload{
   -moz-box-shadow:    inset 0 0 10px #000000;
   -webkit-box-shadow: inset 0 0 10px #000000;
   box-shadow:         inset 0 0 10px #000000;
}
</style>
