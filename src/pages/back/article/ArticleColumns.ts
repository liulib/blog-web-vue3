export const articleColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '文章名',
        dataIndex: 'title',
        key: 'title'
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
        width: '100px',
        slots: { customRender: 'operation' }
    }
];
