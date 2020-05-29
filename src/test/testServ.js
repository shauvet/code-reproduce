import { request } from '../../../../utils'

// 查询列表
export async function queryList(params) {
  return request({
    url: '/seller/shop/order/search',
    method: 'GET',
    data: params
  });
};

//确认付款
export async function payMethod(params) {
  return request({
    url: '/seller/order/confirmPayment',
    method: 'POST',
    data: params
  });
};


//获取店铺列表
export async function shopList(params) {
  return request({
    url: '/seller/shop/list',
    method: 'POST',
    data: params
  });
};


//模版下载
export async function excelUrl(params) {
  return request({
    url: '/seller/download/excel/url',
    method: 'GET',
    data: params
  });
};

//导入模版
export async function importExcel(params) {
  return request({
    url: '/seller/import/excel',
    method: 'POST',
    data: params
  });
};



//客审
export async function guestAdopt(params) {
  return request({
    url: '/seller/order/visitExamine',
    method: 'GET',
    data: params
  });
};


//客审，财审驳回
export async function guestRefuse(params) {
  return request({
    url: '/seller/order/rejectExamine',
    method: 'GET',
    data: params
  });
};

//终止
export async function termination(params) {
  return request({
    url: '/seller/order/end',
    method: 'GET',
    data: params
  });
};

//财审通过
export async function wealthAdopt(params) {
  return request({
    url: '/seller/order/financeExamine',
    method: 'GET',
    data: params
  });
};



//订单通过
export async function orderAdopt(params) {
  return request({
    url: '/seller/order/rejectPass',
    method: 'GET',
    data: params
  });
};


//确认已开发票
export async function confirmInvoice(params) {
  return request({
    url: '/seller/order/confirmInvoice',
    method: 'GET',
    data: params
  });
};


//提货确认
export async function extract(params) {
  return request({
    url: '/seller/order/fetch',
    method: 'GET',
    data: params
  });
};



















