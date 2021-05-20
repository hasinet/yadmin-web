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
                            tree-default-expand-all
                    >
                        <span v-if="key === '0-0-1'" slot="title" slot-scope="{ key, value }" style="color: #08c">
                          {{ value }}
                        </span>
                    </a-tree-select>

                </a-form-item>

                <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['name', {rules: [{required: true,message: '名称不得为空'}]}]"/>
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
    import {list} from '@/services/system/auth/menu'
    import {treeDataTranslate} from '@/utils/util'

    export default {
        name: "AddOrUpdate",
        data() {
            return {
                treeData:[],
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
                    value:'menuId'
                },
            }
        },
        methods: {
            init(id) {
                this.visible = true
                this.confirmLoading = false
                list().then(response => {
                    const menuData = response.data.data
                    this.treeData= treeDataTranslate(menuData, "menuId", "parentId")

                })
            },
            /**
             * 确认按钮
             */
            handleSubmit(e) {
                this.visible = false
            },
            /**
             * 关闭对话框事件
             */
            handleCancel() {
                this.visible = false
            },
        }
    }
</script>

<style scoped>

</style>
