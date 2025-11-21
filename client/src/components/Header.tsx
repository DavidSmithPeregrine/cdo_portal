import { APP_ICON, APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/lib/trpc";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/news", label: "News" },
  { path: "/policy", label: "Policy & Guidance" },
  { path: "/jobs", label: "Jobs" },
  { path: "/career-tools", label: "Career Tools" },
  { path: "/ask-ai", label: "Ask AI" },
  { path: "/directory", label: "Directory" },
  { path: "/resources", label: "Resources" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/";
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={APP_ICON} alt={APP_TITLE} className="h-10 w-10" />
            <span className="font-bold text-xl hidden sm:inline">{APP_TITLE}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  className={location === item.path ? "text-foreground" : "text-primary-foreground hover:bg-primary-foreground/10"}
                  size="sm"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                    <User className="h-4 w-4 mr-2" />
                    {user.name || "Account"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.location.href = getLoginUrl()}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-primary-foreground/10 rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={location === item.path ? "secondary" : "ghost"}
                    className={`w-full justify-start ${location === item.path ? "text-foreground" : "text-primary-foreground hover:bg-primary-foreground/10"}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t border-primary-foreground/20 my-2" />
              {isAuthenticated && user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    window.location.href = getLoginUrl();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
