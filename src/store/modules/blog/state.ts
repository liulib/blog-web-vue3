import { BLOG_CATEGORY, BLOG_TAG } from '@/store/types';
import { storage } from '@/utils/Storage';

export interface ICategory {
    id: number;
    categoryName: string;
    categoryDes?: string;
    isDelete: number;
    parentId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ITag {
    id: number;
    isDelete: number;
    tagDes?: string;
    tagName: string;
    tagColor: string;
    updatedAt?: string;
    createdAt?: string;
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
