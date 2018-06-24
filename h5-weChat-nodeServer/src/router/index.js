import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/newHome',
      name: 'newHome',
      component: resolve => require(['@/pages/newHome'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['@/pages/home'], resolve),
      children: [
        {
          path: '',
          name: 'home',
          component: resolve => require(['@/pages/home/home'], resolve)
        },
        {
          path: 'testbank',
          name: 'testbank',
          component: resolve => require(['@/pages/home/testbank'], resolve)
        },
        {
          path: 'personal',
          name: 'personal',
          component: resolve => require(['@/pages/home/personal'], resolve)
        }
      ]
    },
    {
      path: '/bind',
      name: 'Bind',
      component: resolve => require(['@/pages/bind'], resolve)
    },
    {
      path: '/course',
      name: 'CourseList',
      component: resolve => require(['@/pages/course-list'], resolve)
    },
    {
      path: '/collection',
      name: 'Collection',
      component: resolve => require(['@/pages/collection'], resolve)
    },
    {
      path: '/orders',
      name: 'Orders',
      component: resolve => require(['@/pages/orders'], resolve)
    },
    {
      path: '/own',
      name: 'Own',
      component: resolve => require(['@/pages/own'], resolve)
    },
    {
      path: '/course/:id',
      name: 'Course',
      component: resolve => require(['@/pages/course'], resolve)
    },
    {
      path: '/course/:id/evaluate',
      name: 'Evaluate',
      meta: { requireBind: true },
      component: resolve => require(['@/pages/evaluate'], resolve)
    },
    {
      path: '/course/:id/test',
      name: 'Test',
      meta: { requireBind: true },
      component: resolve => require(['@/pages/test'], resolve)
    },
    {
      path: '/course/:id/test/result',
      name: 'TestResult',
      meta: { requireBind: true },
      component: resolve => require(['@/pages/test-result'], resolve)
    },
    {
      path: '/package',
      name: 'PackageList',
      component: resolve => require(['@/pages/package-list'], resolve)
    },
    {
      path: '/package/:id',
      name: 'Package',
      component: resolve => require(['@/pages/package'], resolve)
    },
    {
      path: '/course/:id/order',
      name: 'Order',
      meta: { requireBind: true },
      component: resolve => require(['@/pages/order'], resolve)
    },
    {
      path: '/course/:id/order/result',
      name: 'OrderResult',
      meta: { requireBind: true },
      component: resolve => require(['@/pages/order-result'], resolve)
    },
    {
      path: '/course/:id/order/detail',
      name: 'OrderDetail',
      meta: { requireBind: true },
      component: resolve => require(['@/pages/order-detail'], resolve)
    },
    // 题库
    {
      path: '/exam/:id',
      name: 'ExamInfo',
      // meta: { requireBind: true },
      component: resolve => require(['@/pages/exam-info'], resolve)
    },
    {
      path: '/exam/:id/test',
      name: 'ExamTest',
      meta: { requireBind: true },
      component: resolve => require(['@/pages/exam'], resolve)
    },
    {
      path: '/exam/:id/test/result',
      name: 'ExamResult',
      meta: { requireBind: true },
      component: resolve => require(['@/pages/exam-result'], resolve)
    },
    {
      path: '/exam/:id/test/answer',
      name: 'ExamAnswer',
      meta: { requireBind: true },
      component: resolve => require(['@/pages/exam-answer'], resolve)
    },
    // 大学生求职竞争力测评
    {
      path: '/measure',
      meta: {
        title: '大学生求职竞争力测评'
      },
      component: resolve => require(['@/pages/measure'], resolve)
    },
    {
      path: '/measure/form',
      meta: {
        title: '大学生求职竞争力测评'
      },
      component: resolve => require(['@/pages/measure/form'], resolve)
    },
    {
      path: '/measure/intro',
      meta: {
        title: '大学生求职竞争力测评'
      },
      component: resolve => require(['@/pages/measure/intro'], resolve)
    },
    {
      path: '/measure/test',
      meta: {
        title: '大学生求职竞争力测评'
      },
      component: resolve => require(['@/pages/measure/test'], resolve)
    },
    {
      path: '/measure/report',
      meta: {
        title: '大学生求职竞争力测评'
      },
      component: resolve => require(['@/pages/measure/report'], resolve)
    },

    // 我的
    {
      path: '/aboutus',
      name: 'Aboutus',
      component: resolve => require(['@/pages/aboutus'], resolve)
    },
    {
      path: '*',
      name: 'NotFound',
      component: resolve => require(['@/pages/not-found'], resolve)
    }
  ]
})
