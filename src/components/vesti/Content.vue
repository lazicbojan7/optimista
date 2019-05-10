<template>
<div class="col-md-9" id="wrap">


    <select v-model="option" class="sortOptions" name="">

      <option disabled value="">Izaberi</option>
      <option value="1">Najnovije vesti</option>
      <option value="2">Najpopularnije vesti</option>

    </select>



  <div v-show="option==1" class="topRated">


    <div class="col-md-9 heading">
      <h3>{{katName}}</h3>
    </div>

    <div v-for="vest in getVestiSveG" class="">
      <a v-bind:href="vest.path">
      <div class="media news">
        <img @click ="goTo(vest.tma_id, vest.tma_naslov,vest.ktg_naziv)" class="mr-3" :src='getMainImage(vest.tma_id)' alt="Generic placeholder image">
        <div class="media-body">
          <h1 @click ="goTo(vest.tma_id, vest.tma_naslov, vest.ktg_naziv)" class="mt-0">{{vest.tma_naslov}}</h1>
          <p class="date">{{vest.tma_datum | dateTrans }}</p>
          <p class="shortDesc">{{vest.tma_sazetak}}</p>
          <p class="likes">
            <span><i class="fa fa-thumbs-up" aria-hidden="true"></i>{{vest.likes_count}}</span>
            <span><i class="fa fa-eye" aria-hidden="true"></i> {{vest.tma_br_pregleda}}</span>
            <span><i class="fa fa-commenting-o" aria-hidden="true"></i> {{vest.post_count}}</span></p>
        </div>
      </div>
    </a>
    </div>
    <a v-if="moreR" class="read" @click.prevent='moreNews()' href="#">Jos vesti <i class= 'fa fa-caret-down' aria-hidden="true"></i></a>
    <a  v-else class="read" @click.prevent='searchMoreNews()' href="#"> <i class="fa fa-search" aria-hidden="true"></i> Pretrazi jos</a>
  </div>







  <!-- najnovije vesti ends -->

  <div v-show="option==2" class="topRated">

    <div class="heading">

      <h3>{{katName}}</h3>



      <p class="orderBy"> <span>Sortirj po:</span>
        <span @click="getTopNews('likes')"class="sort"><i class="fa fa-thumbs-up" aria-hidden="true"></i></span>
        <span @click="getTopNews('views')"class="sort"> <i class="fa fa-eye" aria-hidden="true"></i>  </span>
        <span @click="getTopNews('comments')"class="sort"><i class="fa fa-commenting-o" aria-hidden="true"></i></span> </p>

    </div>



    <div v-for="vestTop in getTopNewsG" class="">


      <div class="media news">
      <a v-bind:href="vestTop.path">  <img @click ="goTo(vestTop.tma_id, vestTop.tma_naslov,vestTop.ktg_naziv)" class="mr-3" :src='getMainImage(vestTop.tma_id)' alt="Generic placeholder image"></a>
        <div class="media-body">
        <a v-bind:href="vestTop.path">  <h1 @click ="goTo(vestTop.tma_id, vestTop.tma_naslov,vestTop.ktg_naziv)">{{vestTop.tma_naslov}}</h1></a>
          <p class="date">{{vestTop.tma_datum | dateTrans }}</p>
          <p class="shortDesc">{{vestTop.tma_sazetak}}</p>
          <p class="likes">
            <span><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{vestTop.likes_count}}</span>
            <span><i class="fa fa-eye" aria-hidden="true"></i> {{vestTop.tma_br_pregleda}}</span>
            <span><i class="fa fa-commenting-o" aria-hidden="true"></i> {{vestTop.post_count}} </span></p>
        </div>
      </div>

    </div>

    <a v-if="moreR" class="read" @click.prevent='moreTopNews()' href="#">Jos vesti <i class= 'fa fa-caret-down' aria-hidden="true"></i></a>
    <a  v-else class="read" @click.prevent='searchMoreNews()' href="#"><i class="fa fa-search" aria-hidden="true"></i> Pretrazi jos </a>

  </div>
  <!-- toprated ends -->


