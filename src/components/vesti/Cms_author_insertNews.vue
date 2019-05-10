<template>
<div class="container" id="wrapper">
<div class="row" id="import">
  <div class="col-md-12">

    <div class="naslov">
      <input placeholder="Naslov" class="imports" type="text" v-model="title"/>
      <label ref="mainImageLabel" class="btn btn-outline-primary btn-file image-from-local"  t="Unesi glavnu sliku">
          <i class="fa fa-file-image-o" aria-hidden="true"></i><input v-on:change="takeMainImage($event)" ref="mainImageInput" type="file" style="display: none;" accept="image/*">
      </label>
    </div>

  <br/>
  <p v-if="seeCharacterMessage">Ne možeš da imaš više od 250 karaktera</p>
<textarea placeholder="Sažetak" v-on:input="checkSummary($event)" class="imports" v-model="summary"></textarea><br />
<!-- buttons for iframe -->
<div id="text_change" class="col-md-12">
  <div id="buttons" class="col-md-8">
    <div>
      <div style="display:inline; margin-right:10px;">
        <button class="btn btn-outline-primary" v-on:click="execCmd('bold')" t="bold"><i class="fa fa-bold" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('italic')" t="italic"><i class="fa fa-italic" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('underline')" t="underline"><i class="fa fa-underline" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('strikeThrough')" t="strike through"><i class="fa fa-strikethrough" aria-hidden="true"></i></button>
      </div>
      <div style="display:inline; margin-right:10px;">
        <button class="btn btn-outline-primary" v-on:click="execCmd('justifyLeft')" t="left"><i class="fa fa-align-left" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('justifyRight')" t="right"><i class="fa fa-align-right" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('justifyCenter')" t="center"><i class="fa fa-align-center" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('justifyFull')" t="full"><i class="fa fa-align-justify" aria-hidden="true"></i></button>
      </div>
      <div style="display:inline; margin-right:10px;">
        <button class="btn btn-outline-primary" v-on:click="execCmd('cut')" t="cut"><i class="fa fa-scissors" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('copy')" t="copy"><i class="fa fa-clipboard" aria-hidden="true"></i></button>
      </div>
      <div style="display:inline; margin-right:10px;">
        <button class="btn btn-outline-primary" v-on:click="execCmd('indent')" t="indent"><i class="fa fa-indent" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('outdent')" t="outdent"><i class="fa fa-outdent" aria-hidden="true"></i></button>
      </div>
    </div>
    <div>
      <div style="display:inline; margin-right:10px;">
        <button class="btn btn-outline-primary" v-on:click="execCmd('subscript')" t="subscript"><i class="fa fa-subscript" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('superscript')" t="superscript"><i class="fa fa-superscript" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('undo')" t="undo"><i class="fa fa-undo" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('redo')" t="redo"><i class="fa fa-repeat" aria-hidden="true"></i></button>
      </div>
      <div style="display:inline; margin-right:10px;">
        <button class="btn btn-outline-primary" v-on:click="execCmd('insertUnorderedList')" t="insert unordered list"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('insertOrderedList')" t="insert orderd list"><i class="fa fa-list-ol" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('insertParagraph')" t="insert paragraph"><i class="fa fa-paragraph" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('insertHorizontalRule')" t="insert horizontal rule">HR</button>
      </div>
      <div style="display:inline; margin-right:10px;">
        <button class="btn btn-outline-primary" v-on:click="insertLink" t="insert link"><i class="fa fa-link" aria-hidden="true"></i></button>
        <button class="btn btn-outline-primary" v-on:click="execCmd('unlink')" t="unlink"><i class="fa fa-chain-broken" aria-hidden="true"></i></button>
      </div>
      <div style="display:inline; margin-right:10px;">
        <button class="btn btn-outline-primary" v-on:click="toggleSource" t="toggle source">tg</button>
        <button class="btn btn-outline-primary" v-on:click="toggleEdit" t="toggle edit">te</button>
      </div>
    </div>
    <div>
      <div class="form-group div-select">
        <label for="heading"><i class="fa fa-header" aria-hidden="true"></i></label>
        <select v-model="headingValue" id="heading" class="form-control select" v-on:change="execCmdWithParam('formatBlock',headingValue)">
          <option value='H1'>H1</option>
          <option value='H2'>H2</option>
          <option value='H3'>H3</option>
          <option value='H4'>H4</option>
          <option value='H5'>H5</option>
          <option value='H6'>H6</option>
        </select>
      </div>
      <div class="form-group div-select">
      <label for="font-name"><i class="fa fa-font" aria-hidden="true"></i></label>
      <select id="font-name" v-model="fontName" class="form-control select" v-on:change="execCmdWithParam('fontName',fontName)">
        <option value="Arial">Arial</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Courier">Courier</option>
        <option value="Georgia">Georgia</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
      </div>
      Font color <input type="color" v-model="foreColor" v-on:change="execCmdWithParam('foreColor',foreColor)" />
    </div>
    <!-- Background color <input type="color" v-model="backgroundColor" v-on:change="execCmdWithParam('hiliteColor',backgroundColor)" /> -->

    <div>
      <button class="btn btn-outline-primary" v-on:click="insertImageFromUrl" t="Unesi URL slike"><i class="fa fa-picture-o" aria-hidden="true"></i></button>
      <label ref="imageFromLocal" class="btn btn-outline-primary btn-file image-from-local" t="Unesi sliku">
        <i class="fa fa-file-image-o" aria-hidden="true"></i><input accept="image/*" v-on:change="insertImageFromLocal($event)" type="file" style="display: none;">
      </label>
      <button class="btn btn-outline-primary" v-on:click="execCmd('selectAll')" t="select all">Select all</button>
      <button class="btn btn-outline-primary" v-on:click="imagesToTheRight" t="image to the right">image right</button>
      <button class="btn btn-outline-primary" v-on:click="imagesToTheLeft" t="image to the left">image left</button>
    </div>


  </div>
