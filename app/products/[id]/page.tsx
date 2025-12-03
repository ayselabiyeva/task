import Link from "next/link";
import { fetchProductById } from "@/app/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const product = await fetchProductById(id);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-118 object-contain rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="mb-6">
          <p className="text-2xl font-bold text-amber-600">
            ${product.price}
          </p>
          {product.discountPercentage && (
            <p className="text-sm text-green-600">
              {product.discountPercentage}% off
            </p>
          )}
        </div>
        <div className="flex gap-4 text-sm text-gray-600 mb-6">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            Category: {product.category}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            Brand: {product.brand}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            Stock: {product.stock}
          </span>
        </div>
        <Link 
          href="/" 
          className="inline-block bg-gray-600 hover:bg-gray-800 text-white rounded-lg px-6 py-3 transition-colors"
        >
          ← Back to products
        </Link>
      </div>
    </div>
  );
}