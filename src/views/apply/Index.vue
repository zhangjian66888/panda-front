<template>
  <div>
    <pf-panel title="搜索条件 >"
              panel-class="pf-panel-search"
              title-class="pf-panel-title-search"
              body-class="pf-panel-body-search">

      <el-form label-width="100px" :model="searchVo" size="mini" label-position="left">
        <el-form-item label="类型:">
          <el-checkbox-group v-model="searchVo.applyTypes">
            <el-checkbox-button :label="item.id" v-for="item in applyTypes">{{item.value}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <pf-divider type="dotted"></pf-divider>
        <el-form-item label="状态:">
          <el-checkbox-group v-model="searchVo.applyStates">
            <el-checkbox-button :label="item.id" v-for="item in applyStates">{{item.value}}</el-checkbox-button>
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
          :data="applyDatas"
          style="width: 100%"
          header-row-class-name="pf-table-header"
          cell-class-name="pf-table-cell">
        <el-table-column prop="applyTypeLabel" label="类型" width="180"/>
        <el-table-column prop="applyStateLabel" label="状态" width="180"/>
        <el-table-column prop="createTime" label="申请时间" width="180"/>
        <el-table-column prop="updateTime" label="更新时间" width="180"/>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row)">详情</el-button>
            <el-button v-if="scope.row.applyState == 0 || scope.row.applyState == 10" type="text" size="small" @click="cancel(scope.row)">取消
            </el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
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

    <el-dialog :visible.sync="detailVisible" title="详情" width="800px" class="pf-dialog-body">
      <el-row v-for="item in applyDetailDatas">
        <el-col :span="24">
          <pf-divider height="20px"></pf-divider>
          <el-row>
            <el-col :span="2">应用:</el-col>
            <el-col :span="6">{{item.appName}}</el-col>
            <el-col :span="2">状态:</el-col>
            <el-col :span="6">{{item.applyStateLabel}}</el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="2">审批人:</el-col>
            <el-col :span="6">{{item.approver || '无'}}</el-col>
            <el-col :span="2">审批时间:</el-col>
            <el-col :span="6">{{item.approveTime || '无'}}</el-col>
            <el-col :span="2">审批意见:</el-col>
            <el-col :span="6">{{item.approveOpinion || '无'}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="2">资源:</el-col>
            <el-col :span="22">
              <el-tag v-for="role in item.roles">
                {{role.envName}}-{{role.roleName}}
              </el-tag>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </el-dialog>
  </div>
</template>

<script>
  import _util from '@/assets/js/util';
  import _selectItem from '@/components/SelectItem.vue';

  export default {
    name: "Apply.vue",
    data() {
      return {
        searchUrl: '/panda/front/apply/search',
        cancelUrl: '/panda/front/apply/cancel',
        removeUrl: '/panda/front/apply/delete',
        detailUrl: '/panda/front/apply/detail',
        searchDisabled: false,
        saveDisabled: false,
        searchVo: {
          applyTypes: [],
          applyStates: [],
        },
        applyTypes: [],
        applyStates: [],
        applyDatas: [],
        pagination: {current: 1, pageSize: 20, total: 0},
        detailVisible: false,
        applyDetailDatas: [{
          "appName": "speed"
        }]
      }
    },
    created: function () {
      _selectItem.staticSelectItem(this, "applyType");
      _selectItem.staticSelectItem(this, "applyState");
    },
    methods: {
      search() {
        const params = {
          pageSize: this.pagination.pageSize,
          current: this.pagination.current,
          ...this.searchVo
        };
        this.searchDisabled = true;
        _util.requestPost(this, this.searchUrl, params, (data) => {
          this.applyDatas = data.records;
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
        this.searchVo.applyTypes = [];
        this.searchVo.applyStates = [];
      },
      cancel(row) {
        _util.requestPostParam(this, this.cancelUrl, {id: row.id}, (data) => {
          this.search();
        })
      },
      remove(row) {
        console.log("remote")
        _util.requestPostParam(this, this.removeUrl, {id: row.id}, (data) => {
          this.search();
        })
      },
      detail(row) {
        this.detailVisible = true;
        _util.requestGet(this, this.detailUrl, {id: row.id}, (data) => {
          this.applyDetailDatas = data;
        });
      }
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