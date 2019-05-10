<template lang="html">
  <div class="razdvoji">
    <app-nav></app-nav>
    <div class="odvoji"></div>
    <div class="bg-login">
            <div class="form-group">
              <label for="exampleInputFirstName">Ime</label>
              <input type="text" class="form-control" id="exampleInputFirstName"  placeholder="Unesi Ime" v-model="user.ime">
            </div>
            <div class="form-group">
              <label for="exampleInputLastName">Prezime</label>
              <input type="text" class="form-control" id="exampleInputLastName"  placeholder="Unesi Prezime" v-model="user.prezime">
            </div>
          <div class="form-group">
            <label for="exampleInputEmail1">E-mail adresa</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Unesi E-mail/Korisničko ime" v-model="user.email">
            <small id="emailHelp" class="form-text text-muted">Mi nikada nećemo dati vašu e-mail adresu nikome.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputUsername">Korisničko Ime</label>
            <input type="text" class="form-control" id="exampleInputUsername"  placeholder="Unesi Korisničko ime" v-model="user.korime">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Sifra</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Unesi Šifru" v-model="user.sifra">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword2">Potvrdi Šifru</label>
            <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Unesi Ponovo Šifru" v-model="user.ponsifra">
          </div>
          <button type="submit" class="btn btn-primary" v-on:click="register">Registruj se</button>
          <br>
          <router-link to="/login">Veci imas korisnički nalog? idi na Prijavi se</router-link>
    </div>
    <div class="odvoji"></div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import {store} from '../../store/store.js';
import sha256 from 'sha256';
import router from '../../router/router.js';

export default {
  data(){
    return {
      user:{}
    }
  },
  methods: {
    register(){

      if(this.user.email.length<6 || this.user.email.length>25){
          alert('proverite da li ste dobro upisali email!');
          exit();
        }
     else{
       if(this.user.sifra.length<6 || this.user.sifra.length>25){
         alert('proverite da li ste dobro upisali sifru!');
         exit();
       }
       else{
        this.user.sifra = sha256(this.user.sifra);
        this.user.ponsifra = sha256(this.user.ponsifra);
          this.$store.dispatch('registerAction', this.user);
          this.user = {};
       }
      }
    }
  }
}
</script>

<style lang="css" scoped>
.bg-login {
  padding: 50px;
  margin:0 auto;
  border-radius: 10px;
  background: inherit;
  box-shadow: 0 0 10px rgb(113, 113, 113);
  position: relative;
  z-index: 10;
  overflow: hidden;
  width: 400px;
}
.bg-login:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0; right: 0; bottom: 0; left: 0;
  background: inherit;
  box-shadow: inset 0 0 3000px rgba(255, 255, 255, 1);
  filter: blur(10px);
  margin: -20px;
}
.razdvoji {
  margin-top: ;
  background: inherit;
}
.odvoji {
  height: 180px;
}
.bg-login:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(255,255,255,0.3);
}
</style>
