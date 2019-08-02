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

function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

export default {
  requestGet,
  requestPost,
  getUrlKey
}


