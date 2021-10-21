interface nav {
    icon: string;
    title: string;
    link: string;
}

const navList: nav[] = [
    {
        icon: 'home',
        title: '首页',
        link: '/'
    },
    {
        icon: 'edit',
        title: '归档',
        link: '/archive'
    },
    {
        icon: 'folder',
        title: '分类',
        link: '/category'
    },
    {
        icon: 'user',
        title: '简历',
        link: '/resume'
    }
];

export default navList;
