import Vue from 'vue'
import Router from 'vue-router'
import {routes0} from './vesti_forum/routes0.js'
import {routes1} from './vesti/routes1.js'
import {routes2} from './forum/routes2.js'

Vue.use(Router)

var routes = routes0.concat(routes1,routes2);

export default new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
})
