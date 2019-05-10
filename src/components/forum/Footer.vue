<template lang="html">
  <footer id="background-footer">
    <div class="container">
    <div class="row">
      <div class="center-footer offset-md-3 col-md-6">
    <p class="thanks-message">
        Hvala što ste posetili <span style="color: rgb(179, 179, 179); padding: 0 5px 0 5px;">optimista<span style="font-size: 15px;">.rs</span></span> Forum
    </p>

    <img src="../../assets/logo2.png" alt="" class="footer-logo">

    <!--Footer Nav -->

          <div class="navigacija">
            <nav class="row nav nav-optimista justify-content-md-center">
              <a class="nav-link col-xs-12" href="#">Najnovije</a>
              <a class="nav-link col-xs-12" href="#">Najpopularnije</a>
              <a class="nav-link col-xs-12" href="#">Kontakt</a>
              <a class="nav-link col-xs-12" href="#">Pomoć</a>
            </nav>
          </div><!--nav-->

      </div>
    </div><!--ROW-->
  </div><!--Container-->
  </footer>

</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.thanks-message {
  font-family: 'Acme', sans-serif;
  font-size: 20px;
  color: rgb(134, 134, 134);
  text-align: center;
  margin: 40px 5px 40px 5px;
}
#background-footer {
  margin-top: 0;
  background-color: rgba(0, 0, 0, 0.85);
}
.footer-logo {
  width: 180px;
  padding: 10px 20px;
  display: block;
  margin: 0 auto;
}

/*footer nav*/
.navigacija {
  margin-bottom: 50px;
}
.nav-optimista {
  font-family: 'Acme', sans-serif;
  font-size: 20px;
  margin-top: 10px;
}
.nav-optimista a {
 padding: 5px 20px;
 color: rgb(134, 134, 134) !important;
 transition: 1s;
}
.nav-optimista a:hover {
 color: rgb(200, 200, 200) !important;
}
.nav-optimista a:active {
 color: rgb(255, 255, 255);
}

</style>
