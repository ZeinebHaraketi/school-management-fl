import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  Users,
  Trophy,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "instructor" | "student";
  userName: string;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const DashboardLayout = ({
  children,
  role,
  userName,
  onLogout,
  currentPage,
  onNavigate,
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const instructorNav: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "dashboard" },
    { icon: FileQuestion, label: "Question Bank", href: "questions" },
    { icon: BookOpen, label: "Exams", href: "exams" },
    { icon: Users, label: "Students", href: "students" },
    { icon: Trophy, label: "Results & Rankings", href: "results" },
    { icon: Award, label: "Certificates", href: "certificates" },
    { icon: Settings, label: "Settings", href: "settings" },
  ];

  const studentNav: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "dashboard" },
    { icon: BookOpen, label: "My Exams", href: "exams" },
    { icon: Trophy, label: "My Results", href: "results" },
    { icon: Award, label: "Certificate Status", href: "certificates" },
  ];

  const navItems = role === "instructor" ? instructorNav : studentNav;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 gradient-primary h-16 flex items-center justify-between px-4 shadow-lg">
        <Logo variant="light" size="sm" />
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 gradient-primary text-primary-foreground transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-primary-foreground/10">
            <Logo variant="light" size="md" />
          </div>

          {/* User Info */}
          <div className="p-4 mx-4 mt-4 rounded-xl bg-primary-foreground/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{userName}</p>
                <p className="text-xs text-primary-foreground/60 capitalize">{role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  onNavigate(item.href);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  currentPage === item.href
                    ? "gradient-gold text-accent-foreground shadow-gold"
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {currentPage === item.href && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-primary-foreground/10">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
};
