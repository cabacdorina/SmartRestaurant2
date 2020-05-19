export interface Product {
    name: string;
    price: number;
    imageThumbnailUrl: string;
    boughtDate: Date;
    amount: number;
    foodType: number;
    recipeName: string;
    tva?: number;
    predictedAmount?: number;
}
