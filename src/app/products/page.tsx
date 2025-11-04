type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

async function ProductPage() {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) throw new Error("Failed to fetch data");

  const products = await response.json();

  return (
    <div className="container mx-auto mt-4 gap-4 flex flex-wrap">
      {products?.map((product: Product) => (
        <div
          className="border min-h-56 w-sm rounded-sm p-4 shadow-sm"
          key={product?.id}
        >
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}
export default ProductPage;
