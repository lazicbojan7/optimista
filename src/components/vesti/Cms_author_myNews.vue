<template>
<div id="wrapper">
<div class="container">


<div v-if="!seeChange" class="row">

<!-- news list -->
<div v-if="show" class="col-md-9">

<div  v-for="oneNew in getMyNews" class="row list-news" ref="look">
<div  class="col-md-3">
<img v-bind:src="takeMainImage(oneNew.tma_id)" id="userImage"/>
</div>
<div class="col-md-9">
<h4 v-text="oneNew.tma_naslov"></h4>
<p style="font-weight:bold;" v-text="oneNew.tma_sazetak"></p>
<a href='#' v-on:click.prevent="takeOneNew(oneNew.tma_id)" t="Pogledaj više">Pogledaj više</a>
<div class="col-md-12">
  <div class="additional-icons" v-if="newsType===2">
    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{oneNew.likes}}
  </div>
  <div class="additional-icons" v-if="newsType===2">
    <i class="fa fa-eye" aria-hidden="true"></i> {{oneNew.tma_br_pregleda}}
  </div>
  <div class="additional-icons-last" v-if="newsType===2">
    <i class="fa fa-commenting-o" aria-hidden="true"></i>{{ oneNew.comments}}
  </div>

</div>
<div v-if="oneNew.tma_status === 3" class="bq-style row text-dark moderator-notice col-md-12" style="margin-top:20px;">
  <div class="col-md-9 pull-left">
    <span>Poruka od moderatora:</span>
   <label class="right10 col-md-12"> {{ oneNew.tma_obavestenje }} </label>
  </div>
   <div class="pull-right col-md-3 padding-top40">
     <a href="" v-on:click.prevent="changeNew(oneNew.tma_id)" class="right10 pull-right" t="Izmeni vest">Izmeni vest</a>
   </div>
</div>
</div>
</div>
<div v-if="seeMoreNews && newsType !== 1" class="offset-md-5 row col-md-6">
<a href="#" v-on:click.prevent="takeMyAprovedNews">Još vesti</a>
</div>
</div>
<!-- ////news list -->


<!-- one new -->
<div v-if="!show" class="offset-md-1 col-md-8" id="content" ref="content">
  <div class="row" id="title" ref="title">
  <h1 v-text="getTitle"></h1>
  </div>
  <div class="row" id="summary" ref="summary">
  <h6 v-text="getSummary"></h6>
  </div>
  <div class="row" id="mainImage">
    <img v-bind:src="takeMainImage(getTemaId)" />
  </div>
  <div class="row" v-html="getText" id="textCont" ref="textCont">

  </div>
  <div class="row">
    <button id="return-list" class="btn btn-outline-primary" v-on:click="returnList">Vrati listu</button>
  </div>
</div>
<!-- ////one new -->

<!-- sidebar -->
<nav id="sidebar" class="col-md-3">
  <div class="sidebar-header">
    <input v-on:focusout="searchOnFocusOut" v-on:focus="searchOnFocus" v-on:keydown.enter="searchNews" type="text" v-model="searchNewsText"/><button class="btn btn-outline-primary sidebar-buttons" v-on:click="searchNews">Pretraži</button>
</div>
  <ul>
    <li>
      <button class="btn btn-outline-primary sidebar-buttons" v-on:click="takeMyNewsWaitingToAprove">Neodobrene vesti</button>
    </li>
    <li>
      <button class="btn btn-outline-primary sidebar-buttons" v-on:click="takeMyAprovedNews">Odobrene vesti</button>
    </li>
    <li>
      <button class="btn btn-outline-primary sidebar-buttons" v-on:click="takeDeletedNews">Odbijene vesti</button>
    </li>
  </ul>

</nav>
<!-- ////sidebar -->

</div>
</div>

</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import api from '@/api/vesti/axios_calls.js'
import { bus } from '@/main.js'

