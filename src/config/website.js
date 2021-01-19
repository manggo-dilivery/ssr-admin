/**
 * 全局配置文件
 */
export default {
  title: "SSR",
  logo: "S",
  key: 'saber',//配置主键,目前用于存储
  indexTitle: 'SSR Admin',
  clientId: 'saber', // 客户端id
  clientSecret: 'saber_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  tokenTime: 3000,
  tokenHeader: 'Blade-Auth',
  //http的status默认放行列表
  statusWhiteList: []
}
