<template>
<div class="col-md-9" id="wrap">
<!-- one new -->
  <div class="offset-md-1 col-md-10 offset-md-1 bottom20" id="content" ref="content">
    <div style="float:right;">
      <span class="left10"><i class="fa fa-eye" aria-hidden="true"></i>{{ getNumOfViews }}</span><span class="left10">{{ getDateOfPublication }}</span>
    </div>
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
    <div class="offset-md-9 col-md-2">
      <a href="#" v-on:click.prevent="addLikeNew" t='Sviđa mi se'><span style="margin-right:20px;"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a><span>{{ getLikes }}</span>
    </div>
  </div>
  <!-- ////one new -->
<div class="offset-md-9 col-md-3">
  <div class="form-group col-md-12">
    <label for='sort-by'>Poređaj po: </label>
    <select class="form-control" id="sort-by" v-model="orderBy" v-on:change="sortBy">
      <option value="0">
        datumu
      </option>
      <option value="1">
        broju lajkova
      </option>
    </select>
  </div>
</div>


<!-- comments and responses on comments -->

  <div id="comments" class="offset-md-1">
    <div v-if="getFirstComments.length < 1" class="offset-md-2">
      <span>Nema komentara</span>
    </div>
    <div v-for="(firstComment,index) in getFirstComments">
      <div style="float:left;">
        <a href="#" class="media-left thumbnail">
          <img style="width:50px; height:50px; margin-right:20px; border-radius:60%;" v-bind:src="takeUserImage(firstComment.username)" />
        </a>
      </div>
      <div>
        <h6><a href="#">{{firstComment.username}}</a><span class="comment-date">{{ firstComment.pst_datum | dateToString }}</span></h6>
        <p>{{ firstComment.pst_tekst}}</p>
        <div>
          <span class="right10" ><a href="#" v-on:click.prevent="responseUser(firstComment)"><span v-if="!firstComment.reply">Odgovori</span><span v-if="firstComment.reply" v-on:click="clearAnswer(firstComment)">Zatvori</span></a></span>
          <a class="right10"  href="#" v-on:click.prevent="addLikeComment(firstComment,firstComment)" t="Sviđa mi se"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a><span class="left5">{{ firstComment.likes }}</span>
          <span class="left40"><a href="#" v-on:click.prevent="reportComment(firstComment)">Prijavi komentar</a></span>
        </div>
        <div><a href="#" v-on:click.prevent="takeRepliesOnComment(firstComment)"><span v-if="!firstComment.seeReply && firstComment.numOfResponse > 0">Vidi {{ firstComment.numOfResponse }} odgovora</span><span v-if="firstComment.seeReply">Zatvori odgovore</span></a></div>
        <div v-if="firstComment.reply"><textarea style="width:500px; height:25;" v-on:input="inputAnswer($event,firstComment)"></textarea>
          <div>
            <button class="right10" v-on:click="answerUser(firstComment,firstComment,getTemaId)">Odgovori</button><button v-on:click="responseUser(firstComment)">Otkaži</button>
          </div>
        </div>
        <div style="margin-left:50px;" id="responses" v-if="firstComment.seeReply">
          <div v-for="responseComment in getReplies[firstComment.pst_id]" style="margin-bottom:10px;">
            <div style="float:left; margin-bottom:10px;">
              <a href="#" class="media-left thumbnail">
                <img style="width:50px; height:50px; margin-right:20px;" v-bind:src="takeUserImage(responseComment.username)" />
              </a>
            </div>
            <div>
              <h6><a href="#">{{responseComment.username}}</a><span class="comment-date">{{ responseComment.pst_datum | dateToString }}</span></h6>
              <p>{{responseComment.pst_tekst}}</p>
              <div>
                <span class="right10"><a href="#" v-on:click.prevent="responseUser(responseComment)"><span v-if="!responseComment.reply" v-on:click="answerUser(firstComment,responseComment,getTemaId)">Odgovori</span><span v-if="responseComment.reply" v-on:click="clearAnswer(responseComment)">Zatvori</span></a></span>
                <a class="right10" href="#" v-on:click.prevent="addLikeComment(responseComment)" t="Sviđa mi se"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a><span class="left5">{{ responseComment.likes }}</span>
                <span class="left40"><a href="#" v-on:click.prevent="reportComment(responseComment)">Prijavi komentar</a></span>
              </div>

              <div v-if="responseComment.reply"><textarea style="width:500px; height:25;" v-on:input="inputAnswer($event,responseComment)"></textarea>
                <div>
                  <button class="right10" v-on:click="answerUser(firstComment,responseComment,getTemaId)">Odgovori</button><button v-on:click="responseUser(responseComment)">Otkaži</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="offset-md-1 col-md-10 offset-md-1">
      <a class="read" v-if="getHaveMoreComments" v-on:click.prevent='moreFirstComments' href="#">Još komentara<i class= 'fa fa-caret-down' aria-hidden="true"></i></a>
      </div>
    <div id="leaveAComment">
      <div v-if="seeLeaveAComment">
        <span id="leave-a-comment-notice">Ostavite komentar</span>
        <textarea rows="4" cols="80" v-model="leaveAComment"></textarea>
        <div>
          <button class="btn btn-primary right10 button-leave-comment" v-on:click="sendComment">Pošalji</button><button v-on:click="deleteText" class="btn btn-primary button-leave-comment">Otkaži</button>
        </div>
      </div>
      <div v-if="!seeLeaveAComment">

      </div>
    </div>
  </div>
