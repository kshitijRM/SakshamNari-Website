import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="/" className="font-display text-xl font-bold text-foreground">
          Saksham<span className="text-primary">Nari</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#challenges" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Challenges</a>
          <a href="#resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resources</a>
          <a href="#stories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Stories</a>
          <Button variant="hero" size="sm" className="px-6">
            Get Started
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-3">
          <a href="#challenges" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>Challenges</a>
          <a href="#resources" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>Resources</a>
          <a href="#stories" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>Stories</a>
          <Button variant="hero" size="sm" className="w-full">Get Started</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
