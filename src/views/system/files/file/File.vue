<template>
    <a-card>
        <!--查询 start-->
        <div>
            <a-form layout="horizontal" :form="searchFrom">
                <div>
                    <a-row>
                        <a-col :md="8" :sm="24">
                            <a-form-item
                                    refs="searchFromRefs"
                                    label="文件名称"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入文件名称"
                                         v-decorator="['fileName']"
                                />
                            </a-form-item>
                        </a-col>

                        <a-col :md="8" :sm="24">
                            <a-form-item
                                    label="文件分组"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-select placeholder="请选择">
                                    <a-select-option value="1">关闭</a-select-option>
                                    <a-select-option value="2">运行中</a-select-option>
                                </a-select>
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
            <div style="margin-bottom: 18px;">
                <a-space class="operator">
                    <a-button icon="cloud-upload" type="primary" @click="addOrUpdateHandle()">上传</a-button>
                    <a-button icon="delete" type="danger" @click="handleBatchDelete">批量删除</a-button>
                </a-space>
            </div>
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

                <!-- 文件预览 -->
                <span slot="image" slot-scope="text, record">
                    <div class="preview-box">
                      <a :href="record.filePath" target="_blank">
                        <img :src="text"/>
                      </a>
                    </div>
                 </span>

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
                      <a-button size="small" type="danger" icon="delete" style="margin-left: 8px"
                                @click="handleDelete(record)">
                        删除
                      </a-button>
                </span>
            </a-table>

        </div>
        <!--表格end-->


    </a-card>
</template>

<script>
    import * as FileApi from '@/services/system/files/file'

    export default {
        name: "File",
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
                    //     title: '文件ID',
                    //     dataIndex: 'fileId',
                    // },
                    {
                        title: '文件预览',
                        dataIndex: 'filePath',
                        scopedSlots: {customRender: 'image'}
                    },
                    {
                        title: '文件名称',
                        dataIndex: 'fileName',
                    },
                    {
                        title: '文件类型',
                        dataIndex: 'fileType',
                    },
                    {
                        title: '文件大小',
                        dataIndex: 'fileSize',
                    },
                    {
                        title: '文件后缀',
                        dataIndex: 'fileExt',
                    },
                    {
                        title: '上传时间',
                        dataIndex: 'createTime',
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
                let fileName = this.searchFrom.getFieldValue('fileName')
                let searchParam = [
                    {column: 'file_name', type: 'like', value: fileName ? fileName : ""}
                ]
                FileApi.page({
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

    .preview-box {
        width: 120px;
        height: 80px;
        line-height: 80px;

        img {
            display: block;
            max-width: 100%;
            max-height: 100%;
        }

    }
</style>
