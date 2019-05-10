import Vue from 'vue';

export default {

  categoryShowM:(state,params)=>{
    state.kat_f = params.result;
  },
  saljiImeKatM:(state,params)=>{
    state.kat_ime_f = params;
  },
  temaShowM:(state,params)=>{
    state.teme_f = {};
    state.teme_f = params.result;
    if(params.count){
      state.brPrikaza_f = params.count.brTema;
    }
  },
  dodajFilter:(state,params)=>{
    state.filter_f = params;
  },
  dodajLimit:(state,params)=>{
    state.strana_f = params;
  },
  showCommM:(state,params)=>{
    var response = params.result;
    response.forEach((row)=>{
      row.flag = false;
    })
    if(params.count){
      state.brPrikaza_f = params.count.brTema;
    }
    state.komentari_f = {};
    state.komentari_f = response;

  },

  updateCommM:(state,params)=>{
    if(params.pst_ref_id===null){
      var flag;
      for(var i = 0; i < state.komentari_f.length; i++){
        if(state.komentari_f[i].pst_id === params.pst_id){
          var newValue = Object.assign(params,{flag:state.komentari_f[i].flag});
          Vue.set(state.komentari_f,i,newValue);

        }
      }
    }
    else{
      for(var i = 0; i < state.replies_f[params.pst_ref_id].length; i++){
        if(state.replies_f[params.pst_ref_id][i].pst_id === params.pst_id){
          Vue.set(state.replies_f[params.pst_ref_id],i,params);

        }
      }
    }
  },
  updateTemaM:(state,params)=>{
        Vue.set(state.teme_f,0,params.result[0]);
  },
  listaTemaM_F: function(state,params){
      state.teme_F = params;

  },
  listaKorisnikaM_F: function(state,params){
    state.korisnici_F = params;
  },
  listaKorisnikaM2_F: function(state,params){
    for(var i = 0; i<state.korisnici_F.length; i++){
      if(state.korisnici_F[i].osb_id == params){

      //  state.korisnici[i].osb_nalog_prijava = 0;
        //this.$set(state.korsinici[i],'osb_nalog_prijava',0);

        state.korisnici_F.splice(state.korisnici_F[i],1);
      }
    }
  },
  oznaciKorisnikaOkM_F: function(state,params){
    for(var i = 0; i<state.sviKorisnici_F.length; i++){
      if(state.sviKorisnici_F[i].osb_id == params){
        state.sviKorisnici_F[i].osb_nalog_prijava = 0;
      }
    }
  },
  blokirajKorisnikaM_F: function(state,params){
    for(var i = 0; i<state.sviKorisnici_F.length; i++){
      if(state.sviKorisnici_F[i].osb_id == params){
        state.sviKorisnici_F[i].osb_nalog_prijava = 2;
      }
    }
  },
  vratiKorisnikaUZivotM_F: function(state,params){
    for(var i = 0; i<state.sviKorisnici_F.length; i++){
      if(state.sviKorisnici_F[i].osb_id == params){
        state.sviKorisnici_F[i].osb_nalog_prijava = 0;
      }
    }
  },
  pretraziKorisnikeM_F: function(state,params){
    state.korisniciSearch_F = params;
  },
  blokirajKorisnikaSearchM_F: function(state,params){
    for(var i = 0; i<state.korisniciSearch_F.length; i++){
      if(state.korisniciSearch_F[i].osb_id == params){
        state.korisniciSearch_F[i].osb_nalog_prijava = 2;
      }
    }
  },
  oznaciKorisnikaOkSearchM_F: function(state,params){
    for(var i = 0; i<state.korisniciSearch_F.length; i++){
      if(state.korisniciSearch_F[i].osb_id == params){
        state.korisniciSearch_F[i].osb_nalog_prijava = 0;

      }
    }
  },
  vratiKorisnikaSearchUZivotM_F: function(state,params){
    for(var i = 0; i<state.korisniciSearch_F.length; i++){
      if(state.korisniciSearch_F[i].osb_id == params){
        state.korisniciSearch_F[i].osb_nalog_prijava = 0;

      }
    }
  },
  postaviModeratoraM_F: function(state,params){

    for(var i = 0; i<state.sviKorisnici_F.length; i++){
      if(state.sviKorisnici_F[i].osb_id == params){
        state.sviKorisnici_F[i].osb_nalog_prijava = 3;
      }
    }
  },
  sviKorisniciM_F: function(state,params){
    for(var i = 0; i<params.length; i++){
      state.sviKorisnici_F.push(params[i]);
    }
  },
  sviKorisniciSmanji_F: function(state,params){
    var start = params.start;
    var niz = state.sviKorisnici_F;
     var n =  niz.slice(0,start);
     state.sviKorisnici_F = n;
  },
  prijavljeniKomentariM_F: function(state,params){
    state.prijavljeniKomentari_F = params;
  },
  showRepliesM: function(state,params){
    Vue.set(state.replies_f,params.id,params.result);/*punjenje objekta sa odgovrorima na komentar po kljucem id-a komentara na koji se odgovara*/
    //state.replies_f[params.id] = params.result; nece da moze ovako!
  },
  listaKategorijaM_F: function(state,params){
    state.listaKategorija_F = params;
  },
  sviKomentariKorisnikaM_F: function(state,params){
      state.sviKomentariKorisnika_F = params;
  },
  SviKomentariSvihKorisnikaM_F: function(state,params){
      state.SviKomentariSvihKorisnika_F = params;
  },
  resetParamsM_F: function(state){

    state.sviKorisnici_F = [];
  },
  usersLikesM: function(state,params){
    console.log('params',params);
    // var userLikes = {};
    // userLikes.pst_id = [];
    // userLikes.tma_id =[];
    // params.forEach((param)=>{
    //   if(param.tma_id !== undefined){
    //     userLikes.tma_id.push(param.tma_id);
    //
    //     console.log('dunjaaa',userLikes);
    //   }else{
    //     this.userLikes.pst_id.push(param.pst_id);
    //   }
    // });
    // state.usersLikes_F = userLikes;
    // console.log(state.userLikes_F);
    var niz1 = [];
    var niz2 = [];
    params.tema_id.forEach((param1)=>{
      // state.usersLikes_tema.push(param1.tma_id);
      niz1.push(param1.tma_id);
    });
    params.post_id.forEach((param2)=>{
      // state.usersLikes_post.push(param2.pst_id);
      niz2.push(param2.pst_id);
    });

    state.usersLikes_tema = niz1;
    state.usersLikes_post = niz2;
    console.log('tema',state.usersLikes_tema);
    console.log('post',state.usersLikes_post);
  },
  updateLikesM: function(state,params){
    if(params.pst_id){
      var check = state.usersLikes_post.indexOf(params.pst_id);
      console.log('njaaaaa',check);
      if(check !== -1){
        Vue.delete(state.usersLikes_post, check, params.pst_id);
      }
      else{
        Vue.set(state.usersLikes_post,(state.usersLikes_post.length), params.pst_id);
      }
      check = '';
    }
    else if(params.id){
      var check = state.usersLikes_tema.indexOf(params.id);
      console.log('njaaaaa123',check);
      if(check !== -1){
        Vue.delete(state.usersLikes_tema, check, params.id);
      }
      else{
        Vue.set(state.usersLikes_tema,(state.usersLikes_tema.length), params.id);
      }
      check = '';
    }
  }
}
