<template lang="html">

<div  v-if='bigTotalItems>6' style="text-align:center;">
          <uib-pagination :total-items="bigTotalItems" v-model="pagination"  @change="prikaziStranu(pagination)" :max-size="3" class="pagination" :boundary-links="true" first-text="Prva" last-text="Poslednja" previous-text="Prethodna" next-text="Sledeća" :items-per-page="6" ></uib-pagination>

</div>
</template>

<script>

import * as pagination from "vuejs-uib-pagination";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { bus } from "@/main.js";

export default {

  data(){
    return{
        pagination: {
          currentPage: 1,
          numPages: 1
        },
        url:this.$route.params,
        data:{}
      }
    },
    computed:{
      ...mapGetters({
        bigTotalItems:'getCount',
        filter:'getFilter'
      })
    },
    methods:{
      ...mapActions(['temaShowA','showCommA']),

      prikaziStranu(param) {
        var limit = param.currentPage;


        limit = (limit-1)*6;

        if(this.url.komentari){

          var params = Object.assign({strana:limit},{tma_id:this.url.komentari});
          this.showCommA(params);
        }
        else{

           var params = Object.assign({strana:limit},{tema:this.url.tema},{filter:this.filter});
           this.temaShowA(params);
        }

      }

    },
    created(){

        bus.$on('resetPage',(param)=>{
          if(this.pagination.currentPage== 1){

            var params = Object.assign({strana:0},param);
            this.temaShowA(params);
          }
          else{
            document.getElementsByClassName('pagination-first')[0].children[0].click();
          }

        })

    }
}

</script>

<style lang="css">
.nesto {
  padding: 0 auto;
}
.container {
    padding-top: 10px;
}


.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}
.pagination > li {
  display: inline;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  z-index: 2;
  color: #23527c;
  background-color: #eee;
  border-color: #ddd;
}
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 3;
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}
.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
  color: #777;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}
.pagination-lg > li > a,
.pagination-lg > li > span {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
}
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
