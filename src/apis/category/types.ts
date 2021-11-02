export interface ICreateCategoryReq {
    categoryName: string;
    categoryDes?: string;
    isDelete: number;
}

export interface ICategory {
    id: number;
    categoryName: string;
    categoryDes?: string;
    isDelete: number;
    parentId?: number;
    createdAt?: string;
    updatedAt?: string;
}
