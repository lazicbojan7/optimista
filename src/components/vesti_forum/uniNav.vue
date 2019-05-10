<template lang="html">
  <div class="row uninav">

    <div class="col-lg-3">
      <router-link to="/">Pocetna Vesti</router-link>
    </div>
    <div class="col-lg-3">
      <router-link to="/forum">Pocetna Forum</router-link>
    </div>
    <div class="col-lg-3">
      <router-link to="/poruke">Poruke</router-link>
    </div>
    <div class="col-lg-3" v-on:click="logout()">
      <router-link to="" >Logout</router-link>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logoutAction', localStorage.getItem('sid'));
    }
  }
}
</script>

<style lang="css" scoped>
.uninav {
  background-color: rgb(78, 145, 233);
  margin-top: -20px;
  margin-bottom: 30px;
  border-radius: 7px;
  overflow: hidden;
}
.uninav div {
  text-align: center;
  transition: 0.5s;
}
.uninav div a {
  color: rgb(224, 238, 244);
  padding: 7px;
  display: block;
  font-size: 18px;
}
.uninav div:hover {
  background-color: rgb(47, 98, 164);
}
</style>
