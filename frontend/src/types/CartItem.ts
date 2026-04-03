export interface CartItem {
    bookId: number;
    title: string;
    /** Unit (base) price per book */
    price: number;
    quantity: number;
}