import login from '../../components/vesti_forum/login.vue';
import register from '../../components/vesti_forum/register.vue';
import user from '../../components/vesti_forum/User.vue';
import poruke from '../../components/vesti_forum/poruke.vue';
import contact from '../../components/vesti_forum/contact.vue';


var routes0 = [
  {
    path: '/login',
    component: login,
    /*children*/
  },
  {
    path: '/register',
    component: register,
    /*children*/
  },
  {
    path: '/user/:id',
    component: user,
    props:true,
    children:[
      {
        path:':username',
        component : user,
        props:true
      }
    /*children*/
    ]
  },
  {
    path: '/poruke',
    component: poruke,
    /*children*/
  },
  {
    path: '/contact',
    component: contact,
    /*children*/
  },

];

export {routes0};
