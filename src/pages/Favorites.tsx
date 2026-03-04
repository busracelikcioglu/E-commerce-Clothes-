import { useStore } from "@/context/StoreContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";

const Favorites = () => {
  const { favorites, removeFromFavorites, moveToCart } = useStore();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <h2 className="mt-4 text-2xl font-bold text-foreground">Favorileriniz boş</h2>
          <p className="mt-2 text-muted-foreground">Beğendiğiniz ürünleri favorilere ekleyin</p>
          <Link to="/"><Button className="mt-4">Alışverişe Başla</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Favorilerim ({favorites.length})</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="h-56 w-full object-cover" loading="lazy" />
            </Link>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.category}</p>
              <h3 className="mt-1 font-semibold text-foreground">{product.name}</h3>
              <p className="mt-1 text-lg font-bold text-primary">{product.price} ₺</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="flex-1 gap-1" onClick={() => { moveToCart(product); toast.success("Sepete taşındı!"); }}>
                  <ShoppingCart className="h-3 w-3" /> Sepete Taşı
                </Button>
                <Button size="sm" variant="outline" onClick={() => { removeFromFavorites(product.id); toast("Favorilerden çıkarıldı"); }}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
