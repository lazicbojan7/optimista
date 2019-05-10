import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


import {state0} from './vesti_forum/state0.js'
import {state1} from './vesti/state1.js'
import {state2} from './forum/state2.js'

import getters0 from './vesti_forum/getters0.js'
import getters1 from './vesti/getters1.js'
import getters2 from './forum/getters2.js'

import mutations0 from './vesti_forum/mutations0.js'
import mutations1 from './vesti/mutations1.js'
import mutations2 from './forum/mutations2.js'

import actions0 from './vesti_forum/actions0.js'
import actions1 from './vesti/actions1.js'
import actions2 from './forum/actions2.js'

Vue.use(Vuex);

const state = Object.assign(state0,state1,state2);

var getters = Object.assign(getters0,getters1,getters2);

var mutations = Object.assign(mutations0,mutations1,mutations2);

var actions = Object.assign(actions0,actions1,actions2);


export const store = new Vuex.Store({
  state : state,
  getters : getters,
  mutations : mutations,
  actions : actions

});
