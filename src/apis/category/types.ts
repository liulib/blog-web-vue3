export interface ICreateCategoryReq {
    categoryName: string;
    categoryDes?: string;
    parentId: number;
    isDelete: number;
}

export interface ICategory {
    id: number;
    categoryName: string;
    categoryDes?: string;
    parentId: number;
    isDelete: number;
    createdAt: string;
    updatedAt: string;
}
