<template>
         <div class="modal">
           <div class="modal-content">
             <span class="close" v-on:click="cancel">&times;</span>
             <hr/>
             <div id="content-text">
               <p>
                 {{confirmDialogText}}
               </p>
             </div>
             <hr/>
             <div class="buttons">
               <button class="btn btn-primary" v-on:click="confirm">Potvrdi</button><button class="btn btn-primary" v-on:click="cancel">Otkaži</button>
             </div>
           </div>
         </div>
</template>

<script>

import { bus } from '@/main.js'

export default {
props:{
  confirmDialogText:String
},
methods:{
  confirm:function(){
    bus.$emit('confirm',true);
  },
  cancel:function(){
    bus.$emit('confirm',false);
  }
}


}
</script>

<style scoped>
.modal {
    word-wrap:break-word;
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 80%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    overflow: hidden;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
button{
margin-right: 20px;
cursor:pointer;
width: 150px;
cursor:pointer;
background-color:rgba(170, 155, 112,0.7);
color:black;

}
button:hover{
  cursor:pointer;
  background-color:rgba(51, 35, 7, 0.82);
  color:rgba(161, 160, 139,0.8);
}
.buttons{
  margin-left: 200px;
}
#content-text{
  margin:auto;
  text-align:center;
  margin-right: 50px;
  font-size:20px;
}


</style>
