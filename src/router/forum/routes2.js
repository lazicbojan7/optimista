import Show from '@/components/forum/Show.vue'
import ShowTeme from '@/components/forum/ShowTeme.vue'
import Komentari from '@/components/forum/Komentari.vue'
import ForumApp from '@/components/forum/ForumApp.vue'
import CmsForum from '@/components/forum/CMS/CmsForum.vue'


var routes2 = [
    {
      path: '/forum',
      component: ForumApp,
      children : [
        {
          path:'/',
          component : Show
        },
        {
          path:':tema',
          component : ShowTeme
        },
        {
          path:':tema/:komentari',   ////id teme radi filtracije komentara
          component : Komentari
        },

      ]
    },
    {
      path:"/cms-forum",
      component : CmsForum
    }
];

export {routes2};
