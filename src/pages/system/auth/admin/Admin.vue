<template>
    <!--查询 start-->
    <a-card>
        <div>
            <a-form layout="horizontal">
                <div :class="advanced ? null: 'fold'">
                    <a-row>
                        <a-col :md="6" :sm="24">
                            <a-form-item
                                    label="账号名称"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入账号名称"/>
                            </a-form-item>
                        </a-col>
                        <span style="float: right; margin-top: 3px;">
                          <a-button icon="search" type="primary">查询</a-button>
                          <a-button style="margin-left: 8px">重置</a-button>
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
            </a-space>
            <!--头部菜单 end-->

            <standard-table
                    :columns="columns"
                    :dataSource="dataSource"
                    :selectedRows.sync="selectedRows"
                    @clear="onClear"
                    @change="onChange"
                    @selectedRowChange="onSelectChange"
            >
                <div slot="description" slot-scope="{text}">
                    {{text}}
                </div>
                <div slot="action" slot-scope="{text, record}">
                    <a style="margin-right: 8px">
                        <a-icon type="edit"/>
                        编辑
                    </a>
                    <a @click="deleteRecord(record.key)">
                        <a-icon type="delete"/>
                        删除
                    </a>
                </div>
                <template slot="statusTitle">
                    <a-icon @click.native="onStatusTitleClick" type="info-circle"/>
                </template>
            </standard-table>

        </div>
        <!--表格end-->

    </a-card>
</template>

<script>
    import StandardTable from '@/components/table/StandardTable'

    const columns = [
        {
            title: '规则编号',
            dataIndex: 'no'
        },
        {
            title: '描述',
            dataIndex: 'description',
            scopedSlots: {customRender: 'description'}
        },
        {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: true,
            needTotal: true,
            customRender: (text) => text + ' 次'
        },
        {
            dataIndex: 'status',
            needTotal: true,
            slots: {title: 'statusTitle'}
        },

        {
            title: '操作',
            scopedSlots: {customRender: 'action'}
        }
    ]

    const dataSource = []

    for (let i = 0; i < 100; i++) {
        dataSource.push({
            key: i,
            no: 'NO ' + i,
            description: '这是一段描述',
            callNo: Math.floor(Math.random() * 1000),
            status: Math.floor(Math.random() * 10) % 4,
            updatedAt: '2018-07-26'
        })
    }

    export default {
        components: {StandardTable},
        name: "Admin",
        data() {
            return {
                advanced: true,
                columns: columns,
                dataSource: dataSource,
                selectedRows: []
            }
        },
        methods: {
            deleteRecord(key) {
                this.dataSource = this.dataSource.filter(item => item.key !== key)
                this.selectedRows = this.selectedRows.filter(item => item.key !== key)
            },
            toggleAdvanced() {
                this.advanced = !this.advanced
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
            onChange() {
                this.$message.info('表格状态改变了')
            },
            onSelectChange() {
                this.$message.info('选中行改变了')
            },
            addNew() {
                this.dataSource.unshift({
                    key: this.dataSource.length,
                    no: 'NO ' + this.dataSource.length,
                    description: '这是一段描述',
                    callNo: Math.floor(Math.random() * 1000),
                    status: Math.floor(Math.random() * 10) % 4,
                    updatedAt: '2018-07-26'
                })
            },
            handleMenuClick(e) {
                if (e.key === 'delete') {
                    this.remove()
                }
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