export default {
data: function(){
  return {
    myNews:[],
    show: true,
    ofset: 0,
    newsType:1, /* 1 su unaproved, 2 su aproved, 3 su deleted */
    seeChange:false,
    searchNewsText:'',
    returnNewsType:'',
    seeMoreNews:true
  }
},
computed:{
  ...mapGetters(['getTitle','getSummary','getText',"getTemaId"]),
  getMyNews:function(){
    return this.myNews;
  }
},

methods: {
  ...mapActions(['takeMainImage','takeOneNew','doAlgoritmChange']),
  searchOnFocus:function(){
    this.seeMoreNews = false;
  },
  searchOnFocusOut:function(){
    this.clearMyNews();
  },
  clearMyNews:function(){
    this.myNews = [];
  },
  doAlgoritmChange:function(){
    var params = {
      algoritmChange: true
    }
    this.$store.dispatch('doAlgoritmChange',params);
  },
  searchNews:function(){
    this.clearMyNews();
    if(this.searchNewsText !== ''){
      var self = this;
      if(this.returnNewsType !== this.newsType){
        this.ofset = 0;
      }
      var params = {
        searchText:this.searchNewsText,
        newsType:this.newsType,
        ofset:this.ofset
      }
      api.searchAuthorNews(params).then((response)=>{
        if(response.data.result !== undefined){
          self.myNews = response.data.result;
          self.returnNewsType = response.data.newsType;
        }else{
          self.myNews = [];
        }
        self.ofset = 0;

      });
    }
  },
  changeNew:function(temaId){
    this.doAlgoritmChange();
    var self = this;

    var params = {
      temaId:temaId,
      view:false
    }


      api.takeOneNew(params).then((response)=>{
        if(response.data.result !== undefined){
          this.$store.dispatch('takeOneNew',response);
          this.seeChange = true;
        }
      });
      this.$store.dispatch('putTemaId',params);
      this.$router.push('insert-new');
  },
  takeMainImage: function(temaId){
    if(temaId === '' || temaId === undefined || temaId === null){
      return "";
    }else{
      return "http://vesti.mars-t.mars-hosting.com/api/getMainImage/"+temaId;
    }
  },
  returnList:function(){
    this.changeShow();
    this.$store.state.title = '';
    this.$store.state.summary = '';
    this.$store.state.text = '';
  },
  changeShow: function(){
    this.show = !this.show;
  },
  takeOneNew: function(temaId){
    this.changeShow();
      var self = this;
      var params = {
        temaId: temaId,
        view:false
      }

      api.takeOneNew(params).then((response)=>{
        if(response.data.images !== undefined){
          var self = this;
          var te = this.$refs.textCont;
        var observer = new MutationObserver(function(mutations){
          mutations.forEach(function(mutation){
            
          var images = self.$refs.textCont.getElementsByTagName('img');
          var i;
          for(i=0; i<images.length; i++){
            if(response.data.images[i] !== undefined){
                images[i].src =  'data:text/plain;base64,' + response.data.images[i].slk_slika;
            }
          }
          });
        });

        var config = {childList:true,subtree:true};
        observer.observe(te,config);
        }
        self.$store.dispatch('takeOneNew',response);
        var c = document.createElement('div');
        te.appendChild(c);
      });

  },
  takeMyAprovedNews:function(){
    if(this.newsType !== 2){
      this.ofset = 0;
    }
    if(this.show === false){
      this.returnList();
    }


    var sid = localStorage.getItem('sid');
    var params = {
      ofset: this.ofset,
      sid:sid
    }
    var self = this;
      api.takeMyAprovedNews(params).then((response)=>{

        if(response.data.result !== undefined){
          if(response.data.next !== undefined){
            self.seeMoreNews = true;
          }else{
            self.seeMoreNews = false;
          }
        if(self.myNews.length > 0 && self.newsType === 2){

          var y;
          for(y=0; y<response.data.result.length; y++){
            self.myNews.push(response.data.result[y]);
          }
            self.ofset += response.data.i;
        }else{
          self.myNews = response.data.result;
          self.ofset += response.data.i;
        }

        self.newsType = 2;
      }

      });
  },
  takeMyNewsWaitingToAprove: function(){

    // var sid = localStorage.getItem('sid');

    if(this.show === false){
      this.returnList();
    }
    this.moreNews = false;
    this.ofset = 0;
    var params = {

    }
    var self = this;

    api.takeMyUnaprovedNews(params).then((response)=>{

      if(response.data.result !== undefined){
        self.myNews = response.data.result;
        self.newsType = 1;
      }

    });
  },
  takeDeletedNews:function(){
    if(this.show === false){
      this.returnList();
    }
    if(this.newsType !== 3){
      this.ofset = 0;
      }
      var self = this;
      // var sid = localStorage.getItem('sid');
      var params = {
        ofset: this.ofset
        // sid: sid
      }
      api.takeDeletedNews(params).then((response)=>{
        if(response.data.result !== undefined){
          if(self.myNews.length > 0 && self.newsType === 3){
            var y;
            for(y=0; y<response.data.result.length; y++){
              self.myNews.push(response.data.result[y]);
            }
          }else{
            self.myNews = response.data.result;

          }
          self.ofset += response.data.i;

          self.newsType = 3;
        }
        if(response.data.next !== undefined){
          self.seeMoreNews = true;
        }else{
          self.seeMoreNews = false;
        }
      });

  }
},
created:function(){
  this.takeMyNewsWaitingToAprove();
}



}
</script>

