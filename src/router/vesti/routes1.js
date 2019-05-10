import Home from '@/components/vesti/Home.vue'
import Cms_author from '@/components/vesti/Cms_author.vue'
import Cms_author_insertNews from '@/components/vesti/Cms_author_insertNews.vue'
import Cms_author_myNews from '@/components/vesti/Cms_author_myNews.vue'
import CmsVesti from '@/components/vesti/CMS/CmsVesti.vue'
import Vest from '@/components/vesti/Vest.vue'
import Content from '@/components/vesti/Content.vue'
import ContentAuthor from '@/components/vesti/ContentAuthor.vue'
import AboutUs from '@/components/vesti/AboutUs.vue'
import Contact from '@/components/vesti/Contact.vue'
import Authors from '@/components/vesti/Authors.vue'

var routes1 = [
  {
    path:'/',
    component: Home,
    children:[
      {
        path:'vest/:cat/:name/:id',
        component: Vest
      },

      {
        path:'kategorija/:name/:id',
        component: Content
      },
      {
        path: '',
        component: Content
      },
      {
        path: 'autor/:name:lastname/:id',
        component: ContentAuthor
      },
      {
        path: 'o%20nama',
        component: AboutUs
      },
      {
        path:'contact',
        component: Contact
      },
      {
        path: 'autori',
        component: Authors
      }
    ]
  },

  {
    path:'/cms-autor',
    component:Cms_author,
    children:[
    {
        path:'my-news',
        component:Cms_author_myNews
    },{
      path:'insert-new',
      component:Cms_author_insertNews

    }

    ]
  },
  // {
  //   path:'/cms-autor/:cms_status',
  //   component:Cms_author,
  // },
  {
    path:'/cms-vesti',
    component: CmsVesti
  }
];

export {routes1};
