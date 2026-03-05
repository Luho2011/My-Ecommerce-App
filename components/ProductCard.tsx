import AddToCartButton from "./add-to-cart-button";

type ProductCardProps = {
  product: {
    title: string;
    price: number;
    imageUrl?: string;
  }
}

export default function ProductCard({ product } : ProductCardProps) {
  return (
    <div className='h-125 w-80'>
        <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-95 object-cover mb-2"
        />
        <h2 className="my-2">{product.title}</h2>
        <p className="font-bold mb-3">{product.price.toFixed(2)} €</p>
        <AddToCartButton product={product} />
    </div>
  )
}
