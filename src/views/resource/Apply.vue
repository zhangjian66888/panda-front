<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="18">
        <pf-panel title="搜索条件 >"
                  panel-class="pf-panel-search"
                  title-class="pf-panel-title-search"
                  body-class="pf-panel-body-search">

          <el-form label-width="100px" :model="searchVo" size="mini" label-position="left">
            <el-form-item label="环境:" prop="envCodes">
              <el-checkbox-group v-model="searchVo.envCodes">
                <el-checkbox-button :label="item.id" v-for="item in envs">{{item.value}}</el-checkbox-button>
                <el-button type="text" class="pf-search-more">更多</el-button>
              </el-checkbox-group>
            </el-form-item>
            <pf-divider type="dotted"></pf-divider>
            <el-form-item label="业务线:" prop="bussinessIds">
              <el-checkbox-group v-model="searchVo.businessLineIds" @change="businessLineChange">
                <el-checkbox-button :label="item.id" v-for="item in businessLines">{{item.value}}</el-checkbox-button>

                <el-button type="text" class="pf-search-more">更多</el-button>
              </el-checkbox-group>
            </el-form-item>
            <pf-divider type="dotted"></pf-divider>
            <el-form-item label="应用:" prop="appCodes">
              <el-checkbox-group v-model="searchVo.appCodes">
                <el-checkbox-button :label="item.id" v-for="item in apps">{{item.value}}</el-checkbox-button>
                <el-button type="text" class="pf-search-more">更多</el-button>
              </el-checkbox-group>
            </el-form-item>
          </el-form>

        </pf-panel>
        <pf-divider type="empty" height="10px"></pf-divider>
        <pf-panel panel-class="pf-panel-btn" body-class="pf-panel-body-btn">

          <el-button type="text" @click="search" :disabled="searchDisabled">搜索</el-button>
          <el-button type="text" @click="reset">重置</el-button>

        </pf-panel>
        <pf-divider type="empty" height="10px"></pf-divider>
        <pf-panel panel-class="pf-panel-list" body-class="pf-panel-body-list">

          <el-table
              :data="roleDatas"
              style="width: 100%"
              header-row-class-name="pf-table-header"
              cell-class-name="pf-table-cell">
            <el-table-column fixed="left" label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="selectRole(scope.row)">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="envName" label="环境" width="180"/>
            <el-table-column prop="businessLineName" label="业务线" width="180"/>
            <el-table-column prop="appName" label="应用" width="180"/>
            <el-table-column prop="roleName" label="角色"/>
          </el-table>

        </pf-panel>
        <pf-divider type="empty" height="10px"></pf-divider>
        <el-pagination
            class="pf-pagination"
            :page-sizes="[10, 20, 50, 100, 200]"
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="pagination.pageSize"
            :current-page="pagination.current"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @prev-click="handleCurrentChange"
            @next-click="handleCurrentChange"
        >
        </el-pagination>
      </el-col>
      <el-col :span="6">
        <pf-panel title="selected"
                  body-class="pf-panel-body-selected">
          <el-tag
              v-for="tag in applyTags"
              :key="tag.value"
              class="pd-panel-block-tag"
              closable
              @close="removeRole(tag)">
            {{tag.label}}
          </el-tag>
          <template slot="footer">
            <el-button type="text" @click="submitApply" :disabled="saveDisabled">保存</el-button>
            <el-button type="text" @click="resetApply">重置</el-button>
          </template>
        </pf-panel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _util from '@/assets/js/util';
  import _selectItem from '@/components/SelectItem.vue';

  export default {
    name: "Apply.vue",
    data() {
      return {
        searchUrl: '/panda/front/resource/search',
        submitApplyUrl: '/panda/front/resource/apply',
        searchDisabled: false,
        saveDisabled: false,
        applyTags: [],
        searchVo: {
          envCodes: [],
          businessLineIds: [],
          appCodes: [],
        },
        envs: [],
        businessLines: [],
        apps: [],
        roleDatas: [],
        pagination: {current: 1, pageSize: 20, total: 0},
      }
    },
    created: function () {
      _selectItem.envSelectItem(this);
      _selectItem.businessLineSelectItem(this);
    },
    methods: {
      removeRole(val) {
        this.applyTags.splice(this.applyTags.indexOf(val), 1);
      },
      selectRole(row) {
        let selected = false;
        this.applyTags.forEach((tag, index) => {
          if (tag.value == row.id) {
            this.$message({type: 'error', message: "请勿重复添加"});
            selected = true;
          }
        });
        if (!selected) {
          let tmp = {value: row.id, label: row.envName + '-' + row.businessLineName + '-' + row.appName + '-' + row.roleName};
          this.applyTags.push(tmp);
        }
      },
      businessLineChange(val) {
        if (this.searchVo.businessLineIds.length > 0) {
          _selectItem.appSelectItem(this, {businessLineId: this.searchVo.businessLineIds.join(",")});
        } else {
          this.apps = [];
        }
      },
      search() {
        const params = {
          pageSize: this.pagination.pageSize,
          current: this.pagination.current,
          ...this.searchVo
        };
        this.searchDisabled = true;
        _util.requestPost(this, this.searchUrl, params, (data) => {
          this.roleDatas = data.records;
          this.pagination.total = data.total;
          this.searchDisabled = false;
        });
      },
      handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.search();
      },
      handleCurrentChange(val) {
        this.pagination.current = val;
        this.search();
      },
      reset() {
        this.searchVo.envCodes = [];
        this.searchVo.businessLineIds = [];
        this.searchVo.appCodes = [];
      },
      submitApply() {
        this.saveDisabled = true;
        let roleIds = this.applyTags.map(tag => tag.value);
        _util.requestPost(this, this.submitApplyUrl, {roleIds: roleIds}, (data) => {
          this.saveDisabled = false;
        });
      },
      resetApply() {
        this.saveDisabled = false;
        this.applyTags = [];
      },
    }
  }
</script>

<style>
  .pf-panel-search {
  }

  .pf-panel-title-search {
    padding: 5px 15px;
  }

  .pf-panel-body-search {
    border: 1px solid #ddd;
    min-height: 30px;
    padding: 5px 15px;
  }

  .pf-panel-btn {
  }

  .pf-panel-body-btn {
    border: 1px solid #ddd;
    min-height: 20px;
    padding: 0px;
    text-align: center;
  }

  .pf-panel-body-btn .el-button--text {
    padding: 5px 20px !important;
  }

  .pf-panel-search .el-checkbox-group > label {
    margin-right: 10px;
  }

  .pf-panel-search .el-checkbox-group > label .el-checkbox-button__inner {
    border: 0 !important;
    border-radius: 0 !important;
  }

  .pf-panel-search .el-form-item {
    margin-bottom: 2px !important;
  }

  .pf-panel-search .pf-search-more {
    float: right;
  }

  .pf-table-header {
    background-color: #f5f5f5 !important;
  }

  .pf-table-header > th {
    background-color: #f5f5f5 !important;
  }

  .pf-table-cell {
    padding: 2px 0px !important;
  }

  .pf-pagination {
    text-align: center;
  }

  .pf-panel-body-selected {
    min-height: 350px;
  }

</style>