import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

const Index = () => {
  const { data: products, isLoading } = useProducts();

  return (
    <div>
      <HeroSlider />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Koleksiyon</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tüm Ürünler
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            En yeni trendleri keşfedin, tarzınızı yansıtın
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-72 w-full" />
                <CardContent className="space-y-2 p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product) => (
              <Card key={product.id} className="group overflow-hidden rounded-2xl border-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <Link to={`/product/${product.id}`} className="w-full p-4">
                      <Button className="w-full gap-2 rounded-xl" size="sm">
                        <Eye className="h-4 w-4" /> Detaylı İncele
                      </Button>
                    </Link>
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                    {product.category}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="mt-2 text-xl font-bold text-primary">{product.price} ₺</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
