import Vue from 'vue'
import VueRouter from 'vue-router'
import {getItem} from '../common/utils'
Vue.use(VueRouter)

// 登录界面
const Login = () => import('../views/login/Login')
// 欢迎界面
const Welcome = () => import('../views/Welcome')
// 主界面
const Home = () => import('../views/Home')

// 人力管理
const DataInput = () => import('../views/humanage/DataInput')
const Training = () => import('../views/humanage/Training')
const Assessment = () => import('../views/humanage/Assessment')
const Staffappeal = () => import('../views/humanage/Staffappeal')

// 订单管理
const Demand = () => import('../views/ordermanage/Demand')
const Distribute = () => import('../views/ordermanage/Distribute')
const OrderGenerate = () => import('../views/ordermanage/OrderGenerate')
const PersonDispatch = () => import('../views/ordermanage/PersonDispatch')
const SalesVisit = () => import('../views/ordermanage/SalesVisit')
const OrderDelay = () => import('../views/ordermanage/OrderDelay')
const OrderRenewal = () => import('../views/ordermanage/OrderRenewal')

// 售后管理
const Feedback = () => import('../views/salemanage/Feedback')
const SaleDistribute = () => import('../views/salemanage/SaleDistribute')
const Handle = () => import('../views/salemanage/Handle')
const Review = () => import('../views/salemanage/Review')

// 报表管理
const CustomQuery = () => import('../views/reportmanage/CustomQuery')
const StaffQuery = () => import('../views/reportmanage/StaffQuery')
const OrderQuery = () => import('../views/reportmanage/OrderQuery')
const ComplaintQuery = () => import('../views/reportmanage/ComplaintQuery')

// 系统管理
const SysManage = () => import('../views/systemmanage/SysManage')



const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: '/home',
    component: Home,
    children: [
      // 人力管理
      {
        path: 'datainput',
        components: {
          content: DataInput
        },
        meta: {
          title: "资料录入"
        }
      },
      {
        path: 'training',
        components: {
          content: Training
        },
        meta: {
          title: "培训记录"
        }
      },
      {
        path: 'assessment',
        components: {
          content: Assessment
        },
        meta: {
          title: "考核评价"
        }
      },
      {
        path: 'staffappeal',
        components: {
          content: Staffappeal
        },
        meta: {
          title: "员工申诉"
        }
      },

      // 订单管理
      {
        path: 'demand',
        components: {
          content: Demand
        },
        meta: {
          title: "客户需求"
        }
      },
      {
        path: 'distribute',
        components: {
          content: Distribute
        },
        meta: {
          title: "手工分配"
        }
      },
      {
        path: 'ordergenerate',
        components: {
          content: OrderGenerate
        },
        meta: {
          title: "订单生成"
        }
      },
      {
        path: 'persondispatch',
        components: {
          content: PersonDispatch
        },
        meta: {
          title: "人员派出"
        }
      },
      // {
      //   path: 'salesvisit',
      //   components: {
      //     content: SalesVisit
      //   },
      //   meta: {
      //     title: "销售回访"
      //   }
      // },
      {
        path: 'orderdelay',
        components: {
          content: OrderDelay
        },
        meta: {
          title: "订单延期"
        }
      },
      // {
      //   path: 'orderrenewal',
      //   components: {
      //     content: OrderRenewal
      //   },
      //   meta: {
      //     title: "订单续签"
      //   }
      // },

      // 售后管理
      {
        path: 'feedback',
        components: {
          content: Feedback
        },
        meta: {
          title: "客户反馈"
        }
      },
      {
        path: 'saledistribute',
        components: {
          content: SaleDistribute
        },
        meta: {
          title: "手工分配"
        }
      },
      {
        path: 'handle',
        components: {
          content: Handle
        },
        meta: {
          title: "处理结果"
        }
      },
      {
        path: 'review',
        components: {
          content: Review
        },
        meta: {
          title: "客户回访"
        }
      },

      // 报表管理
      {
        path: 'customquery',
        components: {
          content: CustomQuery
        },
        meta: {
          title: "客户查询"
        }
      },
      {
        path: 'staffquery',
        components: {
          content: StaffQuery
        },
        meta: {
          title: "员工查询"
        }
      },
      {
        path: 'orderquery',
        components: {
          content: OrderQuery
        },
        meta: {
          title: "订单查询"
        }
      },
      {
        path: 'complaintquery',
        components: {
          content: ComplaintQuery
        },
        meta: {
          title: "投诉查询"
        }
      },
      {
        path: 'SysManage',
        components: {
          content: SysManage
        },
        meta: {
          title: "系统管理"
        }
      },
    ]
  },
  {
    path: '/welcome',
    component: Welcome,
    meta: {
      title: "欢迎"
    }
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history'
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 从from跳转到to
    document.title = to.meta.title
    next()
  } else {
    let userToken = getItem('userInfo')['userToken']
    if (userToken == null || userToken == '') {
      next('/login')
    }else {
      document.title = to.meta.title
      next()
    }
  }

})

export default router