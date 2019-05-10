<template lang="html">
  <div><!--ROOT-->
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <!-- navigacija -->
          <navigacija></navigacija>
          <!-- navigacija end-->
            <!--V E S T-->
          <sadrzaj-teme></sadrzaj-teme>
          
        </div>

        <div class="col-lg-3"><!--DESNA STRANA-->
          <div class="row">


            <template v-for="(category,index) in categories">
            <router-link :to="'/forum/'+category.ktg_naziv" class="col-lg-12 kategorija" >
                <div class="ikonica">
                  <i v-bind:class="category.ktg_ikonica" aria-hidden="true" v-bind:style="'color:'+ prikazBoja(index)+';'"></i>
                </div>
                <div class="ime">
                  <h2 class="opt-ime">{{ category.ktg_naziv }}</h2>
                </div>
            </router-link>
            </template>
          </div>
      </div>
    </div><!--row-->
  </div>
</div><!--ROOT-->
</template>

<script>

import navigacija from '../Teme/Nav_tema'
import SadrzajTeme from '../Teme/SadrzajTeme'

import axios from 'axios'
import { mapGetters } from 'vuex';
export default {
  components:{
    'navigacija':navigacija,
    'sadrzaj-teme':SadrzajTeme,

  },
  data(){
    return{
      boje:['#f7941e','#8cc63f','#25aae1','#662d91','#2e3192'],

    }
  },
  computed:{
    ...mapGetters({categories:'getKat_f',teme:'getTemaShow'}),

  },
  methods: {
    prikazBoja(param){
      var br=param;
      return this.boje[br%5];
    }
  },
  mounted(){

    this.$store.dispatch('categoryShowA');


  }
}
</script>

<style lang="css" scoped>
/*
  font-family: 'Ropa Sans', sans-serif;
  font-size: 20px;
  color: rgb(34, 86, 201);
  font-weight: bold;
  */
.read-more {
    display: inline;
  }
.short-info {
  /*background-color: rgba(255, 255, 255. 0.97);*/
  margin: 0 20px 0 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
.short-info p {
  color: rgba(0, 0, 0, 0.97);
  font-size: 17px;
  padding: 10px;
}



.opt-background {
  /*background: linear-gradient(rgb(250, 250, 250), rgb(240, 240, 240)) !important;*/
  /*border: 1px solid rgba(0, 0, 0, 0.2);*/
  /*border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);*/
  background-color: rgb(255, 255, 255);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 5px;
  padding: 7px 5px 0 5px;
  position: relative;
  height: 45px;
  box-shadow: 0 3px 5px rgba(231, 231, 231, 1);
}
.opt-background:hover {
  /*box-shadow: 0 0 10px rgb(199, 199, 199);*/
}
/*POZICIJA TEMA*/
/*RIGHT*/
.opt-br-vreme {
  position: absolute;
  right: 100px;
  color: rgb(42, 91, 112);
}
#opt-vreme {
  position: absolute;
  right: 145px;
  top: 4px;
  color: rgb(27, 187, 237);
  font-size: 23px;
}
.opt-br-calendar {
  position: absolute;
  left: 510px;
  text-align: center;
  color: rgb(42, 91, 112);
}

#opt-like {
  position: absolute;
  right: 405px;
  top: 4px;
  color: rgb(26, 108, 230);
  font-size: 23px;
}

#opt-calendar {
  position: absolute;
  right: 275px;
  top: 4px;
  color: rgb(129, 186, 24);
  font-size: 23px;
}

#opt-calendar2 {
  top: 4px;
  color: rgb(129, 186, 24);
  font-size: 23px;
}

.opt-br-komentari {
  position: absolute;
  right: 5px;
  color: rgb(42, 91, 112);
}
#opt-komentari {
  position: absolute;
  right: 45px;
  top: 4px;
  color: rgb(117, 21, 203);
  font-size: 23px;
  /*font-weight: bold;*/
}
/*RIGHT*/
/*LEFT*/
  .opt-naslov {
    position: absolute;
    left: 50px;
    color: rgb(42, 91, 112);
  }
  #opt-avatar {
    position: absolute;
    left: 7px;
    top: 4px;
    color: rgb(255, 92, 0);
    font-size: 23px;
  }
/*LEFT*/
/*KRAJ POZICIJA TEME*/
.opt-vest {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2px;
}
.kategorija {
  padding: 10px;
  background-color: rgb(245, 245, 245);
  position: relative;
  height: 70px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  transition: 1s;
}
.opt-ime {
  color: rgb(42, 91, 112);
  /*transition: 0.5s;*/
}
.kategorija:hover {
  /*background-color: rgba(255, 255, 255, 0.99);*/
  border-top-right-radius: 30px;
  background-color: rgb(42, 91, 112);
}
.kategorija:hover .opt-ime{
  /*color: rgba(0, 0, 0, 0.9);*/
  color: rgb(245, 245, 245);
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
.ikonica {
  position: absolute;
  left: 60px;
}
.ime {
  position: absolute;
  left: 120px;
  top: 20px;
}
i {
  font-size: 30px;
  padding: 5px;
}
p {
  font-family: 'Ropa Sans', sans-serif;
  color: rgb(0, 0, 0);
}
span {
  font-family: 'Ropa Sans', sans-serif;
  font-size: 20px;
  color: rgb(42, 91, 112);
  margin-left: 5px;
}
a, a:hover {
  font-family: 'Ropa Sans', sans-serif;
  color: rgb(36, 114, 246);
}

/*==========  Mobile First Method  ==========*/

    /* Custom, iPhone Retina */
    /*@media only screen and (min-width : 220px) {
      .category {
        margin-left: 0;
        margin-right: 0;

      }
    }

    /* Extra Small Devices, Phones */
    /*@media only screen and (min-width : 480px) {

    }*/

    /* Small Devices, Tablets */
    @media only screen and (max-width : 1200px) {
      /*POZICIJA TEMA*/
      .opt-br-calendar {
        left: 375px;
      }
      #opt-calendar {
        right: 275px;
        top: 4px;
      }
      /*KRAJ POZICIJA TEME*/
    }
    @media only screen and (max-width : 770px) {
      /*POZICIJA TEMA*/
      .opt-br-calendar {
        display: none;
      }
      #opt-calendar {
        display: none;
      }
      .opt-br-vreme {
        display: none;
      }
      #opt-vreme {
        display: none;
      }
      /*KRAJ POZICIJA TEME*/
    }
    @media only screen and (max-width : 400px) {
      .opt-br-komentari {
        display: none;
      }
      #opt-komentari {
        display: none;
      }
    }

    /* Medium Devices, Desktops */
    /*@media only screen and (min-width : 992px) {

    }

    /* Large Devices, Wide Screens
    @media only screen and (min-width : 1200px) {

    }

    /*==========  Non-Mobile First Method  ==========*/

    /* Large Devices, Wide Screens
    @media only screen and (max-width : 1200px) {

    }

    /* Medium Devices, Desktops
    @media only screen and (max-width : 992px) {

    }

    /* Small Devices, Tablets
    @media only screen and (max-width : 768px) {

    }

    /* Extra Small Devices, Phones
    @media only screen and (max-width : 480px) {

    }

    /* Custom, iPhone Retina
    @media only screen and (max-width : 320px) {

    }*/
</style>
