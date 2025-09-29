import { TransactionType } from "./enums";


export interface userBody{
    id:number;
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
    type:TransactionType.EXPENSE|TransactionType.INCOME,
    description:string,
    transactionDate:Date
}

export interface TransactionSearcBody{
    userId:number,
    categoryId:number
    amount:number,
    type:TransactionType.EXPENSE|TransactionType.INCOME,
    page:number,
    pageSize:number,
    startDate:Date,
    endDate:Date
}
export interface categoryBody{
    name:string,
    type:TransactionType.EXPENSE|TransactionType.INCOME
    
}

export interface userSeachBody{
    userId:string,
    gender:"male"|"female";
    name:string,
    status:"ACTIVE"|"INACTIVE",
    page:number,
    pageSize:number,
}
