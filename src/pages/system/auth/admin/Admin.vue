<template>
    <!--查询 start-->
    <a-card>
        <div>
            <a-form layout="horizontal" :form="searchFrom">
                <div>
                    <a-row>
                        <a-col :md="6" :sm="24">
                            <a-form-item
                                    refs="searchFromRefs"
                                    label="账号名称"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入账号名称"
                                         v-decorator="['username']"
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
                <a-button icon="form" type="primary" @click="addOrUpdateHandle()">新增</a-button>
                <a-button icon="delete" type="danger">批量删除</a-button>
            </a-space>
            <!--头部菜单 end-->
            <standard-table
                    row-key="username"
                    :columns="columns"
                    :dataSource="dataSource"
                    :selectedRows.sync="selectedRows"
                    @clear="onClear"
                    @change="onChange"
                    :loading="initLoading"
                    :pagination="pagination"
                    @selectedRowChange="onSelectChange"
            >
                <div slot="status" slot-scope="{record}">
                    <a-tag v-if="record.status === 0">禁用</a-tag>
                    <a-tag v-else color="#87d068">
                        启用
                    </a-tag>
                </div>

                <div slot="action" slot-scope="{text, record}">
                    <a-button style="background-color: #108ee9;border-color:#108ee9" icon="edit" type="primary">编辑
                    </a-button>
                    <a-button icon="delete" style="margin-left: 8px">删除</a-button>
                </div>
            </standard-table>

        </div>
        <!--表格end-->

        <add-or-update
                @handleSubmit="resetSearch"
                ref="addOrUpdate">
        </add-or-update>

    </a-card>
</template>

<script>
    import StandardTable from '@/components/table/StandardTable'
    import {page} from '@/services/system/auth/admin'
    import AddOrUpdate from "./modules/AddOrUpdate";

    export default {
        components: {StandardTable, AddOrUpdate},
        name: "Admin",
        data() {
            return {
                visible: true,
                searchButtonLoading: false,
                resetButtonLoading: false,
                initLoading: true,
                searchFrom: this.$form.createForm(this),
                pagination: {
                    total: 0,
                    pageSize: 0,
                    showTotal: total => `共 ${total} 条数据`,
                },
                columns: [
                    {
                        title: '账号',
                        dataIndex: 'username',
                    },
                    {
                        title: '邮箱',
                        dataIndex: 'email',
                    },
                    {
                        title: '手机号',
                        dataIndex: 'mobile',
                    },
                    {
                        title: '状态',
                        scopedSlots: {customRender: 'status'}
                    },
                    {
                        title: '操作',
                        scopedSlots: {customRender: 'action'},
                        width: '230px',
                        align: 'center'
                    }
                ],
                dataSource: [],
                selectedRows: [],
                currentPage: 1
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
                let username = this.searchFrom.getFieldValue('username')
                let searchParam = [
                    {column: 'username', type: 'like', value: username ? username : ""}
                ]
                page({
                    currentPage: this.currentPage,
                    fields: searchParam,
                    limit: 2
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
             *新增 / 修改
             */
            addOrUpdateHandle(id) {
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                })
            },
            /**
             * 重置搜索表单
             */
            resetSearch() {
                this.searchFrom.resetFields();
                this.init("reset")
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


            deleteRecord(key) {
                this.dataSource = this.dataSource.filter(item => item.key !== key)
                this.selectedRows = this.selectedRows.filter(item => item.key !== key)
            },

            remove() {
                this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
                this.selectedRows = []
            },
            onClear() {
                this.$message.info('您清空了勾选的所有行')
            },
            onStatusTitleClick() {
                this.$message.info('你点击了状态栏表头')
            },

            onSelectChange() {
                this.$message.info('选中行改变了')
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
