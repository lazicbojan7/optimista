<template lang="html">
  <div class="wrapper col-sm-12">
    <div class="container col-sm-12"><!--Spisak svih kategorija-->
      <div class="jumbotron  offset-xl-2 col-xl-8">
        <button v-on:click.prevent="odgovorPor('')" class="posalji" id="pos_por">Posalji poruku</button>
        <template v-for="poruka in poruke">
          <div class="offset-md-1 col-md-10 jedna-por">
              <p class="date-por"><i class="fa fa-clock-o" aria-hidden="true" id="opt-calendar"></i> {{poruka.por_vreme}}</p>
              <p class="user-por">{{poruka.username}}</p>
              <p class="prikazi-por" @click="poruka.prikazi=!poruka.prikazi" >prikazi poruku</p>
              <p class="del-por" v-on:click="obrisi(poruka.por_id)">x</p>
              <div class="txt-por" v-if="poruka.prikazi">
                <p>{{poruka.por_tekst}}</p><button class="posalji" v-on:click.prevent="odgovorPor(poruka.username)">odgovori</button>
              </div>
          </div>
        </template>
      </div>

      <!--popup-->
      <div class="por-popup" v-if="popup">
        <p class="close-popup" v-on:click="popup=!popup">x</p>
        <label for="ks" class="label-ks">Unesite korisnicko ime korisnika kome zelite da posaljete poruku:</label>
        <input type="text" class="kome-saljes" id="ks" v-model="sendUsername">
        <label for="txt-poruke" class="label-ks">Unesite tekst poruke:</label>
        <textarea class="tekst-poruke" id="txt-poruke" v-model="popupTekst"></textarea>
        <button class="posalji" v-on:click="posaljiPoruku">posalji</button>
      </div>
    <!--end popup-->

    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data(){
    return {
      poruke: [],
      popup: false,
      sendUsername: '',
      popupTekst: ''
    }
  },

  methods: {
    listaPoruka(){
    axios({
      url:'http://vesti.mars-t.mars-hosting.com/api/porukeModeratora',
      method: 'post'
    }).then((response)=>{
      response.data.result.forEach((element)=>{
         element.prikazi=false;
       })
      this.poruke = response.data.result;
    });
  },
  odgovorPor(username){
      this.popup=!this.popup
      this.sendUsername = username;
    },
    procitajPoruku(poruka){
    poruka.procitana = 'opacity: 0.6;';
    poruka.prikazi=!poruka.prikazi;
    if(poruka.procitajPor == 'zatvori poruku'){
      poruka.procitajPor = 'procitaj poruku';
    }
    else {
      poruka.procitajPor='zatvori poruku';
    }
    this.$store.dispatch('procitajPorukuAction', poruka.por_id);
    this.$store.dispatch('novePorukeAction', localStorage.getItem('sid'));
  },
  posaljiPoruku(){
    this.popup=!this.popup
    var self = this;
    if(localStorage.getItem('sid')!='' && this.sendUsername!='' && this.popupTekst!=''){
    var param = {
      sid: localStorage.getItem('sid'),
      popupTo: this.sendUsername,
      popupTekst: this.popupTekst
    }
    axios({
      url:'http://vesti.mars-t.mars-hosting.com/api/slanjePorukaModerator',
      method: 'post',
      data:{
        param : param
      }
    }).then((response)=>{
      console.log(response.data.result);

      if(response.data.result == "nemaUsername"){
        alert('Ne postoji korisnik sa tim korisnickim imenom');
      }
      if(response.data.result == 'poslato'){
        alert('Poruka poslata');
        self.popupTekst = '';
        self.sendUsername = '';
      }

    });
  }else{
    alert('popunite polja');
  }
  },
  obrisi(id){
    var id = id;
    var self = this;
    axios({
      url:'http://vesti.mars-t.mars-hosting.com/api/obrisiPoruku',
      method: 'post',
      data:{
        porId : id
      }
    }).then((response)=>{
      if(response.data.porukaa == "OBRISANA"){
        alert('Poruka je obrisana!');
        for(var i = 0; i<self.poruke.length; i++){
          if(self.poruke[i].por_id === id){
         self.poruke.splice(self.poruke[i],1);
            console.log(self.poruke);
          }
        }
      }
    });
  }
  },
  created(){
    this.listaPoruka();
  }
}

</script>

<style lang="css" scoped>
.prikazi-por {
  position: absolute;
  right: 35px; top: 10px;
}
.del-por {
  position: absolute;
  right: 10px;top: 10px;
}
.user-por{
  padding: 5px 0 5px 0;
  margin-bottom: 0;
}
.date-por {
  position: absolute;
  left: 5px;top: 10px;
}
.txt-por {
  background-color: rgb(181, 180, 133);
}
.jedna-por {
  position:relative;
  width: 900px;
  background-color: rgb(42, 145, 141);
  text-align: center;
  padding: 5px;
  margin-bottom: 15px;
}
.por-popup {
  position: fixed;
  border: 1px solid rgb(119, 0, 193);
  background-color: rgb(182, 233, 255);
  border-radius: 15px;
  box-shadow: 0 0 55px rgb(0, 0, 0);
  z-index: 300;
  width: 600px;
  height: 700px;
  padding: 40px;
  left: 35%;
  top: 15%;
}
.close-popup {
  position: absolute;
  right: 20px;
  top: 5px;
  font-size: 20px;
  cursor: pointer;
}
.label-ks {
  padding: 10px 0 5px 5px;
  font-size: 17px;
  margin-top: 50px;
}
.kome-saljes {
  width: 500px;
  padding: 10px;
  border: 1px solid rgb(68, 123, 173);
  border-radius: 5px;
  outline: 0;
  margin-bottom: -15px;
}
.tekst-poruke {
  width: 500px;
  height: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid rgb(68, 123, 173);
  border-radius: 5px;
  resize: none;
}
.posalji {
  border: 1px solid rgb(91, 128, 209);
  color: rgb(91, 128, 209);
  background-color: rgb(117, 185, 255);
  border-radius: 5px;
  padding: 5px 25px;
  margin: 5px 0 5px 0;
}
.posalji:hover {
  border: 1px solid rgb(117, 185, 255);
  color: rgb(117, 185, 255);
  background-color: rgb(91, 128, 209);
}
#pos_por {
  padding: 5px 100px;
  margin-top: 20px;
  margin-bottom: 50px;
  margin-left: 97px;
}
</style>
