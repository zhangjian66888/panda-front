<script>
  import _util from '@/assets/js/util';

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
    businessLineSelectItem,
    appSelectItem,
    envSelectItem,
  }
</script>
