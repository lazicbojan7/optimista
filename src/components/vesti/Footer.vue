<template>
  <footer id="background-footer">
    <div class="container foot">
    <div class="row top">


      <div class="col-sm-3 col-xs-6 oNama">
        <h6>Optimista.rs</h6>
        <ul>
          <li><a @click="linkTo('',1)" href="#">Najnovije vesti</a></li>
          <li><a @click="linkTo('',2)" href="#">Najpopularnije vesti</a></li>
          <li><a @click="linkTo('forum')" href="#">Forum</a></li>
          <li><a @click="linkTo('about-us')" href="#">O nama</a></li>
          <li><a @click="linkTo('contact')" href="#">Kontakt</a></li>
        </ul>

      </div>

      <div class=" col-sm-3 col-xs-6  kategorije">
          <h6>Kategorije</h6>
        <ul>
          <li  v-for="kategorija in getKategorijeG"><a @click="getCatId(kategorija.ktg_id,kategorija.ktg_naziv)" href="#">{{kategorija.ktg_naziv}}</a></li>
        </ul>

      </div>



      <div class="col-sm-3 col-xs-6 subKat">
          <h6>Kategorije</h6>
        <ul>
          <li v-for="(subKat,index) in getSubKategorijeG" v-if="index<7"><a @click="getCatId(subKat.ktg_id,subKat.ktg_naziv)" href="#">{{subKat.ktg_naziv}}</a></li>

        </ul>



      </div>




      <div class=" col-sm-3 col-xs-6 bla">


        <div class="social">

            <p>
              <span><a href="#"><i class="fa fa-facebook-official" aria-hidden="true"></i></a></span>
              <span><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></span>
              <span><a href="#"><i class="fa fa-twitter-square" aria-hidden="true"></i></a></span>
              <span><a href="#"><i class="fa fa-pinterest-square" aria-hidden="true"></i></a></span>
            </p>




        </div>

        <div class=" logo">

      <img src="../../assets/logo2.png" alt="">
        </div>

      </div>






    </div><!--ROW-->

    <div class="row bottom">
      <div class="col-md">
        <p>Copyrights&copy; by Enon Solutions </p>

      </div>

    </div>
  </div><!--Container-->
  </footer>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { bus } from '../../main'
export default {
  computed:{
    ...mapGetters(['getKategorijeG','getSubKategorijeG'])
  },
  methods:{

    linkTo:function(page,flag){
      var id = 0;


  if(page===''){
     this.$router.push({ path:'/'+ id})

    var params={
      id:0,
      ofset:0,
      option:flag,
      katName:'Sve kategorije'

    }
    this.$store.dispatch('getLatestNewsA',params)
    this.$store.dispatch('getTopRatedNewsA',params)
    bus.$emit('foot',params)
}


  else {
  this.$router.push({ path: '/'+page+'/'})
}

    },
    getKategorije(){
      var params = {
        lim:1
      }
      this.$store.dispatch('getKategorijeA',params);
    },
    getSubKategorije(){
      this.$store.dispatch('getSubKategorijeA');
    },

    getCatId(id,nazivKat){
      this.$router.push({ path: '/'+ id});

      var params={
        id:id,
        ofset:0
      }
      this.search='';

      var nav={
        ofs:0,
        katID:id,
        katName:nazivKat,
        searchFieldReset:true
      }
      bus.$emit('navBar',nav)
      this.$store.dispatch('getLatestNewsA',params)
      this.$store.dispatch('getTopRatedNewsA',params)

    }

  },

  created(){
    this.getKategorije();
    this.getSubKategorije();
  }

}
</script>

<style scoped>
.container{
  padding: 0 10px 0;
}

#background-footer {

  background-color: rgba(0, 0, 0, 0.85);

}

.top{
  padding:30px 30px 20px;
}

.bottom p{
  color:rgba(134, 134, 134, 0.69);
  margin: 0;
  text-align: center;

}

a:link, a:visited{
  color:#717173;
}
a:hover{
  text-decoration: none;
  color: #f7941e;
}

a:active{
  text-decoration: none;
}
ul{
  padding: 0;
  margin-right: 20px;

}

ul li {
  font-size: 18px;
  text-align: left;
}
h6{
  font-size: 20px;
  margin:10px 0;
  color: #717173;
}
.oNama{
  padding-right: 0;
}

.subKat{
  text-transform: capitalize;
}

.bla{
  position: relative;
    padding-left: 0;
}

.social{
  position:absolute;
  top:5px;
  right:15px;



}
.social p{
  margin:0 auto;
  font-size: 32px;

}

.social p span{
  display: inline-block;
  margin:10px 0 0 15px;

}
.social p span:first-child{
  margin-left:0;
}

.logo{
  position: absolute;
  bottom:5px;
  right: 15px;
}

.logo img{
  width:130px;
  height: 110px;
}

@media screen and (min-width:750px) and (max-width:820px){

  .social p{
    font-size: 28px;

  }
  .social span{
    margin:10px 0 0 5px;
  }

}

@media screen and (min-width:650px) and (max-width:751px){



        .social p{

          font-size: 36px;


        }

        .social p span{
          margin:10px 0 0 10px;

        }

        .social{
          top:5px;
          left:5px;
          display: inline-block;
        }


        .social p{
          font-size: 24px;


        }

        .logo img{
          width:100px;
          height: 80px;

        }
        .bottom p{
          margin-top: 40px;
        }

}


@media screen and (min-width:436px) and (max-width:651px){
  .social p{
    font-size: 22px;
  }

  .social p span{
    margin:10px 0 0 8px;

  }

  .logo img{
    width:80px;
    height: 60px;

  }

  ul li{
    font-size: 16px;
  }

}

    @media screen and (max-width:435px) {

      .bottom p{
        margin-top: 40px;
      }

      .social p{
        font-size: 24px;


      }

      .social{
        position:absolute;
        top:5px;
        left:5px;
        display: inline-block;
      }

      .logo{
        bottom: 5px;
        right: 5px;
        display: inline-block;
      }

      .logo img{
        width:100px;
        height: 80px;

      }

      .subKat{
        display: none;
      }

}



</style>
