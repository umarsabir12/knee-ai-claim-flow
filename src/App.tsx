import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RCMHeader } from "@/components/RCMHeader";
import Dashboard from "./pages/Dashboard";
import Coding from "./pages/Coding";
import ClaimScrubbing from "./pages/ClaimScrubbing";
import DenialManagement from "./pages/DenialManagement";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-auto border-b border-border bg-card">
                <div className="flex items-center px-4 py-2">
                  <SidebarTrigger className="mr-4" />
                  <div className="flex-1">
                    <RCMHeader />
                  </div>
                </div>
              </header>
              <main className="flex-1 p-6 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/coding" element={<Coding />} />
                  <Route path="/scrubbing" element={<ClaimScrubbing />} />
                  <Route path="/denials" element={<DenialManagement />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
