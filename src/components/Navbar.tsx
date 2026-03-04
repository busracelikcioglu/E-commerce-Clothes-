import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Home, Mail, Menu, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Ürünler", icon: Home },
  { to: "/favorites", label: "Favoriler", icon: Heart },
  { to: "/cart", label: "Sepet", icon: ShoppingCart },
  { to: "/contact", label: "İletişim", icon: Mail },
];

const Navbar = () => {
  const { favorites, cart } = useStore();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const badgeCounts: Record<string, number> = {
    "/favorites": favorites.length,
    "/cart": cart.reduce((s, i) => s + i.quantity, 0),
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="rounded-lg bg-primary px-2 py-0.5 text-primary-foreground">M</span>
          <span className="text-foreground">MODA<span className="text-primary">SHOP</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                location.pathname === to
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {badgeCounts[to] > 0 && (
                <Badge className={cn(
                  "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-[10px] border-2 border-background",
                  location.pathname === to ? "bg-accent text-accent-foreground" : ""
                )}>
                  {badgeCounts[to]}
                </Badge>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background/95 backdrop-blur-xl px-4 pb-4 md:hidden animate-in slide-in-from-top-2 duration-200">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                location.pathname === to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {badgeCounts[to] > 0 && (
                <Badge variant="secondary" className="ml-auto">{badgeCounts[to]}</Badge>
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
