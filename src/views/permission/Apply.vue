<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="18">
        <pf-panel title="搜索条件 >"
                  panel-class="pf-panel-search" title-class="pf-panel-title-search" body-class="pf-panel-body-search">
          <el-form label-width="100px" :model="searchVo" size="mini" label-position="left">
            <el-form-item label="环境:" prop="envCodes">
              <el-checkbox-group v-model="searchVo.envCodes">
                <el-checkbox-button label="开发" name="envCodes" value="1"></el-checkbox-button>
                <el-checkbox-button label="测试" name="envCodes" value="2"></el-checkbox-button>
                <el-checkbox-button label="预发" name="envCodes" value="3"></el-checkbox-button>
                <el-checkbox-button label="bate" name="envCodes" value="4"></el-checkbox-button>
                <el-checkbox-button label="线上" name="envCodes" value="5"></el-checkbox-button>

                <el-button type="text" class="pf-search-more">更多</el-button>
              </el-checkbox-group>
            </el-form-item>
            <pf-divider type="dotted"></pf-divider>
            <el-form-item label="业务线:" prop="bussinessIds">
              <el-checkbox-group v-model="searchVo.bussinessIds">
                <el-checkbox-button label="小班课" name="bussinessIds" value="1"></el-checkbox-button>
                <el-checkbox-button label="luna数据" name="bussinessIds" value="2"></el-checkbox-button>

                <el-button type="text" class="pf-search-more">更多</el-button>
              </el-checkbox-group>
            </el-form-item>
            <pf-divider type="dotted"></pf-divider>
            <el-form-item label="应用:" prop="appCodes">
              <el-checkbox-group v-model="searchVo.appCodes">
                <el-checkbox-button label="质效平台" name="appCodes" value="1"></el-checkbox-button>
                <el-checkbox-button label="管理端" name="appCodes" value="2"></el-checkbox-button>
                <el-checkbox-button label="crm" name="appCodes" value="3"></el-checkbox-button>
                <el-checkbox-button label="配置中心" name="appCodes" value="4"></el-checkbox-button>
                <el-checkbox-button label="老师端" name="appCodes" value="5"></el-checkbox-button>

                <el-button type="text" class="pf-search-more">更多</el-button>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </pf-panel>
        <pf-divider type="empty" height="10px"></pf-divider>
        <pf-panel panel-class="pf-panel-search" body-class="pf-panel-body-search">
        </pf-panel>
        <pf-divider type="empty" height="10px"></pf-divider>
        <pf-panel panel-class="pf-panel-list" body-class="pf-panel-body-list">
          <el-table
              :data="tableData"
              style="width: 100%"
              header-row-class-name="pf-table-header"
              cell-class-name="pf-table-cell">
            <el-table-column fixed="left" label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="text" size="small">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </pf-panel>
        <pf-divider type="empty" height="10px"></pf-divider>
        <el-pagination
            class="pf-pagination"
            :page-sizes="[20, 50, 100, 200]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="1000">
        </el-pagination>
      </el-col>
      <el-col :span="6">
        <pf-panel title="selected" body-class="pf-panel-body-selected">
          <el-tag
              v-for="tag in applyTags"
              :key="tag.value"
              class="pd-panel-block-tag"
              closable
              @close="removeTag(tag)">
            {{tag.label}}
          </el-tag>
        </pf-panel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Apply.vue",
    data() {
      return {
        applyTags:[{value:1, label:"管理员"}],
        searchVo: {
          envCodes: [],
          bussinessIds: [],
          appCodes: [],
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods :{
      removeTag : function (obj) {

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
  .pf-panel-search .pf-search-more{
    float: right;
  }
  .pf-table-header {
   background-color: #f5f5f5 !important;
  }
  .pf-table-header>th {
    background-color: #f5f5f5 !important;
  }
  .pf-table-cell{
    padding: 2px 0px !important;
  }
  .pf-pagination{
    text-align: center;
  }
  .pf-panel-body-selected{
    min-height: 350px;
  }

</style>