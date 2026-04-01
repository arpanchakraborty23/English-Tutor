import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card/40">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-heading text-base">
              <Globe className="h-4 w-4 text-primary" />
              Polyglot
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Learn languages the way your brain was meant to — naturally and joyfully.
            </p>
          </div>

          {[
            { title: "Product", links: ["Features", "Languages", "Pricing"] },
            { title: "Company", links: ["About", "Blog", "Careers"] },
            { title: "Legal", links: ["Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title} className="space-y-2">
              <h4 className="font-heading text-sm">{col.title}</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Polyglot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
