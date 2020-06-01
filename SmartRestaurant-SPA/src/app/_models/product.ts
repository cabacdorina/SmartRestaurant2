export interface Product {
    name: string;
    price: number;
    imageUrl: string;
    boughtDate: Date;
    amount: number;
    amountReserved?: number;
    foodType: number;
    recipeName: string;
    tva?: number;
    predictedAmount?: number;
    requestAmount?: number;
    id: number;
}
