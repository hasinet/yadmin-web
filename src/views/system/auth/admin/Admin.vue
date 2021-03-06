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
                <a-button icon="delete" type="danger" @click="handleBatchDelete">批量删除</a-button>
            </a-space>
            <!--头部菜单 end-->
            <a-table
                    row-key="userId"
                    :columns="columns"
                    :dataSource="dataSource"
                    :pagination="pagination"
                    @change="onChange"
                    :loading="initLoading"
                    :data-source="dataSource"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            >
             <span slot="status" slot-scope="text, record">
              <a-tag v-if="record.status === 0">禁用</a-tag>
              <a-tag v-else color="#87d068">
                启用
              </a-tag>
             </span>>

                <span slot="action" slot-scope="text, record">
              <a-button style="background-color: #108ee9;border-color:#108ee9" icon="edit" type="primary"
                        size="small" @click="addOrUpdateHandle(record.userId)">编辑
              </a-button>
              <a-button size="small" type="danger" icon="delete" style="margin-left: 8px" @click="handleDelete(record)">
                删除
              </a-button>
            </span>
            </a-table>

        </div>
        <!--表格end-->

        <add-or-update
                @handleSubmit="resetSearch"
                ref="addOrUpdate">
        </add-or-update>

    </a-card>
</template>

<script>
    import {page, remove} from '@/services/system/auth/admin'
    import AddOrUpdate from "./modules/AddOrUpdate";

    export default {
        components: {AddOrUpdate},
        name: "Admin",
        data() {
            return {
                ids: [],
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
                    // {
                    //     title: 'ID',
                    //     dataIndex: 'userId',
                    // },
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
                selectedRowKeys: [],
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
             * 删除记录
             */
            handleDelete(item) {
                const app = this
                const modal = this.$confirm({
                    title: '您确定要删除该记录吗?',
                    content: '删除后不可恢复',
                    onOk() {
                        remove([item['userId']])
                            .then((result) => {
                                app.$message.success(result.data.message, 1.5)
                                app.resetSearch()
                            }).catch(() => {
                            modal.destroy()
                        })
                    }
                })
            },

            /**
             *批量删除
             */
            handleBatchDelete() {
                const app = this
                //判断一下
                let delIds = app.ids
                if (delIds.length === 0) {
                    app.$message.error('请选择需要删除的数据', 1.5)
                    return
                }
                const modal = this.$confirm({
                    title: '您确定要删除选择的记录吗?',
                    content: '删除后不可恢复',
                    onOk() {
                        remove(delIds)
                            .then((result) => {
                                app.$message.success(result.data.message, 1.5)
                                app.resetSearch()
                            }).catch(() => {
                            modal.destroy()
                        })
                    }
                })
            },

            /**
             *新增 - 修改
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
            /**
             * select 动作
             * @param row
             */
            onSelectChange(row) {
                this.selectedRowKeys = row;
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
