<template lang="html">
  <div class="wrapper">
    <div class="container">
<h1>Ovo su partneri</h1>
<div class="pull-right col-md-4">
  <input v-on:keydown.enter="searchPartners" type="text" v-model="searchText"/>
  <button class="btn btn-dark pointer" v-on:click="searchPartners" ><i class="fa fa-search" aria-hidden="true"></i></button>
</div>
<table class="table table-striped">
  <thead>
    <tr>
      <th>#</th>
      <th>Naziv</th>
      <th>Link</th>
      <th>Email</th>
      <th>Slika</th>
      <th>Tip</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="(l,index) in getPartners" style="max-height:150px">
      <td class="table-limit" scope="row">{{index+1}}</td>
      <td class="table-limit" ><span v-if="l.seeEdit"><input class="input-banner" type="text" v-bind:value="l.osb_ime" v-on:input="changeBannerName($event,l)" /></span><span v-if="!l.seeEdit">{{ l.osb_ime}}</span></td>

      <td class="table-limit" ><span v-if="l.seeEdit"><input class="input-banner" type="text" v-bind:value="l.osb_info" v-on:input="changeBannerSite($event,l)" /></span><span v-if="!l.seeEdit">{{l.osb_info}}</span></td>

      <td class="table-limit" ><span v-if="l.seeEdit"><input class="input-banner" type="text" v-bind:value="l.osb_email" v-on:input="changeBannerEmail($event,l)"/></span><span v-if="!l.seeEdit">{{l.osb_email}}</span></td>
      <td class="table-limit" ><span v-if="l.seeEdit"><input type="file" style="width:180px;" v-on:change="changeBannerImage($event,l)"/></span><span v-if="!l.seeEdit"><img v-bind:src="l.img" style="max-height:120px; max-width:120px;"/></span></td>
      <td class="table-limit" ><span v-if="!l.seeEdit"><span v-if="l.osb_tip == 4">Futer</span><span v-if="l.osb_tip == 5">Side</span></span><span>
        <select v-if="l.seeEdit" v-bind:value="l.osb_tip" v-on:change="changeBannerType($event,l)">
          <option value="4">
           Futer
          </option>
          <option value="5">
            Side
        </option>
      </select><br/>
      </span></td>


      <td class="table-limit"  v-if="!bannerState"><button class="btn btn-success pointer" v-on:click="activateOrDesactivateBanner(l.osb_id)">Aktiviraj</button></td>
      <td class="table-limit"  v-if="bannerState"><button class="btn btn-danger pointer" v-on:click="activateOrDesactivateBanner(l.osb_id)">Deaktiviraj</button></td>
      <td class="table-limit" ><button v-if="!l.seeEdit" class="btn btn-warning pointer" v-on:click="editBanner(l)">Izmeni</button><button  v-on:click="exitFromEdit(l)" v-if="l.seeEdit" class="btn btn-secondary pointer marginbottom10">Otkaži</button><button class="btn btn-success" v-if="l.seeEdit" v-on:click="changeBanner(l)">Sačuvaj</button></td>
    </tr>

  </tbody>
</table>
<div class="col-md-12" v-if="moreBanner">
  <a class="read offset-md-4" href="" v-on:click.prevent="takeMoreBanner">Još banera<i class= 'fa fa-caret-down' aria-hidden="true"></i></a>
</div>
<button class="btn btn-info pointer" v-if="bannerState" v-on:click="notActiveBanner">Vidi obrisane banere</button><button class="btn btn-info pointer" v-on:click="activeBanner" v-if="!bannerState">Vidi trenutno aktivne banere</button>

