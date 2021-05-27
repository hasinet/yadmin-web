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
                                    label="bean名称"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入bean名称"
                                         v-decorator="['beanName']"
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
        <!--查询 end-->

        <!--表格 start-->
        <div>
            <!--头部菜单 start-->
            <a-space class="operator">
                <a-button icon="form" type="primary">新增</a-button>
                <a-button icon="delete" type="danger">批量删除</a-button>
                <a-button icon="forward"
                          style=" color: #fff; background-color: #e6a23c; border-color: #e6a23c;">批量暂停
                </a-button>
                <a-button icon="pause"
                          style=" color: #fff; background-color: #67c23a; border-color: #67c23a;">批量恢复
                </a-button>
                <a-button icon="thunderbolt"
                          style=" color: #fff; background-color: #409eff; border-color: #409eff;">批量立即执行
                </a-button>
                <a-button icon="file-search"
                          style=" color: #fff; background-color: #ffba00; border-color: #ffba00;">日志列表
                </a-button>
            </a-space>
            <!--头部菜单 end-->

            <standard-table
                    row-key="jobId"
                    :columns="columns"
                    :dataSource="dataSource"
                    :selectedRows.sync="selectedRows"
                    @change="onChange"
                    :loading="initLoading"
                    :pagination="pagination"
                    @selectedRowChange="onSelectChange"
            >

                <div slot="action" slot-scope="{text, record}">
                    <a-button
                            size="small"
                            style="background-color: #108ee9;border-color:#108ee9"
                            icon="edit"
                            type="primary"
                    >编辑
                    </a-button>
                    <a-button
                            type="danger"
                            size="small"
                            icon="delete"
                            style="margin-left: 8px"
                    >删除
                    </a-button>

                    <a-button size="small" icon="forward"
                              style=" color: #fff; background-color: #e6a23c; border-color: #e6a23c;margin-top: 8px;">
                        暂停
                    </a-button>

                    <a-button size="small" icon="pause"
                              style=" color: #fff; background-color: #67c23a; border-color: #67c23a;margin-top: 8px;margin-left: 8px">
                        恢复
                    </a-button>

                    <a-button size="small" icon="thunderbolt"
                              style=" color: #fff; background-color: #409eff; border-color: #409eff;margin-top: 8px;">
                        立即执行
                    </a-button>
                </div>

            </standard-table>
        </div>


    </a-card>
</template>

<script>
    import StandardTable from '@/components/table/StandardTable'
    import {page, remove} from '@/services/system/monitor/quartz'

    export default {
        components: {StandardTable},
        name: "Quartz",
        data() {
            return {
                searchButtonLoading: false,
                resetButtonLoading: false,
                initLoading: true,
                searchFrom: this.$form.createForm(this),
                selectedRows: [],
                pagination: {
                    total: 0,
                    pageSize: 0,
                    showTotal: total => `共 ${total} 条数据`,
                },
                columns: [
                    {
                        title: '任务id',
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
                        title: 'cron表达式',
                        dataIndex: 'cronExpression',
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                    },
                    {
                        title: '操作',
                        scopedSlots: {customRender: 'action'},
                        width: '230px',
                        align: 'center'
                    }
                ]
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            /**
             *初始化数据
             */
            init(type = "") {
                this.buttonLoading(type, true)
                let beanName = this.searchFrom.getFieldValue('beanName')
                let searchParam = [
                    {column: 'bean_name', type: 'like', value: beanName ? beanName : ""}
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
                }).catch(() => {
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

<style lang="less" scoped>
    .fold {
        width: calc(100% - 216px);
        display: inline-block
    }

    .operator {
        margin-bottom: 18px;
    }

    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
    }
</style>
