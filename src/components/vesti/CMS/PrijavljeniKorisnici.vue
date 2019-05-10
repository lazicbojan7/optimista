<template lang="html">
  <div id="wrapper">
    <div class="container">
      <div class="jumbotron">



    <table class="table table-striped">
    <thead>
      <tr class="zaglavlje">
        <td>#</td>
        <th>Username korisnika</th>
        <th>Datum registracije</th>
        <th>Komentari korisnika-vesti</th>
        <th>Oznaci kao ok</th>
        <th>Obrisi korisnika</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(l,index) in listaKorisnici">
        <td scope="row">{{index+1}}</td>
        <td>{{ l.username}}</td>
        <td>{{ dateTrans(l.osb_dtm_reg)}}</td>
        <div v-if="flag" class="modal">
                  <!— Modal content —>
                  <div class="modal-content">
                    <span class="close" v-on:click="zatvori">&times;</span>
                    <table class="table-bordered">
                      <thead>
                        <tr style="background-color:white">
                          <td>#</td>
                          <td>Tekst komentara</td>
                          <td>Datum objave</td>
                          <td>Vest</td>
                        </tr>
                      </thead>
                      <tbody>
                    <tr v-for="(kom,index) in listaKomentara">
                        <td scope="row">{{index+1}}</td>
                      <td>{{kom.pst_tekst}}</td>
                      <td>{{kom.pst_datum}}</td>
                      <td>{{kom.tma_naslov}}</td>

                    </tr>
                  </tbody>
                      </table>

                  </div>
                </div>
        <td><button v-on:click="sviKomentariKorisnika(l.osb_id)" type="button" class="btn btn-info">
        <i class="fa fa-eye" aria-hidden="true"></i> pogledaj</i>
      </button></td>
        <td>    <button v-on:click="oznaciKorisnikaOk(l.osb_id)" type="button" class="btn btn-success">
        <i class="fa fa-check-square-o" aria-hidden="true"></i>
      </button></td>
      <td>    <button v-on:click="blokirajKorisnika(l.osb_id)" type="button" class="btn btn-danger">
    <i class="fa fa-ban" aria-hidden="true"></i>
    </button></td>
      </tr>

    </tbody>
  </table>







  </div>
</div>

</div>

</template>
<script>
import api from '@/api/vesti/axios_calls.js'
export default {
  data() {
    return {
      flag: false,
      limit: 10
    }
  },
  methods: {
    dateTrans: function(date) {
      var data = date.split(" ");
      var d = data[0];
      var transformed = d.split("-").reverse().join(' - ');
      return transformed;
    },

    prijavljeniKorisnici: function() {

      this.$store.dispatch('prijavljeniKorisniciA');

    },
    sviKomentariKorisnika(id) {
      this.$store.dispatch('sviKomentariKorisnikaA', id);
      this.flag = true;
    },


    zatvori() {
      this.flag = false;
    },
    oznaciKorisnikaOk: function(id) {
      api.oznaciKorisnikaOkApi(id).then(response=>{
        this.prijavljeniKorisnici();
        this.$store.commit('oznaciKorisnikaOkM',id);
        this.$store.commit('oznaciKorisnikaOkSearchM',id);
      })
    },
    blokirajKorisnika: function(id) {
      api.blokirajKorisnikaApi(id).then(response=>{
        this.prijavljeniKorisnici();
      })
    },
  },
    computed: {
      listaKorisnici() {
        return this.$store.getters.getPrijavljeniKorisniciG;
      },
      listaKomentara() {
        return this.$store.getters.getSviKomentariKorisnikaG;
      }
    },
    created() {
      this.prijavljeniKorisnici();

    }
  }
</script>








<style scoped>
button {
  cursor: pointer;
}

/* stilizacija za popup */

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
</style>
