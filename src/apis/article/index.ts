import http from '@/utils/http/axios';

import {
    ICreateArticleReq,
    IArticle,
    IQueryArticleListReq,
    IQueryArticleListRes,
    ITopArticleRes,
    ICommentArticleReq,
    IGetArticleCommentsReq,
    IComment
} from './types';

enum Api {
    createArticle = '/article/create',
    getArticleList = '/article/getList',
    updateById = '/article/updateById',
    getDetailById = '/article/getDetailById',
    getTopicList = '/article/getTopicList',
    commentArticle = '/comment/create',
    getArticleComments = '/comment/getAll'
}

/**
 * @description: 创建文章
 */
export function createArticle(params: ICreateArticleReq) {
    return http.request({
        url: Api.createArticle,
        method: 'POST',
        params
    });
}

/**
 * @description: 获取文章列表
 */
export function getArticleList(params: IQueryArticleListReq) {
    return http.request<IQueryArticleListRes>({
        url: Api.getArticleList,
        method: 'GET',
        params
    });
}

/**
 * @description: 获取文章详情
 */
export function findArticleDetailById(params: any) {
    return http.request<IArticle>({
        url: Api.getDetailById,
        method: 'GET',
        params
    });
}

/**
 * @description: 根据ID更新文章
 */
export function updateArticleById(params: any) {
    return http.request({
        url: Api.updateById,
        method: 'POST',
        params
    });
}

/**
 * @description: 获取热门文章
 */
export function findTopicArticle() {
    return http.request<ITopArticleRes[]>({
        url: Api.getTopicList,
        method: 'GET'
    });
}

/**
 * @description: 评论文章
 */
export function commentArticle(params: ICommentArticleReq) {
    return http.request({
        url: Api.commentArticle,
        method: 'POST',
        params
    });
}

/**
 * @description: 获取文章下所有评论
 */
export function getArticleComments(params: IGetArticleCommentsReq) {
    return http.request<IComment[]>({
        url: Api.getArticleComments,
        method: 'GET',
        params
    });
}