<!-- ////comments and responses on comments -->
<hr />
<!-- tag related news -->
  <div id="tag-related-news" class="row">
    <div class="col-md-4" v-for="tagRelatedNew in getTagRelatedNews">
      <div class="col-md-12 tag-related-one-new">
        <a v-bind:href="tagRelatedNew.path" v-on:click.prevent="takeOneTagRelatedNew(tagRelatedNew)"><img class="tag-related-main-images" v-bind:src="takeMainImage(tagRelatedNew.tma_id)"/></a>
        <a v-bind:href="tagRelatedNew.path" v-on:click.prevent="takeOneTagRelatedNew(tagRelatedNew)"><h5>{{ tagRelatedNew.tma_naslov }}</h5></a>
        <a v-bind:href="tagRelatedNew.path" v-on:click.prevent="takeOneTagRelatedNew(tagRelatedNew)"><span>{{ tagRelatedNew.tma_sazetak }}</span></a>
      </div>
    </div>
  </div>
  <!-- ////tag related news -->

<confirm v-if="seeConfirm" v-bind:confirmDialogText="confirmText"></confirm>
<alert v-if="seeAlert" v-bind:alertDialogText="alertText"></alert>
</div>
</template>

<script>
import api from '@/api/vesti/axios_calls.js'
import {mapActions,mapGetters} from 'vuex'
import Vue from 'vue'
import { bus } from '@/main.js'
import Confirm from '@/components/vesti/Confirm.vue'
import Alert from '@/components/vesti/Alert.vue'

