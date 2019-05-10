import api from '@/api/vesti/axios_calls.js'

export default {

  takeAuthorNews: function(context, params) {
    api.authorNews(params).then((response) => {


    })
  },

  getKategorijeA: function(context) {
    api.getKategorijeApi().then(response => {
      context.commit('getKategorijeM', response.data.glavne);
    })
  },

  getSubKategorijeA: function(context) {
    api.getKategorijeApi().then(response => {
      context.commit('getSubKategorijeM', response.data.ostale);
    })
  },

  getLatestNewsA: function(context, params) {
    api.getCatIdApi(params).then((response) => {
      context.commit('getNewsByIdM', response.data.result);
    })
  },

  getTopRatedNewsA: function(context, params) {
    api.getCatTopIdApi(params).then((response) => {
      context.commit('getTopNewsByIdM', response.data.result);
    })
  },

  getVestiA: function(context, param) {
    api.getVestiApi(param).then((response) => {
      context.commit('getVestiM', response.data.result);

    })
  },

  getTopNewsA: function(context, params) {

    api.getTopNewsApi(params).then(response => {

      context.commit('getTopNewsM', response.data.result);

    })
  },

  moreTopNewsA: function(context, params) {
    api.getCatTopIdApi(params).then(response => {
      context.commit('moreTopNewsM', response.data.result)
    })
  },

  moreLatestNewsA: function(context, params) {
    api.getCatIdApi(params).then(response => {
      context.commit('moreLatestNewsM', response.data.result)
    })
  },

  searchNewsA: function(context, params) {
    api.searchNewsApi(params).then((response) => {
      if(response.data.result !== undefined && response.data.result !== 'nista'){
        context.commit('searchNewsM', response.data.result);
      }
    });
  },

moreSrcNewsA: function(context,params){
  api.searchNewsApi(params).then(response=>{

    context.commit('moreSrcNewsM',response.data.result)
  })
},

  //kraj pocetna


  takeCategoriesA: function(context) {
    api.takeCategoriesApi().then((response) => {
      context.commit('takeCategoriesM', response.data.result);
    });
  },
  neodobreneVestiA: function(context, limit) {
    api.neodobreneVestiApi().then((response) => {

      context.commit('neodobreneVestiM', response.data.result);
    });
  },
  prijavljeniKorisniciA: function(context) {
    api.prijavljeniKorisniciApi().then((response) => {
      context.commit('prijavljeniKorisniciM', response.data.result);
    });
  },
  prijavljeniKomentariA: function(context) {
    api.prijavljeniKomentariApiV().then((response) => {
      context.commit('prijavljeniKomentariM', response.data.result);
    });
  },
  potencijalniAutoriA: function(context) {
    api.potencijalniAutoriApi().then((response) => {
      context.commit('potencijalniAutoriM', response.data.result);
    });
  },

  moreNewsAuthorA: function(context, params) {
    api.moreNewsAuthorApi(params).then((response) => {
      context.commit('moreNewsAuthorM', response.data.result);
    });
  },

  sviKorisniciA: function(context, upit) {
    api.sviKorisniciApi(upit).then((response) => {
      context.commit('sviKorisniciM', response.data.result);
    });
  },
  listaKategorijaA: function(context) {
    api.listaKategorijaApi_V().then((response) => {
      context.commit('listaKategorijaM', response.data.result);
    })
  },
  sviKomentariKorisnikaA: function(context, id) {
    api.SviKomentariKorisnikaApi(id).then((response) => {
      context.commit('sviKomentariKorisnikaM', response.data.result);
    })
  },
  sviKomentariSvihKorisnikaA: function(context, id) {
    // var id=id;
    // console.log(id);
    api.SviKomentariSvihKorisnikaApi(id).then((response) => {
      context.commit('sviKomentariSvihKorisnikaM', response.data.result);
    })
  },

    sviKorisniciSmanjiA: function(context, nesto) {
      context.commit('sviKorisniciSmanji', nesto);
    },

  sviKomentariKorisnikaA: function(context, id) {
    api.SviKomentariKorisnikaApi(id).then((response) => {
      context.commit('sviKomentariKorisnikaM', response.data.result);

    })
  },

  resetParamsA: function(context) {
    context.commit('resetParamsM');

  },

  oznaciKorisnikaOkA: function(context, nesto) {
    var id = nesto.id;
    return api.oznaciKorisnikaOkApi(id).then((response) => {
      //context.dispatch('listaKorisnikaA',limit);
      //context.dispatch('sviKorisniciA',upit);
      if (response.status == 200) {
        context.commit('oznaciKorisnikaOkM', id);
        context.commit('listaKorisnikaM2', id);
        context.commit('oznaciKorisnikaOkSearchM', id);
      }
    });
  },


  getTopNewsA: function(context, params) {
    api.getTopNewsApi(params).then(response => {
      context.commit('getTopNewsM', response.data.res);
    })
  },
  oznaciKomentarOkA: function(context, nesto) {
    var id = nesto.id;
    api.oznaciKomentarOkApi(id).then((response) => {
      context.dispatch('prijavljeniKomentariA');
    })


  },
  blokirajKomentarA: function(context, nesto) {
    var id = nesto.id;
    api.blokirajKomentarApi(id).then((response) => {
      context.dispatch('prijavljeniKomentariA');
    });
  },
  blokirajKorisnikaA: function(context, nesto) {
    var id = nesto.id;
    api.blokirajKorisnikaApi(id).then((response) => {
      // context.dispatch('listaKorisnikaA',limit);
      // context.dispatch('sviKorisniciA',limit);
      if (response.status == 200) {
        context.commit('blokirajKorisnikaM', id);
        context.commit('listaKorisnikaM3', id);
        context.commit('blokirajKorisnikaSearchM', id);
      }
    });
  },
  postaviModeratoraA: function(context, nesto) {
    var id = nesto.id;
    api.postaviModeratoraApi(id).then((response) => {

      if (response.status === 200) {
        context.commit('postaviModeratoraM', id);
      }
    });
  },
  objaviTemuA: function(context, nesto) {
    var id = nesto.id;

    api.objaviTemuApi(id).then((response) => {
      context.dispatch('neodobreneVestiA');

    });
  },
  obrisiTemuA: function(context, nesto) {
    var id = nesto.id;

    api.obrisiTemuApi(id).then((response) => {
      context.dispatch('neodobreneVestiA');
    });
  },


  vratiKorisnikaUZivotA: function(context, nesto) {
    var id = nesto.id;
    api.vratiKorisnikaUZivot(id).then((response) => {
      if (response.status == 200) {
        context.commit('vratiKorisnikaUZivotM', id);
        context.commit('vratiKorisnikaSearchUZivotM', id);
      }
    });
  },
  pretraziKorisnikeA: function(context, search) {
    api.pretraziKorisnikeApi(search).then((response) => {

      context.commit('pretraziKorisnikeM', response.data.result);
    });
  },

  mostPopularAuthorsA: function(context) {
    api.mostPopularAuthorsApi().then((response) => {
      context.commit('mostPopularAuthorsM', response.data.result);
    });
  },

  allAuthorsA: function(context) {
    api.allAuthorsApi().then((response) => {
      context.commit('allAuthorsM', response.data.result);
    });
  },
    commentOfTheDayA: function(context) {
      api.commentOfTheDayApi().then((response) => {
        context.commit('commentOfTheDayM', response.data.result);
      });
    },

  takeOneNew:function(context,params){
    context.commit('takeOneNew',params);
  },
   takeFirstComments:function(context,params){
    api.takeFirstComments(params).then((response)=>{

      if(response.data.result !== undefined){
        var i;
        for(i=0; i<response.data.result.length; i++){
          response.data.result[i].numOfResponse = response.data.comments[i].numOfResponse;
          response.data.result[i].likes = response.data.comments[i].likes;
          response.data.result[i].reply = false;
          response.data.result[i].seeReply = false;
        }
        var params = {
          comments: response.data.result,
          ofset:response.data.ofset
        }
        if(response.data.next !== undefined){
         params.next = true;
       }else{
         params.next = false;
       }
        context.commit('takeFirstComments', params);
      }else{
        var params = {
          next:false
        }
        context.commit('haveMoreComments',params);
        context.commit('clearComments');
      }
    });
  },
  pravaPristupaA:function(context,params){
     api.proveraPristupaApi(params).then((response)=>{
    //context.commit('pravaPristupaM',params);
    console.log("akcija"+response.data.sid);
   });
  },

  takeFirstCommentsAdd:function(context,params){
   api.takeFirstComments(params).then((response)=>{
     if(response.data.result !== undefined){
       var i;
       for(i=0; i<response.data.result.length; i++){
         response.data.result[i].numOfResponse = response.data.comments[i].numOfResponse;
         response.data.result[i].likes = response.data.comments[i].likes;
         response.data.result[i].reply = false;
         response.data.result[i].seeReply = false;
       }
       var params = {
         comments: response.data.result,
         ofset:response.data.ofset
       }
       if(response.data.next !== undefined){
        params.next = true;
      }else{
        params.next = false;
      }
       context.commit('takeFirstCommentsAdd', params);
     }else{
       var params = {
         next:false
       }
       context.commit('haveMoreComments',params);
     }
   });
 },
 doAlgoritmChange:function(context,params){
   context.commit('doAlgoritmChange',params);
 },
 clearNewsParams:function(context){
   context.commit('clearNewsParams');
 },
 putTemaId:function(context,params){
   context.commit('putTemaId',params);
 }
}





