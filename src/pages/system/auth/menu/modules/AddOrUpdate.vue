<template>
    <a-modal
            :title="!formId ? '新增' : '修改'"
            :width="720"
            :visible="visible"
            :confirmLoading="confirmLoading"
            :maskClosable="false"
            @ok="handleSubmit"
            @cancel="handleCancel"
            :bodyStyle="bodyStyle"
    >
        <a-spin :spinning="confirmLoading">
            <a-form :form="form">

                <a-form-item label="上级菜单" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-tree-select
                            v-model="value"
                            style="width: 100%"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                            :tree-data="treeData"
                            placeholder="请选择上级菜单"
                            :replaceFields="replaceFields"
                            tree-default-expand-all>
                    </a-tree-select>

                </a-form-item>

                <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['name']"/>
                </a-form-item>

                <a-form-item label="路由" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['router']"/>
                </a-form-item>

                <a-form-item label="path" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['path']"/>
                </a-form-item>

                <a-form-item label="跳转地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['redirect']"/>
                </a-form-item>

                <a-form-item label="权限标识" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['perms']"/>
                </a-form-item>

                <a-form-item label="icon图标" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['icon']"/>
                </a-form-item>

                <a-form-item label="是否显示" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-radio-group
                            v-decorator="['hidden', {initialValue: 1}]">
                        <a-radio :value="1">显示</a-radio>
                        <a-radio :value="0">隐藏</a-radio>
                    </a-radio-group>
                </a-form-item>

                <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input-number :min="0"
                                    v-decorator="['orderNumber',{initialValue: 0,rules: [{required: true,message: '排序不得为空'}]}]"/>
                </a-form-item>

            </a-form>
        </a-spin>

    </a-modal>
</template>

<script>
    import {list, saveAndUpdate} from '@/services/system/auth/menu'
    import {treeDataTranslate} from '@/utils/util'

    export default {
        name: "AddOrUpdate",
        data() {
            return {
                treeData: [],
                value: undefined,
                //是否弹窗
                visible: false,
                //id
                formId: null,
                // modal(对话框)确定按钮 loading
                confirmLoading: true,
                // 当前表单元素
                form: this.$form.createForm(this),
                //弹窗样式
                bodyStyle: {
                    'max-height': '500px',
                    'overflow': 'auto'
                },
                // 当前表单元素
                //form: this.$form.createForm(this),
                // 标签布局属性
                labelCol: {
                    span: 7
                },
                // 输入框布局属性
                wrapperCol: {
                    span: 13
                },
                //自定义tree的数据结构
                replaceFields: {
                    children: 'children',
                    title: 'name',
                    key: 'menuId',
                    value: 'menuId'
                },
            }
        },
        methods: {
            init(id) {
                this.visible = true
                this.confirmLoading = false
                list().then(response => {
                    const menuData = response.data.data
                    this.treeData = treeDataTranslate(menuData, "menuId", "parentId")

                    //头部插入
                    this.treeData.unshift({
                        "menuId": 0,
                        "name": "无上级菜单",
                    });
                    this.value = 0
                })
            },
            /**
             * 确认按钮
             */
            handleSubmit(e) {
                // if (this.confirmLoading === true) return
                e.preventDefault()
                const {form: {validateFields}} = this
                // 表单验证
                validateFields((errors, values) => {
                    // 提交到后端api
                    if (errors === null) {
                        this.onFormSubmit(values)
                    }
                })
            },

            /**
             * 提交到后端api
             */
            onFormSubmit(values) {
                let that = this
                that.confirmLoading = true
                saveAndUpdate(values).then((result) => {
                    // 显示成功
                    that.$message.success(result.data.message, 1.5)
                    // 关闭对话框
                    that.handleCancel()
                    // 通知父端组件提交完成了
                    that.$emit('handleSubmit', values)
                    that.confirmLoading = false
                }).catch((e) => {
                    setTimeout(function () {
                        console.log(e)
                        that.confirmLoading = false
                    },200)
                })
            },

            /**
             * 关闭对话框事件
             */
            handleCancel() {
                this.visible = false
                this.treeData = []
                this.value = undefined
                this.form.resetFields()
            },
        }
    }
</script>

<style scoped>

</style>
