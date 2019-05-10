import router from '../../router/router.js';
import {bus} from '../../main.js';


export default {
  registerMutation(state,param){
    if(param.ok){
      //alert(param.ok);
      router.push('/login');
    }
    else {
      alert(param.error);
    }

  },
  loginMutation(state, param){
    state.log.ulogovan = !state.log.ulogovan;
    state.log.korisnik = param.user;
    if(param.ok){
      console.log(router);
      //alert(param.ok);
      router.go(-1);
      // router.push('/forum');
    }
  },
  logoutMutation(state, params){
      state.log.ulogovan = params.loged;
      state.log.korisnik = '';
      state.usersLikes_tema = [];
      state.usersLikes_post = [];
      if(params.path.search('/forum') !== -1){
        router.push('/forum')
      }
      else if(params.path.search('/cms-autor') !== -1){
        router.push('/login')
      }else{
        router.push('/');
      }
  },
  proveriKorisnikaMutation(state, param){
      state.log.ulogovan = param;
      state.log.korisnik = localStorage.getItem('user');
  },
  izlistajPorukeMutation(state, response){
    state.poruka = response;
    // state.senders = response.senders;

  },
  novePorukeMutation(state, response){
    console.log(response);
    state.porukeNove = response;
  },
  awwardsMutation(state, response){
    // //moze da se iskoristi na drugim mestima
    // state.awwardsParam.numLikes = response.likes;
    // state.awwardsParam.numViews = response.views;
    //
    var likes = response.likes;
    var views = response.views;
    //LIKES
    if(likes>=0 && likes<=10){
      //REALNI OPTIMISTA
      state.awwardUserLikes = '../../../static/awards/realni.png';
    }
    else if(likes>10 && likes<=50){
      //RETKI OPTIMISTA
      state.awwardUserLikes = '../../../static/awards/retki.png';
    }
    else if(likes>50 && likes<=500){
      //MISTICNI OPTIMISTA
      state.awwardUserLikes = '../../../static/awards/misticni.png';
    }
    else if(likes>500 && likes<=1000){
      //LEGENDARNI OPTIMISTA
      state.awwardUserLikes = '../../../static/awards/legendarni.png';
    }
    else if(likes>1000){
      //BESMRTNI OPTIMISTA
      state.awwardUserLikes = '../../../static/awards/besmrtni.png';
    }
    //End LIKES
    //VIEWS
    if(views>=0 && views<=10){
      //REALNI OPTIMISTA
      state.awwardUserViews = '../../../static/awards/realni.png';
    }
    else if(views>10 && views<=50){
      //RETKI OPTIMISTA
      state.awwardUserViews = '../../../static/awards/retki.png';
    }
    else if(views>50 && views<=500){
      //MISTICNI OPTIMISTA
      state.awwardUserViews = '../../../static/awards/misticni.png';
    }
    else if(views>500 && views<=1000){
      //LEGENDARNI OPTIMISTA
      state.awwardUserViews = '../../../static/awards/legendarni.png';
    }
    else if(views>1000){
      //BESMRTNI OPTIMISTA
      state.awwardUserViews = '../../../static/awards/besmrtni.png';
    }
    //END VIEWS
  },

  takeReturnPath:function(state,params){
    state.returnPath = params.returnPath;
  }
}
