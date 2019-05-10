export default {

  allAuthorsM: function(state, params){
    state.authors = params;
  },
  takeCategoriesM : function(state,params){
    state.authorNews = params.authorNews;
    state.category = params;
  },
  getKategorijeM: function(state, params) {
    state.kategorije = params;
    for(var i = 0; i < state.kategorije.length; i++){
      state.kategorije[i].path = "/" + params[i].ktg_naziv + '/' + params[i].ktg_id;
    }

  },
getNewsByIdM:function(state,params){
  state.vestiSve = params;
  for(var i = 0; i < state.vestiSve.length; i++){
    state.vestiSve[i].path = "/vest/"+params[i].ktg_naziv+"/"+params[i].tma_naslov+"/"+params[i].tma_id;
  }
},

getTopNewsByIdM:function(state,params){
  state.vestiTop = params;
  for(var i = 0; i < state.vestiTop.length; i++){
    state.vestiTop[i].path = "/vest/"+params[i].ktg_naziv+"/"+params[i].tma_naslov+"/"+params[i].tma_id;
  }
},

getVestiM:function(state,params){
  state.vestiSve = params;
},


getTopNewsM: function(state,params){
  state.vestiTop = params;

},

searchNewsM:function(state,params){
  if(typeof params === 'string'){
    state.vestiSve = [];
    state.vestiTop = [];
  }else{
  state.vestiSve = params;
  state.vestiTop = params;
  for(var i = 0; i < state.vestiSve.length; i++){
    state.vestiSve[i].path = "/vest/"+params[i].ktg_naziv+"/"+params[i].tma_naslov+"/"+params[i].tma_id;
  }
  for(var i = 0; i < state.vestiTop.length; i++){
    state.vestiTop[i].path = "/vest/"+params[i].ktg_naziv+"/"+params[i].tma_naslov+"/"+params[i].tma_id;
  }
}
},

moreLatestNewsM: function(state,params){

  for(var i = 0; i<params.length;i++){
  params[i].path="/vest/"+params[i].ktg_naziv+"/"+params[i].tma_naslov+"/"+params[i].tma_id;
  state.vestiSve.push(params[i]);
  }
},

moreTopNewsM:function(state,params){

  for(var i = 0; i<params.length; i++){
    params[i].path = "/vest/"+params[i].ktg_naziv+"/"+params[i].tma_naslov+"/"+params[i].tma_id;
    state.vestiTop.push(params[i]);
  }
},

moreSrcNewsM:function(state,params){
  for(var i = 0; i<params.length;i++){
  state.vestiSve.push(params[i]);
  }

},

  neodobreneVestiM: function(state, params) {
    state.neodobreneVesti_v = params;
  },
  prijavljeniKorisniciM: function(state, params) {
    state.prijavljeniKorisnici_v = params;
  },
  prijavljeniKomentariM: function(state, params) {
    state.prijavljeniKomentari_v = params;
  },
  potencijalniAutoriM: function(state, params) {
    state.potencijalniAutori_v = params;
  },

  moreNewsAuthorM: function(state, params) {
    for(var i = 0; i < params.length; i++) {
      state.newsAuthor.push(params[i]);
    }

  },

  sviKorisniciM: function(state, params) {
    //console.log(params);
    for (var i = 0; i < params.length; i++) {
      state.sviKorisnici.push(params[i]);
    }
  },

  resetParamsM: function(state) {


      state.sviKorisnici = [];
      console.log("seceno"+state.sviKorisnici);

  },

  sviKorisniciSmanji: function(state,params){
    //console.log(params);
    var start = params.start;
    var niz = state.sviKorisnici;

     var n =  niz.slice(0,start);


     state.sviKorisnici = n;
  },
  oznaciKorisnikaOkM: function(state,params){
    for(var i = 0; i<state.sviKorisnici.length; i++){
      if(state.sviKorisnici[i].osb_id == params){
        state.sviKorisnici[i].osb_nalog_prijava = 0;
        //this.$set(state.korsinici[i],'osb_nalog_prijava',0);
      }
    }
  },
  listaKorisnikaM2: function(state,params){
    for(var i = 0; i<state.prijavljeniKorisnici_v.length; i++){
      if(state.prijavljeniKorisnici_v[i].osb_id == params){
      //  state.korisnici[i].osb_nalog_prijava = 0;
        //this.$set(state.korsinici[i],'osb_nalog_prijava',0);
        state.prijavljeniKorisnici_v.splice(state.prijavljeniKorisnici_v[i],1);
      }
    }
  },
  listaKorisnikaM3: function(state,params){

    for(var i = 0; i<state.prijavljeniKorisnici_v.length; i++){
      if(state.prijavljeniKorisnici_v[i].osb_id == params){
        state.prijavljeniKorisnici_v.splice(state.prijavljeniKorisnici_v[i],1);
      }
    }
  },
  oznaciKorisnikaOkSearchM: function(state,params){
    for(var i = 0; i<state.korisniciSearch.length; i++){
      if(state.korisniciSearch[i].osb_id == params){
        state.korisniciSearch[i].osb_nalog_prijava = 0;
        //this.$set(state.korsinici[i],'osb_nalog_prijava',0);
      }
    }
  },
  blokirajKorisnikaM: function(state,params){
    for(var i = 0; i<state.sviKorisnici.length; i++){
      if(state.sviKorisnici[i].osb_id == params){
        state.sviKorisnici[i].osb_nalog_prijava = 2;
        //this.$set(state.korsinici[i],'osb_nalog_prijava',0);
      }
    }
  },

  blokirajKorisnikaSearchM: function(state,params){
    for(var i = 0; i<state.korisniciSearch.length; i++){
      if(state.korisniciSearch[i].osb_id == params){
        state.korisniciSearch[i].osb_nalog_prijava = 2;
        //this.$set(state.korsinici[i],'osb_nalog_prijava',0);
      }
    }
  },
  vratiKorisnikaSearchUZivotM: function(state,params){
    for(var i = 0; i<state.korisniciSearch.length; i++){
      if(state.korisniciSearch[i].osb_id == params){
        state.korisniciSearch[i].osb_nalog_prijava = 0;
        //this.$set(state.korsinici[i],'osb_nalog_prijava',0);
      }
    }
  },
  vratiKorisnikaUZivotM: function(state,params){
    for(var i = 0; i<state.sviKorisnici.length; i++){
      if(state.sviKorisnici[i].osb_id == params){
        state.sviKorisnici[i].osb_nalog_prijava = 0;
        //this.$set(state.korsinici[i],'osb_nalog_prijava',0);
      }
    }
  },
  pretraziKorisnikeM: function(state,params){
    state.korisniciSearch = params;
  },
  listaKategorijaM: function(state, params) {
    state.listaKategorija = params;
  },
  sviKomentariKorisnikaM: function(state, params) {
    state.sviKomentariKorisnika = params;
  },
  sviKomentariSvihKorisnikaM: function(state, params) {
    state.sviKomentariSvihKorisnika = params;
  },
  oznaciKorisnikaOkSearchM: function(state,params){
    for(var i = 0; i<state.korisniciSearch.length; i++){
      if(state.korisniciSearch[i].osb_id == params){
        state.korisniciSearch[i].osb_nalog_prijava = 0;
        //this.$set(state.korsinici[i],'osb_nalog_prijava',0);
      }
    }
  },
  postaviModeratoraM: function(state,params){

    for(var i = 0; i<state.sviKorisnici.length; i++){
      if(state.sviKorisnici[i].osb_id == params){
        state.sviKorisnici[i].osb_nalog_prijava = 3;
      }
    }
  },

  getSubKategorijeM: function(state, params) {
    state.subKategorije = params;
  },

  getTopNewsM: function(state, params) {
    state.vestiTop = params;
  },

  commentOfTheDayM: function(state, params) {
    state.comment = params;
  },
  mostPopularAuthorsM: function(state, params) {
    state.popAuthors = params;
  },
  takeFirstComments:function(state,params){
    state.ofset+= params.ofset;
    state.firstComments = [];
    state.haveMoreComments = params.next;
    console.log(state.haveMoreComments);
    state.firstComments = params.comments;
  },
  clearComments:function(state){
    state.firstComments = [];
  },
  takeOneNew:function(state,params){
    state.title = params.data.result.tma_naslov;
    state.summary = params.data.result.tma_sazetak;
    state.text = params.data.result.tma_tekst;
    state.temaId = params.data.result.tma_id;
    state.likes = params.data.result.lajk;
    state.numOfViews = params.data.result.tma_br_pregleda;
    state.dateOfPublication = params.data.result.tma_datum;
  },
  pravaPristupaM:function(state,params){
//state.pristup = params.data.result;
  },
  takeFirstCommentsAdd:function(state,params){
    state.ofset+= params.ofset;
    state.haveMoreComments = params.next;
    console.log(state.haveMoreComments);
    var i;
    for(i=0;i<params.comments.length;i++){
      state.firstComments.push(params.comments[i]);
    }

  },
  doAlgoritmChange:function(state,params){
    state.algoritmChange = params.algoritmChange;
  },
  clearNewsParams:function(state){
    state.temaId = '';
    state.title = '';
    state.summary = '';
    state.text = '';
  },
  putTemaId:function(state,params){
    state.temaId = params.temaId;
  },
  haveMoreComments:function(state,params){
    state.haveMoreComments = params.next;
  }

}
