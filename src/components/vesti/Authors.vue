<template>
  <div class="col-md-9">
  <h3 class="heading">Autori</h3>

  <div class="row">
      <div class="col-md-4" v-for="author in authors">

        <a :href="'/autor/' + author.osb_ime + author.osb_prezime + '/' + author.osb_id" class="media mb-3">
            <img class="mr-3 img-thumbnail rounded-circle" :src="takeAuthorImage(author.username)" alt="Author name" style="max-width:80px;">
            <div class="media-body">
                <h5 class="mt-0">{{ author.osb_ime }} {{ author.osb_prezime }}</h5>
                <p><i class="fa fa-newspaper-o mr-1"></i> {{ author.broj_tema }}</p>
            </div>
        </a>

      </div>
  </div>

</div>
</template>

<script>
import axios from 'axios';

export default {
  computed: {

    authors: function() {
      return this.$store.getters.getAllAuthorsG;
    }
  },

  methods: {

    takeAuthorImage: function(username){
      if(username === '' || username === undefined || username === null){
        return "";
      }else{
        return "http://vesti.mars-t.mars-hosting.com/api/takeUserImage/"+username;
      }
    },

    allAuthors: function() {
      this.$store.dispatch("allAuthorsA");
    }

  },

  created() {
    this.allAuthors();
  }
}
</script>

<style scoped>
  .heading {
    display: block;
    margin: 20px 0 10px 0;
  }
  .media {
    color: #000;
  }
</style>
