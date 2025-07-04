import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import BlogArticlePage from '../pages/BlogArticlePage.vue'
import UserProfilePage from '../pages/UserProfilePage.vue'
import UpdatePost from '../pages/UpdatePost.vue'
import AddPostPage from '../pages/AddPostPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainPage,
    },
    {
      path: '/blogArticle/:id',
      component: BlogArticlePage,
    },
    {
      path: '/user/:id',
      component: UserProfilePage,
    },
    {
      path: '/updateArticle/:id',
      component: UpdatePost,
    },
    {
      path: '/addArticle/:id',
      component: AddPostPage,
    },
  ],
})
