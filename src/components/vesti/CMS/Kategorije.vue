<template lang="html">
  <div class="wrapper">
    <div class="container">
      <div class="jumbotron">
        <h3>Ovih 7 kategorija su trenutno postavljene kao glavne:</h3>
        <div id="centeredmenu">
          <ul>
            <li v-for="(kategorija,index) in listaKategorijaC" v-if="kategorija.ktg_glavna==0">&nbsp;{{index+1}}.{{ kategorija.ktg_naziv }}({{ kategorija.broj }})&nbsp;</li>
          </ul>
        </div>
  </div>
<div class="jumbotron">
        <fieldset>
          <legend>Dodaj novu kategoriju</legend>
          <div class="form-group">

            <label for="exampleInputEmail1">Naziv kategorije</label>
            <input v-model="naziv" type="text" placeholder="unesite naziv kategorije...">
            <small id="emailHelp" class="form-text text-muted">Ova kategorija ce biti postavljena kao sporedna. Glavne kategorije mozete izabrati ispod</small>
          </div>
          <button v-on:click="dodajKategorijuVesti()" type="button" class="btn btn-success">Sacuvaj</button>
        </fieldset>
      </div>


      <div id="kat" class="jumbotron">



        <fieldset>
          <legend>Postavi glavne kategorije</legend>
            <small id="emailHelp" class="form-text text-muted">Izbaci glavnu kategoriju i stavi sporednu na njeno mesto.</small>
          <div class="glavna-kategorija">
            <label>Izbaci glavnu
              <select v-model="zaIzbacivanje">
                <option disabled selected>Izbaci glavnu</option>

                <option v-for="(kategorija,index) in listaKategorijaC" v-if="kategorija.ktg_glavna==0" v-bind:value="kategorija.ktg_id">{{index+1}} {{ kategorija.ktg_naziv }}</option>
              </select>
            </label>
          </div>

          <div class="sporedna-kategorija">
            <label>Ubaci sporednu
              <select v-model="zaUbacivanje">
                <option selected disabled>Ubaci sporednu</option>
                <option v-for="(kategorija,index) in listaKategorijaC" v-if="kategorija.ktg_glavna==1" v-bind:value="kategorija.ktg_id">{{ kategorija.ktg_naziv }}</option>
              </select>
            </label>
          </div>


          <button v-on:click="zameniKategorije()" type="button" name="button" class="btn btn-success">Potvrdi</button>

          <small id="emailHelp" class="form-text text-muted">Uvek mora biti 7 glavnih kategorija</small>
        </fieldset>
      </div>
      <!-- <p>za izbacivanje: {{zaIzbacivanje}}</p>
  <p>za ubacivanje: {{zaUbacivanje}}</p>
  <p>{{naziv}}</p> -->
    </div>
  </div>
</template>

<script>
  import api from '@/api/vesti/axios_calls.js'
  export default {
    data() {
        return {

          zaIzbacivanje: 0,
          zaUbacivanje: 0,
          naziv: ''
        }
      },
      methods: {
        listaKategorija: function() {
          this.$store.dispatch('listaKategorijaA');
        },
        dodajKategorijuVesti() {
          var naziv = this.naziv;

          var res = naziv.match(/\s/);

        
          if (this.naziv === '' || res !== null) {
            alert(

              'Kategorija mora biti jedna rec bez razmaka-pokusajte ponovo')
          } else {

            api.dodajKategorijuVestiApi(naziv).then((response) => {
              this.listaKategorija();
            });


          }
          this.naziv = '';
        },
        zameniKategorije() {
          if (this.zaIzbacivanje === 0 || this.zaUbacivanje === 0) {
            alert('Moras izabrati jednu kategoriju da izbacis i jednu da ubacis');
          } else {
            var zaIzbacivanje = this.zaIzbacivanje;
            var zaUbacivanje = this.zaUbacivanje;
            var nesto = {
                zaIzbacivanje: zaIzbacivanje,
                zaUbacivanje: zaUbacivanje
              }
              //console.log(nesto);
            api.zameniKategorijeApi(nesto).then((response) => {
              this.listaKategorija();
            });
            this.zaIzbacivanje = 0;
            this.zaUbacivanje = 0;
          }
        }
      },
      computed: {
        listaKategorijaC: function() {
          return this.$store.getters.listaKategorijaG;
        }
      },
      created() {
        this.listaKategorija();

      },


  }
</script>

<style scoped>

fieldset
{
border: 1px solid #ddd !important;
margin: 0;
xmin-width: 0;
padding: 10px;
position: relative;
border-radius:4px;
background-color:#f5f5f5;
padding-left:10px!important;
}

legend
{
  font-size:14px;
  font-weight:bold;
  margin-bottom: 0px;
  width: 35%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 5px 5px 10px;
  background-color: #ffffff;
}


  .btn {
    margin: 0 5px;
  }

  .wrapper {
    margin: 10px auto;
    width: 870px;
  }
  /*#exampleSelect1 {
  font-family: 'FontAwesome', 'sans-serif';
}

#kat {
  margin: 30px auto;
  width: 870;
  overflow: hidden;
}*/

  .glavna-kategorija {
    float: left;
    margin: 0 80px;
  }

  .sporedna-kategorija {
    float: left;
    margin-right: 65px;
  }

  .zaglavlje td {
    font-weight: 800;
    font-family: sans-serif;
  }
  /*za liste--------------*/
  #centeredmenu {
   float:left;
   width:100%;
   background:#fff;
   border-bottom:4px solid #000;
   overflow:hidden;
   position:relative;
}
#centeredmenu ul {
   clear:left;
   float:left;
   list-style:none;
   margin:0;
   padding:0;
   position:relative;
   left:50%;
   text-align:center;
}
#centeredmenu ul li {
   display:block;
   float:left;
   list-style:none;
   margin:0;
   padding:0;
   position:relative;
   right:50%;
}

  /*#listaDiv {
    width: 200px;
  }

  #listaNaslov {
    font: 400 30px/1.5 Helvetica, Verdana, sans-serif;
    margin: 0;
    padding: 0;
  }

  #listaUl {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  #listaUl li {
    font: 200 20px/1.5 Helvetica, Verdana, sans-serif;
    border-bottom: 1px solid #ccc;
  }

  #listaUl li:last-child {
    border: none;
  }*/
  /*li a {
  text-decoration: none;
  color: #000;
  display: block;
  width: 200px;

  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}

li a:hover {
  font-size: 30px;
  background: #f6f6f6;
}*/
</style>
