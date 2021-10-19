import http from '@/utils/http/axios';

import { ICreateCategoryReq, ICategory } from './types';

enum Api {
    createCategory = '/category/create',
    getAllArticle = '/category/findList',
    updateById = '/category/updateById'
}

/**
 * @description: 创建分类
 */
export function createArticle(params: ICreateCategoryReq) {
    return http.request({
        url: Api.createCategory,
        method: 'POST',
        params
    });
}

/**
 * @description: 获取所有分类
 */
export function getAllCategory() {
    return http.request<ICategory[]>({
        url: Api.getAllArticle,
        method: 'GET'
    });
}

/**
 * @description: 根据ID更新分类
 */
export function updateCategoryById(params: any) {
    return http.request({
        url: Api.updateById,
        method: 'GET',
        params
    });
}
