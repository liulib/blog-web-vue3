import http from '@/utils/http/axios';

import { ITag, ICreateTagReq } from './types';

enum Api {
    createTag = '/tag/create',
    getAllTag = '/tag/findAll',
    updateById = '/tag/updateById'
}

/**
 * @description: 创建标签
 */
export function createTag(params: ICreateTagReq) {
    return http.request({
        url: Api.createTag,
        method: 'POST',
        params
    });
}

/**
 * @description: 获取所有标签
 */
export function getAllTag() {
    return http.request<ITag[]>({
        url: Api.getAllTag,
        method: 'GET'
    });
}

/**
 * @description: 根据ID更新标签
 */
export function updateTagById(params: any) {
    return http.request({
        url: Api.updateById,
        method: 'POST',
        params
    });
}
