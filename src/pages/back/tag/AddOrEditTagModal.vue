<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { Form, message as Message } from 'ant-design-vue'

import { ITag } from '@/apis/Tag/types'
import { createTag, updateTagById } from '@/apis/Tag'

const useForm = Form.useForm

interface IState {
    isModalVisible: boolean,
    formState: ITag,
    formRules: any
}

interface IProps {
    addOrEditFields: ITag
}

const emit = defineEmits(['closeAddOrEditModal'])
const props = defineProps<IProps>()

const state: IState = reactive({
    isModalVisible: true,
    formState: {
        id: 0,
        tagName: '',
        tagDes: '',
        tagColor: '',
        isDelete: 0,
    },
    formRules: {
        tagName: [
            {
                type: 'string',
                required: true,
                message: '请填写标签名称',
                trigger: 'blur'
            }
        ],
        tagColor: [
            {
                type: 'string',
                required: true,
                message: '请填写标签颜色',
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

const TagForm = useForm(state.formState, state.formRules);

const handleCancel = () => {
    emit('closeAddOrEditModal', false)
}

const handleConfirm = () => {
    TagForm
        .validate()
        .then(async () => {
            try {
                // 这里取巧了，懒得用变量进行标志
                // 因为后端文章id从1开始，所以不为0则说明是编辑
                // id为0则是新增 不为0则是编辑
                if (state.formState.id === 0) {
                    await createTag(state.formState);
                    Message.success('创建成功');

                }

                if (state.formState.id !== 0) {
                    await updateTagById(state.formState);
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
        :title="state.formState.id === 0 ? '新增标签' : '编辑标签'"
        :visible="isModalVisible"
        @cancel="handleCancel"
        :width="600"
    >
        <div class="modalContentBox">
            <AForm :model="formState" :labelCol="{ span: 4 }" :wrapperCol="{ offset: 4 }">
                <AFormItem
                    label="标签名称"
                    v-bind="TagForm.validateInfos.tagName"
                    required
                    has-feedback
                >
                    <AInput v-model:value="formState.tagName" props="tagName" />
                </AFormItem>

                <AFormItem label="标签描述">
                    <AInput v-model:value="formState.tagDes" props="tagDes" />
                </AFormItem>

                <AFormItem
                    label="标签颜色"
                    v-bind="TagForm.validateInfos.tagColor"
                    required
                    has-feedback
                >
                    <AInput v-model:value="formState.tagColor" props="tagColor" />
                </AFormItem>

                <AFormItem
                    label="是否删除"
                    required
                    has-feedback
                    v-bind="TagForm.validateInfos.isDelete"
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