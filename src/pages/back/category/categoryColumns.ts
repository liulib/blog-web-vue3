export default [
    {
        title: '分类ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '分类名称',
        dataIndex: 'categoryName',
        key: 'categoryName'
    },
    {
        title: '分类描述',
        dataIndex: 'categoryDes',
        key: 'categoryDes'
    },
    {
        title: '是否删除',
        key: 'isDelete',
        dataIndex: 'isDelete',
        width: '90px',
        slots: { customRender: 'isDelete' }
    },
    {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        slots: { customRender: 'createdAt' }
    },
    {
        title: '更新时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        slots: { customRender: 'updatedAt' }
    },
    {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
        width: '200px'
    }
];
