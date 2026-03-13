import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              Saksham<span className="text-primary">Nari</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Empowering women entrepreneurs with financial literacy, fair lending, and digital skills to build sustainable businesses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Financial Courses</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Loan Calculator</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Government Schemes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-primary" /> for women everywhere
          </p>
          <p className="text-sm text-muted-foreground">© 2026 SakshamNari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
