import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <h2 className="mt-4 text-2xl font-bold text-foreground">Sepetiniz boş</h2>
          <p className="mt-2 text-muted-foreground">Ürünleri sepete ekleyerek alışverişe başlayın</p>
          <Link to="/"><Button className="mt-4">Alışverişe Başla</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Sepetim ({cart.length} ürün)</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-lg border bg-card p-4">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="font-bold text-primary">{(item.price * item.quantity).toLocaleString("tr-TR")} ₺</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="self-start text-muted-foreground hover:text-destructive" onClick={() => { removeFromCart(item.id); toast("Ürün sepetten çıkarıldı"); }}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">Sipariş Özeti</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Ara Toplam</span><span>{cartTotal.toLocaleString("tr-TR")} ₺</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Kargo</span><span className="text-green-600">Ücretsiz</span></div>
          </div>
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between text-lg font-bold"><span>Toplam</span><span className="text-primary">{cartTotal.toLocaleString("tr-TR")} ₺</span></div>
          </div>
          <Button className="mt-6 w-full" size="lg" onClick={() => toast.success("Sipariş tamamlandı! (Demo)")}>
            Siparişi Tamamla
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
