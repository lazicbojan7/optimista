// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router/router.js';
import {store} from './store/store.js';
import style from '../style.css';
import Nav from './components/forum/Nav.vue';
import Footer from './components/forum/Footer.vue';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import * as pagination from "vuejs-uib-pagination";

export const bus = new Vue();

Vue.filter('dateToString',(date)=>{
      var datum = Date.parse(String(date));
      var seconds = Math.floor((new Date() - datum) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        if(interval==2){
        return  "pre godinu dana";
        }
        else if (interval>2&&interval<5){
          return "pre " + interval + " godine";
        }
        else{
          return "pre " + interval + " godina";
        }
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        if(interval==2){
          return  "pre mesec dana";
        }
        else if (interval>2&&interval<5){
          return 'pre '+ interval +' meseca';
        }
        else{
          return 'pre ' + interval + " meseci";
        }
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        if(interval===2){
          return  "juče";
        }
        else if (interval==3){
          return 'prekjuče';
        }
        else if (interval>2&&interval<7){
          return 'pre '+interval+' dana';
        }
        else if (interval>7&&interval<14){
          return 'pre nedelju dana';
        }
        else if (interval>13&&interval<21){
          return 'pre 2 nedelje';
        }
        else if (interval>20&&interval<28){
          return 'pre 3 nedelje';
        }
        else if (interval>27){
          return 'pre 2 meseca';
        }
        else{
          return 'pre ' + interval + " dana";
        }
      }
      var a= [2,3,4,22,23];
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        if(interval==2){
          return  "pre sat vremena";
        }
        else if (interval>23){
          return 'juče';
        }
        else if (a.indexOf(interval)!=-1){

          return 'pre '+interval+' sata';
        }
        else {
        return 'pre ' + interval + " sati";
      }
    }
      interval = Math.floor(seconds / 60);
      var twoInEachTen = [21,31,41,51];
      if (interval > 1) {
        if(interval==2){
          return  "pre minut";
        }
        else if (twoInEachTen.indexOf(interval)!=-1){
          return 'pre '+interval+' minut';
        }
        else if(interval > 59){
          return "pre sat vremena";
        }
        else {

        return 'pre ' + interval + " minuta";
      }

      return "pre" + interval + "sekundi";
    }
    else { return "upravo"; }
  });

Vue.use(pagination);
Vue.config.productionTip = false

Vue.component('app-nav', Nav);
Vue.component('app-footer', Footer);


Vue.filter('dateTrans', function(value){
  if(value !== undefined){
    var data = value.split(" ");
    var d = data[0];
    var transformed= d.split("-").reverse().join(' - ');
    return transformed;
  }else{
    return '';
  }
});



/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  pagination,
  template: '<App/>',
  components: { App }
})
