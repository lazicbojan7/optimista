<template lang="html">
  <div id="wrapper">


<div class="container">

  <div class="jumbotron">


      <table class="table table-striped">
      <thead>
        <tr class="zaglavlje">
          <td>#</td>
          <td>Ime autora</td>
          <td>Prezime autora</td>
          <td>Username autora</td>
          <td>Prihvati</td>
          <td>Odbaci zahtev</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l,index) in listaAutori">
          <td scope="row">{{index+1}}</td>
          <td>{{ l.osb_ime}}</td>
          <td>{{ l.osb_prezime}}</td>
          <td>{{ l.username}}</td>
          <td>    <button v-on:click="prihvatiAutora(l.osb_id)" type="button" class="btn btn-success">
          <i class="fa fa-check-square-o" aria-hidden="true"></i>
        </button></td>
        <td>    <button v-on:click="odbaciAutora(l.osb_id)" type="button" class="btn btn-danger">
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

    }
  },
  methods: {
    potencijalniAutori() {
      this.$store.dispatch('potencijalniAutoriA');
    },
    prihvatiAutora(id) {
      //o znaci da je prihvacen
      var odluka = 0;
      var nesto = {
        id: id,
        odluka: odluka
      };
      api.odrediAutoraApi(nesto).then(response=>{
        this.potencijalniAutori();
      })

    },
    odbaciAutora(id) {
      //1 znaci da je odbijen
      var odluka = 1;
      var nesto = {
        id: id,
        odluka: odluka
      };
        api.odrediAutoraApi(nesto).then(response=>{
          this.potencijalniAutori();
        })

    }
  },
  computed: {
    listaAutori() {
      return this.$store.getters.getPotencijalniAutoriG;
    }
  },
  created() {
    this.potencijalniAutori();
  },
  update(){
    this.potencijalniAutori();
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