// takeFirstCommentsAdd:function(context,params){
//   api.takeFirstComments(params).then((response)=>{
//     if(response.data.result !== undefined && response.data.comment !== undefined){
//       var commentsFromDB = response.data.result;
//       var i;
//       var comments = [];
//       for(i=0; i<commentsFromDB.length; i++){
//         comments.push({
//           comment: commentsFromDB[i],
//           numOfResponse: response.data.comments[i].numOfResponse,
//           likes: response.data.comments[i].likes,
//           reply:false,
//           seeReply:false
//         });
//       }
//       var params = {
//         comments: comments,
//         ofset:response.data.ofset
//       }
//       context.commit('takeFirstCommentsAdd',params);
//     }
//   });
//
// }
// takeFirstComments:function(context,params){
//   api.takeFirstComments(params).then((response)=>{
//     if(response.data.result !== undefined && response.data.comments !== undefined){
//       var commentsFromDB = response.data.result;
//       var i;
//       var comments = [];
//       for(i=0; i<commentsFromDB.length; i++){
//         comments.push({
//           comment: commentsFromDB[i],
//           numOfResponse: response.data.comments[i].numOfResponse,
//           likes: response.data.comments[i].likes,
//           reply:false,
//           seeReply:false
//         });
//       }
//       var params = {
//         comments: comments,
//         ofset:response.data.ofset
//       }
//       context.commit('takeFirstComments', params);
//     }else{
//       context.commit('clearComments');
//     }
//   });
// },
