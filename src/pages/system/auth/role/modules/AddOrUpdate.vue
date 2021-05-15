<template>
    <drag-modal-vue
            :maskClosable="false"
            :width="720"
            v-model="visible"
            :title="!formId ? '新增' : '修改'"
    >


        <a-tree
                v-model="checkedKeys"
                checkable
                :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent"
                :selected-keys="selectedKeys"
                :tree-data="treeData"
                @expand="onExpand"
                @select="onSelect"


                @check="onBusinessSelectChange"
                :checkedKeys="checkedKeys"

        />


    </drag-modal-vue>
</template>

<script>
    const treeData = [
        {
            title: '0-0',
            key: '0-0',
            children: [
                {
                    title: '一级01',
                    key: '0-0-0',
                    children: [
                        {title: '0-0-0-0', key: '0-0-0-0'},
                        {title: '0-0-0-1', key: '0-0-0-1'},
                        {title: '0-0-0-2', key: '0-0-0-2'},
                    ],
                },
                {
                    title: '0-0-1',
                    key: '0-0-1',
                    children: [
                        {title: '0-0-1-0', key: '0-0-1-0'},
                        {title: '0-0-1-1', key: '0-0-1-1'},
                        {title: '0-0-1-2', key: '0-0-1-2'},
                    ],
                },
                {
                    title: '0-0-2',
                    key: '0-0-2',
                },
            ],
        },
        {
            title: '0-1',
            key: '0-1',
            children: [
                {title: '0-1-0-0', key: '0-1-0-0'},
                {title: '0-1-0-1', key: '0-1-0-1'},
                {title: '0-1-0-2', key: '0-1-0-2'},
            ],
        },
        {
            title: '0-2',
            key: '0-2',
        },
    ];

    export default {
        name: "AddOrUpdate",
        data() {
            return {
                //是否弹窗
                visible: false,
                //id
                formId: null,
                //tree
                expandedKeys: ['0-0-0', '0-0-1'],
                autoExpandParent: true,
                //原来是这样的
                checkedKeys: [],
                selectedKeys: [],
                treeData,
                businessSelectedRowKeys: [],
                allSelectedNodes: [],
            }
        },
        // watch: {
        //     checkedKeys(val, halfChecked) {
        //         console.log('onCheck11', halfChecked);
        //         console.log(this.allSelectedNodes)
        //     },
        // },
        methods: {
            onBusinessSelectChange(selectedKeys, info) {
                // console.log('selectedKeys changed: ', selectedKeys);
                // console.log('info changed: ', info);
                // 已勾选子节点以及半勾选状态的父节点
                this.allSelectedNodes = selectedKeys.concat(info.halfCheckedKeys);
                this.businessSelectedRowKeys = selectedKeys;
                console.log(this.allSelectedNodes)
            },


            onExpand(expandedKeys) {
                console.log('onExpand', expandedKeys);
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys;
                this.autoExpandParent = false;
            },
            onCheck(checkedKeys) {
                console.log('onCheck', checkedKeys);
                this.checkedKeys = checkedKeys;
            },
            onSelect(selectedKeys, info) {
                console.log('onSelect', info);
                this.selectedKeys = selectedKeys;
            },
            /**
             *数据初始化
             */
            init(id) {
                //this.confirmLoading = true
                this.visible = true
            }
        }
    }
</script>

<style scoped>

</style>
