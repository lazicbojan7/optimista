<template lang="html">

  <div class="wrapper col-sm-12">
    <div class="container col-sm-12 col-lg-12">
      <div class="jumbotron  offset-xl-2 col-xl-8">
        <table class="table table-striped"><!--Tabela za prikaz prijavljenih korisika-->

          <thead>
            <tr>
              <th>#</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Korisnicko ime</th>
              <th>Datum registracije</th>
              <th>Komentari</th>
              <th>Odobri</th>
              <th>Blokiraj</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(korisnik,index) in listaKorisnikaC">
              <td scope="row">{{index+1}}</td>
              <td>{{ korisnik.osb_ime }}</td>
              <td>{{ korisnik.osb_prezime }}</td>
              <td>{{ korisnik.username }}</td>
              <td>{{ korisnik.osb_dtm_reg | dateTrans }}</td>
              <td><button v-on:click="sviKomentariKorisnika(korisnik.osb_id)" type="button" name="button" class="btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i><span id="prikazi">Prikazi</span></button></td>
              <td><button v-on:click="oznaciKorisnikaOk(korisnik.osb_id);" class="btn btn-success"><i class="fa fa-check-square-o" aria-hidden="true"></i></button></td>
              <td><button v-on:click="blokirajKorisnika(korisnik.osb_id)" type="button" name="button" class="btn btn-danger"><i class="fa fa-ban" aria-hidden="true"></i></button></td>
            </tr>

            <!--pop up-->
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
                    <tr v-for="(kom,index) in sviKomentariKorisnikaC">
                      <td scope="row">{{index+1}}</td>
                      <td>{{kom.pst_tekst}}</td>
                      <td>{{ kom.pst_datum | dateTrans}}</td>
                      <td>{{kom.tma_naslov}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- Trigger/Open The Modal -->
            <!--karj pop up-a-->

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      flag : false,
      trenutniId:''
    }
  },
  methods:{
    slikaPop: function(osbId) {
    return "http://vesti.mars-t.mars-hosting.com/api/podSlika/" + osbId;
    },
    listaKorisnika: function(){
     this.$store.dispatch('listaKorisnikaA_F');
    },
    sviKomentariKorisnika: function(id){
      this.$store.dispatch('sviKomentariKorisnikaA_F',id);
      this.flag = true;
      this.trenutniId=id;
    },
    zatvori(){
      this.flag = false;
    },
    oznaciKorisnikaOk: function(id){
      var nesto = {
        id : id
      };
      this.$store.dispatch('oznaciPrijavljenogKorisnikaOkA_F',nesto);
    },
    blokirajKorisnika: function(id){
      var nesto = {
        id : id
      };
      this.$store.dispatch('blokirajPrijavljenogKorisnikaA_F',nesto);
    }
  },
  computed:{
    listaKorisnikaC : function(){
      return this.$store.getters.listaKorisnikaG_F;
    },
    sviKomentariKorisnikaC : function(){
      return this.$store.getters.sviKomentariKorisnikaG_F;
    }
  },
  created(){
    this.listaKorisnika();
  }
}
</script>

<style scoped>

.wrapper {
  margin: 30px 0px;
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

#slikaPop {
  width: 200px;
  height: 200px;
}

.slikaKorisnika {
  text-align:center;
  margin-bottom: 10px;
}

.prijavljeniKorisnici {
  width: 64%;
    margin-left: 20%;
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
