import { Link, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const navItems = [
  { label: "Analyzer", path: "/" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Safety & Limitations", path: "/safety" },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm-clinical">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-4.5 h-4.5 text-primary-foreground" size={18} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold text-foreground tracking-tight">PharmaGuard</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">Clinical Decision Support</span>
            </div>
          </Link>

          {/* Tab Nav */}
          <nav className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-card text-foreground shadow-sm-clinical"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Nav */}
          <nav className="flex sm:hidden items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label.split(" ")[0]}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
