export interface Product {
    name: string;
    price: number;
    imageThumbnailUrl: string;
    boughtDate: Date;
    amount: number;
    type: string;
    recipe: string;
    tva?: number;
    predictedAmount?: number;
}
