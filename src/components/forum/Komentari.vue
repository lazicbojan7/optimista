<template lang="html">
  <div class="bg-color container">



  <!---...........T E M A ............ -->
  <sadrzaj-teme></sadrzaj-teme>
      <!---...........T E M A .. E N D ............ -->

        <komentar></komentar>
        <paginacija></paginacija>

        </div><!--container-->
</template>

<script>
import Komentari from './Komentari/komentar.vue';
import SadrzajTeme from './Teme/SadrzajTeme.vue';
import paginacija from './paginacija.vue'



export default {
  components: {
    'komentar': Komentari,
    'sadrzaj-teme' : SadrzajTeme,
    'paginacija':paginacija


  },
  data(){
    return{

    }
  }
}
</script>

<style lang="css" scoped>

.bg-color {
  background: inherit;
  box-shadow: 0 0 10px rgb(113, 113, 113);
  position: relative;
  z-index: 10;
  overflow: hidden;
}
.bg-color::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0; right: 0; bottom: 0; left: 0;
  background: inherit;
  box-shadow: inset 0 0 3000px rgba(255, 255, 255, 0.99);
  filter: blur(20px);
  margin: -20px;
}
.bg-color::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(255,255,255,0.7);
}


/*Tema*/
  .opt-background {
    background-color: rgba(255, 255, 255, 0.5);
}
  .opt-user-icon {
    text-align: center;
    border-radius: 50%;
    /*transition: 0.2s;*/
  }
  span {
    font-family: 'Ropa Sans', sans-serif;
    font-size: 25px;
    padding: 5px 15px;
    color: rgba(0, 0, 0, 0.9);
    margin-left: 5px;
    /*transition: 0.2s;*/
  }
  .opt-br-calendar {
    position: left;
    left: 230px;
    top: -3px;
    text-align: center;
    color: rgb(42, 91, 112);
    color: black;
    font-size: 20px;
  }
  #opt-calendar {
    position: absolute;
    right: 300px;
    top: 4px;
    color: rgb(129, 186, 24);
    font-size: 20px;
  }
  .opt-user-icon, .komentari, .sat {
    color: rgba(0, 0, 0, 0.7);
    /*transition: 0.2s;*/
  }
  .opt-theme-hover:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .opt-theme-hover:hover .komentari, .opt-theme-hover:hover .sat, .opt-theme-hover:hover .opt-user-icon, .opt-theme-hover:hover span {
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  }
  .test {
    background-color: rgba(255, 255, 255, 1);
    padding: 10px;
    margin-bottom: 10px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border: 1px solid rgba(154, 154, 154, 0.2);
    box-shadow: 0 3px 5px rgba(207, 207, 207, 1);
  }
  .tekst-teme {
    overflow: hidden;
  }
  .tekst-teme p {
    margin-left: 30px;
    margin: 15px;
    color: black;
  }
  a, router-link, a:hover, router-link:hover {
    text-decoration: none;
  }
  .nova-tema {
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
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
   .avatar img { /*stilizacija slike u komentarima*/
    width: 80px;
    display: block;
       margin-left: auto;
       margin-right: auto;
       margin-top: 33px;
}
    .btn-group-sm>.btn, .btn-sm {
    padding: .25rem .5rem;
    font-size: .875rem;
    border-radius: .7rem;

}

</style>
