<template>

  <div class="col-md-3 col-xs-12" id="sideBar">



    <!-- Authors -->
    <div class="heading">
        <h3>Najpopularniji autori</h3>
        <hr>
    </div>

    <div class="authors">
        <a :href="'/autor/' + author.osb_ime + author.osb_prezime + '/' + author.osb_id" class="author" v-for="author in popAuthors">
            <div class="a-img">
              <img :src="takeUserImage(author.username)" alt="Autor Name" class="img-thumbnail rounded-circle"/>
            </div>
            <div class="a-info">
                <div class="a-name">{{author.osb_ime}} {{author.osb_prezime}}</div>
                <div class="no-news"><i class="fa fa-newspaper-o mr-2"></i>{{ author.broj_tema }}</div>
            </div>
        </a>

        <div class="text-center a-all">
            <a :href="'/autori'">Svi autori</a>
        </div>
    </div>
     <!-- /Authors -->

     <!-- Banner -->
     <div class="my-3" v-for="(banner, index) in bannerData">
         <a :href="banner.osb_info" v-on:click.prevent="goToPartnerSite(banner.osb_info)"><img class="img-fluid" :src="getBannerImage(banner.osb_id)" :alt="banner.username"></a>

         <!-- Comment of the day -->
         <div v-if="index===0">
           <div class="heading">
               <h3>Komentar dana</h3>
               <hr>
           </div>

           <a :href="'/vest/' + comment.ktg_naziv + '/' + comment.tma_naslov + '/' + comment.tma_id" class="bq-style" style="word-wrap: break-word;">
               {{ comment.pst_tekst }}
               <div class="clearfix mt-2 bq-info">
                   <div class="pull-left">
                       <i class="fa fa fa-thumbs-up"></i> {{ comment.likes }}
                   </div>
                   <div class="pull-right">
                       - {{ comment.osb_ime }} {{ comment.osb_prezime }}
                   </div>
               </div>
           </a>
         </div>
         <!-- /Comment of the day -->
     </div>
     <!-- /Banner -->



  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bannerData: []
    }
  },

  computed: {
    returnBanner(){
      return this.bannerData;
    },
    comment: function(){
      return this.$store.getters.getCommentOfTheDayG;
    },

    popAuthors: function(){
      return this.$store.getters.getMostPopularAuthorsG;
    }

  },
  methods: {
    goToPartnerSite:function(link){
      if(link !== '' && link !== null && link !== undefined){
        var win = window.open(link,'_blank');
        win.focus();
      }
    },
    takeUserImage: function(username){
      if(username === '' || username === undefined || username === null){
        return "";
      }else{
        return "http://vesti.mars-t.mars-hosting.com/api/takeUserImage/"+username;
      }
    },

    getPopAuthors: function(){
      this.$store.dispatch('mostPopularAuthorsA');
    },

    getCommentOfTheDay: function(){
      this.$store.dispatch('commentOfTheDayA');
    },

    getBannerData: function(){
      var self = this;
      axios({
        url: 'http://vesti.mars-t.mars-hosting.com/api/getBannerData',
        method: 'POST'
      }).then((response) => {
        self.bannerData = response.data.result;
      });
    },

    getBannerImage: function(bannerId){
      return 'http://vesti.mars-t.mars-hosting.com/api/getBannerImage1/'+bannerId;
    }
  },

  created() {
    this.getCommentOfTheDay();
    this.getPopAuthors();
    this.getBannerData();
  }

}
</script>

<style scoped>

h3 {
    font-size: 1.3em;
}
hr {
    height: 12px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(200, 75, 4, 0.62);
    margin-bottom: 0;
}
.heading{
    margin: 1.5em 0 0 0;
}

/* Authors sidebar */
.authors .author {
    position: relative;
    display: block;
    margin-bottom: 20px;
}
.authors .author .a-img  {
    width: 60px;
    height: 60px;
   border-radius: 50%;
   overflow: hidden;
}
.authors .author .a-img img  {
    max-width: 100%;
}
.authors .author .a-info  {
    position: absolute;
    left: 70px;
    right: 0;
    top: 0;
    bottom: 0;

    padding: 5px;
}
.authors .author .a-info .a-name {
    font-size: 16px;
    font-weight: 500;
    color: #000;
}
.authors .author .a-info .no-news {
    font-size: 14px;
    font-weight: 500;
    color: #605b56;
}
.authors .author .a-info .no-news i {
    color: #666;
}
.a-all {
    border-top: 1px solid rgba(0, 0, 0, 0.33);
    padding: 5px;
}

/* blockquot sidebar */

.bq-style {
    position: relative;
    display: block;
    padding: 20px 20px 20px 50px;
    color: #000;
}
.bq-style:before {
    content: "\f10e";
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;

    position: absolute;
    top: 20px;
    left: 15px;
    font-size: 1.5rem;
    color: #f7941e;
}
.bq-style:hover {
    color: #000;
}
.bq-info {
    opacity: 0.46;
}
.sideNews {
  margin: 20px 5px 20px;
}
</style>