<div id="around-insert-banner" class="col-md-12" style="margin-top:40px;">
  <div v-if="seeInsertBanner" id="insert-banner">
    <div class="pull-right" style="margin: 20px 0px 20px 0px;">
      <img id="bannerImage" v-bind:src="bannerImage"/>
    </div>
    <label  class="pull-right btn btn-outline-primary btn-file image-from-local" id="insertImage"  t="Unesi glavnu sliku">
        <i class="fa fa-file-image-o" aria-hidden="true"></i><input v-on:change="takeBannerImage($event)" ref="bannerImage" type="file" style="display: none;" accept="image/*">
    </label>
    <input type="text" placeholder="Naziv" v-model='bannerName'/><br />
    <input type="text" placeholder="Mejl" v-model="bannerEmail"/><br />
    <input type="text" placeholder="Sajt" v-model="bannerSite"/><br />
    <select v-model="bannerType">
      <option value="4">
       Futer
      </option>
      <option value="5">
        Side
    </option>
  </select><br/>
    <button class="btn btn-primary pointer" v-on:click="insertBanner">Unesi baner</button>
  </div>
  <button class="btn btn-info pointer" v-if="!seeInsertBanner" v-on:click="openFormBanner">Otvori formu za unošenje banera</button><button v-on:click="closeFormBanner" class="btn btn-info pointer" v-if="seeInsertBanner">Zatvori</button>
</div>
    </div>
    <alert v-if="seeAlert" v-bind:alertDialogText="alertText"></alert>
  </div>
</template>

<script>
  import api from '@/api/vesti/axios_calls.js'
  import Vue from 'vue'
  import Alert from '@/components/vesti/Alert.vue'
  import Confirm from '@/components/vesti/Confirm.vue'
