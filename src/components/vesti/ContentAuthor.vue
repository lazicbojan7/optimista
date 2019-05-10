<template>
  <div class="col-md-9">

      <h1 class="pt-3"></h1>

      <div class="topRated">


        <div class="heading">
          <h3>Vesti autora: {{ authorName }} {{ authorLastname }}</h3>

        </div>

          <a href="" v-on:click="goToNewsPage(news.ktg_naziv, news.tma_naslov, news.tma_id)" class="media news" v-for="news in newsAuthor">
            <img class="mr-3" :src='getMainImage(news.tma_id)' alt="Generic placeholder image">
            <div class="media-body">
              <h1 class="mt-0">{{news.tma_naslov}}</h1>
              <p class="date">{{news.tma_datum | dateTrans }}</p>
              <p class="shortDesc">{{news.tma_sazetak}}</p>
              <p class="likes">
                <span><i class="fa fa-thumbs-up" aria-hidden="true"></i>{{news.likes_count}}</span>
                <span><i class="fa fa-eye" aria-hidden="true"></i> {{news.tma_br_pregleda}}</span>
                <span><i class="fa fa-commenting-o" aria-hidden="true"></i> {{news.post_count}}</span>
              </p>
            </div>
          </a>

      </div>

    <a class="read" v-if="!show"  @click='add(); moreNews();' href="#">Jos vesti <i class= 'fa fa-caret-down' aria-hidden="true"></i></a>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      limit: 5,
      start: 0,
      n: '',
      show: false,
      authorName: '',
      authorLastname: ''
    }
  },

  computed: {

    newsAuthor() {
      return this.$store.getters.getNewsAuthorG;
    }

  },

  methods: {

    moreNews:function(){
      var authorId = this.$route.params.id;
      var start = this.start;
      var limit = this.limit;
      var params = {
        authorId: authorId,
        limit: limit,
        start: start
      }

      this.$store.dispatch('moreNewsAuthorA', params);
    },

    goToNewsPage: function(category, title, id){
      this.$router.push('/vest/' + category + '/' + title + '/' + id);
    },

    add: function() {
      if((this.start + 10) > this.n){
        this.show = true;
      }else{
        this.show = false;
      }
      this.start += 5;
    },

    authorData: function() {
      var authorId = this.$route.params.id;
      axios({
        url: 'http://vesti.mars-t.mars-hosting.com/api/getAuthorData',
        method: 'POST',
        data: {
          id: authorId
        }
      }).then((response) => {
        this.authorName = response.data.result.osb_ime;
        this.authorLastname = response.data.result.osb_prezime;
      });
    },

    totalNumber: function(){
      var self = this;
      var authorId = this.$route.params.id;
      axios({
        url: 'http://vesti.mars-t.mars-hosting.com/api/getNumberOfAuthorNews',
        method: 'POST',
        data: {
          id: authorId
        }
      }).then((response) => {
        this.n = response.data.result.news_count;
        console.log(response.data);
        if(this.n <= self.limit){
            this.show = true;
          }
      });
    },

    getMainImage: function(imgId){
      return "http://vesti.mars-t.mars-hosting.com/api/getMainImage/" + imgId;
    }



  },

  created(){
    this.moreNews();
    this.authorData();
    this.totalNumber();
  }

}
</script>

<style scoped>

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
}

.news img {
  width: 120px;
  height: 100px;
  display: inline-block;;
  margin:5px;
  box-shadow: 5px 5px 5px rgba(136, 136, 136, 0.65);
}

.news p{
  font-weight: normal;
}


.date {
  display: inline-block;
  position: absolute;
  right: 15px;
  font-size: 16px;
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

.media {
  color: #343a40;
}
</style>