export default {
  components:{
    'confirm':Confirm,
    'alert':Alert
  },
  data: function(){
    return {
      tagRelatedNews:[],
      replies:[],
      confirmResult:false,
      seeConfirm:false,
      seeLeaveAComment:false,
      leaveAComment:'',
      orderBy:0,
      alertText:'',
      confirmText:'',
      seeAlert:false,
      temaIdUpdate:'',
      num:0,


    }
  },
  computed:{
    ...mapGetters(['getText','getTitle','getSummary','getTemaId','getFirstComments','getLikes','getNumOfViews','getDateOfPublication','getHaveMoreComments','getLog']),
    getConfirmResult:function(){
      return this.confirmResult;
    },
    getTagRelatedNews:function(){
      return this.tagRelatedNews;
    },
    getReplies:function(){
      return this.replies;
    },
    getSeeComfirm:function(){
      return this.seeComfirm;
    }
  },
  methods:{
    ...mapActions(['takeFirstComments','takeOneNew','takeFirstCommentsAdd']),
    checkUserLogin:function(){ /* cheks does user logged in if not send on login page, if he is logged return username*/
      api.checkAuthorUserLogin().then((response)=>{
        if(response.data.result){
          this.$store.state.log.korisnik = response.data.result.username;
          return true;
        }else{
          var params = {
            returnPath:this.$route.path
          }
          this.$store.dispatch('takeReturnPath',params);
          this.$router.push('/login');
          return false;
        }
      });
    },
    checkStorage:function(){
      var username = localStorage.getItem('user');
      var sid = localStorage.getItem('sid');
      if(username !== null && username !== undefined && sid !== undefined && sid !== null){

      }
    },
    moreFirstComments:function(){
      var params = {
        temaId: this.$store.getters.getTemaId ,
        ofset:this.$store.getters.getOfset,
        ofset1:this.$store.getters.getOfset1,
        orderBy:this.orderBy
      }
      this.$store.dispatch('takeFirstCommentsAdd',params);
    },
    deleteText:function(){
      this.leaveAComment = "";
    },
    takeOneTagRelatedNew:function(oneNew){
      var path = '/vest/'+oneNew.ktg_naziv+'/'+oneNew.tma_naslov+'/'+oneNew.tma_id;
      this.$router.push(''+path);
    },
    sortBy:function(){

        this.$store.state.ofset = 0;

      var params = {
        temaId: this.$store.getters.getTemaId,
        ofset:this.$store.getters.getOfset,
        ofset1:this.$store.getters.getOfset1,
        orderBy:this.orderBy
      }
      this.$store.dispatch('takeFirstComments',params);
    },
    sendComment:function(){

      var self = this;
      var sid = localStorage.getItem('sid');
          var params = {
            temaId:self.$store.getters.getTemaId,
            text:self.leaveAComment,
            sid:sid
          }

          if(self.leaveAComment !== '' && self.leaveAComment !== null){
            api.sendComment(params).then((response)=>{
              if(response.data.result !== undefined){
                response.data.result.numOfResponse = 0;
                response.data.result.likes = 0;
                response.data.result.reply = false;
                response.data.result.seeReply = false;
              var comment = response.data.result;
                self.$store.state.firstComments.push(comment);
                self.leaveAComment = "";
              }
              if(response.data.log !== undefined){
                self.seeConfirm = true;
                self.confirmText = "Prijavite se ostavite komentar!";
                bus.$on('confirm',(c)=>{
                  self.seeConfirm = false;
                  if(c === true){
                    self.$router.push('/login');
                  }
                });
              }
            });
          }else{
            self.seeAlert = true;
            self.alertText = "Poruka je prazna, unesite sadržaj!"
            bus.$on('alert',()=>{
              self.seeAlert = false;
            });
          }
    },
    addLikeNew:function(){
      var self = this;
      var params = {
        temaId: self.$store.getters.getTemaId
      }
      api.addLikeNew(params).then((response)=>{
        if(response.data.result === "ok"){
          this.$store.state.likes+=1;
        }else if(response.data.result === "clean"){
          this.$store.state.likes-=1;
        }
        if(response.data.log !== undefined){
          self.seeConfirm = true;
          self.confirmText = "Prijavite se da biste mogli da lajkujete!";
          bus.$on('confirm',(c)=>{
            self.seeConfirm = false;
            if(c === true){
              self.$router.push('/login');
            }
          });
        }
      });
    },
    addLikeComment:function(comment,comment1){
      var params = {
        postId:comment1.pst_id,
        view:true
      }
      api.addLikeComment(params).then((response)=>{
        if(response.data.result === "ok"){
          comment.likes+=1;
        }else if(response.data.result === "clean"){
          comment.likes-=1;
        }
        if(response.data.log !== undefined){
          self.seeConfirm = true;
          self.confirmText = "Prijavite se da biste mogli da lajkujete!";
          bus.$on('confirm',(c)=>{
            self.seeConfirm = false;
            if(c === true){
              self.$router.push('/login');
            }
          });
        }
      });
    },
    takeOneNew:function(params){
      var self = this;


      api.takeOneNew(params).then((response)=>{
        var self = this;
        var te = self.$refs.textCont;
      var observer = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
        console.log(mutation.type);
        console.log('tip mutacije');
        var images = self.$refs.textCont.getElementsByTagName('img');
        var i;
        for(i=0; i<images.length; i++){
          if(response.data.images[i] !== undefined){
              images[i].src =  'data:text/plain;base64,' + response.data.images[i].slk_slika;
          }
        }
        });
      });
      var config = { childList:true, subtree:true};
      observer.observe(te,config);


        self.$store.dispatch('takeOneNew',response);
      });
    },
    clearAnswer:function(comment){
      comment.text = null;
    },
    inputAnswer:function(event,comment){
      comment.text = event.target.value;
    },
    answerUser:function(comment,comment1,temaId){
      var self = this;
      if(comment.username === comment1.username){
        if(comment1.text !== undefined && comment1.text !== null){
          var params = {
            postId:comment.pst_id,
            temaId:temaId,
            text:comment1.text
          }
          api.answerUser(params).then((response)=>{
            if(response.data.result !== undefined){
              response.data.result.likes = 0;
              response.data.result.reply = false;
            var resp = response.data.result;
              comment.numOfResponse += 1;
              comment.reply = false;
                self.replies[comment.pst_id].push(resp);
            }if(response.data.log !== undefined){
              self.seeConfirm = true;
              self.confirmText = "Prijavite se ostavite komentar!";
              bus.$on('confirm',(c)=>{
                self.seeConfirm = false;
                if(c === true){
                  self.$router.push('/login');
                }
              });
            }
          });
        }

      }else{
        if(comment1.text !== undefined && comment1.text !== null){
          var userPlusText = "@" + comment1.username + " " + comment1.text

          var params = {
            postId:comment.pst_id,
            temaId:temaId,
            text:userPlusText
          }
          api.answerUser(params).then((response)=>{
            if(response.data.result !== undefined){
              alert('Uspešno si odgovorio na komentar!');
              response.data.result.likes = 0;
              response.data.result.reply = false;
              var resp = response.data.result;
              comment1.reply = false;
              comment.numOfResponse += 1;
                self.replies[comment.pst_id].push(resp);
            }else{
              self.seeConfirm = true;
              self.confirmText = "Prijavite se ostavite komentar!";

              bus.$on('confirm',(c)=>{
                self.seeConfirm = false;
                if(c === true){
                  self.router.push('/login');
                }
              });
            }
          });
        }
      }
    },
    reportComment:function(comment){
      this.seeConfirm = true;
      this.confirmText = "Potvrdite prijavu!";
      var self = this;
      bus.$on('confirm',(c)=>{
        if(c === false){
          self.seeConfirm = false;
        }else if(c === true){
          self.seeConfirm = false;
            var params = {
              postId: comment.pst_id
            }
            api.reportComment(params).then((response)=>{
              if(response.data.result !== undefined){
                self.seeAlert = true;
                self.alertText = "Uspešno ste prijavili komentar!";
                bus.$on('alert',()=>{
                  self.seeAlert = false;
                });
              }
              if(response.data.log !== undefined){
              self.$router.push('/login');
              }
            });
        }
      });
    },
    returnReply:function(){
    },
    takeRepliesOnComment:function(firstComment){
      if(firstComment.seeReply === true){
        firstComment.seeReply = false;
      }else{
      var self = this;
      var params = {
        postId: firstComment.pst_id
      }
      api.takeRepliesOnComment(params).then((response)=>{

        if(response.data.result !== undefined){
          firstComment.seeReply = true;
          var replies = [];
          var i;
          for(i=0; i<response.data.result.length; i++){
            response.data.result[i].likes = response.data.likes[i];
            response.data.result[i].reply = false;
          }
          Vue.set(self.replies,firstComment.pst_id,response.data.result);

        }else{
        firstComment.seeReply = false;
        }
      });

}
    },
    seeRepliesOnComment:function(firstComment){
      if(firstComment.seeReply === false){
        firstComment.seeReply = true;
      }else{
        firstComment.seeReply = false;
      }
    },
    responseUser:function(comment){
      if(comment.reply === false){
        comment.reply = true;
      }else{
        comment.reply = false;
      }
    },
    takeUserImage:function(username){
      if(username === '' || username === undefined || username === null){
        return "";
      }else{
        return "http://vesti.mars-t.mars-hosting.com/api/takeUserImage/"+username;
      }
    },
    takeTagRelatedNews:function(params){
      api.takeTagRelatedNews(params).then((response)=>{
        if(response.data.result !== undefined){
          this.$store.state.ofset1+=response.data.ofset;
          this.tagRelatedNews = response.data.result;
          for(var i = 0; i < this.tagRelatedNews.length; i++){
            this.tagRelatedNews[i].path = '/vest/'+this.tagRelatedNews[i].ktg_naziv + '/' + this.tagRelatedNews[i].tma_naslov + '/' + this.tagRelatedNews[i].tma_id;
          }
        }
      });
    },
    takeMainImage: function(temaId){
      if(temaId === '' || temaId === undefined || temaId === null){
        return "";
      }else{
        return "http://vesti.mars-t.mars-hosting.com/api/getMainImage/"+temaId;
      }
    },
    takeNewWithTagrelatedNewsAndComments:function(){
      var self = this;
        this.$store.state.ofset = 0;
        this.$store.state.ofset1 = 0;
        this.temaIdUpdate = this.$route.params.id;
        var params = {
          temaId: this.$route.params.id,
          ofset:this.$store.getters.getOfset,
          ofset1:this.$store.getters.getOfset1,
          orderBy:0
        }

        this.takeOneNew(params);
        api.addViewToTheNew(params);
        this.takeTagRelatedNews(params);
        this.$store.dispatch('takeFirstComments', params);

  this.$store.state.ofset = 0;
  this.$store.state.ofset1 = 0;


  var params = {
    temaId: this.$route.params.id,
    ofset:this.$store.getters.getOfset,
    ofset1:this.$store.getters.getOfset1,
    orderBy:0}

      var sid = localStorage.getItem('sid');
      if(sid !== undefined || sid !== null || sid !== ""){
        this.seeLeaveAComment = true;
      }
    }

  },
  watch: {
'$route': function(){
  this.takeNewWithTagrelatedNewsAndComments();
}
},

