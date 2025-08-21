import { 
  LayoutDashboard, 
  Brain, 
  Shield, 
  TrendingDown,
  DollarSign,
  Activity,
  FileText,
  Settings
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const workflowItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: LayoutDashboard,
    description: "Workflow Overview"
  },
  { 
    title: "AI Medical Coder", 
    url: "/coding", 
    icon: Brain,
    description: "Automated Coding"
  },
  { 
    title: "Claim Scrubber", 
    url: "/scrubbing", 
    icon: Shield,
    description: "Claim Validation"
  },
  { 
    title: "Denial Management", 
    url: "/denials", 
    icon: TrendingDown,
    description: "Denial Processing"
  },
  { 
    title: "Account Receivable", 
    url: "/accounts-receivable", 
    icon: DollarSign,
    description: "A/R Management"
  },
];

const additionalItems = [
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: Activity,
    description: "Performance Metrics"
  },
  { 
    title: "Reports", 
    url: "/reports", 
    icon: FileText,
    description: "RCM Reports"
  },
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings,
    description: "System Configuration"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isWorkflowActive = workflowItems.some((item) => isActive(item.url));
  const collapsed = state === "collapsed";
  
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-foreground";

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-foreground">RCM AI Suite</h2>
              <p className="text-xs text-muted-foreground">Arthritis Care RCM</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-primary uppercase tracking-wider">
            RCM Workflow
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {workflowItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClass}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {additionalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {collapsed && (
        <div className="p-2 border-t border-border">
          <SidebarTrigger className="w-full" />
        </div>
      )}
    </Sidebar>
  );
}