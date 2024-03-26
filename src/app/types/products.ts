export type ProductsType = {
  products: ProductType[]
}

export type ProductType = {
    id: number,
    discountPercentage: number,
    brand: string,
    releaseYear: string,
    category: string,
    description: string,
    price: number,
    rating: number,
    title: string,
    images: string[]
}