created:function(){
    this.takeNewWithTagrelatedNewsAndComments();
}
}

</script>

<style scoped>
.comment-date{
   margin-left:30px;
    font-size:15px;
    color:rgba(13, 8, 0, 0.6)
}
#comments{
  margin-top:20px;
}
.bottom20{
  margin-bottom:20px;
}
#leaveAComment{
  margin-top:50px;
}
.left10{
  margin-left: 10px;
}
.right10{
  margin-right:10px;
}
.left5{
  margin-left:5px;
}
.left40{
  margin-left:40px;
}
.button-leave-comment{
cursor:pointer;
background-color:rgba(170, 155, 112,0.7);
color:black;
border-color:black;
}
.button-leave-comment:hover{
  cursor:pointer;
  background-color:rgba(51, 35, 7, 0.82);
  color:rgba(161, 160, 139,0.8);
}
a{
  text-decoration:none;
  color:rgb(107, 48, 0);
}
a:hover {
    position: relative;
}

a[t]:hover:after {
     content: attr(t);
     padding: 4px 8px;
     position: absolute;
     left: -100%;
     top: 200%;
     white-space: nowrap;
     z-index: 20;
     background:white;
     color: rgba(74, 53, 25, 0.97);
     border-radius:4px;
     font-size:0.9em;
}
.tag-related-main-images{
  width: 200px;
  height: 150px;
}
.tag-related-one-new{
  margin-bottom:20px;
}
#content{
  margin-top:50px;
}
#summary{
  margin-bottom:10px;
}
#title{
  margin-bottom:20px;
}

.read {
   display: block;
   margin: 20px auto 0;
   text-align: center;
   font-size: 18px;
   color:rgb(107, 48, 0);
   text-decoration: none;
 }
#leave-a-comment-notice{
   display:block;
   margin-bottom:10px;
   }


</style>
