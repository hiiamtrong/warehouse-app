export interface Item {
    product: { _id: string };
    sku: string;
    description: string;
    khoQuantity: number;
    restockQuantity: number;
    currentLocation: { code: string };
    takenQuantity: number
}

export default Item;