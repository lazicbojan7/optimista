<template lang="html">
  <div id="wrapper">
    <div class="container">
    <div class="jumbotron">


      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Naslov teme</th>
            <th>Vidi temu</th>
            <th>Vreme objave teme</th>
            <th>Objavi</th>
            <th>Obrisi</th>
            <th>Vrati na doradu uz poruku</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l,index) in listaVesti">
            <td scope="row">{{index+1}}</td>
            <td>{{ l.tma_naslov}}</td>
            <td>
              <button v-on:click="takeOneNew(l.tma_id); otvori();" type="button" class="btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i> pogledaj</i>
              </button>
            </td>
            <td>{{l.tma_datum}}</td>

            <td>
              <button v-on:click="objaviTemu(l.tma_id)" type="button" class="btn btn-success">
                <i class="fa fa-check-square-o" aria-hidden="true"></i>
              </button>
            </td>
            <td>
              <button v-on:click="obrisiTemu(l.tma_id)" type="button" class="btn btn-danger">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>

            <!-- Ispod je pop up div -->
            <div v-show="flag1" class="modal">
              <!-- Modal content -->
              <div class="modal-content">
                <span class="close" v-on:click="zatvori1">&times;</span>
                <textarea v-model="obavestenje" rows="3" cols="50"></textarea>
              <center><button id="dugme" v-on:click="dorada()" type="button" class="btn btn-success">Potvrdi
                  <i class="fa fa-check-square-o" aria-hidden="true"></i>
                </button></center>



              </div>
            </div>
            <!-- Iznad je pop up div -->

            <td>

              <button v-on:click="otvori1(l.tma_id)" type="button" class="btn btn-secondary">Napisi poruku
                <i class="fa fa-share-square" aria-hidden="true"></i>
              </button>
            </td>
          </tr>

        </tbody>
      </table>


    </div>
    </div>
    <!-- Ispod je pop up div -->
    <div v-show="flag" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" v-on:click="zatvori">&times;</span>

        <!-- odavde na dole preuzimam prikaz od dusana -->

        <div class="col-md-9" id="content" ref="content">
          <div class="row" id="title" ref="title">
            <h1 v-text="title"></h1>

          </div>
          <div class="row" id="summary" ref="summary">
            <h6 v-text="summary"></h6>
          </div>
          <div class="row" id="mainImage">
            <img v-bind:src="takeMainImage(temaId)" />
          </div>
          <div class="row" v-html="text" id="textCont" ref="textCont">

          </div>

        </div>
        <!-- prikaz iznad je preuzet od dusana -->

      </div>
    </div>
    <!-- Iznad je pop up div -->



  </div>
</template>
<script>
import api from '@/api/vesti/axios_calls.js'
export default {
  data() {
    return {
      trazeni:'',
      obavestenje:'',
      flag: false,
      flag1: false,
      // preuzeto
      myNews: [],
      title: '',
      summary: '',
      temaId: '',
      text: '',

      moreNews: false,
      ofset: 1
    }
  },
  methods: {
    takeMainImage: function(temaId){
      return "http://vesti.mars-t.mars-hosting.com/api/getMainImage/"+temaId;
    },

    takeOneNew: function(temaId) {



      var params = {
        temaId: temaId
      }
var self = this;
      api.takeMyOneNew(params).then((response) => {


        var tc = self.$refs.textCont;
      var observer = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
          var images = self.$refs.textCont.getElementsByTagName('img');
          var i;
          for (i = 0; i < images.length; i++) {
            images[i].src = 'data:text/plain;base64,' + response.data.images[i].slk_slika;
          }
        });
      });
      var config = { childList:true, characterData:false, attributes:false, subtree:true};
      observer.observe(tc,config);
        self.title = response.data.result.tma_naslov;
        self.summary = response.data.result.tma_sazetak;
        self.text = response.data.result.tma_tekst;
        self.temaId = response.data.result.tma_id;

      });


    },
    dateTrans: function(date) {
      var data = date.split(" ");
      var d = data[0];
      var transformed = d.split("-").reverse().join(' - ');
      return transformed;
    },
    neodobreneVesti: function() {

      this.$store.dispatch('neodobreneVestiA');

    },

    objaviTemu: function(id) {

      var nesto = {
        id: id
      };

      this.$store.dispatch('objaviTemuA', nesto);
    },
    obrisiTemu: function(id) {

      var nesto = {
        id: id
      };
      this.$store.dispatch('obrisiTemuA', nesto);
    },
    dorada: function() {
    var id=this.trazeni;
    var obavestenje= this.obavestenje;

    var params = {
      id: id,
      obavestenje: obavestenje

    };


    api.dorada(params).then((response) => {
      this.neodobreneVesti();

      this.obavestenje='';
      this.trazeni='';
      this.flag1=false;
    });



    },


    zatvori() {
      this.flag = false;
    },
    zatvori1() {
      this.flag1 = false;
    },

    otvori() {
      this.flag = true;
    },
    otvori1(id) {
      var id =id;
      this.trazeni=id;
      this.flag1 = true;

    }

  },
  computed: {
    listaVesti() {
      return this.$store.getters.getNeodobreneVestiG;
    }
  },
  created() {
    this.neodobreneVesti();
  }
}
</script>






</script>

<style scoped>
button {
  cursor: pointer;
}
#dugme{
  width: 100px;
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
