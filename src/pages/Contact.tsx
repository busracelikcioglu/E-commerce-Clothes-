import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }
    toast.success("Mesajınız gönderildi! En kısa sürede dönüş yapacağız.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-foreground">İletişim</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bize Ulaşın</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Ad Soyad</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Adınız Soyadınız" />
              </div>
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ornek@email.com" />
              </div>
              <div>
                <Label htmlFor="message">Mesaj</Label>
                <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Mesajınızı yazın..." rows={5} />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" /> Gönder
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mağaza Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Adres</p>
                <p className="text-sm text-muted-foreground">İstiklal Caddesi No:42, Beyoğlu, İstanbul</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Telefon</p>
                <p className="text-sm text-muted-foreground">+90 (212) 555 0142</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">E-posta</p>
                <p className="text-sm text-muted-foreground">info@modashop.com</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-muted p-4">
              <p className="text-sm font-medium text-foreground">Çalışma Saatleri</p>
              <p className="text-sm text-muted-foreground">Pazartesi - Cumartesi: 10:00 - 21:00</p>
              <p className="text-sm text-muted-foreground">Pazar: 11:00 - 20:00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
