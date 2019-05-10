<template lang="html">
  <div>
    <template v-for='post in posts'>
  <!-- KOMENTAR -->
        <div class="row odvoji">
        <div class="offset-md-1 col-md-2 bg-pozadina">
          <div class="avatar">
              <a><img :src="metoda(post.username)" alt="avatar"></img><div class="text-center">{{post.username}}</div></a>

          <div class="posts text-center"></div>
          <div class="likes text-center"></div>
          </div>

        </div>
        <div class="col-md-8 bg-pozadina" id="opt-sadrzaj">
          <div class="row">
      <div class="col text-right">

        <span><!--Vreme kad je okacena tema-->{{post.pst_datum | dateToString
        }}&nbsp;&nbsp;<i class="fa fa-clock-o sat" aria-hidden="true" id="opt-calendar"></i></span>
        <span @click='showReplies(post)'><!--broj komentara-->{{ post.pst_count }}<i class="fa fa-commenting-o komentari" aria-hidden="true" id="opt-commentst"></i></span>
        <span v-if="post.username==username && post.pst_count==0 && post.like_count==0" @click='showEdit(post)'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
      </div>
        </div>
         <div class="tekst-teme"><p>{{ post.pst_tekst }}</p></div>

        <div class="col text-right">
            <div class="pull-left">
            <button type="button" class="dugme prijavi" v-if='user' @click='report(post)'>Prijavi</button>
            </div>
           <span> <!--like-->{{ post.like_count}} Likes

             <i v-if="user" @click='likeReply(post);'  v-bind:class="[(ifLiked.indexOf(post.pst_id)!==-1)?'fa fa-thumbs-up':'fa fa-thumbs-o-up']" aria-hidden="true"></i>
           <i class="fa fa-thumbs-o-up" aria-hidden="true" style="color: rgb(26, 108, 230); padding-left: 10px; font-size:23px;" v-else ></i>
         </span>

            <div class="pull-right">
                <div id="dugme">
           <button type="button" class="dugme odgovori" v-if='user' @click='textArea(post)'>Odgovori</button>
                 </div>
           </div>
         </div>
        </div><!--row2-->

    </div><!--KRAJ CELE TEME-->

    <!---...........Kraj KOMENTARA ............ -->
    <div v-show='post.flag'>
      <template v-for='reply in replies[post.pst_id]'>
      <div class="row odvoji">

        <div class="offset-md-2 col-md-2 bg-pozadina">
        <div class="avatar">

            <a><img :src="metoda(reply.username)" alt="avatar"></img><div class="text-center">{{reply.username}}</div></a>

        <div class="posts text-center"></div>
        <div class="likes text-center"></div>
        </div>
        </div>

        <div class="col-md-7 bg-pozadina" id="opt-sadrzaj">
              <div class="row">
            <div class="col text-right">
              <span><!--Vreme kad je okacena tema-->{{reply.pst_datum | dateToString }}&nbsp;&nbsp;<i class="fa fa-clock-o sat" aria-hidden="true" id="opt-calendar"></i></span>
              <span v-if="reply.username==username && reply.like_count==0 && replies[post.pst_id].lastIndexOf(reply)==(replies[post.pst_id].length-1)" @click='showEdit(reply)'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                  <div class="tekst-teme">
                    <span v-if="reply.pst_quotes" class="quotes">Citiraj : "{{ reply.pst_quotes }}"</span>
                    <p v-html="reply.pst_tekst" style="text-align:left; clear:both;"></p></div>

                  <div class="pull-left">
                    <button type="button" class="dugme prijavi" v-if='user' @click='report(reply)'>Prijavi</button>

                  </div>

                    <span> <!--like-->{{ reply.like_count }} Likes <i v-if="user" @click='likeReply(reply)' v-bind:class="[(ifLiked.indexOf(reply.pst_id)!==-1)?'fa fa-thumbs-up':'fa fa-thumbs-o-up']" aria-hidden="true"></i>
                        <i class="fa fa-thumbs-o-up" aria-hidden="true" style="color: rgb(26, 108, 230); padding-left: 10px; font-size:23px;" v-else ></i>
                    </span>

            </div>

            </div>

      </div><!--row2-->

    </div><!--KRAJ CELE TEME-->
    <!---...........Kraj KOMENTARA ............ -->

      </template>
      <!---...........text area ............ -->
    </div>
    </template>
    <!---...........first to comment ............ -->
    <div v-if='!posts[0]' class="row odvoji">

      <div class="offset-md-1 col-md-10 bg-pozadina" id="opt-sadrzaj">
        <div class="row">
          <div class="col text-right" >
            <span id='first_comm' v-if='user'>Budi prvi koji će komentarisati ovu temu</span>
            <span id='first_comm' v-else><router-link to="/register">Budi prvi koji će komentarisati ovu temu</router-link></span>
          </div>
        </div>
      </div><!--row2-->
    </div>
    <!---...........first to comment ............ -->
    <div v-if="flag" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" v-on:click="close()">&times;</span>
        <select v-model='quote'>
          <option value=''>Citiraj</option>
          <template v-for='ref in replies[predmetOdgovora.pst_id]'>
          <option :value='ref.pst_tekst'>{{ ref.username }} : {{ ref.pst_tekst.substring(0,15) }} ...</option>
        </template>
        </select>
        <p>Odgovori na komentar: {{ predmetOdgovora.pst_tekst }}</p>
        <textarea cols='8' rows='6' v-model='sadrzajPoruke'></textarea>
        <button @click='sendComm'>Posalji</button>
      </div>
    </div>
    <!-- edit div -->
    <div v-if="edit" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" v-on:click="closeEdit()">&times;</span>
         <select  v-if='predmetEdita.ref' v-model='predmetEdita.quote'>
          <option value=''>promeni koga citiras</option>
          <template v-for='ref in replies[predmetEdita.ref]'>
          <option v-if='ref.pst_id!=predmetEdita.id' :value='ref.pst_tekst'>{{ ref.username }} : {{ ref.pst_tekst.substring(0,15) }} ...</option>
        </template>
        </select>
        <p>Promena sadrzaja</p>
        <textarea cols='8' rows='6' v-model='predmetEdita.text'></textarea>
        <button @click='editComm(predmetEdita)'>Izmeni</button>
      </div>
    </div>
    <!-- edit div -->
    <!---...........text area end............ -->
  </div>
