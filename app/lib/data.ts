const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(page: number = 1, limit: number = 12) {
  const skip = (page - 1) * limit;

  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  
  return {
    products: data.products,
    total: data.total,
    skip: data.skip,
    limit: data.limit
  };
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await res.json();

  return product;
}