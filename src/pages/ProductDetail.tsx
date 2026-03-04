import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "@/hooks/useProducts";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id!);
  const { addToFavorites, removeFromFavorites, isFavorite, addToCart } = useStore();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-[500px] w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Ürün bulunamadı</h2>
          <Button className="mt-4" onClick={() => navigate("/")}>Anasayfaya Dön</Button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(product.id);

  const handleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.id);
      toast("Favorilerden çıkarıldı");
    } else {
      addToFavorites(product);
      toast.success("Favorilere eklendi!");
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Sepete eklendi!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate("/")}>
        <ArrowLeft className="h-4 w-4" /> Anasayfaya Dön
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <img src={product.image} alt={product.name} className="h-[500px] w-full object-cover" />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{product.category}</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">{product.name}</h1>
          </div>

          <p className="text-3xl font-bold text-primary">{product.price} ₺</p>

          <p className="leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={handleFavorite} variant={favorite ? "secondary" : "outline"} className="gap-2 flex-1">
              {favorite ? <Check className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
              {favorite ? "Favorilerde" : "Favorilere Ekle"}
            </Button>
            <Button onClick={handleAddToCart} className="gap-2 flex-1">
              <ShoppingCart className="h-4 w-4" /> Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