</template>

<script>
import api from '@/api/forum/axios_calls.js';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { store }  from '@/store/store.js';
import { router } from '@/router/router.js';
import Vue from 'vue'
export default {

  data(){
    return{
      params:this.$route.params.komentari,
      predmetOdgovora:{},
      predmetEdita:{},
      sadrzajPoruke:'',
      quote:'',
      flag:false,
      user:localStorage.getItem('sid'),
      username:localStorage.getItem('user'),
      edit:false,
      editText:'',
      text:''
    }
  },
  computed:{
    ...mapGetters({
      posts:'getShowComm',
      replies:'getReplies',
      ifLiked:'usersLikes_postG'
    })
  },
  methods:{
    metoda(param){
      return 'http://vesti.mars-t.mars-hosting.com/api/takeUserImage/'+param
    },
    likeReply(param){

      this.$store.dispatch('likeReplyA',param);
    },
    report(param){
      api.reporForumtApi(param);
    },
    textArea(param){
      this.$store.dispatch('showRepliesA',param.pst_id);
      this.predmetOdgovora = {};
      this.predmetOdgovora = param;
      this.flag = true;
    },
    close(){
      this.flag = false;
    },
    closeEdit(){
        this.predmetEdita = {};
        this.edit=false;
    },
    sendComm(){
      var param = Object.assign({}, this.predmetOdgovora);
       param.quote = this.quote;
       param.pst_tekst = this.sadrzajPoruke;
       this.$store.dispatch('sendCommA',param);
       this.flag = false;
       this.quote='';
       this.predmetOdgovora={};
    },
    showComm(param){
      this.$store.dispatch('showCommA',param);
    },
    showReplies(param){
      if(param.flag==false){
        this.$store.dispatch('showRepliesA',param.pst_id);
      }
      param.flag = !param.flag;

    },
    showEdit(params){

      this.edit=true;
      this.predmetEdita = {};
      this.predmetEdita.ref = params.pst_ref_id;
      this.predmetEdita.id = params.pst_id;
      this.predmetEdita.quote = params.pst_quotes;
      this.predmetEdita.text = params.pst_tekst;

    },
    editComm(params){
      var self = this;
      api.editCommApi(params).then((response)=>{
        api.updateCommApi(params.id).then((response)=>{
          self.$store.commit('updateCommM',response.data.result);
        });
      })
      this.edit=false;
        this.predmetEdita={};
    }
  },
  mounted(){

   this.showComm({tma_id:this.params});

 },


}
</script>

<style lang="css" scoped>

p {
  color: rgb(0, 0, 0);
}
span i {
  font-size: 20px;
}
.quotes {
  border:2px solid rgba(129, 129, 129, 0.79);
  border-radius:5px;
  padding:3px;
  font-size: 80%;
  color:rgba(129, 129, 129, 0.79);
  font-style: italic;
  float:left;
  font-weight: bold;
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
.bg-pozadina {
  background-color: rgba(255, 255, 255, 0.97);
  padding: 15px;
  box-shadow: 0 0 15px rgb(143, 143, 143);
}
.odvoji {
  margin-bottom: 10px;
}
.dugme {
  border-radius: 5px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  padding: 2px 15px;
}
.prijavi {
  background-color: rgb(255, 99, 99);
  border: 1px solid rgb(255, 0, 0);
}
.prijavi:hover {
  background-color: rgba(255, 0, 0, 0.8);
}
.odgovori {
  background-color: rgb(87, 180, 113);
  border: 1px solid rgb(0, 135, 74);
}
.odgovori:hover {
  background-color: rgb(0, 135, 74);
}
#opt-calendar {
  color: rgb(129, 186, 24);
}
#opt-commentst {
  color: rgb(117, 21, 203);
  margin-left: 5px;
}
#opt-clock {
  color: rgb(27, 187, 237);
  margin-left: 5px;
}
.like {
  color: rgb(26, 108, 230);
  padding: 6px;
  margin-right: 10px;
}
#opt-sadrzaj {
  /*border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;*/
}
span {
  font-family: 'Ropa Sans', sans-serif;
  font-size: 20px;
  color: rgb(42, 91, 112);
  margin-left: 5px;
}
/*stilizacija text forme */
.modal {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.2); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: 100px auto 0;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
    min-width: 300px;

}

/* The Close Button */
.close {

    text-align: right;
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    text-align: right;
}
#first_comm {
  text-align: center;
  display: block;
  margin: 120px auto;
  font-size: 25px;
}
</style>
