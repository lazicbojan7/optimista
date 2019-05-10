<template lang="html">
  <div class="wrapper col-sm-12 col-md-12  col-lg-12">
    <div class="container col-sm-12 col-md-12 col-lg-12">
      <div class="jumbotron  offset-xl-2 col-xl-8">

        <table class="table table-striped"><!--Tabela prijavljenih komentara-->
          <thead>
            <tr>
              <th>#</th>
              <th>Korisnicko ime</th>
              <th>Tekst</th>
              <th>Datum</th>
              <th>Odobri</th>
              <th>Blokiraj</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(komentar,index) in prijavljeniKomentariC">
              <td scope="row">{{index+1}}</td>
              <td>{{ komentar.username }}</td>
              <td><textarea name="name" rows="3" cols="50" readonly>{{ komentar.pst_tekst }}</textarea></td>
              <td>{{komentar.pst_datum | dateTrans}}</td>
              <td><button v-on:click="odobriKomentar(komentar.pst_id)" class="btn btn-success"><i class="fa fa-check-square-o" aria-hidden="true"></i></button></td>
              <td><button v-on:click="blokirajKomentar(komentar.pst_id)" type="button" name="button" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
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
    return{
    }
  },
  methods: {
    prijavljeniKomentari: function(){
      var limit = this.limit;
      var start = this.start;
      var upit = {
        limit : limit,
        start: start
      }
      this.$store.dispatch('prijavljeniKomentariA_F',upit);
    },
    uvecaj(){
      this.limit += 10;
    },
    umanji(){
      this.limit -= 10;
    },
    odobriKomentar: function(id){
      var limit = this.limit;
      var nesto = {
        id : id,
        limit : limit
      };
      this.$store.dispatch('odobriKomentarA_F',nesto);
    },
    blokirajKomentar: function(id){
      var limit = this.limit;
      var nesto = {
        id : id,
        limit : limit
      };
      this.$store.dispatch('blokirajKomentarA_F',nesto);
    }
  },
  computed: {
    prijavljeniKomentariC: function(){
    return this.$store.getters.prijavljeniKomentariG_F;
    }
  },
  created(){
    this.prijavljeniKomentari();
  }
}
</script>

<style lang="css" scoped>

.wrapper {
  margin: 30px 0px;
}
@media only screen and (min-width : 768px) {
  .wrapper {
    max-width: 100%;
  }

 .wrapper .container {
   max-width: 100%;
   margin: 0px;
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

 textarea {
  width: 100px;
  height: 50px;
 }
}
</style>
