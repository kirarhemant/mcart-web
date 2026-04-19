import api from "./client";

export type Product = {
  id: number; sku: string; name: string;
  price: number; stock: number; categoryId: number;
  attributes?: string; updatedAt?: string;
  image: string; images?: string;
};

/*export async function listProducts(categoryId: number, page=0, size=20) {
  const { data } = await api.get(`/api/catalog/products`, { params: { categoryId, page, size }});
  return data as { content: Product[]; totalElements: number; totalPages: number; number: number; size: number; };
}*/

export async function listProducts(categoryId: number, page=0, size=20, filters?: any) {
  const { data } = await api.get(`/catalog/products`, {
    params: {
      categoryId,
      page,
      size,
      brand: filters?.brands?.join(","),
      priceMin: filters?.priceMin,
      priceMax: filters?.priceMax
    }
  });
  return data;
}

export async function getProductBySku(sku: string) {
  const { data } = await api.get(`/catalog/products/${encodeURIComponent(sku)}`);
  return data as Product;
}