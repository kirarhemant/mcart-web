import api from "./client";

export async function suggest(q: string, size=5) {
  const { data } = await api.get(`/search/suggest`, { params: { q, size }});
  return data;
}

export async function search(q: string, page=0, size=20, filters?: any, sort?: string) {
  const { data } = await api.get(`/search`, {
    params: {
      q,
      page,
      size,
      brand: filters?.brand,
      ...(filters?.categories ? { categories: filters.categories } : {}),
      priceMin: filters?.priceMin,
      priceMax: filters?.priceMax,
      sort
    }
  });
  return data;
}