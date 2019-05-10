<template lang="html">
  <div class="wrapper">
    <div class="container">
    
      <div class="jumbotron">



        <table class="table table-striped">
          <thead>
            <tr class="zaglavlje">
              <td>#</td>
              <td>Username korisnika</td>
              <td>Tekst komentara</td>
              <td>Oznaci kao ok</td>
              <td>Obrisi komentar</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l,index) in listaKomentari">
              <td scope="row">{{index+1}}</td>
              <td>{{ l.username}}</td>
              <td>
                <textarea readonly rows="3" cols="50">{{ l.pst_tekst}}</textarea>
              </td>
              <td>
                <button v-on:click="oznaciKomentarOk(l.pst_id)" type="button" class="btn btn-success">
                  <i class="fa fa-check-square-o" aria-hidden="true"></i>
                </button>
              </td>
              <td>
                <button v-on:click="blokirajKomentar(l.pst_id)" type="button" class="btn btn-danger">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
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

    }
  },
  methods: {
    prijavljeniKomentari: function() {

      this.$store.dispatch('prijavljeniKomentariA');
    },

    oznaciKomentarOk(id) {
      api.oznaciKomentarOkApi(id).then(response=>{
        this.prijavljeniKomentari();
      })
    },
    blokirajKomentar: function(id) {
      api.blokirajKomentarApi(id).then(response=>{
        this.prijavljeniKomentari();
      })
  }
},
computed: {
    listaKomentari() {
      return this.$store.getters.getPrijavljeniKomentariG;
    }
  },
  created() {
    this.prijavljeniKomentari();
  }
}
</script>

<style scoped>
.zaglavlje td {
  font-weight: 800;
  font-family: sans-serif;
}

button {
  cursor: pointer;
}
</style>
