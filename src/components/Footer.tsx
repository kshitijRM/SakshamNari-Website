import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-6 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              Saksham<span className="text-primary">Nari</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Empowering women entrepreneurs with financial literacy, fair lending, and digital skills to build sustainable businesses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:support@sakshamnari.org" className="hover:text-foreground transition-colors">support@sakshamnari.org</a></li>
              <li><a href="tel:+911800000000" className="hover:text-foreground transition-colors">+91 1800 000 000</a></li>
              <li><a href="/community" className="hover:text-foreground transition-colors">Community Desk</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Social Media</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/help-support" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="/help-support" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="/funding-support" className="hover:text-foreground transition-colors">Funding Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">FAQs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">How to get started?</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">How loan guidance works?</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Who can join?</a></li>
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
