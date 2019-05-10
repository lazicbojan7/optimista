export default {
  getKat_f(state){
    return state.kat_f;
  },
  getKat_ime_f(state){
    return state.kat_ime_f;
  },
  getTemaShow(state){
    return state.teme_f;
  },
  getCount(state){
    return parseInt(state.brPrikaza_f);
  },
  getFilter(state){
    return state.filter_f;
  },
  getKat_f(state){
    return state.kat_f;
  },
  getKat_ime_f(state){
    return state.kat_ime_f;
  },
  getTemaShow(state){
    return state.teme_f;
  },
  getShowComm(state){

    return state.komentari_f;
  },
  getReplies(state){
    return state.replies_f;  /*objekat sa svim odgvorima, pod kljucevima ref_id-a*/
  },
  listaTemaG_F : function(state){
    return state.teme_F;
  },
  listaKorisnikaG_F : function(state){
    return state.korisnici_F;
  },
  sviKorisniciG_F : function(state){
    return state.sviKorisnici_F;
  },
  prijavljeniKomentariG_F : function(state){
    return state.prijavljeniKomentari_F;
  },
  listaKategorijaG_F : function(state){
    return state.listaKategorija_F;
  },
  sviKomentariKorisnikaG_F : function(state){
    //console.log(state.sviKomentariKorisnika);
    return state.sviKomentariKorisnika_F;
  },
  SviKomentariSvihKorisnikaG_F : function(state){
    return state.SviKomentariSvihKorisnika_F;
  },
  korisniciSearchG_F : function(state){
    return state.korisniciSearch_F;
  },
  getPristup_F: function(state){
    return state.pristup_F;
  },
  usersLikes_temaG: function(state){
    return state.usersLikes_tema;
  },
  usersLikes_postG: function(state){
    return state.usersLikes_post;
  }

}
