import Layout from '@/layout/index'
const map = {
  constructionInfo: () => import('@/views/systemManagement/constructionInfo'),
  GBCascade: () => import('@/views/systemManagement/GBCascade'),
  networkConfig: () => import('@/views/systemManagement/networkConfig'),
  userManagement: () => import('@/views/userManagement/index'),
  videoConfig: () => import('@/views/videoConfig/index'),
  ceshiLayout: () => import('@/views/ceshi/index'),
  ceshiDir1Cmp1: () => import('@/views/ceshi/dir1/cmp1'),
  ceshiDir1Cmp2: () => import('@/views/ceshi/dir1/cmp2'),
  ceshiDir1Cmp3: () => import('@/views/ceshi/dir1/cmp3'),
  ceshiDir2Cmp1: () => import('@/views/ceshi/dir2/cmp1')
}
export const routeData = [
  {
    name:'视频',
    path:'/videoConfig',
    source:'lock',
    component: Layout,
    meta: {
      menu: true
    },
    key: '0',
    children: [
      {
        name:'视频管理',
        path:'/videoConfig/index',
        component: map.videoConfig,
        source:'username',
        key: '0-1',
        meta: {
          name: 'videoConfig',
          isTag: true,
          menu: true
        }
      }
    ]
  },
  {
    name:'用户',
    path:'/userManagement',
    component: Layout,
    source:'username',
    key: '1',
    meta: {
      menu: true
    },
    children: [
      {
        name:'用户管理',
        path:'/userManagement/index',
        component: map.userManagement,
        source:'username',
        key: '1-1',
        meta: {
          name: 'userManagement',
          isTag: true,
          menu: true
        }
      }
    ]
  },
  {
    name:'系统管理',
    path:'/systemManagement',
    component: Layout,
    source:'username',
    meta: {
      menu: true
    },
    key: '2',
    children: [
      {
        name:'网络配置',
        path:'/systemManagement/networkConfig',
        component: map.networkConfig,
        source:'lock',
        key: '2-1',
        meta: {
          name: 'networkConfig',
          isTag: true,
          menu: true
        }
      },
      {
        name:'国标级联',
        path:'/systemManagement/GBCascade',
        component: map.GBCascade,
        source:'navigation',
        key: '2-2',
        meta: {
          name: 'GBCascade',
          isTag: true,
          menu: true
        }
      },
      {
        name:'工地信息',
        path:'/systemManagement/constructionInfo',
        component: map.constructionInfo,
        source:'password',
        key: '2-3',
        meta: {
          name: 'constructionInfo',
          isTag: true,
          menu: true
        }
      }
    ],
  },
  {
    path:'*',
    redirect: '/404'
  }
]
