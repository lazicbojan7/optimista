<template lang="html">
    <div class="wrapper col-sm-12 col-md-12 offset-lg-3 col-lg-12">
      <div class="container col-sm-12 col-md-12 col-lg-12">
      <div class="jumbotron  offset-xl-2 col-xl-8">
        <table class="table table-striped"><!--Tabela neodobrenih tema-->
          <thead>
            <tr>
              <th>#</th>
              <th>Naziv teme</th>
              <th>Autor teme</th>
              <th>Datum</th>
              <th>Tekst</th>
              <th>Objavi</th>
              <th>Obrisi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tema,index) in listaTemaC">
              <td scope="row">{{index+1}}</td>
              <td>{{ tema.tma_naslov }}</td>
              <td>{{ tema.osb_ime }}</td>
              <td>{{tema.tma_datum }}</td>
                <!-- The Modal -->
                <div v-if="flag" class="modal">
                  <!-- Modal content -->
                    <div class="modal-content">
                      <span class="close" v-on:click="zatvori">&times;</span>
                      <div class="tekst">
                        <p>
                        {{ tekst }}

                        </p>
                      </div>
                    </div>
                </div>
                <!-- Trigger/Open The Modal -->
              <td><button v-on:click="prikaziTemu(tema.tma_tekst)" type="button" name="button" class="btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i><span id="prikazi">Prikazi</span></button></td>
              <td><button v-on:click="objaviTemu(tema.tma_id)" type="button" name="button" class="btn btn-success"><i class="fa fa-check-square-o" aria-hidden="true"></i></button></td>
              <td><button v-on:click="obrisiTemu(tema.tma_id)" type="button" name="button" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      flag : false,
      tekst: ""
    }
  },
  methods: {
    listaTema: function(){
      this.$store.dispatch('listaTemaA_F');
    },
    prikaziTemu: function(tekst){
      this.tekst = tekst;
      this.flag = true;
    },
    zatvori(){
      this.flag = false;
   },
   objaviTemu: function(id){
     var nesto = {
       id : id
     };
     this.$store.dispatch('objaviTemuA_F',nesto);
   },
   obrisiTemu: function(id){
     var nesto = {
       id : id
     };
     this.$store.dispatch('obrisiTemuA_F',nesto);
   }
 },

  computed: {
    listaTemaC : function(){
      return this.$store.getters.listaTemaG_F;
    }
  },
  created(){
    this.listaTema();
  }
}
</script>

<style scoped>

.wrapper {
  max-width: 59%;
  margin: 30px auto;
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
    width: 60%;
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

/* The Modal (background) */
.tekst p {
  color: black;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
}
@media only screen and (min-width : 768px) {
  .wrapper {
    max-width: 100%;
  }

  table td {
    font-size: 14px;
    padding: 0px;
    text-align: center;
  }

  table td, table th {
    text-align: center;
    padding: 0;
    vertical-align: middle;
  }

  span#prikazi {
    display: none;
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

 .jumbotron{
   padding: 0px;
 }

 img{
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
