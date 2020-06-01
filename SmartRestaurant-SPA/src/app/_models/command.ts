export class Command {
    name: string;
    prodList: ProductCommand[];
}

export class ProductCommand {
    productId: number;
    amountReserved: number;
}