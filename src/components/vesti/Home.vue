<template>
  <div class="wrap">



    <app-header></app-header>

    <div class="container back">
      <div class="row">

        <router-view></router-view>
        <app-side></app-side>

      </div>
        <div class="row">
          <app-slider></app-slider>
        </div>
    </div>

    <app-footer></app-footer>


  </div>


</template>

<script>
  import Header from "./Header"
  import Footer from "./Footer"
  import Side from "./Side"
  import Slider from "./Slider"

  export default {
    components: {
      "app-header": Header,
      "app-side": Side,
      "app-slider":Slider,
      "app-footer": Footer


    },
    created:function(){
    }

  }
</script>

<style>
ul{
  list-style: none;
}
.wrap{
    background-color: white;
    background-image: url("../../assets/bg.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    font-family: 'Acme', sans-serif;
  }

  .back {
    background: inherit;
    position: relative;
    z-index: 10;
    overflow: hidden;
  }

  .back::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    filter: blur(20px);
    margin: -20px;
  }


  .back::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.85);
  }

  @media (max-width: 1200px) {

.container {
    max-width: 100%;
}
}

</style>
