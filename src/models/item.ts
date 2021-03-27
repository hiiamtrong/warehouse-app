export interface Item {
    product: { _id: string };
    sku: string;
    description: string;
    khoQuantity: number;
    restockQuantity: number;
    currentLocation: { code: string };
}

export default Item;