<!-- ////buttons for iframe -->

<!-- iframe  -->
  <iframe name="textEditor" id="content" class="col-md-12" ref="textEditor" type="text/html"></iframe>
<!-- ////iframe  -->
  <br />
  <!-- insert categories  -->
  <div class="offset-md-1 col-md-12">
    <div id="kategorije" class="form-group">
      <label for="categories">Izaberite kategoriju:</label>
      <select class="form-control" v-model="categoryId" id="categories">
        <option class="option-categories" v-for="kategorija in listaKategorijaG" v-bind:value="kategorija.ktg_id">{{kategorija.ktg_naziv}}</option>
      </select>
    </div>
      <!-- ////insert categories  -->
    <!-- input type tags -->
    <div class="col-md-12" id="input-tags">
      <div id="tagsNotice">
        {{ getTagNotice }}
      </div>
      <div id="ms1" class="tag-ctn  tag-ctn-bootstrap-focus"  name="ms1">
      <div v-on:click="openDropDownMenu($event)" id="tag-trigger-0" class="tag-trigger"><div class="tag-trigger-ico"></div></div>
      <div class="tag-helper " style="display: none;">No suggestions</div>
      <div id="tag-sel-ctn-0" class="tag-sel-ctn">
        <div class="tag-sel-item" v-for="tag in getTags">{{ tag }} <span v-on:click="removeTag(tag)" class="tag-close-btn"></span></div>
        <input type="text" placeholder="Unesite tagove" v-on:keydown="insertTag($event)" id="tag-input-0" v-model="tag"/>
      </div>
      <div id="tag-res-ctn-0" v-if="isDropDownMenuOpen" class="tag-res-ctn" style="width: 400px; height: 87px;">
        <div class="tag-res-item tag-res-item-active" v-on:click="insertRandomTagsToList(randomTag)"  v-bind:class="{ 'tag-res-odd':returnIsDropDownMenuOdd(index) }" v-for="(randomTag,index) in getRandomTags">{{ randomTag.tag_naziv }}</div>
       </div>
      </div>
    </div>
    <!-- dodaj clasu kada je aktivan tag-res-item-active  i tag-res-ctn kada je otvoreno  tag-res-odd   tag-res-item-active-->
    <!-- ////input type tags -->
  </div>

  <br />
  <button class="btn btn-danger sendButton" v-on:click="sendNew">Pošalji vest</button>
