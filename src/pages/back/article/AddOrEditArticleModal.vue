<script setup lang="ts">
import { reactive, toRefs, computed } from 'vue'
import { Form, message as Message } from 'ant-design-vue'
import { useStore } from "@/store"

import { IAddOrEditFieldsProps } from './types'
import { createArticle, updateArticleById } from '@/apis/article'

interface IForm {
    id: number,
    title: string,
    brief: string,
    briefUrl: string,
    content: string,
    isDelete: number,
    categoryId: number,
    tags: []
}

interface IState {
    isModalVisible: boolean,
    formState: IForm,
    formRules: any
}

interface IProps {
    addOrEditFields: IAddOrEditFieldsProps
}

const store = useStore()
const categoryList = computed(() => store.state.blog.category);
const tagList = computed(() => store.state.blog.tag);

const useForm = Form.useForm

const props = defineProps<IProps>()

const emit = defineEmits(['closeAddOrEditModal'])

const state: IState = reactive({
    isModalVisible: true,
    formState: {
        id: 0,
        title: "",
        brief: "",
        briefUrl: "",
        content: "",
        isDelete: 0,
        categoryId: 0,
        tags: []
    },
    formRules: {
        title: [
            {
                type: 'string',
                required: true,
                message: '请填写文章标题',
                trigger: 'blur'
            }
        ],
        brief: [
            {
                type: 'string',
                required: true,
                message: '请填写文章简介',
                trigger: 'blur'
            }
        ],
        content: [
            {
                type: 'string',
                required: true,
                message: '请填写文章内容',
                trigger: 'blur'
            }
        ],
        categoryId: [
            {
                type: 'number',
                required: true,
                message: '请选择分类',
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

const ArticleForm = useForm(state.formState, state.formRules);

// 解构给template使用 去掉state.
const { isModalVisible, formState } = { ...toRefs(state) }

// 将传进来的值赋给表单需要使用的变量formState
Object.keys(state.formState).forEach(key => {
    state.formState[key] = props.addOrEditFields[key]
})

const handleCancel = () => {
    emit('closeAddOrEditModal', false)
}

const handleConfirm = () => {
    ArticleForm
        .validate()
        .then(async () => {
            // 处理标签，需要将标签处理成格式为 1,2,3,4 的文本
            let tagsString = '';

            if (state.formState.tags.length > 0) {
                tagsString = state.formState.tags.join(',');
            }

            const params = Object.assign({}, state.formState, { tags: tagsString })

            try {
                // 这里取巧了，懒得用变量进行标志
                // 因为后端文章id从1开始，所以不为0则说明是编辑
                // id为0则是新增 不为0则是编辑

                if (state.formState.id === 0) {
                    await createArticle(params);
                    Message.success('创建成功');

                }

                if (state.formState.id !== 0) {
                    await updateArticleById(params);
                    Message.success('更新成功');
                }

                emit('closeAddOrEditModal', true)

            } catch (error) {
                Message.success(error as string);
            }


        })
}
</script>

<template>
    <AModal
        :title="state.formState.id === 0 ? '新增文章' : '编辑文章'"
        :visible="isModalVisible"
        @cancel="handleCancel"
        :width="1400"
    >
        <div class="modalContentBox">
            <AForm :model="formState" :label-col="{ span: 2 }">
                <AFormItem
                    label="标题"
                    v-bind="ArticleForm.validateInfos.title"
                    required
                    has-feedback
                >
                    <AInput v-model:value="formState.title" props="title" />
                </AFormItem>

                <AFormItem
                    label="简介"
                    v-bind="ArticleForm.validateInfos.brief"
                    required
                    has-feedback
                >
                    <v-md-editor v-model="formState.brief"></v-md-editor>
                </AFormItem>

                <AFormItem
                    label="是否删除"
                    required
                    has-feedback
                    v-bind="ArticleForm.validateInfos.isDelete"
                >
                    <ARadioGroup name="isDeleteRadioGroup" v-model:value="formState.isDelete">
                        <ARadio :value="1">是</ARadio>
                        <ARadio :value="0">否</ARadio>
                    </ARadioGroup>
                </AFormItem>

                <AFormItem
                    label="分类"
                    v-bind="ArticleForm.validateInfos.categoryId"
                    required
                    has-feedback
                >
                    <ASelect
                        :style="{ width: '200px' }"
                        allowClear
                        v-model:value="formState.categoryId"
                        placeholder="请选择分类"
                    >
                        <ASelectOption
                            v-for="item in categoryList"
                            :value="item.id"
                        >{{ item.categoryName }}</ASelectOption>
                    </ASelect>
                </AFormItem>

                <AFormItem label="标签">
                    <ASelect
                        mode="multiple"
                        :style="{ width: '100%' }"
                        v-model:value="formState.tags"
                        allowClear
                        placeholder="请选择标签"
                    >
                        <ASelectOption
                            v-for="item in tagList"
                            :key="item.id"
                            :value="item.id"
                        >{{ item.tagName }}</ASelectOption>
                    </ASelect>
                </AFormItem>

                <AFormItem label="文章内容" v-bind="ArticleForm.validateInfos.content">
                    <v-md-editor v-model="formState.content"></v-md-editor>
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
    .confirmButton {
        width: 100%;
    }
}
</style>