import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, ClipboardList } from "lucide-react";

type PaymentMethod = "upi" | "card" | "netbanking";
type OrderStatus = "pending" | "paid" | "packed" | "shipped" | "delivered";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  seller: string;
};

type MarketplaceOrder = {
  id: number;
  productName: string;
  seller: string;
  quantity: number;
  amount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
};

const initialProducts: Product[] = [
  { id: 1, name: "Handwoven Cotton Saree", category: "Apparel", price: 1800, stock: 12, seller: "Asha Crafts" },
  { id: 2, name: "Millet Snack Box", category: "Food", price: 350, stock: 40, seller: "Nourish Bites" },
  { id: 3, name: "Natural Soap Set", category: "Personal Care", price: 420, stock: 25, seller: "Herbal Bloom" },
];

const statusSequence: OrderStatus[] = ["paid", "packed", "shipped", "delivered"];

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? Math.max(0, value) : 0);

const BusinessMarketplace = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<MarketplaceOrder[]>([]);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Handmade");
  const [price, setPrice] = useState("500");
  const [stock, setStock] = useState("10");
  const [seller, setSeller] = useState("Women-Owned Store");

  const [selectedProductId, setSelectedProductId] = useState<number>(initialProducts[0].id);
  const [quantity, setQuantity] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  const selectedProduct = useMemo(
    () => products.find((item) => item.id === selectedProductId) ?? products[0],
    [products, selectedProductId],
  );

  const checkoutAmount = useMemo(() => {
    const qty = Math.max(1, Number(quantity) || 1);
    return (selectedProduct?.price || 0) * qty;
  }, [quantity, selectedProduct]);

  const addProductListing = () => {
    const parsedPrice = Number(price) || 0;
    const parsedStock = Number(stock) || 0;

    if (!productName.trim() || parsedPrice <= 0 || parsedStock <= 0 || !seller.trim()) {
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: productName.trim(),
      category,
      price: parsedPrice,
      stock: parsedStock,
      seller: seller.trim(),
    };

    setProducts((prev) => [newProduct, ...prev]);
    setSelectedProductId(newProduct.id);
    setProductName("");
    setPrice("500");
    setStock("10");
  };

  const processPayment = () => {
    if (!selectedProduct) return;

    const qty = Math.max(1, Number(quantity) || 1);
    if (qty > selectedProduct.stock) return;

    const newOrder: MarketplaceOrder = {
      id: Date.now(),
      productName: selectedProduct.name,
      seller: selectedProduct.seller,
      quantity: qty,
      amount: selectedProduct.price * qty,
      paymentMethod,
      status: "paid",
      createdAt: new Date().toLocaleString("en-IN"),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setProducts((prev) =>
      prev.map((item) =>
        item.id === selectedProduct.id
          ? {
              ...item,
              stock: Math.max(0, item.stock - qty),
            }
          : item,
      ),
    );
    setQuantity("1");
  };

  const advanceOrderStatus = (orderId: number) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const index = statusSequence.indexOf(order.status);
        if (index === -1 || index === statusSequence.length - 1) return order;
        return { ...order, status: statusSequence[index + 1] };
      }),
    );
  };

  const pendingOrders = orders.filter((order) => order.status !== "delivered");
  const completedOrders = orders.filter((order) => order.status === "delivered");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mb-10"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Business Marketplace</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Sell Products Online and Manage Every Order in One Place
            </h1>
            <p className="text-muted-foreground text-lg">
              Create product listings, collect secure digital payments, and manage order progress from paid to delivered.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" /> Product Listing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Product name</label>
                  <Input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Ex: Handcrafted Candle Set" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Handmade">Handmade</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Food">Food</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Home Decor">Home Decor</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Price (INR)</label>
                    <Input value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Stock</label>
                    <Input value={stock} onChange={(e) => setStock(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Seller name</label>
                  <Input value={seller} onChange={(e) => setSeller(e.target.value)} />
                </div>
                <Button variant="hero" onClick={addProductListing}>List Product</Button>

                <div className="border border-border rounded-lg p-3 max-h-56 overflow-auto space-y-2">
                  {products.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedProductId(item.id)}
                      className={`w-full text-left rounded-md p-2 border transition-colors ${
                        selectedProductId === item.id ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.category} | {formatINR(item.price)} | Stock: {item.stock}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-secondary" /> Digital Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border p-4 bg-card/50 space-y-2">
                  <p className="text-sm text-muted-foreground">Selected product</p>
                  <p className="font-medium text-foreground">{selectedProduct?.name ?? "No product selected"}</p>
                  <p className="text-xs text-muted-foreground">Seller: {selectedProduct?.seller ?? "-"}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Quantity</label>
                    <Input value={quantity} onChange={(e) => setQuantity(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Payment method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="upi">UPI</option>
                      <option value="card">Card</option>
                      <option value="netbanking">Net Banking</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Payable amount</p>
                  <p className="text-2xl font-bold text-foreground">{formatINR(checkoutAmount)}</p>
                </div>

                <Button variant="hero" onClick={processPayment} disabled={!selectedProduct || selectedProduct.stock <= 0}>
                  Pay and Create Order
                </Button>
                <p className="text-xs text-muted-foreground">
                  Payment status is recorded instantly as paid and appears in order management.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-accent" /> Order Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>Active orders: <span className="font-semibold text-foreground">{pendingOrders.length}</span></p>
                  <p>Delivered orders: <span className="font-semibold text-foreground">{completedOrders.length}</span></p>
                </div>

                <div className="max-h-80 overflow-auto space-y-2">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-lg border border-border p-3 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">{order.productName}</p>
                        <Badge variant="secondary" className="capitalize">{order.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{order.seller}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {order.quantity} | {formatINR(order.amount)} | {order.paymentMethod.toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">Created: {order.createdAt}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => advanceOrderStatus(order.id)}
                        disabled={order.status === "delivered"}
                      >
                        {order.status === "delivered" ? "Completed" : "Advance Status"}
                      </Button>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-sm text-muted-foreground">No orders yet. Complete a payment to create your first order.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessMarketplace;