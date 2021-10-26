import { TOKEN, MENU_LIST, USER_NAME, LOGIN_MODAL } from '@/store/types';
import { storage } from '@/utils/Storage';

export interface Menu {
    id: number;
    parentId: number;
    menuName: string;
    menuType: number;
    status: number;
    url: string;
    perms: string;
    remark: null | string;
    isDelete: number;
    createdAt: string;
    updatedAt: string;
    level: number;
    children?: Menu[];
}

export interface LoginModal {
    visible: boolean;
    type: string;
}

export interface UserState {
    username: string;
    token: string;
    menuList: Menu[];
    loginModal: LoginModal;
}
// TODO menuList放在了这里
const state: UserState = {
    token: storage.get(TOKEN) || '',
    menuList: storage.get(MENU_LIST) || [],
    username: storage.get(USER_NAME) || '',
    loginModal: storage.get(LOGIN_MODAL) || { visible: false, type: 'login' }
};

export default state;
