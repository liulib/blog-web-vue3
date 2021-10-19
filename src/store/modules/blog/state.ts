import { BLOG_CATEGORY, BLOG_TAG } from '@/store/types';
import { storage } from '@/utils/Storage';

export interface ICategory {
    categoryDes?: string;
    categoryName: string;
    createdAt: string;
    id: number;
    isDelete: number;
    parentId: number;
    updatedAt: string;
}

export interface ITag {
    createdAt: string;
    id: number;
    isDelete: number;
    tagDes?: string;
    tagName: string;
    updatedAt: string;
}

export interface BlogState {
    category: ICategory[];
    tag: ITag[];
}

const state: BlogState = {
    category: storage.get(BLOG_CATEGORY) || [],
    tag: storage.get(BLOG_TAG) || []
};

export default state;
