<template>
  <div id="app">
    <app-nav></app-nav>
      <!--show></show-->
      <router-view/>

    <app-footer></app-footer>
  </div>
</template>

<script>


export default {

  data(){
    return{

    }
  },
  methods:{
    usersLikes(){
      if(localStorage.getItem('sid')){
        var sid = localStorage.getItem('sid');
        this.$store.dispatch('usersLikesA',sid);
      }
    }
  },
  created(){
    this.usersLikes();
  }
}
</script>


<style >
#app {

}
/*.opt-content {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
}*/

</style>
