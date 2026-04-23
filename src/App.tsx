import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PoleDetail from "./pages/PoleDetail.tsx";
import PolesIndex from "./pages/PolesIndex.tsx";
import Engagements from "./pages/Engagements.tsx";
import Overview from "./pages/Overview.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Auth from "./pages/Auth.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import PolesAdmin from "./pages/admin/PolesAdmin.tsx";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin.tsx";
import ArticlesAdmin from "./pages/admin/ArticlesAdmin.tsx";
import SiteTextsAdmin from "./pages/admin/SiteTextsAdmin.tsx";
import GalleryAdmin from "./pages/admin/GalleryAdmin.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/poles" element={<PolesIndex />} />
          <Route path="/poles/:slug" element={<PoleDetail />} />
          <Route path="/engagements" element={<Engagements />} />
          <Route path="/vue-ensemble" element={<Overview />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="poles" element={<PolesAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="articles" element={<ArticlesAdmin />} />
            <Route path="site-texts" element={<SiteTextsAdmin />} />
            <Route path="gallery" element={<GalleryAdmin />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
