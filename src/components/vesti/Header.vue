<template>
  <div id="hed">

    <div class="container">

      <div class="row" id="headTop">
        <div class="col-md-3 col-xs-6 logo">

          <img src="../../assets/logo1.png" alt="">

        </div>

        <div class="col-md-9 col-xs-6 text-center" id="linkovi">

          <ul>


            <li><a @click.prevent  @click="go('about-us')" href="#"><span><i class="fa fa-users" aria-hidden="true"></i></span>O nama</a></li>
            <li><a @click.prevent  @click="go('contact')"href="#"><span><i class="fa fa-envelope-o" aria-hidden="true"></i></span>Contact</a></li>
            <li><a @click.prevent  @click="go('forum')"href="#"><span><i class="fa fa-comments-o" aria-hidden="true"></i></span>Forum</a></li>

            <li v-if="!logovan">
              <a v-on:click.prevent="go('login')" href=""> <span><i class="fa fa-sign-in" aria-hidden="true"></i></span> Log In </a>
            </li>

            <li  v-else class="dropdown show">

              <a @click.prevent  class="dropdown-toggle" href="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span><i class="fa fa-user" aria-hidden="true"></i></span> {{user.username}}</a>

           <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
               <a @click.prevent   @click="go('user',user.username)" class="dropdown-item" href="#">Moj profil</a>
               <a @click.prevent  class="dropdown-item" href="#">Moje poruke</a>
               <a @click.prevent   @click="logOut()" class="dropdown-item" href="#">Log out</a>
          </div>
             </li>
          </ul>

        </div>


        <div id="search">

            <input  @keyup.enter="searchBtn(search)" v-model="search" id="searchField" type="search" placeholder="Search">
            <button @click="searchBtn(search)" id="searchBtn" ><i class="fa fa-search"></i></button>

        </div>

      </div>
    </div>

    <div class="container-fluid navMenu">
      <div class="container" id="nav">



        <div class="row">
          <div class="col-md p-0">
            <nav class="navbar-expand-lg navbar-dark ">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBar" aria-controls="navBar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon text-light"></span>
              </button>


              <div class="collapse navbar-collapse" id="navBar">


                <ul class="navbar-nav text-light">
                  <li class="nav-item" @click="getCatId(0,'Sve kategorije')" active>
                    <a @click.prevent   class="nav-link" href="#"></i>Home</a>
                  </li>

                  <li v-for="kategorija in getKategorijeG"  @click="getCatId(kategorija.ktg_id,kategorija.ktg_naziv)" class="nav-item">
                    <a @click.prevent  class="nav-link"  v-bind:href="kategorija.path"> {{kategorija.ktg_naziv}} </a></li>
                  <li class="nav-item">


                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Ostalo
          </a>
          <div class="dropdown-menu bg-dark subCat p-0 mt-0" aria-labelledby="navbarDropdownMenuLink">
            <a @click.prevent  v-for="subKat in getSubKategorijeG"  @click="getCatId(subKat.ktg_id,subKat.ktg_naziv)" class="dropdown-item"  href="#">{{subKat.ktg_naziv}}</a>
          </div>
                  </li>



                </ul>
              </div>
            </nav>

          </div>


        </div>    <!-- navBar ends -->

      </div>
    </div>


  </div>



</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import { bus } from '../../main'
  import api from '@/api/vesti/axios_calls.js'
    export default {

      data(){
        return{
          search:'',
          mor:'',
          katName:'',
          logovan:false,
          user:{}

        }
      },

      computed:{
        ...mapGetters(['getKategorijeG','getSubKategorijeG'])
      },




      methods:{

        go:function(link,id){
          console.log(link + ' ' + id);
          if(id!==undefined){
          this.$router.push( {path: '/'+link+'/'+id});}
          else{
              this.$router.push( {path: '/'+link});
          }
        },

        isUser:function(){
          var self = this;
          api.checkUserLogApi().then((response)=>{
              if(response.data.ok==true){
                self.logovan=true;
                self.user=response.data.result[0];
              }
              else{
                self.logovan=false;
                self.user={};
              }
          });

        },

        logOut:function(){
          var sid = localStorage.getItem('sid');
          var params = {
            sid : sid,
            path: this.$route.path
          }
          this.$store.dispatch('logoutAction',params);
          this.user = {};
          this.logovan = false;
        },

        getKategorije(){
          var params = {
            lim:0
          }
          this.$store.dispatch('getKategorijeA',params);
      },
       getSubKategorije(){
         this.$store.dispatch('getSubKategorijeA');
       },
       getCatId(id,nazivKat){

      this.$router.push({ path: '/kategorija/'+ nazivKat +'/'+id});


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

       },

       searchBtn:function(src){

         this.$router.push({ path: '/'});
         var params = {
           search:src
         }

         if(this.search!=''){
           this.mor=false
           this.katName='Pretrazi  " '+src+'"'
         }
         else{
           this.mor=true;
            this.katName='Sve kategorije';
         }

         var srch={
           more:this.mor,
           search:src,
           id:0,
           katName:this.katName
         }
         bus.$emit('more',srch);
         this.$store.dispatch('searchNewsA',params);
       }
    },

      created(){
        this.getKategorije();
        this.getSubKategorije();
        this.isUser();
      }

}

