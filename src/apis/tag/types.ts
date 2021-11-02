export interface ITag {
    id: number;
    isDelete: number;
    tagDes?: string;
    tagName: string;
    tagColor: string;
    updatedAt?: string;
    createdAt?: string;
}

export interface ICreateTagReq {
    tagName: string;
    tagDes?: string;
    isDelete: number;
}
