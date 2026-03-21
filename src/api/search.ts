import api from "./client";

export async function suggest(q: string, size=5) {
  const { data } = await api.get(`/api/search/suggest`, { params: { q, size }});
  return data;
}

export async function search(q: string, page=0, size=20, filters?: any) {
  const { data } = await api.get(`/api/search`, {
    params: {
      q,
      page,
      size,
      brand: filters?.brand,
      categories: filters?.categories,
      priceMin: filters?.priceMin,
      priceMax: filters?.priceMax
    }
  });
  return data;
}