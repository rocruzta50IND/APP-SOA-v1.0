"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { Search, Bell, Filter, Plus, MoreHorizontal, Eye } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  { 
    id: 1, 
    name: "Montaigne Bag Limited Edition", 
    category: "Handbags", 
    stock: 12, 
    price: "€4,200", 
    status: "Active", 
    description: "Couro de bezerro premium com acabamento em ouro 24k.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80" 
  },
  { 
    id: 2, 
    name: "Riviera Silk Scarf", 
    category: "Accessories", 
    stock: 45, 
    price: "€450", 
    status: "Active", 
    description: "Seda pura tecida à mão nas margens do Lago Como.",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=300&q=80" 
  },
  { 
    id: 3, 
    name: "Elite Chronograph", 
    category: "Watches", 
    stock: 5, 
    price: "€12,500", 
    status: "Low Stock", 
    description: "Movimento suíço automático com caixa em titânio escovado.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&q=80" 
  },
  { 
    id: 4, 
    name: "Classic Tuxedo", 
    category: "Apparel", 
    stock: 20, 
    price: "€3,800", 
    status: "Active", 
    description: "Lã merino super 150s com lapelas em cetim de seda italiana.",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=300&q=80" 
  },
  { 
    id: 5, 
    name: "Velvet Loafers", 
    category: "Footwear", 
    stock: 32, 
    price: "€890", 
    status: "Active", 
    description: "Veludo azul profundo com bordado heráldico artesanal.",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=300&q=80" 
  },
  { 
    id: 6, 
    name: "Diamond Studs", 
    category: "Jewelry", 
    stock: 2, 
    price: "€18,000", 
    status: "Rare", 
    description: "Diamantes lapidação brilhante de 2 quilates, pureza VVS1.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80" 
  },
];

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 bg-secondary/50 px-4 py-2 rounded-2xl border border-border/50 w-full max-w-md">
            <Search className="size-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl text-sm font-bold hover:opacity-90 transition-all">
              <Plus className="size-4" />
              Add Product
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">Inventário</h1>
              <p className="text-muted-foreground">Gestão de ativos e exclusividade de produtos.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-xl text-sm font-medium hover:bg-secondary transition-all">
                <Filter className="size-4" />
                Filtrar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-[32px] border border-border bg-background hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {product.status}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="size-12 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:scale-110 transition-transform">
                      <Eye className="size-5" />
                    </button>
                    <button className="size-12 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:scale-110 transition-transform">
                      <MoreHorizontal className="size-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-serif text-lg font-bold mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed h-8">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <span className="text-xl font-bold">{product.price}</span>
                    <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
