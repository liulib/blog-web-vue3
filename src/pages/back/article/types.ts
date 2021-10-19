export interface IAddOrEditFieldsProps {
    id?: number;
    categoryId?: number | undefined;
    title: string;
    brief: string;
    content: string;
    briefUrl?: string;
    isDelete: number;
    tags?: [];
}
