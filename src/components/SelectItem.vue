<script>
  import _util from '@/assets/js/util';

  function staticSelectItem(obj, type, all = false) {
    _util.requestGet(obj,
      "/panda/front/selectItem/static", {"type": type, "all": all},
      (data) => {
        obj[type + 's'] = data;
      });
  }
  function businessLineSelectItem(obj) {
    _util.requestGet(obj,
      "/panda/front/selectItem/businessLine", {},
      (data) => {
        obj.businessLines = data;
      });
  }

  function appSelectItem(obj, params = {}) {
    _util.requestGet(obj,
      "/panda/front/selectItem/app", {...params},
      (data) => {
        obj.apps = data;
      });
  }

  function envSelectItem(obj) {
    _util.requestGet(obj,
      "/panda/front/selectItem/env", {},
      (data) => {
        obj.envs = data;
      });
  }

  export default {
    staticSelectItem,
    businessLineSelectItem,
    appSelectItem,
    envSelectItem,
  }
</script>
