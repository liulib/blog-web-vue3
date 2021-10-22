<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { Form, message as Message } from 'ant-design-vue'

import { ICategory } from '@/apis/category/types'
import { createCategory, updateCategoryById } from '@/apis/category'

const useForm = Form.useForm

interface IState {
    isModalVisible: boolean,
    formState: ICategory,
    formRules: any
}

interface IProps {
    addOrEditFields: ICategory
}

const emit = defineEmits(['closeAddOrEditModal'])
const props = defineProps<IProps>()

const state: IState = reactive({
    isModalVisible: true,
    formState: {
        id: 0,
        categoryName: '',
        categoryDes: '',
        isDelete: 0,
    },
    formRules: {
        categoryName: [
            {
                type: 'string',
                required: true,
                message: '请填写分类标题',
                trigger: 'blur'
            }
        ],
        isDelete: [
            {
                type: 'number',
                required: true,
                message: '请选择是否删除',
                trigger: 'blur'
            }
        ]
    }
})

const CategoryForm = useForm(state.formState, state.formRules);

const handleCancel = () => {
    emit('closeAddOrEditModal', false)
}

const handleConfirm = () => {
    CategoryForm
        .validate()
        .then(async () => {
            try {
                // 这里取巧了，懒得用变量进行标志
                // 因为后端文章id从1开始，所以不为0则说明是编辑
                // id为0则是新增 不为0则是编辑
                if (state.formState.id === 0) {
                    await createCategory(state.formState);
                    Message.success('创建成功');

                }

                if (state.formState.id !== 0) {
                    console.log(state.formState);

                    await updateCategoryById(state.formState);
                    Message.success('更新成功');
                }

                emit('closeAddOrEditModal', true)
            } catch (error) {
                Message.success(error as string);
            }
        })
}

// 将传进来的值赋给表单需要使用的变量formState
Object.keys(state.formState).forEach(key => {
    state.formState[key] = props.addOrEditFields[key]
})

const { isModalVisible, formState, formRules } = { ...toRefs(state) }
</script>

<template>
    <AModal
        :title="state.formState.id === 0 ? '新增分类' : '编辑分类'"
        :visible="isModalVisible"
        @cancel="handleCancel"
        :width="1400"
    >
        <div class="modalContentBox">
            <AForm :model="formState" :label-col="{ span: 2 }">
                <AFormItem
                    label="分类名称"
                    v-bind="CategoryForm.validateInfos.categoryName"
                    required
                    has-feedback
                >
                    <AInput v-model:value="formState.categoryName" props="categoryName" />
                </AFormItem>

                <AFormItem label="分类描述">
                    <AInput v-model:value="formState.categoryDes" props="categoryDes" />
                </AFormItem>

                <AFormItem
                    label="是否删除"
                    required
                    has-feedback
                    v-bind="CategoryForm.validateInfos.isDelete"
                >
                    <ARadioGroup name="isDeleteRadioGroup" v-model:value="formState.isDelete">
                        <ARadio :value="1">是</ARadio>
                        <ARadio :value="0">否</ARadio>
                    </ARadioGroup>
                </AFormItem>
            </AForm>
        </div>
        <template #footer>
            <div class="confirmButton">
                <AButton @click="handleConfirm">确认</AButton>
            </div>
        </template>
    </AModal>
</template>


<style lang="less" scoped>
.modalContentBox {
    padding: 20px;
}
.confirmButton {
    width: 100%;
}
</style>