</script>

<style scoped>
  #hed {
    background-color: white;
    font-family: 'Acme', sans-serif;

  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
  }
  /*a:link, a:active{*/

  a {
    line-height: 100%;
    text-decoration: none;
  }

  #social {
    /*font-size:;*/
  }
  /*.logo{position:relative;}*/

  #headTop {
    position: relative;
    margin-bottom: 5px;
  }

  .logo img {
    width: 120px;
    height: 80px;
    display: block;
    margin: 5px 0;
    /*position: absolute;
  top:20px;*/
  }

  #linkovi {
    font-size: 14px;
    position: relative;
  }

  #linkovi span {
    display: inline-block;
    margin-right: 3px;
  }

  #linkovi ul {
    position: absolute;
    right: 10px;
  }

  #linkovi ul li a:link,
  a:visited {
    display: block;
    margin: 0 5px;
    color: #343a40;
    font-weight: 500;
  }

  #linkovi ul li a:hover {
    color: rgba(52, 58, 64, 0.79);
    transition: 0.5s;
  }

  #search {
    position: absolute;
    bottom: 15px;
    right: 10px;
  }

  input#searchField {
    border: 2px solid rgba(161, 168, 166, 0.88);
    border-radius: 5px;
    padding: 2px 0 2px 4px;
    font-size: 14px;
  }

  input#searchField:focus {
    border: 2px solid rgba(185, 185, 185, 0.7);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(161, 168, 166, 0.88);
    outline: none;
  }

  #searchBtn {
    display: inline-block;
    margin-right: 5px;
    padding: 2px 6px;
    font-size: 14px;
    border-radius: 4px;
    border: outset 1px #868e96;
    background-color: #343a40;
    color: #f8f9fa;
  }

  #searchBtn:hover {
    background-color: #f8f9fa;
    color: #343a40;
    transition: 1s;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(161, 168, 166, 0.88);
  }

  #nav p {
    font-size: 2em;
    margin: 0;
  }

  nav {
    padding: 0;
  }

  .navMenu{
    background-color: #343a40;
  }

  #nav ul {
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }

  #nav ul li {
    width: 17%;
  }

  #nav ul li:last-child {
    margin-right: 0;
  }

  #nav ul li a {
    color: white;
    display: block;
    height: 100%;
    width: 100%;
    font-size: 16px;
    letter-spacing: 2px;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;
    line-height: 100%;
  }

  #nav ul li a:hover {
    background-color: #ff8c1a;
  }

  #nav ul li a:active {
    background-color: #ff8c1a;
  }

  #linkovi{
    text-transform: capitalize;
  }

.subCat a{
  display: inline-block;
  border-bottom:solid 2px #fff;
  padding: 15px;

}

.subCat a:last-child{
  border-bottom:none;

}

@media screen and (min-width:781px) and (max-width:993px){
  #navBar a{
    font-size: 12px;
    padding-bottom: 0;
  }


}

@media screen and (min-width:436px) and (max-width:780px){

  #linkovi{
    position:absolute;
    top:5px;
    right: 5px;
    margin-bottom:5px;
    font-size: 14px;

  }


}


  @media screen and (max-width:435px) {
   #nav {
     width:100%
   }
   #nav ul li{
     width:100%;
   }
   #nav ul a:hover{
     background-color: #ff8c1a;
     width: 100%

   }
   .logo{
     top:30px;
     margin-bottom:20px;
     position: relative;
   }
 .logo img{
   width:70px;
   height:60px;
 }
   #linkovi{
     position:absolute;
     top:5px;
     margin-bottom:5px;
     font-size: 12px;

   }
   #search{
     position: relative;
     bottom:10px;
     left:10px;
     margin-top:20px;
   }
   input#searchField{
     font-size: 12px;

   }

}



</style>
