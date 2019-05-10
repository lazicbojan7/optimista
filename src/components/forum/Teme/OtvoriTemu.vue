<template lang="html">
  <div>
  <div class="nova-tema-bg">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
          <div class="col text-right">

            <div class="nova-tema" v-if='user' @click='flag=true;'>Otvori Novu Temu</div>
          </div>
        </div><!--row2-->
      </div><!--cela tema-->
    </div><!--row-->
  </div><!--container-->
</div><!--KRAJ CELE TEME-->
<div v-if="flag" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close" style="text-align:right;" v-on:click="flag=false;">&times;</span>
    <label>Naslov</label>
    <textarea cols='6' rows='1' v-model='podaci.naslov'></textarea><br>
    <label>Sažetak</label>
    <textarea cols='6' rows='2' v-model='podaci.sazetak'></textarea><br>
    <label>Tekst</label>
    <textarea cols='8' rows='6' v-model='podaci.tekst'></textarea><br>
    <button @click='publishTopic'>Okači temu</button>
  </div>
</div>
</div>
</template>

<script>

import api from '@/api/forum/axios_calls.js';

export default {
  data(){
    return{
      flag:false,
      podaci:{tema:this.$route.params.tema},
      user:localStorage.getItem('sid')

    }
  },
  methods:{
    publishTopic(){
      api.sendTemaApi(this.podaci).then((response)=>{
        this.$store.dispatch('temaShowA',this.podaci);
      })
      this.flag=false;
    }
  }
}

</script>

<style scoped>

  .nova-tema {

    display: inline;
    font-family: 'Ropa Sans', sans-serif;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    padding: 5px 16px 5px 16px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    background-color: rgba(0, 0, 0, 0.5);
    margin-right: 13px;
    border-radius: 10px;
    /*text-shadow: 0 0 10px rgb(255, 255, 255);*/
    transition: 0.2s;
  }
  .nova-tema:hover {
    border: 1px solid rgba(0, 0, 0, 0.9);
    color: rgba(0, 0, 0, 0.9);
    background-color: rgba(255, 255, 255, 0.2);
    /*text-shadow: 0 0 10px rgb(0, 0, 0);*/

  }
  .nova-tema-bg {
    /*background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(255, 255, 255, 0.2) 100%);*/
    /*background-color: rgba(0, 0, 0, 0.7);*/
    /*background-color: rgba(255, 255, 255, 0.5);*/
    padding: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  @media only screen and (max-width : 700px) {
    .nova-tema {
      margin-right: -20px;
    }
  }
/*modal*/
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
    background-color: rgba(0,0,0,0.2); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: 100px auto 0;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
    min-width: 300px;

}

/* The Close Button */
.close {
    text-align:right;
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
