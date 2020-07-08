import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 人力管理
const DataInput = () => import('../views/humanage/DataInput')
const Training = () => import('../views/humanage/Training')
const Assessment = () => import('../views/humanage/Assessment')

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



const routes = [
  // 人力管理
  {
    path: '/datainput',
    component: DataInput,
    meta: {
      title: "资料录入"
    }
  },
  {
    path: '/training',
    component: Training,
    meta: {
      title: "培训记录"
    }
  },
  {
    path: '/assessment',
    component: Assessment,
    meta: {
      title: "考核评价"
    }
  },

  // 订单管理
  {
    path: '/demand',
    component: Demand,
    meta: {
      title: "客户需求"
    }
  },
  {
    path: '/distribute',
    component: Distribute,
    meta: {
      title: "手工分配"
    }
  },
  {
    path: '/ordergenerate',
    component: OrderGenerate,
    meta: {
      title: "订单生成"
    }
  },
  {
    path: '/persondispatch',
    component: PersonDispatch,
    meta: {
      title: "人员派出"
    }
  },
  {
    path: '/salesvisit',
    component: SalesVisit,
    meta: {
      title: "销售回访"
    }
  },
  {
    path: '/orderdelay',
    component: OrderDelay,
    meta: {
      title: "订单延期"
    }
  },
  {
    path: '/orderrenewal',
    component: OrderRenewal,
    meta: {
      title: "订单续签"
    }
  },

  // 售后管理
  {
    path: '/feedback',
    component: Feedback,
    meta: {
      title: "客户反馈"
    }
  },
  {
    path: '/saledistribute',
    component: SaleDistribute,
    meta: {
      title: "手工分配"
    }
  },
  {
    path: '/handle',
    component: Handle,
    meta: {
      title: "处理结果"
    }
  },
  {
    path: '/review',
    component: Review,
    meta: {
      title: "客户回访"
    }
  },

  // 报表管理
  {
    path: '/customquery',
    component: CustomQuery,
    meta: {
      title: "客户查询"
    }
  },
  {
    path: '/staffquery',
    component: StaffQuery,
    meta: {
      title: "员工查询"
    }
  },
  {
    path: '/orderquery',
    component: OrderQuery,
    meta: {
      title: "订单查询"
    }
  },
  {
    path: '/complaintquery',
    component: ComplaintQuery,
    meta: {
      title: "投诉查询"
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 从from跳转到to
  document.title = to.matched[0].meta.title
  next()
}) 

export default router