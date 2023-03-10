import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1728d1a3 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _3d2bb7a2 = () => interopDefault(import('..\\pages\\overview.vue' /* webpackChunkName: "pages/overview" */))
const _4bf20b13 = () => interopDefault(import('..\\pages\\overview2.vue' /* webpackChunkName: "pages/overview2" */))
const _55167f4e = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _4d812e8c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _1728d1a3,
    name: "login"
  }, {
    path: "/overview",
    component: _3d2bb7a2,
    name: "overview"
  }, {
    path: "/overview2",
    component: _4bf20b13,
    name: "overview2"
  }, {
    path: "/register",
    component: _55167f4e,
    name: "register"
  }, {
    path: "/",
    component: _4d812e8c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