</div>
</div>
</div>
<p>
  {{ getNotice }}
</p>


<hr />
<!-- izgled vesti  -->
<div class="row" id="look">
<div id="content" class="offset-md-1 col-md-9">
<div id="title">
  <h1 v-text="title" ref="title"></h1>
</div>
<div id="summary">
  <h6 v-text="summary" ref="summary"></h6>
</div>
<div id="main_image">
  <img v-bind:src="mainImage" ref="mainImage"/>
</div>
<div id="text" ref="textContent" v-html="news">
</div>
</div>
</div>
<!-- ////izgled vesti  -->



<comfirm v-if="seeConfirm" confirmDialogText="Pošalji vest?"></comfirm>
<alert v-if="seeAlert" v-bind:alertDialogText="alertText"></alert>
<div style="display:none;">
{{ getUpdateInsertNew }}
</div>
</div>
</template>

<script>
import {axiosWithBaseUrlOnly} from '@/api/vesti/config.js'
import api from '@/api/vesti/axios_calls.js'
import {mapGetters, mapActions} from 'vuex'
import Confirm from '@/components/vesti/Confirm.vue'
import { bus } from '@/main.js'
import Alert from '@/components/vesti/Alert.vue'

export default {
  components:{
    'comfirm':Confirm,
    'alert':Alert
  },
data : function(){
  return{
    news:'',
    headingValue:'',
    fontName:'',
    foreColor: '',
    backgroundColor:'',
    sourceCode: false,
    title: '',
    summary:'',
    notice: '',
    categoryId:'',
    mainImage: '',
    images: [],
    tags: [],
    tag: '',
    randomTags:[],
    isDropDownMenuOpen: false,
    isDropDownMeniOdd: false,
    tagsNotice: '',
    seeConfirm:false,
    alertText:'',
    seeAlert:false,
    srcImages:[],
    seeCharacterMessage:false

  }
},
computed: {
    ...mapGetters(['listaKategorijaG','getUpdateInsertNew']),
  getNotice: function(){
    return this.notice;
  },
  getTags:function(){
    return this.tags;
  },
  getRandomTags:function(){
    return this.randomTags;
  },
  getIsActive:function(isActive){
    return this.isActive;
  },
  getTagNotice:function(){
    return this.tagsNotice;
  },
  getSummary:function(){
    return this.summary;
  }
},
methods: {
  ...mapActions(['listaKategorijaA']),
    checkSummary:function(event){
    if(this.getSummary.length > 250){
      this.seeCharacterMessage = true;
    }else{
      this.seeCharacterMessage = false;
    }
  },

  //  < insert tags >
  removeTag:function(tag){
      var i;
      for (i=this.tags.length-1; i>=0; i--){
        if (this.tags[i] === tag) {
        this.tags.splice(i, 1);
    }
    }
  },
  closeDropDownMenu: function(){
    if(this.isDropDownMenuOpen === true){
      this.isDropDownMenuOpen = false;
    }
  },
  returnIsDropDownMenuOdd: function(index){
    if(index % 2 == 0){
      return false;
    }else{
      return true;
    }
  },
  takeRandomTags:function(){
    var self = this;
    api.takeRandomTags().then((response)=>{
      self.randomTags = response.data.tags;
    });
  },
  openDropDownMenu: function(event){
    if(this.isDropDownMenuOpen === false){
      this.isDropDownMenuOpen = true;
    }else{
      this.isDropDownMenuOpen = false;
    }

  },
  insertRandomTagsToList: function(randomTag){
    if(this.tags.length > 10){
      this.tagsNotice = "Ne možeš da imaš više od 10 tagova"
    }else{
      var insertOrNot = true;
    var i;
    for (i=this.tags.length-1; i>=0; i--) {
  if (this.tags[i].trim() === randomTag.tag_naziv.trim()) {
    insertOrNot = false;
      this.tagsNotice = 'Ovaj tag već postoji!'
  }
  }
  if(insertOrNot === true){
    var tag1 = randomTag.tag_naziv.trim();
    this.tags.push(tag1);
    var j;
  }
    }

  },
  clearTagsNotice: function(){
    var self = this;
    setTimeout(function(){
      self.tagsNotice = '';
    },3000);
  },
  insertTag:function(event){
    if(this.tags.length > 10){
      this.tagsNotice = "Ne možeš da imaš više od 10 tagova!"
    }else{
      var self = this;
        setTimeout(function(){self.closeDropDownMenu()},500);
      if(event.keyCode === 13){
        var insertOrNot = true;
        var i;
        for (i=this.tags.length-1; i>=0; i--) {
      if (this.tags[i].trim() === this.tag.trim()) {
        insertOrNot = false;
          this.tagsNotice = 'Ovaj tag već postoji!'
      }
      }
      if(insertOrNot === true){
        this.tags.push(this.tag.trim());
        this.tag = '';
      }
      }
    }
    if(event.keyCode === 8 || event.keyCode === 46){
      if(this.tag === ''){
        this.tags.pop();
      }
    }
    this.clearTagsNotice();
  },
  // < ////insert tags >



  showText:function(){
    this.news = textEditor.document.body.innerHTML;
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
  clearAllFields: function(){
    this.news = '';
    this.title = '';
    this.summary = '';
    this.mainImage = '';
    textEditor.document.body.innerHTML = '';

  },
  sendNew: function(){
      var self = this;
      this.seeConfirm = true;
      var textContent = this.$refs.textContent;
    bus.$on('confirm',function(c){
      self.seeConfirm = false;
      if(c === true){


      if(self.categoryId !== '' && self.title !== null && self.title !== '' && self.mainImage !== null && self.mainImage !== ''
      && textContent !== null && self.tags.length > 0){
        console.log(self.mainImage);
        console.log('pera');
        var mainImageBlob;
        if(self.mainImage instanceof Blob){
        }else{
          mainImageBlob = self.dataUrlToBlob(self.mainImage);
        }
        var images = textContent.getElementsByTagName('img');
        var imagesBlob = [];
        var savedImages = [];
        for(var i=0; i < images.length; i++){
          if(images[i].src !== null || images[i].src !== '' || images[i].src !== undefined){
            imagesBlob.push({img:self.dataUrlToBlob(images[i].src)});
            savedImages.push({img:images[i].src});
            images[i].src = '';
          }
        }


        var formData = new FormData();

        var sid = localStorage.getItem('sid');
        for(var x=0; x<imagesBlob.length; x++){
          formData.append('images[]', imagesBlob[x].img);
        }
        var y;
        for(y=0; y<self.tags.length;y++){
          formData.append('tags[]',self.tags[y]);
        }
        formData.append('mainImage', mainImageBlob);
        formData.append('title', self.title);
        formData.append('summary', self.summary);
        formData.append('text', textContent.innerHTML);
        formData.append('categoryId', self.categoryId);
        formData.append('sid',sid);

// send new or update new depends on algoritmChange
        if(self.$store.getters.getAlgoritmChange === true){
          formData.append('temaId',self.$store.getters.getTemaId);
          api.changeNew(formData).then((response)=>{
            if(response.data.result === 'ok'){
              self.clearAllFields();
            }else{
              var img = textContent.getElementsByTagName('img');
              for(var p = 0; p < savedImages.length; p++){
                img[p].src = savedImages[p].img;
              }
            }
            self.alertText = response.data.notice;
            self.seeAlert = true;
            bus.$on('alert',function(){
              self.seeAlert = false;
            });
          });
          self.notice = "Vest se šalje...";
        }else{
          api.insertNew(formData).then((response)=>{
            if(response.data.result === 'ok'){
              self.clearAllFields();
            }else{
              var img = textContent.getElementsByTagName('img');
              for(var p = 0; p < savedImages.length; p++){
                img[p].src = savedImages[p].img;
              }
            }
            self.alertText = response.data.notice;
            self.seeAlert = true;
            bus.$on('alert',function(){
              self.seeAlert = false;
            });

          });
          self.notice = "Vest se šalje...";
        }

     }else{
       self.alertText = "Nisi uneo sve podatke, ili je neka od slika prevelika!"
       self.seeAlert = true;
       bus.$on('alert',function(c){
         self.seeAlert = false;
       });
    }
    }
    });
  },
  enableDesignMode: function(){
    if(this.$refs.textEditor.contentWindow !== undefined && this.$refs.textEditor.contentWindow !== null){
      this.$refs.textEditor.contentWindow.document.designMode = "On";
    }
  },
  execCmd: function(command){
    textEditor.document.execCommand(command,false,null);
  },
  execCmdWithParam:function(command,param){
    textEditor.document.execCommand(command,false,param);
  },
  seeContent: function(){
    this.news = textEditor.document.body.innerHTML;
  },
  checkURL: function(str){
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
  insertLink: function(){
    var link = prompt('Insert link','');
    if(link !== null && link !== undefined && this.checkURL(link)){
      textEditor.document.execCommand('createLink',false, link);
    }

  },
  insertImageFromUrl: function(){
    var img = prompt('Insert image URL','');
    if(img !== null && img !== ''){
      textEditor.document.execCommand('insertImage',false, img);
      this.seeContent();
    }
  },  insertImageFromLocal: function(event){
      var file = event.target.files[0];
      var imageFL = this.$refs.imageFromLocal;
      var input = imageFL.getElementsByTagName('input')[0];
      imageFL.innerText = file.name;
      imageFL.appendChild(input);
      if(event.target.files.length > 0 && file.size <= 5*1024*1024){
        var img = textEditor.document.createElement('img');

        var fr = new FileReader();
        fr.onload = function(event2){
          img.src = event2.target.result;
        }
        fr.readAsDataURL(file);
        textEditor.document.body.appendChild(img);
      }
    },
  toggleSource:function(){
    if(this.sourceCode){
      textEditor.document.body.innerHTML = textEditor.document.body.textContent;
      var images1 = textEditor.document.getElementsByTagName('img');
    for(var j = 0; j < images1.length; j++){
      images1[j].src = this.srcImages[j];
      }
      this.sourceCode = false;
          this.srcImages = [];
    }else{
      var images = textEditor.document.getElementsByTagName('img');
      for (var i = 0; i < images.length; i++) {
        var src = images[i].src;
        this.srcImages.push(src);
        images[i].src = "";
        }
      textEditor.document.body.textContent = textEditor.document.body.innerHTML;
    this.sourceCode = true;

}
},
  toggleEdit:function(){
    if(textEditor.document.designMode == "on"){
      textEditor.document.designMode = "off";
    }else if(textEditor.document.designMode == "off"){
      textEditor.document.designMode = "on";
    }
    if(textEditor.document.body.innerHTML == ""){
      textEditor.document.body.innerHTML = this.news;
      this.changeIFrameBody();
    }
  },

  imagesToTheLeft:function(){
    var images = textEditor.document.getElementsByTagName('img');
    for(var i = 0; i < images.length; i++){
      images[i].style = "float:left; margin:10px 30px 10px 0px;";
    }
  },
  imagesToTheRight: function(){
    var images = textEditor.document.getElementsByTagName('img');
    for(var i = 0; i < images.length; i++){
      images[i].style = "float:right; margin:10px 0px 10px 30px;";
    }
  },
  changeIFrameBody: function(){
    if(textEditor !== null && textEditor !== undefined){

      var a = textEditor.HTMLIFrameElement;

      var self = this;
      textEditor.document.body.style="width:790px; word-wrap:break-word;";
      textEditor.document.designMode = "on";
      var te = textEditor.document.body;
    var observer = new MutationObserver(function(mutations){
      mutations.forEach(function(mutation){
      self.seeContent();
      });
    });
    var config = { childList:true, characterData:true, attributes:true, subtree:true};
    observer.observe(te,config);
    }
  },
  takeMainImage: function(event){
    var file = event.target.files[0];

    var img = this.$refs.mainImageLabel;
    var input = img.getElementsByTagName('input')[0];
    img.innerText = file.name;
    img.appendChild(input);
    if(event.target.files.length > 0 && file.size <= 5*1024*1024){

      var fr = new FileReader();
      var self = this;
      fr.onload = function(event2){
        self.mainImage = event2.target.result;
      }
      fr.readAsDataURL(file);
    }
  },
  takeMainImageFromDB:function(temaId){
    var self = this;
    var params = {
  temaId:temaId
  }
  var slika;
  api.takeMainImageFromDBForChangeNew(params).then((response)=>{
      self.mainImage = 'data:text/plain;base64,'+response.data.result;
  });
  },
  doAlgoritmChangeNew:function(){ /* function to call when new need to be changed on mounted and updated - fills title, summary, text content, main image
    if false clear all fields*/
    var self = this;
    if(this.$store.getters.getAlgoritmChange === true){
      this.clearAllFields();
      var params = {
        temaId:this.$store.getters.getTemaId
      }

      api.takeImagesOnly(params).then((response)=>{
        if(response.data.result !== undefined){
            var te = textEditor.document.body;
          var observer = new MutationObserver(function(mutations){
            mutations.forEach(function(mutation){
            var images = textEditor.document.getElementsByTagName('img');
            var i;
            for(i=0; i<images.length; i++){
              images[i].src = 'data:text/plain;base64,' + response.data.result[i].slk_slika;
            }
            self.seeContent();
            });
          });

          var config = { childList:true, characterData:false, attributes:false, subtree:true};
          observer.observe(te,config);
        }
        self.takeMainImageFromDB(self.$store.getters.getTemaId);
        self.title = self.$store.getters.getTitle;
        self.summary = self.$store.getters.getSummary;
        textEditor.document.body.innerHTML = self.$store.getters.getText;
      });

    }else{
      self.title = '';
      self.summary = '';
      textEditor.document.body.innerHTML = '';
      self.news = '';
    }
  }
},

mounted:function(){
this.enableDesignMode();
  this.changeIFrameBody();
  this.$store.dispatch('listaKategorijaA');
  this.takeRandomTags();
  this.doAlgoritmChangeNew();

},
created:function(){
  var self = this;
  bus.$on('returnDesignModeAndText',function(){
    self.doAlgoritmChangeNew();
  });
},
updated:function(){
    if(textEditor.document.designMode = "off"){
      this.toggleEdit();
    }
}
}
</script>

<style scoped>
#wrapper{
  background-color: white;
}

#heading{
  width: 50px;
}

