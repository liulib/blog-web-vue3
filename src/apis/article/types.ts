import { ICategory } from '@/apis/category/types';
import { ITag } from '@/apis/tag/types';

export interface ICreateArticleReq {
    id?: number;
    title: string;
    brief: string;
    briefUrl?: string;
    content: string;
    isDelete: number;
    categoryId: number;
    tags?: string;
}

export interface IQueryArticleListReq {
    page: number;
    pageSize: number;
    categoryId?: number | undefined;
    tagId?: number | undefined;
    isDelete?: number | string;
}

export interface IQueryArticleListRes {
    page: number;
    pageSize: number;
    total: number;
    list: IArticle[];
}

export interface IArticle {
    id: number;
    title: string;
    brief: string;
    briefUrl?: string;
    content: string;
    isDelete: number;
    thumbsUpCount: number;
    viewCount: number;
    commentCount: number;
    updatedAt: string;
    createdAt: string;
    category: ICategory;
    tags: ITag[];
}
