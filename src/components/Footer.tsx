import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-heading text-lg">
              <Globe className="h-5 w-5 text-primary" />
              Polyglot
            </div>
            <p className="text-sm text-muted-foreground">
              Learn languages the way your brain was meant to — naturally, immersively, and joyfully.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#languages" className="hover:text-foreground transition-colors">Languages</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Polyglot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
