export interface ITag {
    id: number;
    tagName: string;
    tagDes?: string;
    tagColor: string;
    isDelete: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICreateTagReq {
    tagName: string;
    tagDes?: string;
    isDelete: number;
}
