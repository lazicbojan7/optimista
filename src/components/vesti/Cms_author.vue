<template>
<div class="container" id="wrapper">
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded nav">

    <div class="col-md-12">
            <div class="col-md-7 pull-left">
              <button class="btn btn-outline-primary" v-on:click="goInsert">Unesi vest</button>
              <button class="btn btn-outline-primary" v-on:click="goMy">Moje vesti</button>
            </div>

            <div id="user-registred" class="col-md-5 pull-right">

    <div class="dropdown show" id="drop-down">
        <a v-bind:href="getLog.korisnik.path" class="dropdown-toggle arrow" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-user" aria-hidden="true"></i><span id="username" v-text="getLog.korisnik"></span>
       </a>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item dd-items" v-bind:href="getLog.path" v-on:click.prevent="goToMyProfilPage(getLog.korisnik)">Moj profil</a>
    <a class="dropdown-item dd-items" href="" v-on:click.prevent="goLogout">Odjavi me</a>
    </div>
  </div>
            </div>
    </div>

  </nav>
<router-view></router-view>

<confirm v-if="seeConfirm" v-bind:confirmDialogText="confirmText" id="confirm-author"></confirm>
</div>
</template>

<script>

import Author from './Cms_author_myNews.vue'
import Insert from './Cms_author_insertNews.vue'
import { bus } from '@/main.js'
import {mapActions,mapGetters} from 'vuex'
import Confirm from '@/components/vesti/Confirm.vue'
import api from '@/api/vesti/axios_calls.js'

export default {
  components:{
    'confirm':Confirm
  },
data: function(){
  return {
    seeInsertNews: true,
    seeMyNews: false,
    seeAuthorPage:true,
    seeInsertPage:false,
    cms_status:'cms-myNews',
    searchText:'',
    myImage:'',
    seeConfirm:false,
    confirmText:''
  }
},
computed:{
  ...mapGetters(['getLog']),
  getSeeInsertNews:function(){
    return this.seeInsertNews;
  },
  getSeeMyNews:function(){
    return this.seeMyNews;
  },
  getSeeInsertPage:function(){
    return this.seeInsertPage;
  },
  getSeeAuthorPage:function(){
    return this.seeAuthorPage;
  }
},

methods:{
  ...mapActions(['takeReturnPath','clearNewsParams','logoutAction']),
  goLogout:function(){
    var sid = localStorage.getItem('sid');
    var params = {
      sid: sid,
      path:this.$route.path
    }
    this.$store.dispatch('logoutAction',params);
    this.$store.state.log.korisnik = '';
  },
  goToMyProfilPage:function(username){
    // this.$router.push('/user/'+username); otkomentarisati kada bude gotovo
    this.$router.push('/user');
  },
  debounceSearchNews:function(){
    var self = this;
    setTimeout(function(){self.searchNews();},1000);
  },
  seeRoutes: function(){
    if(this.seeAuthorPage === true){
      this.cms_status = 'cms-myNews'
    }else if(this.seeInsertPage === true){
      this.cms_status = 'insert-news'
    }
  },
  goInsertNews: function(){
    this.$router.push('insert-news');
    this.seeRoutes();
    this.$store.state.updateInsertNew = !this.$store.state.updateInsertNew;
  },
  goMyNews: function(){
    this.$router.push('my-news');
    this.seeRoutes();
  },
  goInsert:function(){
    var self = this;
    var params = {
      algoritmChange:false
    }
    if(this.$route.path === '/cms-autor/insert-new'){
      this.seeConfirm = true;
      this.confirmText = "Da li želite da obrišeš sve?";
      bus.$on('confirm',function(c){
        self.seeConfirm = false;
        if(c === true){
          self.$store.dispatch('clearNewsParams');
          bus.$emit('returnDesignModeAndText',true);


          self.$store.dispatch('doAlgoritmChange',params);

          self.$router.push('insert-new');
        }
      });
    }else{
      self.$store.dispatch('clearNewsParams');
      bus.$emit('returnDesignModeAndText',true);
      self.$store.dispatch('doAlgoritmChange',params);
    this.$router.push('insert-new');
    }
  },
  goMy:function(){
    var self = this;
    if(this.$route.path === '/cms-autor/insert-new'){
      this.seeConfirm = true;
      this.confirmText = "Da li želite da izađete, sadržaj će biti obrisan?";
      bus.$on('confirm',function(c){
        self.seeConfirm = false;
        if(c === true){
          self.$router.push('/cms-autor/my-news');
        }
      });
    }else{
    this.$router.push('/cms-autor/my-news');
    }
  },
  checkUserLogin:function(){
    var self = this;
      var sid = localStorage.getItem('sid');
      var params = {};
      if(sid !== null){
        params.sid = sid;

    api.checkAuthorUserLogin(params).then((response)=>{
      if(response.data.result !== undefined){
        self.$store.state.log.korisnik = response.data.result.username;
        self.$store.state.log.path = "/user/"+self.$store.getters.getLog.korisnik;
        if(self.$route.path === '/cms-autor'){
          self.$router.push({ path:'/cms-autor/my-news' });
        }
      }else{
        params.returnPath = self.$route.path;

        self.$store.dispatch('takeReturnPath',params);
        self.$router.push('/login');
      }
    });
  }else{
      params.returnPath = self.$route.path;
      this.$store.dispatch('takeReturnPath',params);
      this.$router.push('/login');
    }

  }
},

mounted: function(){
},
created:function(){
  this.checkUserLogin();
}
}
</script>

<style scoped>
#drop-down{
  /*width: 400px;
  position: relative;
  float:right;*/
}
#drop-down{
  position:absolute;
  right:10px;
}
.confirm-author{
  width: 300px;
}

#username{
  margin-left:10px;
  color:white;
}


#user-registred{
position:relative;
}

button:hover{
  color:rgb(161, 105, 160);
  border-color:rgba(107, 86, 58,0.8);
  background-color: white;
}

button {
cursor:pointer;
color:white;
border-color:white;
display:inline-block;
margin:0 0 0 0;
font-size: 14px;
margin-top: 5px;
}

.nav{
    background:linear-gradient(rgb(161, 105, 160), rgb(196, 95, 52));
}
@media screen and (max-device-width: 375px) and (max-device-height: 665px){
  button{
    width:150px;
    height:25px;
  }
  .container{
    margin-left:0px;
    margin-right:0px;
    width:100%;
    max-width: 100%;
  }

}

#dropdownMenuLink i{
  /*color:rgb(54, 23, 4);*/
  color:white;
}
a:after{
  /*color:rgb(54, 23, 4);*/
  color:white;
}

.dd-items{
}
.dd-items:hover{
    color:white;
    background-color:rgb(196, 95, 52);
}

</style>
