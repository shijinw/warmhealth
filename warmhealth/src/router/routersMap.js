// 静态路由
import Main from '@/components/main'
import parentView from '@/components/parent-view'
import Login from '@/view/login/login'
import Home from '@/view/single-page/home'
import Error401 from '@/view/error-page/401.vue'
import Error404 from '@/view/error-page/404.vue'
import Error500 from '@/view/error-page/500.vue'

// 动态权限路由
import TopicList from '@/view/steady/topicList/index'
import Topic from '@/view/steady/topic/topic'
import Lesson from '@/view/steady/lesson/lesson'
import Module from '@/view/steady/module/module'
import Game from '@/view/steady/game/game'
import Course from '@/view/steady/course/course'
import Role from '@/view/system/role/role'
import Resource from '@/view/system/resource/resource'
import User from '@/view/system/user/user'
import Log from '@/view/system/log/log'

import impotsystem  from '@/view/system/impotsystem/impotsystem'

import Patient from '@/view/patientList/patient/patient'
import Doctorlist from '@/view/patientList/patient/doctorlist'

import Symptom from '@/view/symptomList/symptom/symptom'
import Questionnaire from '@/view/questionnaireList/questionnaire/questionnaire'

import Gaoxueya from '@/view/questionnaireList/gaoxueya/gaoxueya'
import Fenshuziping from '@/view/questionnaireList/fenshuziping/fenshuziping'
import Zhongyiwenjuan from '@/view/questionnaireList/zhongyiwenjuan/zhongyiwenjuan'

import XueyaList from '@/view/xueya/xueyaList/xueyaList'

import hospitalList from '@/view/hospitalList/hospitalList.vue'
import departmentList  from '@/view/hospitalList/departmentList.vue'

import Soslist  from '@/view/Sos/Soslist.vue'

import auscultationList  from '@/view/auscultation/auscultationList.vue'

import addauscl  from '@/view/auscultation/addauscl.vue'

import FVCTestLIst  from '@/view/Lung/FVCTestLIst.vue'
import FVCReportList  from '@/view/Lung/FVCReportList.vue'
// 路由表
export const routerMap = {
  Main,
  parentView,
  Login,
  Home,
  Error401,
  Gaoxueya,
  Fenshuziping,
  Zhongyiwenjuan,
  Error404,
  Error500,
  TopicList,
  Topic,
  Lesson,
  XueyaList,
  Module,
  Game,
  Course,
  Role,
  Resource,
  User,
  Log,
  Patient,
  Symptom,
  Questionnaire,
  hospitalList,
  departmentList,
  Soslist,
  auscultationList,
  addauscl,
  Doctorlist,
  impotsystem,
  FVCTestLIst,
  FVCReportList
}

// 静态路由组合，不需要从接口获取的

export const staticRouters = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: Login
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: Home
      }
    ]
  },
  // {
  //   path: '/patientList',
  //   name: 'patientList',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '患者管理',
  //     notCache: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'patient_page',
  //       name: 'patient_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '患者管理',
  //         notCache: true
  //       },
  //       component: () => import('@/view/patientList/patient/patient.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/symptomList',
  //   name: 'symptomList',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '反馈症状',
  //     notCache: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'symptom_page',
  //       name: 'symptom_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '反馈症状列表',
  //         notCache: true
  //       },
  //       component: () => import('@/view/symptomList/symptom/symptom.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/questionnaireList',
  //   name: 'questionnaireList',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '问卷管理',
  //     notCache: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'questionnaire_page',
  //       name: 'questionnaire_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '问卷管理',
  //         notCache: true
  //       },
  //       component: () => import('@/view/questionnaireList/questionnaire/questionnaire.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/system',
  //   name: 'system',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '系统管理',
  //     notCache: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'resource_page',
  //       name: 'resource_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '资源管理',
  //         notCache: true
  //       },
  //       component: () => import('@/view/system/resource/resource.vue')
  //     },
  //     {
  //       path: 'role_page',
  //       name: 'role_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '角色管理',
  //         notCache: true
  //       },
  //       component: () => import('@/view/system/role/role.vue')
  //     },
  //     {
  //       path: 'user_page',
  //       name: 'user_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '用户管理',
  //         notCache: true
  //       },
  //       component: () => import('@/view/system/user/user.vue')
  //     },
  //     {
  //       path: 'log_page',
  //       name: 'log_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '日志管理',
  //         notCache: true
  //       },
  //       component: () => import('@/view/system/log/log.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/401',
  //   name: 'error_401',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: Error401
  // },
  // {
  //   path: '/500',
  //   name: 'error_500',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: Error404
  // },
  // {
  //   path: '*',
  //   name: 'error_404',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: Error404
  // },
  {
    path: '*',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: Error401
  }
]
