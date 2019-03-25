import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home/home'
import index from '@/components/home/index'
import qxgl from '@/components/qxgl/qxgl'
import bmgl from '@/components/bmgl/bmgl'
import zwgl from '@/components/zwgl/zwgl'
import cshqx from '@/components/cshqx/cshqx'
import yggl from '@/components/yggl/yggl'
import tags from '@/components/tags/tags'
import brand from '@/components/brand/brand'
import number from '@/components/number/number'
import carIntroduction from '@/components/carIntroduction/page'

import notFile from '@/components/notFile'
import notJurisdiction from '@/components/notJurisdiction'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'login',
		component: login,
		meta: {
			isLogin: false
		}
	}, {
		path: '/home',
		component: home,
		meta: {
			isLogin: true
		},
		children: [{
				path: '/',
				redirect: 'index'
			}, {
				path: 'index',
				name: 'index',
				component: index,
				meta: {
					isLogin: true
				}
			}, {
				path: 'qxgl',
				name: 'qxgl',
				component: qxgl,
				meta: {
					isLogin: true,
					isJur: 'qxgl'
				}
			}, {
				path: 'bmgl',
				name: 'bmgl',
				component: bmgl,
				meta: {
					isLogin: true,
					isJur: 'bmgl'
				}
			}, {
				path: 'zwgl',
				name: 'zwgl',
				component: zwgl,
				meta: {
					isLogin: true,
					isJur: 'zwgl'
				}
			}, {
				path: 'cshqx',
				name: 'cshqx',
				component: cshqx,
				meta: {
					isLogin: true,
					isJur: 'cshqx'
				}
			}, {
				path: 'yggl',
				name: 'yggl',
				component: yggl,
				meta: {
					isLogin: true,
					isJur: 'yggl'
				}
			}, {
				path: 'tags',
				name: 'tags',
				component: tags,
				meta: {
					isLogin: true,
					isJur: 'tags'
				}
			}, {
				path: 'brand',
				name: 'brand',
				component: brand,
				meta: {
					isLogin: true,
					isJur: 'brand'
				}
			}, {
				path: 'number',
				name: 'number',
				component: number,
				meta: {
					isLogin: true,
					isJur: 'number'
				}
			}, {
				path: 'carIntroduction',
				name: 'carIntroduction',
				component: carIntroduction,
				meta: {
					isLogin: true,
					isJur: 'carIntroduction'
				}
			}

		]
	}, {
		path: '/403',
		name: 'notJurisdiction',
		component: notJurisdiction,
		meta: {
			isLogin: false
		}
	}, {
		path: '*',
		name: 'notFile',
		component: notFile,
		meta: {
			isLogin: false
		}
	}]
})