#buttons{
}
.option-categories{
  color:rgb(50, 38, 14);
}
#categories{
  min-width: 250px;
  max-width:400px;
}

.naslov{
  margin-top:50px;
}

.naslov p{
  margin:10px 0 0;
  font-size: 18px;
  padding: 10px 0 0 10px;
}

.naslov input[type=text]{
  padding:5px;

}
.image-from-local{
  cursor:pointer;
}
#text{
  margin-top:20px;
}

#import{
}
.imports{
  margin: 10px;
  width: 500px;
border-radius: 5px;
}
button {
cursor:pointer;
color:rgba(107, 86, 58,0.8);
border-color:rgba(107, 86, 58,0.8);
display:inline-block;
margin:0 0 0 0;
font-size: 11px;
margin-top: 5px;
}

#text_editor{
  /*width: 1000px;
  height: 500px;*/
vertical-align: inherit;

}

button:hover {
    position: relative;
}

button[t]:hover:after {
     content: attr(t);
     padding: 4px 8px;
     position: absolute;
     left: 0%;
     top: 200%;
     white-space: nowrap;
     z-index: 20;
     background:white;
     color:rgb(92, 81, 57);
     border-radius:4px;
     font-size:1.2em;
}
#look{
  display:block;
}
.div-select{
  display:inline;
border: 1px ridge gray;
border-radius: 5px;
padding: 9px 9px 9px 9px;
}

