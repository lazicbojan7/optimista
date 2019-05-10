<template lang="html">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="offset-md-1 col-md-4 offset-xs-1 col-xs-12">
          <img src="../../../assets/forum.png" alt="">
          <p id="opt-naslov">{{ this.$route.params.tema }}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
img {
  width: 120px;
  padding: 0 10px 20px 0px;
}
  #opt-naslov {
    color: rgb(0, 0, 0);
    font-size: 55px;
    display: inline-block;
    margin-top: 10px;
    text-align: center;
    transition: 0.5s;
  }
  #opt-naslov:hover {
    text-shadow: 0 0 20px rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  }
</style>
