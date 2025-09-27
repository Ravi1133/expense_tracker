import { TransactionType } from "./enums";


export interface userBody{
    name:string;
    email:string;
    gender:"male"|"female";
    iat:number|null;
    exp:number|null    
}

export interface TransactionBody{
    userId:number,
    categoryId:number,
    amount:number,
    type:TransactionType.EXPENSE|TransactionType.INCOME
}

export interface categoryBody{
    name:string,
    type:TransactionType.EXPENSE|TransactionType.INCOME
    
}

