import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, ReactNode } from "react";
import { AuthProvider, useAuth } from "@/hooks/use-auth";

// Public Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import ProductsNew from "@/pages/ProductsNew";
import ProductDetail from "@/pages/ProductDetail";
import Partners from "@/pages/Partners";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import NotFound from "@/pages/not-found";

// Admin Pages
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminCompanies from "@/pages/admin/Companies";
import AdminCategories from "@/pages/admin/Categories";
import AdminFeatures from "@/pages/admin/Features";
import AdminApplications from "@/pages/admin/Applications";
import AdminProducts from "@/pages/admin/Products";
import AdminBlog from "@/pages/admin/Blog";
import AdminUsers from "@/pages/admin/Users";
import AdminCallbacks from "@/pages/admin/Callbacks";
import ChatBot from "@/components/ChatBot";

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }: { children: ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);

    // Safety check: ensure it stays at top after render
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={ProductsNew} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/partners" component={Partners} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />

        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin">
          {() => (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin/companies">
          {() => (
            <ProtectedRoute>
              <AdminCompanies />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin/categories">
          {() => (
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin/features">
          {() => (
            <ProtectedRoute>
              <AdminFeatures />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin/applications">
          {() => (
            <ProtectedRoute>
              <AdminApplications />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin/products">
          {() => (
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin/blog">
          {() => (
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <AdminBlog />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin/callbacks">
          {() => (
            <ProtectedRoute>
              <AdminCallbacks />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin/users">
          {() => (
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          )}
        </Route>

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
          <ChatBot />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
