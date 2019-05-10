<template lang="html">
  <div class="razdvoji">
    <app-nav></app-nav>
    <div class="odvoji"></div>
    <div class="bg-login">
          <div class="form-group">
            <label for="exampleInputEmail1">E-mail adresa / Korisničko ime</label>

            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Unesi E-mail/Korisničko ime" v-model="user.email">
            <small id="emailHelp" class="form-text text-muted">Mi nikada nećemo dati vašu e-mail adresu nikome.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Šifra</label>

            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Unesi Šifru" v-model="user.sifra" v-on:keyup.enter="login">
          </div>
          <button type="submit" class="btn btn-primary" v-on:click="login" >Prijavi se</button>
          <br>
          <router-link to="/register">Nisi registrovan? idi na Registraciju</router-link>
    </div>
    <div class="odvoji"></div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import {store} from '../../store/store.js';
import sha256 from 'sha256';
import router from '../../router/router.js';
import {bus} from '../../main.js';
import {mapGetters} from 'vuex';
import api from '../../api/vesti_forum/axios_calls.js';


export default {
  data(){
    return {
      user:{}
    }
  },
  computed: {
    ...mapGetters(['getLog'])
  },
  methods: {
    login(){
      this.user.sifra = sha256(this.user.sifra);
        this.$store.dispatch('loginAction', this.user);
        this.user = {};
        var param = {
          sid : localStorage.getItem('sid'),
          user : localStorage.getItem('user')
        }
      
        this.$store.dispatch('proveriKorisnikaAction', param);


      }
  }//kraj mutacija
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
  height: 300px;
}
.bg-login:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(255,255,255,0.3);
}
</style>
