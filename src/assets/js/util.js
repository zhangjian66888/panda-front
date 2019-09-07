import Axios from '@/_axios';
import _global from '@/_global';

function requestGet(vueObj, url, params = {}, successFun) {
  Axios({
    url: _global.backUrl + url,
    method: "get",
    params: params,
    type: "json"
  }).then(response => {
    let data = response.data;
    if (data.code == 0) {
      if (successFun) {
        successFun(data.data);
      }
    } else {
      vueObj.$message({
        type: 'error', message: data.msg
      });
    }
  }).catch(e => {
  });
}

function requestPost(vueObj, url, params = {}, successFun, errorFun) {
  Axios({
    url: _global.backUrl + url,
    method: "post",
    data: JSON.stringify(params),
    type: "json"
  }).then(response => {
    let data = response.data;
    if (data.code == 0) {
      vueObj.$message({
        type: 'success', message: data.msg
      });
      if (successFun) {
        successFun(data.data);
      }
    } else {
      vueObj.$message({
        type: 'error', message: data.msg
      });
      if (errorFun) {
        errorFun();
      }
    }
  }).catch(e => {
    /*vueObj.$message({
      type: 'error', message: e.data
    });*/
  });
}

function requestPostParam(vueObj, url, params = {}, successFun, errorFun) {
  console.log(url,params)
  Axios({
    url: _global.backUrl + url,
    method: "post",
    params: params,
    type: "json"
  }).then(response => {
    let data = response.data;
    if (data.code == 0) {
      vueObj.$message({
        type: 'success', message: data.msg
      });
      if (successFun) {
        successFun(data.data);
      }
    } else {
      vueObj.$message({
        type: 'error', message: data.msg
      });
      if (errorFun) {
        errorFun();
      }
    }
  }).catch(e => {
    /*vueObj.$message({
      type: 'error', message: e.data
    });*/
  });
}

function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

function groupBy(array, f) {
  let groups = {};
  array.forEach(function (o) {
    let group = f(o);
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return groups;
  // return Object.keys(groups).map(function (group) {
  //   return groups[group];
  // });
}


export default {
  requestGet,
  requestPost,
  requestPostParam,
  getUrlKey,
  groupBy,
}