import { bus } from '@/main.js'

  export default {
    components:{
      'alert':Alert,
      'confirm':Confirm
    },
    data() {
        return {
          bannerState:true,
          ofset:0,
          partners:[],
          moreBanner:false,
          seeInsertBanner:false,
          bannerType:'',
          bannerImage:'',
          bannerName:'',
          bannerEmail:'',
          bannerSite:'',
          seeAlert: false,
          alertText: '',
          searchText:''

        }
      },
      computed:{
        getPartners:function(){
          return this.partners;
        }
      },
      methods: {
        validURL:function(str) {
          var regexp =  /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
        },
        searchPartners:function(){
          var self = this;
            console.log(this.bannerState);
          var params = {
            state: this.bannerState,
            text: this.searchText
          }
          api.searchBanner(params).then((response)=>{
            if(response.data.result !== undefined){
              self.partners = [];
              self.moreBanner = false;
              for(var i = 0; i < response.data.result.length; i++){
                response.data.result[i].seeEdit = false;
                response.data.result[i].img = 'data:text/plain;base64,'+response.data.result[i].osb_slika;
                response.data.result[i].name = '';
                response.data.result[i].email = '';
                response.data.result[i].site = '';
                response.data.result[i].type = '';
                response.data.result[i].imgStorage = '';
                self.partners[i] = response.data.result[i];
                Vue.set(self.partners,i,self.partners[i]);
              }
            }else{
              self.partners = [];
              self.moreBanner = false;
            }
          });

        },
        changeBannerName:function(event,banner){
          banner.osb_ime = event.target.value;
        },
        changeBannerSite:function(event,banner){
          banner.osb_info = event.target.value;
        },
        changeBannerEmail:function(event,banner){
          banner.osb_email = event.target.value;
        },
        changeBannerType:function(event,banner){
          banner.osb_tip = event.target.value;
        },
        changeBannerImage:function(event,banner){
          var file = event.target.files[0];

          if(event.target.files.length > 0 && file.size <= 5*1024*1024){

            var fr = new FileReader();
            var self = this;
            fr.onload = function(event2){
              banner.img = event2.target.result;
            }
            fr.readAsDataURL(file);
          }
        },
        changeBanner:function(banner){
          var self = this;
          if(banner.osb_ime !== null && banner.osb_ime !== '' && banner.osb_slika !== null && banner.osb_slika !== '' && banner.osb_slika !== undefined && banner.osb_id !== null){
           var image = this.dataUrlToBlob(banner.img);
            var formData = new FormData();
            var sid = localStorage.getItem('sid');
            formData.append('name',banner.osb_ime);
            formData.append('email',banner.osb_email);
            formData.append('site',banner.osb_info);
            formData.append('type',banner.osb_tip);
            formData.append('state',banner.osb_nalog_prijava);
            formData.append('image',image);
            formData.append('bannerId',banner.osb_id);
            formData.append('sid',sid);
            api.changeBanner(formData).then((response)=>{
              if(response.data.result !== undefined){
                self.seeAlert = true;
                self.alertText = response.data.notice;
                bus.$on('alert',()=>{
                  self.seeAlert = false;
                  banner.seeEdit = false;
                });

              }else{
                self.seeAlert = true;
                self.alertText = response.data.notice;
                bus.$on('alert',()=>{
                  self.seeAlert = false;
                });

              }
            });
          }else{
            this.seeAlert = true;
            this.alertText = "Minimum morate imati sliku i naziv";
            bus.$on('alert',()=>{
              this.seeAlert = false;
            });
          }
        },
        exitFromEdit:function(banner){
          banner.seeEdit = false;
          banner.osb_ime = banner.name;
          banner.osb_email = banner.email;
          banner.osb_info = banner.site;
          banner.osb_tip = banner.type;
          banner.img = 'data:text/plain;base64,'+ banner.imgStorage;
        },
        editBanner:function(banner){
          banner.seeEdit = true;
          banner.name = banner.osb_ime;
          banner.email = banner.osb_email;
          banner.site = banner.osb_info;
          banner.type = banner.osb_tip;
          banner.imgStorage = banner.osb_slika;
        },
        openFormBanner:function(){
          this.seeInsertBanner = true;
        },
        closeFormBanner:function(){
          this.seeInsertBanner = false;
        },
        dataUrlToBlob: function(dataURI){
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], {type: mimeString});
        return blob;
        },
        insertBanner:function(){
          var self = this;

          if(this.bannerSite !== null && this.bannersSite !== ''){ /* checks is url existes, if exists checks is url valid */
            var valid = this.validURL(this.bannerSite);
            if(valid === false){
              this.seeAlert = true;
              this.alertText = 'Neispravan link!';
              bus.$on('alert',()=>{
                self.seeAlert = false;
              });
              return;
            }
          }


          if(this.bannerImage !== null && this.bannerImage !== '' && this.bannerName !== '' && this.banerEmail !== '' && this.banerSite !== ''){
            console.log('pera');
            this.bannerImage = this.dataUrlToBlob(this.bannerImage);
            var formData = new FormData();
            var sid = localStorage.getItem('sid');
            formData.append('bannerImage',this.bannerImage);
            formData.append('bannerName', this.bannerName);
            formData.append('bannerEmail', this.bannerEmail);
            formData.append('bannerSite',this.bannerSite);
            formData.append('bannerType',this.bannerType);
            formData.append('sid',sid);

            api.insertBanner(formData).then((response)=>{
                if(response.data.result !== undefined){
                    self.takePartners();
                }
            });
          }
        },
        takeBannerImage:function(event){
          var file = event.target.files[0];

          if(event.target.files.length > 0 && file.size <= 5*1024*1024){

            var fr = new FileReader();
            var self = this;
            fr.onload = function(event2){
              self.bannerImage = event2.target.result;
            }
            fr.readAsDataURL(file);
          }
        },
        removeBannerFromArr:function(bannerId){
          for(var i = 0; i < this.partners.length; i++){
            if(bannerId === this.partners[i].osb_id){
              this.partners.splice(i,1);
              break;
            }
          }
        },
        activateOrDesactivateBanner:function(bannerId){
          var self = this;
          var params = {
            action:this.bannerState,
            bannerId:bannerId
          }
          api.activateOrDesactivateBanner(params).then((response)=>{
            if(response.data.result !== undefined){
              self.removeBannerFromArr(bannerId);
            }
          });
        },
        activeBanner:function(){
          var self = this;
          this.ofset = 0;
          this.partners = [];
          this.bannerState = true;
          this.takePartners();
        },
        notActiveBanner:function(){
          var self = this;
          this.ofset = 0;
          this.partners = [];
          this.bannerState = false;
          this.takePartners();
        },
        takeMoreBanner:function(){
          this.takePartners();
        },
        takePartners: function() {
          var self = this;
          var params = {
            ofset: this.ofset,
            bannerState: self.bannerState
          }
          api.takePartners(params).then((response)=>{
            if(response.data.result !== undefined){
              if(response.data.next !== undefined){
                self.moreBanner = true;
              }else{
                self.moreBanner = false;
              }
              if(response.data.equals !== undefined){
                self.ofset += response.data.j;
                for(var i = 0; i < response.data.result.length; i++){
                  response.data.result[i].seeEdit = false;
                  response.data.result[i].img = 'data:text/plain;base64,'+response.data.result[i].osb_slika;
                  response.data.result[i].name = '';
                  response.data.result[i].email = '';
                  response.data.result[i].site = '';
                  response.data.result[i].type = '';
                  response.data.result[i].imgStorage = '';
                  self.partners[i] = response.data.result[i];
                  Vue.set(self.partners,i,self.partners[i]);
                }
              }else{
                self.ofset += response.data.j;
                for(var i = 0; i < response.data.result.length; i++){
                  response.data.result[i].seeEdit = false;
                  response.data.result[i].img = 'data:text/plain;base64,'+response.data.result[i].osb_slika;
                  response.data.result[i].name = '';
                  response.data.result[i].email = '';
                  response.data.result[i].site = '';
                  response.data.result[i].type = '';
                  response.data.result[i].imgStorage = '';
                  self.partners.push(response.data.result[i]);
                }
              }
            }

          });

        },

      },
      created() {
        this.takePartners();
      },


  }
