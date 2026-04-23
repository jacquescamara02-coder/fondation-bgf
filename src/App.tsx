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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
