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
    isDelete?: number;
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
    briefUrl: string;
    content: string;
    isDelete: number;
    thumbsUpCount: number;
    viewCount: number;
    updatedAt: string;
    createdAt: string;
}
