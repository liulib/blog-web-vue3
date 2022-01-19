import { ICategory } from '@/apis/category/types';
import { ITag } from '@/apis/tag/types';
import { user } from '@/apis/user/types';

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

export interface ITopArticleRes {
    id: number;
    title: string;
}

export interface ICommentArticleReq {
    articleId: number;
    replyId: number;
    content: string;
}

export interface IGetArticleCommentsReq {
    articleId: number;
}

export interface IComment {
    id: number;
    content: string;
    replyId: number;
    commentUserId: number;
    replyUserId: number;
    articleId: number;
    createdAt: string;
    replyUser?: user;
    commentUser: user;
    children: IComment[];
}
