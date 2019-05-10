<template>

  <div id="app">
    <router-view/>
  </div>

</template>


<script>
import axios from 'axios';
import router from './router/router.js';

export default {
  
  data(){
    return{

    }
  },
  methods: {
  // menjajSliku: function(){
  //   setInterval(function(){
  //     var br = Math.floor((Math.random() * 4) + 1);
  //       if(router.history.current.path!="/cms-forum"){
  //         document.body.style.backgroundImage = "url('/static/img/img_"+br+".jpg')";
  //         console.log(router.history.current.path);
  //       }
  //       else {
  //         document.body.style.backgroundColor = "white";
  //       }
  //
  //
  //     // console.log(document.body.style);
  //     // console.log("url('./src/static/img/img_'"+br+"'.jpg')");
  //   },3000);
  // },
    provera(){
      if(localStorage.getItem('sid')){
        console.log('nestoooo');
          axios({
            url: 'http://vesti.mars-t.mars-hosting.com/api/proveraSida',
            method: 'post',
            data:{
              sid : localStorage.getItem('sid')
            }
          }).then((response)=>{
              if(response.data.result === false){
                router.push('/login');
                localStorage.removeItem('sid');
                localStorage.removeItem('user');
              }
          });
    }
  },
  prva(){
      setInterval(function(){
        if(localStorage.getItem('sid')){
            axios({
              url: 'http://vesti.mars-t.mars-hosting.com/api/proveraSida',
              method: 'post',
              data:{
                sid : localStorage.getItem('sid')
              }
            }).then((response)=>{

                if(response.data.result === false){
                  localStorage.removeItem('sid');
                  localStorage.removeItem('user');
                  router.push('/login');

                }
            });
          }
        }, 900000);
    }

  },
  created(){
        // this.menjajSliku();

        console.log(localStorage.getItem('sid'));

        this.provera();
        this.prva();

      }
}
</script>

<style>


/*body {
  transition:2s;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}*/


</style>