</div>
<!-- column ends -->
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import { bus } from '../../main'
  export default {
data(){
  return{
    option:'1',
    filter:'',
    katId:0,
    ofsetNews:0,
    ofsetTop:0,
    ofsSrcMore:0,
    limitNews:5,
    limitTopNews:5,
    katName:'Sve kategorije',
    search:'',
    moreR:'true',
    readMore:''

  }
},

computed:{

  ...mapGetters(['getTopNewsG','getVestiSveG'])

},

methods:{

  getMainImage: function(imgId){
    return "http://vesti.mars-t.mars-hosting.com/api/getMainImage/" + imgId;
  },

  goTo:function(temaId,temaName,catName) {
    // this.$options.filters.fuc(sta)

    this.$router.push('/vest/' + catName + '/' + temaName +'/'+temaId);


  },

  getLatestNews:function(){
    var params = {
      lim:this.limitNews,
      ofs:this.ofset,
      katId:this.katId
    }
    this.$store.dispatch('getLatestNewsA',params);
  },

  getTopNews:function(filter){
    var params = {
      filter: filter,
      id: this.katId,
    }
    this.$store.dispatch('getTopRatedNewsA', params);
    this.filter = filter;
  },

  moreTopNews:function(){
    this.ofsetTop += 10;
    var params = {
      filter: this.filter,
      ofset: this.ofsetTop,
      id:this.katId
    }
    this.$store.dispatch('moreTopNewsA', params);
   },

  moreNews:function(){
    this.ofsetNews+=5;

    var params = {
      filter:this.filter,
      ofset:this.ofsetNews,
      id:this.katId,
    }
    this.$store.dispatch('moreLatestNewsA', params)
  },

  searchMoreNews:function(){
    this.ofsSrcMore+=5;

    var params = {
      ofset:this.ofsSrcMore,
      search:this.search

    }
    this.$store.dispatch('moreSrcNewsA', params)

  },


isCatId:function(){
  if(this.$route.params.id!==undefined&&this.$route.params.name!==undefined){
    this.katId=this.$route.params.id;
    this.katName=this.$route.params.name;

  }
  console.log(this.$route.params.id);
}

  // getVesti ends



 },

beforeCreate(){

},


created(){
  this.isCatId();
  bus.$on('navBar',(data)=>{
    this.katId = data.katID;
    this.katName = data.katName;
    this.moreR = data.searchFieldReset;
    this.ofsetTop =data.ofs;
    this.ofsetNews =data.ofs;
    this.ofsSrcMore = data.ofs;
  });
  bus.$on('more',(data)=>{
    this.moreR=data.more;
    this.search=data.search;
    this.katId=data.id;
    this.katName=data.katName;
  })
  bus.$on('foot',(data)=>{
    this.katId=data.id;
    this.option=data.option;
    this.katName=data.katName;
  })

  this.getLatestNews();
  this.getTopNews();


}
  }
</script>
<style scoped>

  #wrap {
    position: relative;
    margin-top: 5px;
  }
 .sortOptions{
   position: absolute;
   right:20px;
   top:10px;
   border: outset 1px rgba(242, 139, 55, 0.5);
   border-radius:5px;
   margin-bottom:20px;
   color:#605b56;
 }

 .sortOptions:focus{
   outline:none;

 }

  option{
    border: outset 1px rgba(242, 139, 55, 0.5);

 }



  h3 {
    font-size: 1.4em;
    text-align: left;
  }

  a{
    color:#343a40;
  }
  a:hover{
    text-decoration: none;

  }
  .heading {
    margin: 1.5em 0 0 0;
    padding: 0;
  }

  .heading h3{
    text-transform: capitalize;
  }



  .news{
    position: relative;
    font-size: 18px;
    margin: 5px 0;
    border: outset 1px rgba(242, 139, 55, 0.5);
    padding: 5px;
    box-shadow: 5px 3px 3px rgba(215, 117, 36, 0.4);
    font-family: 'Quicksand', sans-serif;



  }

  .news:first-child{
    border-top: solid 1px rgba(242, 139, 55, 0.5);
  }
  .news h1 {
    font-size: 20px;
    display: inline-block;
    font-family: 'Acme', sans-serif;
    letter-spacing: normal;
    cursor: pointer;
  }

  .news img {
    width: 120px;
    height: 100px;
    display: inline-block;;
    margin:5px;
    box-shadow: 5px 5px 5px rgba(136, 136, 136, 0.65);
    cursor: pointer;
  }

  .news p{
    font-weight: normal;
  }


  .date {
    display: inline-block;
    position: absolute;
    right: 15px;
    font-size: 15px;
    font-weight: 500;
    color: rgb(247, 148, 30);
    font-family: 'Acme', sans-serif;
  }

  .likes {
    position: absolute;
    bottom: 5px;
    right: 15px;
    margin-bottom: 0;
    font-size: 16px;
    color: #605b56;
  }

  .likes span {
    display: inline-block;
    margin-left: 3px;
  }


  .shortDesc {
    font-size: 16px;
  }

  .read {
    display: block;
    margin: 20px auto 0;
    text-align: center;
    font-size: 18px;
    color: #f7941e;
    text-decoration: none;
  }

  .topRated{
    margin:50px 0 30px;


  }

  .heading{
    position: relative;
  }

  .heading h3{
      display: inline-block;
  }
  .heading p{
    display: inline-block;

  }

  .orderBy{
    position: absolute;
    right:10px;
    color:rgb(247, 148, 30);
  }

  .sort{
    display: inline-block;
    margin:0 5px 0 5px;
    font-size: 22px;
    cursor: pointer;

  }

  .sort:hover{
    color:#605b56;
  }



  .reklame{
    height: 300px;
  }



  @media screen and (min-width:781px) and (max-width:993px){

    .show{
      display: none;
    }



  }

  @media screen and (min-width:436px) and (max-width:780px){

    .show{
      display: none;
    }


  }


    @media screen and (max-width:435px) {
      .show{
        display: none;
      }
      .date{
        font-size: 12px;
      }
      .news{
        font-size: 22px;
      }
      .news h1{
        font-size: 18px;
        margin-top: 5px !important;
      }

      .likes{
        font-size: 14px;
        margin-top:5px;
      }

}


</style>
