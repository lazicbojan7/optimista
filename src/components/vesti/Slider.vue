<template>

<div class="col-md show">
  <hr>

  <h4>Naši partneri</h4>



  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
<div v-for="(banner,index) in getBanners">
    <div v-bind:class="{active: banner.isActive}" class="carousel-item">
      <a v-for="b in banner.banners" v-bind:href="b.osb_info" v-on:click.prevent="goToPartnerSite(b.osb_info)" class="sliderImg"><img class="card-img-top images" v-bind:src="takeBannerImage(b.osb_id)" v-bind:alt="b.osb_ime" v-bind:title="b.osb_ime"></a>
    </div>
  </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon color" aria-hidden="true" v-on:click="previousBanner"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon color" aria-hidden="true" v-on:click="nextBanner"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>
</template>

<script>
import api from '@/api/vesti/axios_calls.js'
import Vue from 'vue'

export default {
  data:function(){
  return{
    banners:[]
  }
},
computed:{
  getBanners:function(){
    return this.banners;
  }
},
methods:{
  goToPartnerSite:function(link){
    if(link !== '' && link !== null && link !== undefined){
      var win = window.open(link,'_blank');
      win.focus();
    }
  },
  previousBanner:function(){
    var index1;
    for(var i = 0; i < this.banners.length; i++){
      if(this.banners[i].isActive === true){
        if(i===0){
          index1 = this.banners.length-1;
        }else{
          index1 = i - 1;
        }
        this.banners[i].isActive = false;
      }
    }
    this.banners[index1].isActive = true;
  },
  nextBanner:function(){
    var index1;
    for(var i = 0; i < this.banners.length; i++){
      if(this.banners[i].isActive === true){
        if(i===(this.banners.length-1)){
          index1 = 0;
        }else{
          index1 = i + 1;
        }
        this.banners[i].isActive = false;
      }
    }
    this.banners[index1].isActive = true;
  },
  takeBanners:function(){
    var self = this;
    api.getFooterBanners().then((response)=>{
        if(response.data.result !== undefined){
          var limit;
          if(response.data.result.length%5 !== 0){
            limit = Math.floor(response.data.result.length/5);
          }else{
            limit = response.data.result.length/5;
          }
          var bannersThis = [];
          var x;
          var xPlus;
          var arr;
          for(var i = 0; i < limit; i++){
            arr = [];
            if(i === 0){
            bannersThis[i] = { isActive:true,  banners:[] };
            }else{
            bannersThis[i] = { isActive:false,  banners:[] };
            }
            x = i * 5;
            xPlus = x + 5;
            for(var j = x; j < xPlus; j++){
              arr.push(response.data.result[j]);
              if(j === (xPlus-1)){
              bannersThis[i].banners = arr;
              }
            }
          }
          self.banners = bannersThis;

        }
    });
  },
  takeBannerImage:function(bannerId){
    return 'http://vesti.mars-t.mars-hosting.com/api/takeBannerImage/'+bannerId;
    }
},
created:function(){
  this.takeBanners();
  var self = this;
  setInterval(function(){
    self.nextBanner();
    console.log('Slider changed');
  },20000);

}

}
</script>

<style scoped>


/* .images:hover {
    position: relative;
}

.images[t]:hover:after {
     content: attr(t);
     padding: 4px 8px;
     position: absolute;
     left: 10%;
     top: 200%;
     white-space: nowrap;
     z-index:20;
     background:white;
     color:rgb(92, 81, 57);
     border-radius:4px;
     font-size:0.9em;
} */

.col-md{
  margin:20px 0 40px;

}

h4{
  text-align: center;
  color: rgb(247, 148, 30);
  margin-top: 30px;
font-family: 'Amiko', sans-serif;
}

hr {
  height: 12px;
  border: 0;
  box-shadow: inset 0 12px 12px -12px rgba(200, 75, 4, 0.62);
  margin-bottom: 0;
}

 .carousel-control-prev, .carousel-control-next {
   width: 2%;
 }

.carousel-item{
  padding: 30px;


}
.sliderImg{
  display: inline-block;
  padding: 20px;
  /* box-shadow: 5px 3px 3px rgba(215, 117, 36, 0.4); */
  width: 15%;
  margin: 20px;
}


.sliderImg img{
  width:120px;
  /* height:80px; */

}


@media all and (min-width:993px) (max-width: 1011px){
  .show{
    display: none;
  }

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

   }

.color{
color: rgb(107, 48, 0);
}


</style>