</script>

<style scoped>

.table-limit{
  width:100px!important;
}

.input-banner{
  width:100px;
}
.marginbottom10{
  margin-bottom:10px!important;
}

#around-insert-banner{
  border-radius:5px;
  background-color:rgb(201, 201, 201);
  padding:40px 40px 40px 40px;
}
#insertImage{
  cursor:pointer;
}
#bannerImage{
width:150px;
}
.read {
   display: block;
   margin: 20px auto 0;
   text-align: center;
   font-size: 18px;
   color:black;
   text-decoration: none;
 }

.pointer{
  cursor:pointer;
}

fieldset
{
border: 1px solid #ddd !important;
margin: 0;
xmin-width: 0;
padding: 10px;
position: relative;
border-radius:4px;
background-color:#f5f5f5;
padding-left:10px!important;
}

legend
{
  font-size:14px;
  font-weight:bold;
  margin-bottom: 0px;
  width: 35%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 5px 5px 10px;
  background-color: #ffffff;
}



  .wrapper {
    margin: 10px auto;
    width: 870px;
  }
  /*#exampleSelect1 {
  font-family: 'FontAwesome', 'sans-serif';
}

#kat {
  margin: 30px auto;
  width: 870;
  overflow: hidden;
}*/

  .glavna-kategorija {
    float: left;
    margin: 0 80px;
  }

  .sporedna-kategorija {
    float: left;
    margin-right: 65px;
  }

  .zaglavlje td {
    font-weight: 800;
    font-family: sans-serif;
  }
  /*za liste--------------*/
  #centeredmenu {
   float:left;
   width:100%;
   background:#fff;
   border-bottom:4px solid #000;
   overflow:hidden;
   position:relative;
}
#centeredmenu ul {
   clear:left;
   float:left;
   list-style:none;
   margin:0;
   padding:0;
   position:relative;
   left:50%;
   text-align:center;
}
#centeredmenu ul li {
   display:block;
   float:left;
   list-style:none;
   margin:0;
   padding:0;
   position:relative;
   right:50%;
}

  /*#listaDiv {
    width: 200px;
  }

  #listaNaslov {
    font: 400 30px/1.5 Helvetica, Verdana, sans-serif;
    margin: 0;
    padding: 0;
  }

  #listaUl {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  #listaUl li {
    font: 200 20px/1.5 Helvetica, Verdana, sans-serif;
    border-bottom: 1px solid #ccc;
  }

  #listaUl li:last-child {
    border: none;
  }*/
  /*li a {
  text-decoration: none;
  color: #000;
  display: block;
  width: 200px;

  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}

li a:hover {
  font-size: 30px;
  background: #f6f6f6;
}*/
</style>
