import { fetchProducts, fetchProductById } from '@/app/lib/data';

global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

test('fetchProducts fetches products with correct URL', async () => {
  const mockResponse = {
    products: Array(12).fill({ title: "Toy", id: 1 }),
    total: 100,
    skip: 0,
    limit: 12,
  };

  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  });

  const data = await fetchProducts(1, 12);

  expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=12&skip=0');
  expect(data.products.length).toBe(12);
  expect(data.total).toBe(100);
});
