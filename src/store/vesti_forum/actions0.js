// import {store} from '../store.js';
import api from '../../api/vesti_forum/axios_calls.js';
import sha256 from 'sha256';
import {bus} from '../../main.js';
import router from '../../router/router.js';

export default{

  registerAction({commit},user){
    var specialCar = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    if(user.sifra == user.ponsifra){
      if(specialCar.test(user.korime) && specialCar.test(user.ime) && specialCar.test(user.prezime)){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
          api.registerApi(user).then(function(response){
          commit('registerMutation', response.data);
          });
        }
        else{

          alert('LICE NIJE TI DOBRA E-MAIL ADRESA!');
        }
      }
      else {
        alert('LICE SRAM TE BILO STA PISES U POLJE ZA IME, JEL SI RETARDIRAN?');
      }
    }
    else {
      alert('LICE NIJE DOBRA SIFRA!');
    }
  },
  loginAction({commit},user){
    api.loginApi(user).then(function(response){
      //console.log(response.data);
      localStorage.setItem('sid', response.data.sid);
      localStorage.setItem('user', response.data.user);
      //bus.$emit('sessionUser', response.data.user);
      commit('loginMutation', response.data);
    })
  },
  logoutAction({commit},params){
      api.logoutApi(params).then((response)=>{
        localStorage.removeItem('sid');
        localStorage.removeItem('user');
        var params1 = {
          path: params.path,
          loged:response.data.status
        }
        commit('logoutMutation', params1);
      });

  },
  proveriKorisnikaAction({commit}, sid){
      if(sid){
        api.proveriKorisnikaApi(sid).then(function(response){

          commit('proveriKorisnikaMutation', response.data.status);
        });
      }
    },
    izlistajPorukeAction({commit}){
      api.izlistajPorukeApi(localStorage.getItem('sid')).then(function(response){


        if(response.data.poruka == 'greska'){
          alert('greska');
        }
        else {
          response.data.poruka.forEach((element)=>{
          element.prikazi=false;
          element.procitajPor='procitaj poruku';
          if(element.por_status == 0){
            element.procitana= '';
          }
          else {
            element.procitana= 'background-color: rgba(40, 88, 142, 0.8);';
          }
        })
        commit('izlistajPorukeMutation',response.data.poruka);
        }
      })
    },
    obrisiPorukuAction(context,por_id){
      var param = {
        porId: por_id,
        sid: localStorage.getItem('sid')
      }
      api.obrisiPorukuApi(param).then(function(response){

        context.dispatch('izlistajPorukeAction');
      })
    },
    procitajPorukuAction(context,por_id){
      var param = {
        porId: por_id,
        sid: localStorage.getItem('sid')
      }
      api.procitajPorukuApi(param).then(function(response){

      })
    },
    posaljiPorukuAction(context,param){
      api.posaljiPorukuApi(param).then(function(response){
        bus.$emit('odgovorPosaljiPoruku', response.data.status);
      })
    },
    novePorukeAction({commit}, sid){
      api.novePorukeApi(sid).then(function(response){
        commit('novePorukeMutation', response.data.ok);
      })
  },
  awwardsAction({commit}, user){
    api.awwardsApi(user).then(function(response){
      commit('awwardsMutation',response.data );
    })
  },
  takeReturnPath:function(context,params){
    context.commit('takeReturnPath',params);
  }
}
