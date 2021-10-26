import type { App } from 'vue';

import {
    Modal,
    Table,
    Menu,
    Input,
    Form,
    Card,
    Checkbox,
    Radio,
    Button,
    Layout,
    Tabs,
    Dropdown,
    Divider,
    Breadcrumb,
    Tag,
    Select,
    Tree,
    TreeSelect,
    Row,
    Col,
    message,
    notification,
    Switch,
    Pagination,
    InputNumber,
    Skeleton
} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

export const setupAntd = (app: App<Element>) => {
    app.use(Form)
        .use(Input)
        .use(Modal)
        .use(Table)
        .use(Menu)
        .use(Card)
        .use(Checkbox)
        .use(Radio)
        .use(Button)
        .use(Layout)
        .use(Dropdown)
        .use(Tabs)
        .use(Breadcrumb)
        .use(Tag)
        .use(Select)
        .use(Tree)
        .use(TreeSelect)
        .use(Row)
        .use(Col)
        .use(Switch)
        .use(Divider)
        .use(Pagination)
        .use(InputNumber)
        .use(Skeleton);
};

// 导出实例 便于在拦截器中使用实现解耦
export const AM = {
    notification,
    message
};
