import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";

const API_URL = "https://697344fdb5f46f8b5826b1ef.mockapi.io/api/v1/products";

const fallbackProducts: Product[] = [
  { id: "1", name: "Klasik Beyaz Gömlek", price: 349, description: "Şık ve rahat, günlük kullanıma uygun pamuklu beyaz gömlek. Her kombine uyum sağlar.", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500", category: "Gömlek" },
  { id: "2", name: "Slim Fit Jean", price: 499, description: "Modern kesim, yüksek kalite denim kumaştan üretilmiş slim fit jean pantolon.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500", category: "Pantolon" },
  { id: "3", name: "Deri Ceket", price: 1299, description: "Gerçek deri, zamansız tasarım. Soğuk havalarda tarzınızdan ödün vermeden sıcak kalın.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", category: "Ceket" },
  { id: "4", name: "Oversize Hoodie", price: 279, description: "Yumuşak polar iç yüzey, oversize kesim. Rahat ve şık günlük giyim.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", category: "Sweatshirt" },
  { id: "5", name: "Keten Pantolon", price: 399, description: "Yazlık keten pantolon, nefes alan kumaş ile sıcak günlerde konfor sağlar.", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500", category: "Pantolon" },
  { id: "6", name: "Polo Yaka Tişört", price: 199, description: "Pamuklu polo yaka tişört, spor-şık tarz için ideal tercih.", image: "https://images.unsplash.com/photo-1625910513413-5fc421e0fd4f?w=500", category: "Tişört" },
  { id: "7", name: "Yün Kazak", price: 449, description: "Sıcak tutan yün karışımlı kazak, kış ayları için mükemmel seçim.", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500", category: "Kazak" },
  { id: "8", name: "Chino Pantolon", price: 359, description: "Şık chino pantolon, ofis ve günlük kullanım için ideal.", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500", category: "Pantolon" },
];

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: fetchProducts, staleTime: 5 * 60 * 1000 });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("API error");
        return (await res.json()) as Product;
      } catch {
        return fallbackProducts.find((p) => p.id === id) || null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}
