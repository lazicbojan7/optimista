export default {

  getAllAuthorsG: function(state){
    return state.authors;
  },

  getAuthorNews: function(state){
  return state.authorNews;
},
//pocetna
 limitNews: function(state){
   return state.limitSve;
 },

 limitTopNews:function(state){
   return state.limitTop;
 },

 getOfsetNews:function(state){
   return state.offsetNews;
 },

 getOfsetTopNews:function(state){
   return state.offsetTopNews;
 },

 katID: function(state){
   return state.katId;
 },
  getAuthorNews: function(state) {
    return state.authorNews;
  },

  getKategorijeG: function(state) {
    return state.kategorije;

},
  getVestiSveG:function(state){
    return state.vestiSve;
  },


  getSubKategorijeG: function(state){
    return state.subKategorije
  },

  getTopNewsG: function(state){
    return state.vestiTop;
  },

  getKategorijeG: function(state){
  return state.kategorije;
  },

  getCategoriesG: function(state) {
    return state.category;
  },
  getNeodobreneVestiG: function(state) {
    return state.neodobreneVesti_v;
  },
  listaPartneraG: function(state) {
    return state.listaPartnera_v;
  },
  getPrijavljeniKorisniciG: function(state) {
    return state.prijavljeniKorisnici_v;
  },
  getPrijavljeniKomentariG: function(state) {
    return state.prijavljeniKomentari_v;
  },
  getPotencijalniAutoriG: function(state) {
    return state.potencijalniAutori_v;
  },

  getNewsAuthorG: function(state) {
    return state.newsAuthor;
  },

  sviKorisniciG: function(state) {
    return state.sviKorisnici;
  },
  listaKategorijaG: function(state) {
    return state.listaKategorija;
  },
  getSviKomentariKorisnikaG: function(state) {
    return state.sviKomentariKorisnika;
  },
  getSviKomentariSvihKorisnikaG: function(state) {
    return state.sviKomentariSvihKorisnika;
  },

  getSubKategorijeG: function(state){
    return state.subKategorije
  },

  getTopNewsG: function(state){
    return state.vestiTop;
  },

  getSubKategorijeG: function(state) {
    return state.subKategorije
  },

  getTopNewsG: function(state) {
    return state.vestiTop;
  },


  getCommentOfTheDayG: function(state) {
    return state.comment;
  },
  getMostPopularAuthorsG: function(state) {
    return state.popAuthors;
  },

korisniciSearchG : function(state){
    return state.korisniciSearch;
  },

getTitle:function(state){
  return state.title;
},
getSummary:function(state){
  return state.summary;
},
getText:function(state){
  return state.text;
},
getTemaId:function(state){
  return state.temaId;
},
getFirstComments:function(state){
  return state.firstComments;
},
getLikes:function(state){
  return state.likes;
},
getNumOfViews:function(state){
  return state.numOfViews;
},
getDateOfPublication:function(state){
  if(state.dateOfPublication !== undefined && state.dateOfPublication !== ''){
    var a = state.dateOfPublication;
    var d = a.split(' ')[0];
    var t = a.split(' ')[1];

    var d1 = d.split('-');
    var t1 = t.split(':');

    var result = d1[2] + "." + d1[1] + "." + d1[0] + ". | " + t1[0]+":"+t1[1]+"h";
    state.dateOfPublication = result;
  }
  return state.dateOfPublication;
},
getOfset:function(state){
  return state.ofset;
},
getOfset1:function(state){
  return state.ofset1;
},
getUpdateInsertNew:function(state){
  return state.updateInsertNew;
},
getPristup(state){
  return state.pristup;
},
getAlgoritmChange:function(state){
  return state.algoritmChange;
},
getHaveMoreComments:function(state){
  return state.haveMoreComments;
}


}
