<template>
    <a-modal
            title="日志列表"
            :visible="visible"
            :width="1000"
            :confirmLoading="confirmLoading"
            :bodyStyle="bodyStyle"
            @cancel="handleCancel"
    >
        <template slot="footer">
            <a-button key="back" @click="handleCancel">
                关闭
            </a-button>
        </template>


        <!--查询 start-->
        <div>
            <a-form layout="horizontal" :form="searchFrom">
                <div>
                    <a-row>
                        <a-col :md="8" :sm="24">
                            <a-form-item
                                    refs="searchFromRefs"
                                    label="任务ID"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入任务ID"
                                         v-decorator="['logId']"
                                />
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

        <standard-table
                row-key="logId"
                :columns="columns"
                :dataSource="dataSource"
                :selectedRows.sync="selectedRows"
                @change="onChange"
                :loading="initLoading"
                :pagination="pagination"
                @selectedRowChange="onSelectChange"
        >

            <div slot="status" slot-scope="{record}">
                <a-tag v-if="record.status !== 0">失败</a-tag>
                <a-tag v-else color="#87d068">
                    成功
                </a-tag>
            </div>

        </standard-table>


    </a-modal>
</template>

<script>
    import StandardTable from '@/components/table/StandardTable'
    import {logPage} from '@/services/system/monitor/quartz'

    export default {
        name: "ScheduleLog",
        components: {StandardTable},
        data() {
            return {
                //是否弹窗
                visible: false,
                // modal(对话框)确定按钮 loading
                confirmLoading: false,
                //弹窗样式
                bodyStyle: {
                    'max-height': '700px',
                    'overflow': 'auto'
                },
                //搜索表单
                searchFrom: this.$form.createForm(this),
                //分页
                pagination: {
                    total: 0,
                    pageSize: 0,
                    showTotal: total => `共 ${total} 条数据`,
                },
                //搜索加载
                searchButtonLoading: false,
                //重置加载
                resetButtonLoading: false,
                //初始话加载
                initLoading: true,
                //数据源
                dataSource: [],
                selectedRows: [],
                //表格
                columns: [
                    {
                        title: '日志ID',
                        dataIndex: 'logId',
                    },
                    {
                        title: '任务ID',
                        dataIndex: 'jobId',
                    },
                    {
                        title: 'bean名称',
                        dataIndex: 'beanName',
                    },
                    {
                        title: '方法名称',
                        dataIndex: 'methodName',
                    },
                    {
                        title: '参数',
                        dataIndex: 'params',
                    },

                    {
                        title: '状态',
                        scopedSlots: {customRender: 'status'}
                    },
                    {
                        title: '耗时(单位: 毫秒)',
                        dataIndex: 'times',
                    },
                    {
                        title: '执行时间',
                        dataIndex: 'createTime',
                    },
                ]
            }
        },
        methods: {
            /**
             *数据初始化
             */
            init(type = "") {
                this.confirmLoading = true
                this.visible = true
                this.buttonLoading(type, true)
                let logId = this.searchFrom.getFieldValue('logId')
                let searchParam = [];
                if (logId) {searchParam = [{column: 'log_id', type: 'eq', value: logId}]}
                logPage({
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
             * @returns void
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
                this.init("reset")
            },

            /**
             * 关闭对话框事件
             */
            handleCancel() {
                this.visible = false
                this.searchFrom.resetFields();
                this.selectedRows = []
            },
            /**
             * 分页处理
             * @param selectedRowKeys
             */
            onChange(selectedRowKeys) {
                this.currentPage = selectedRowKeys.current
                this.init()
            },
            /**
             * select 动作
             * @param row
             */
            onSelectChange(row) {
                this.ids = row
            }
        }
    }
</script>

<style scoped>

</style>
