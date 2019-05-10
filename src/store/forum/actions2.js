import api from '@/api/forum/axios_calls.js'
export default{

  categoryShowA:({commit},params)=>{
    api.takeCategoriesApi(params).then((response)=>{
      commit('categoryShowM',response.data);
    });
  },
  saljiImeKatA:({commit},params)=>{
    commit('saljiImeKatM',params);
  },
  temaShowA:(context,params)=>{
    if(params.strana){                                 //ako nije proslednjena strana ne postoji razlog zasto bi ostao taj parametar u store-u
      context.commit('dodajLimit',params.strana);
    }
    else{
      context.commit('dodajLimit',0);
    }
    api.temaShowApi(params).then((response)=>{
      context.commit('temaShowM',response.data);
    })
  },
  dodajFilterA:(context,params)=>{
    context.commit('dodajFilter',params);
  },
  likeTemaA:(context,params)=>{
    params.filter = context.state.filter_f;
    params.strana = context.state.strana_f;
    context.commit('updateLikesM',params);
    api.likeTemaApi(params.id).then((response)=>{
      api.temaShowApi(params).then((response)=>{
        context.commit('temaShowM',response.data);
      });
    });
  },
  PageTemaA:(context,params)=>{
    params.filter = context.state.filter_f;
    params.strana = context.state.strana_f;
    api.likeTemaApi(params.id).then((response)=>{
      api.temaShowApi(params).then((response)=>{
        context.commit('temaShowM',response.data);
      });
    });
  },
  showCommA:(context,params)=>{
    if(params.strana){                                 //ako nije proslednjena strana ne postoji razlog zasto bi ostao taj parametar u store-u
      context.commit('dodajLimit',params.strana);
    }
    else{
      context.commit('dodajLimit',0);
    }
    api.showCommApi(params).then((response)=>{
      context.commit('showCommM',response.data);

    })
  },
  updateCommA:({commit},params)=>{
    api.updateCommApi(params).then((response)=>{
      commit('updateCommM',response.data.result);
    })
  },
  showRepliesA:({commit},params)=>{
    api.showRepliesApi(params).then((response)=>{
      commit('showRepliesM',response.data);

    })
  },
  sendFirstCommA:({commit},params)=>{
    api.sendFirstCommApi(params).then((response1)=>{
      api.showCommApi(params).then((response2)=>{
        commit('showCommM',response2.data);
        api.updateTemaApi(params.tma_id).then((response4)=>{
          commit('updateTemaM',response4.data);
        })
      })
    })
  },
  sendCommA:({commit},params)=>{
    api.sendCommApi(params).then((response1)=>{
      api.showRepliesApi(params.pst_id).then((response2)=>{
        commit('showRepliesM',response2.data);
        api.updateCommApi(params.pst_id).then((response3)=>{
          commit('updateCommM',response3.data.result);
          api.updateTemaApi(params.tma_id).then((response4)=>{
            commit('updateTemaM',response4.data);
          })
        })
      })
    });

  },
  likeReplyA:({commit},params)=>{

      commit('updateLikesM',params);
    api.likeReplyApi(params.pst_id).then((response)=>{
      if(params.pst_ref_id===null){
        api.updateCommApi(params.pst_id).then((response)=>{
          commit('updateCommM',response.data.result);
        })
      }
      else{
        api.showRepliesApi(params.pst_ref_id).then((response2)=>{
          commit('showRepliesM',response2.data);
        })
      }
    });
  },
  listaTemaA_F: function(context){
    api.listaTemaApi().then((response)=>{
      context.commit('listaTemaM_F', response.data.result);
    });
  },
  objaviTemuA_F: function(context,nesto){
    var id = nesto.id;
    api.objaviTemuApi(id).then((response)=>{
      context.dispatch('listaTemaA_F');
    });
  },
  obrisiTemuA_F: function(context,nesto){
    var id = nesto.id;
    api.obrisiTemuApi(id).then((response)=>{
      context.dispatch('listaTemaA_F');
    });
  },
  listaKorisnikaA_F: function(context){
    api.listaKorisnikaApi().then((response)=>{
      context.commit('listaKorisnikaM_F', response.data.result);
    });
  },
  oznaciPrijavljenogKorisnikaOkA_F: function(context,nesto){
    var id = nesto.id;
    api.oznaciKorisnikaOkApi(id).then((response)=>{
    context.dispatch('listaKorisnikaA_F');
    context.commit('oznaciKorisnikaOkM_F',id);
    context.commit('oznaciKorisnikaOkSearchM_F',id);
    });
  },
  blokirajPrijavljenogKorisnikaA_F: function(context,nesto){
    var id = nesto.id;
    api.blokirajKorisnikaApi(id).then((response)=>{
      if(response.status == 200){
        context.dispatch('listaKorisnikaA_F');
        context.commit('blokirajKorisnikaM_F',id);
        context.commit('blokirajKorisnikaSearchM_F',id);
      }
    });
  },
  blokirajKorisnikaA_F: function(context,nesto){

    var id = nesto.id;

    api.blokirajKorisnikaApi(id).then((response)=>{
      // context.dispatch('listaKorisnikaA',limit);
      // context.dispatch('sviKorisniciA',limit);
      if(response.status == 200){
        context.commit('blokirajKorisnikaM_F',id);
        context.commit('listaKorisnikaM2_F',id);
        context.commit('blokirajKorisnikaSearchM_F',id);
      }
    });
  },
  sviKorisniciSmanjiA_F: function(context,nesto){
    context.commit('sviKorisniciSmanji_F',nesto);
  },
  sviKorisniciA_F: function(context,upit){
    api.sviKorisniciApi(upit).then((response)=>{
       context.commit('sviKorisniciM_F', response.data.result);
    });
  },
  oznaciKorisnikaOkA_F: function(context,nesto){
    var id = nesto.id;
    return api.oznaciKorisnikaOkApi(id).then((response)=>{
    //context.dispatch('listaKorisnikaA',limit);
      //context.dispatch('sviKorisniciA',upit);
       if(response.status == 200){
         context.commit('oznaciKorisnikaOkM_F',id);
         context.commit('listaKorisnikaM2_F',id);
         context.commit('oznaciKorisnikaOkSearchM_F',id);
       }
     });
  },
  vratiKorisnikaUZivotA_F: function(context,nesto){
    var id = nesto.id;
    api.vratiKorisnikaUZivot(id).then((response)=>{
      if(response.status == 200){
        context.commit('vratiKorisnikaUZivotM_F',id);
        context.commit('vratiKorisnikaSearchUZivotM_F',id);
      }
    });
  },
  postaviModeratoraA_F: function(context,nesto){
    var id = nesto.id;
    api.postaviModeratoraApi(id).then((response)=>{
      if(response.status === 200){
         context.commit('postaviModeratoraM_F',id);
       }
    });
  },
  pretraziKorisnikeA_F: function(context,search){
    api.pretraziKorisnikeApi(search).then((response)=>{
     context.commit('pretraziKorisnikeM_F',response.data.result);
    });
  },
  prijavljeniKomentariA_F: function(context,upit){
    api.prijavljeniKomentariApi(upit).then((response)=>{
      context.commit('prijavljeniKomentariM_F', response.data.result);
    });
  },
  listaKategorijaA_F: function(context){
    api.listaKategorijaApi().then((response)=>{
      context.commit('listaKategorijaM_F',response.data.result);
    });
  },
  sviKomentariKorisnikaA_F: function(context,id){
    api.SviKomentariKorisnikaApi(id).then((response)=>{
      context.commit('sviKomentariKorisnikaM_F',response.data.result);
    });
  },
  sviKomentariSvihKorisnikaA_F: function(context,id){
    api.SviKomentariSvihKorisnikaApi(id).then((response)=>{
      context.commit('SviKomentariSvihKorisnikaM_F',response.data.result);
    });
  },
  odobriKomentarA_F: function(context,nesto){
    var id = nesto.id;
    var limit = nesto.limit;
    api.odobriKomentarApi(id).then((response)=>{
      context.dispatch('prijavljeniKomentariA_F',limit);
    });
  },
  blokirajKomentarA_F: function(context,nesto){
    var id = nesto.id;
    var limit = nesto.limit;
    api.blokirajKomentarApi(id).then((response)=>{
    context.dispatch('prijavljeniKomentariA_F',limit);
   });
 },
 dodajKategorijuA_F: function(context,kat){
   api.dodajKategorijuApi(kat).then((response)=>{
     context.dispatch('listaKategorijaA_F');
   });
 },
 obirisKategorijuA_F: function(context,selected){
   var selected = selected;
   api.obirisKategorijuApi(selected).then((response)=>{
     context.dispatch('listaKategorijaA_F');

   });
 },
 resetParamsA_F: function(context){
   context.commit('resetParamsM_F');
 },
 pravaPristupaA_F: function(context,params){
   //console.log(params);
   var sid = params;
   api.proveraPristupaApi(sid).then((response)=>{
   //context.commit('pravaPristupaM_F',sid);

   console.log('sid sa marsa'+response.data.response1);
   // if(response.data.response1 == 'korisnik' || response.data.response1 == 'autor')
   //    self.$router.push('/vesti');
//console.log('ok');
   });
 },
 usersLikesA: function(context,sid){
   var sid = sid;
   api.usersLikesApi(sid).then((response)=>{
     context.commit('usersLikesM',response.data);
   });
 }
}
