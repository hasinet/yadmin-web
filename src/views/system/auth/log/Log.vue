<template>
  <a-card>
    <!--查询 start-->
    <div>
      <a-form layout="horizontal" :form="searchFrom">
        <div>
          <a-row>
            <a-col :md="6" :sm="24">
              <a-form-item
                  refs="searchFromRefs"
                  label="用户名称"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入用户名称"
                         v-decorator="['username']"
                />
              </a-form-item>
            </a-col>

            <a-col :md="10" :sm="24">
              <a-form-item
                  label="操作时间"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18}">

                <a-range-picker
                    @change="onChangeDate"
                    v-decorator="['createTime']"
                    :show-time="{ hideDisabledOptions: true, defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],}"
                    format="YYYY-MM-DD HH:mm:ss"/>

              </a-form-item>
            </a-col>


            <span style="float: right; margin-top: 3px;">
                          <a-button icon="search" @click="init('search')" type="primary"
                                    :loading="searchButtonLoading">查询</a-button>
                          <a-button icon="undo"
                                    @click="resetSearch"
                                    :loading="resetButtonLoading"
                                    style="margin-left: 8px">重置</a-button>
                        </span>
          </a-row>
        </div>
      </a-form>
    </div>
    <!--查询 end-->
    <a-table
        row-key="id"
        :columns="columns"
        :pagination="pagination"
        @change="onChange"
        :loading="initLoading"
        :data-source="dataSource"
        :scroll="{ x: 2500 }"
    >
    </a-table>

  </a-card>
</template>

<script>
import moment from 'moment'

import {page} from '@/services/system/auth/log'


export default {
  name: "Log",
  data() {
    return {
      searchButtonLoading: false,
      resetButtonLoading: false,
      //搜索表单
      searchFrom: this.$form.createForm(this),
      //初始化加载
      initLoading: true,
      //分页设置
      pagination: {
        total: 0,
        pageSize: 0,
        showTotal: total => `共 ${total} 条数据`,
      },
      advanced: true,
      selectedRows: [],
      //时间搜索
      createTime: [],
      //数据源
      dataSource: [],
      //表格
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          fixed: 'left',
          width:'150px'

        },
        {
          title: '操作方法',
          dataIndex: 'actionMethod',
          width:'150px'
        },
        {
          title: '请求方法',
          dataIndex: 'method',
          width:'300px'
        },
        {
          title: '参数',
          dataIndex: 'params',
        },
        {
          title: '执行时长(毫秒)',
          dataIndex: 'time',
          width:'150px'
        },
        {
          title: 'IP地址',
          dataIndex: 'ip',
          width:'200px'
        },
        {
          title: '操作时间',
          dataIndex: 'createDate',
          fixed: 'right',
          width:'200px'
        },
      ]
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    moment,
    /**
     *初始化数据
     */
    init(type = "") {
      this.buttonLoading(type, true)
      let username = this.searchFrom.getFieldValue('username')
      let searchParam = [
        {column: 'username', type: 'like', value: username ? username : ""},
        {column: 'start_time', type: 'betweenDate', value: this.createTime.length === 0 ? "" : this.createTime.toString()}
      ]

      page({
        currentPage: this.currentPage,
        fields: searchParam,
        limit: 5
      }).then(response => {
        const {data} = response.data
        this.dataSource = data.records
        this.pagination.pageSize = data.size
        this.pagination.total = data.total
        this.initLoading = false
        this.buttonLoading(type, false)
      })
    },

    /**
     * 按钮的loading状态
     * @param type
     * @param status
     */
    buttonLoading(type, status) {
      if (type === "search") {
        this.searchButtonLoading = status
      }
      if (type === "reset") {
        this.resetButtonLoading = status
      }
      this.initLoading = status
    },
    /**
     * 重置搜索表单
     */
    resetSearch() {
      this.searchFrom.resetFields();
      this.createTime = []
      this.init("reset")
    },
    //时间改变
    onChangeDate(date, dateString) {
      this.createTime = dateString
    },
    /**
     * 分页处理
     * @param selectedRowKeys
     */
    onChange(selectedRowKeys) {
      this.currentPage = selectedRowKeys.current
      this.init()
    },
  }
}
</script>

<style scoped>

</style>
