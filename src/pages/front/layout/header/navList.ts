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
        link: '/archives'
    },
    {
        icon: 'folder',
        title: '分类',
        link: '/categories'
    },
    {
        icon: 'user',
        title: '关于',
        link: '/about'
    }
];

export default navList;
