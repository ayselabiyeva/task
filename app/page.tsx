import Link from "next/link";
import { fetchProducts } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 12;
  const { products, total } = await fetchProducts(currentPage, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Products</h1>
        
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item: any) => (
            <Link
              href={`/products/${item.id}`}
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 block"
            >
              <div className="h-64 w-full mb-4 overflow-hidden rounded-t-xl bg-gray-100 flex items-center justify-center">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {item.description}
                </p>

                <p className="text-md font-bold text-amber-600">
                  ${item.price}
                </p>
                {item.discountPercentage && (
                  <p className="text-sm text-green-600">
                    {item.discountPercentage}% off
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}