<style scoped>
.sidebar-buttons{
  width: 150px;
  height:30px;
}

#wrapper{
  /*position: relative;*/
background-color: rgba(255,255,255,0.97);
}

#sidebar-div {
    display: flex;
    align-items: stretch;
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
button:hover{
  cursor:pointer;
  color:rgb(196, 95, 52);
  background-color: white;
  border:none;
}

#sidebar {
    /* don't forget to add all the previously mentioned styles here too */
    background:linear-gradient(rgb(196, 95, 52),rgb(145, 138, 44),rgb(61, 40, 5));
    color: #fff;
    transition: all 0.3s;
    /*min-width: 250px;
    max-width: 250px;*/
     min-height: 100vh;
     /*position:absolute;
     right:0;
     height:100%;*/
}

#sidebar .sidebar-header {
    padding: 20px;
background-color:rgb(196, 95, 52);
width: 100%;
}


#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}


#sidebar ul li.active > a, a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
}

#sidebar ul li {
  list-style: none;
}

.moderator-notice{
  border: 1px solid rgba(187, 163, 109, 0.8);
  border-radius:4px;
  padding: 20px;
}


.list-news{
  padding:10px;
  border-bottom:1px solid rgba(112, 95, 52, 0.7);
    /*background: linear-gradient(to right, rgba(152, 98, 49, 0.91), rgba(187, 163, 109, 0.8));*/
  background:white;
}
a{
  text-decoration:none;
  color:rgb(107, 48, 0);
  border:1px solid rgba(108, 62, 28, 0.78);
  padding:2px 2px 2px 2px;
  border-radius:4px;
}

a:hover {
    position: relative;
    background-color: rgba(149, 95, 24, 0.3);
    border-radius:4px;
}

a[t]:hover:after {
     content: attr(t);
     padding: 4px 8px;
     position: absolute;
     left: -10%;
     top: 200%;
     white-space: nowrap;
     z-index: 20;
     background-color:rgb(199, 187, 137);
     color: rgb(107, 86, 58);
     border-radius:4px;
     font-size:0.9em;
     border: solid 1px rgba(107, 86, 58,0.8);;
}
.right10{
  margin-right:10px;
}


#userImage{
  width:100px;
  height:100px;
}

.additional-icons{
  float:right;
display:inline;
margin-right:10px;
}
.additional-icons-last{
  display:inline;
  float:right;
  margin-right:10px;
}

.moderator-notice{
  border:1px outset rgba(120, 102, 50, 0.88);
   background: linear-gradient(rgba(188, 247, 231,0.4),rgba(126, 152, 55,0.4));
   box-shadow: 10px 10px 5px rgba(68, 64, 48, 0.82);
}
.padding-top40{
  padding-top:40px;
}
#return-list{
  border: 1px black solid;
  background-color: rgb(255, 255, 255);
  color:black;
}
#return-list:hover{
  background-color:rgb(196, 95, 52);
  color:white;
  border:1px white solid;
}

</style>