.select{
  margin-top:10px;
  margin-left:5px;
  margin-left:5px;
  width:170px;
  padding: 0 0 0 0;
  display:inline;
  cursor:pointer;
}
.options{
  cursor:pointer;

}
#content{
  height: 500px;
  padding: 10px 10px 10px 10px;
  display: block;
  word-wrap: break-word;
}
.sendButton{
  float:right;
  font-size:14px;
  color:rgba(193, 232, 110, 0.8);
}
.contentButtons{
  font-size:14px;
}

input{
  cursor:pointer;
}

label:hover {
    position: relative;
}

label[t]:hover:after {
     content: attr(t);
     padding: 4px 8px;
     position: absolute;
     left: 0%;
     top: 200%;
     white-space: nowrap;
     z-index:20;
     background:white;
     color:rgb(92, 81, 57);
     border-radius:4px;
     font-size:0.9em;
}

@media screen and (max-device-width: 375px) and (max-device-height: 665px){
  button{
    width:200px;
    height:35px;
    background-color: red;
  }
  .container{
    margin-left:0px;
    margin-right:0px;
    width:100%;
    max-width: 100%;
  }

}






#ms1{
  width: 400px;
}


#input-tags{
padding:0 0 0 0;
}


.tag-ctn{
    position: relative;
    padding: 0;
    margin-bottom: 0px;
    font-size: 14px;
    line-height: 20px;
    color: #555555;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
    -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
    -o-transition: border linear 0.2s, box-shadow linear 0.2s;
    transition: border linear 0.2s, box-shadow linear 0.2s;
    cursor: default;
    display: block;
}
.tag-ctn-invalid{
    border: 1px solid #CC0000;
}
.tag-ctn-readonly{
    cursor: pointer;
}
.tag-ctn-disabled{
    cursor: not-allowed;
    background-color: #eeeeee;
}
.tag-ctn-bootstrap-focus,
.tag-ctn-bootstrap-focus .tag-res-ctn{
    border-color: rgba(82, 168, 236, 0.8) !important;
    /* IE6-9 */
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6) !important;
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6) !important;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6) !important;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.tag-ctn input{
    border: 0;
    box-shadow: none;
    -webkit-transition: none;
    outline: none;
    display: block;
    padding: 4px 6px;
    line-height: normal;
    overflow: hidden;
    height: auto;
    border-radius: 0;
    float: left;
    margin: 2px 0 2px 2px;
}
.tag-ctn-disabled input{
    cursor: not-allowed;
    background-color: #eeeeee;
}
.tag-ctn .tag-input-readonly{
    cursor: pointer;
}
.tag-ctn .tag-empty-text{
    color: #DDD;
}
.tag-ctn input:focus{
    border: 0;
    box-shadow: none;
    -webkit-transition: none;
    background: #FFF;
}
.tag-ctn .tag-trigger{
    float: right;
    width: 27px;
    height:100%;
    position:absolute;
    right:0;
    border-left: 1px solid #CCC;
    background: #EEE;
    cursor: pointer;
}
.tag-ctn .tag-trigger .tag-trigger-ico {
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: top;
    border-top: 4px solid gray;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    content: "";
    margin-left: 9px;
    margin-top: 13px;
}
.tag-ctn .tag-trigger:hover{
    background: -moz-linear-gradient(100% 100% 90deg, #e3e3e3, #f1f1f1);
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#f1f1f1), to(#e3e3e3));
}
.tag-ctn .tag-trigger:hover .tag-trigger-ico{
    background-position: 0 -4px;
}
.tag-ctn-disabled .tag-trigger{
    cursor: not-allowed;
    background-color: #eeeeee;
}
.tag-ctn-bootstrap-focus{
    border-bottom: 1px solid #CCC;
}
.tag-res-ctn{
    position: relative;
    background: #FFF;
    overflow-y: auto;
    z-index: 9999;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    border: 1px solid #CCC;
    left: -1px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
    -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
    -o-transition: border linear 0.2s, box-shadow linear 0.2s;
    transition: border linear 0.2s, box-shadow linear 0.2s;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.tag-res-ctn .tag-res-group{
    line-height: 23px;
    text-align: left;
    padding: 2px 5px;
    font-weight: bold;
    border-bottom: 1px dotted #CCC;
    border-top: 1px solid #CCC;
    background: #f3edff;
    color: #333;
}
.tag-res-ctn .tag-res-item{
    line-height: 25px;
    text-align: left;
    padding: 2px 5px;
    color: #666;
    cursor: pointer;
}
.tag-res-ctn .tag-res-item-grouped{
    padding-left: 15px;
}
.tag-res-ctn .tag-res-odd{
    background: #F3F3F3;
}
.tag-res-ctn {

}
.tag-res-item-active:hover{
  background-color: #3875D7;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3875D7', endColorstr='#2A62BC', GradientType=0 );
  background-image: -webkit-gradient(linear, 0 0, 0 100%, color-stop(20%, #3875D7), color-stop(90%, #2A62BC));
  background-image: -webkit-linear-gradient(top, #3875D7 20%, #2A62BC 90%);
  background-image: -moz-linear-gradient(top, #3875D7 20%, #2A62BC 90%);
  background-image: -o-linear-gradient(top, #3875D7 20%, #2A62BC 90%);
  background-image: linear-gradient(#3875D7 20%, #2A62BC 90%);
  color: #fff;
}
.tag-sel-ctn{
    overflow: auto;
    line-height: 22px;
    padding-right:27px;
}
.tag-sel-ctn .tag-sel-item{
    background: #555;
    color: #EEE;
    float: left;
    font-size: 12px;
    padding: 0 5px;
    border-radius: 3px;
    margin-left: 5px;
    margin-top: 4px;
}
.tag-sel-ctn .tag-sel-text{
    background: #FFF;
    color: #666;
    padding-right: 0;
    margin-left: 0;
    font-size: 14px;
    font-weight: normal;
}
.tag-res-ctn .tag-res-item em{
    font-style: normal;
    background: #565656;
    color: #FFF;
}
.tag-sel-ctn .tag-sel-item:hover{
    background: #565656;
}
.tag-sel-ctn .tag-sel-text:hover{
    background: #FFF;
}
.tag-sel-ctn .tag-sel-item-active{
    border: 1px solid red;
    background: #757575;
}

.tag-ctn .tag-sel-ctn .tag-sel-item{
    margin-top: 3px;
}
.tag-stacked .tag-sel-item{
    float: inherit;
}
.tag-sel-ctn .tag-sel-item .tag-close-btn{
    width: 7px;
    cursor: pointer;
    height: 7px;
    float: right;
    margin: 8px 2px 0 10px;
    background-image:url(data:image/png;base64,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);

}
.tag-sel-ctn .tag-sel-item .tag-close-btn:hover{
    background-position: 0 -7px;
}
.tag-helper{
    color: #AAA;
    font-size: 10px;
    position: absolute;
    top: -17px;
    right: 0;
}




</style>
