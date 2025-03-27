import { SquareTerminal, Bot, BookOpen, Settings2, Frame, PieChart, Map, Users, Store, FolderKanban } from "lucide-react";

export function generateSidebarData(employee_name, position) {
  if (position === "admin") {
    return {
      user: { name: employee_name, position },
      navMain: [
        {
          title: "Employee",
          url: "#",
          icon: Users,
          isActive: false,
          items: [
            { title: "View/Delete employee", url: "/dashboard/admin/employee" },
            { title: "Add employee", url: "/dashboard/admin/add-employee" },
          ],
        },
        {
          title: "Facility",
          url: "#",
          icon: Store,
          isActive: false,
          items: [
            { title: "View/Delete facility", url: "/dashboard/admin/facility" },
            { title: "Add facility", url: "/dashboard/admin/add-facility" },
          ],
        },
        {
          title: "Brands",
          url: "#",
          icon: FolderKanban,
          isActive: false,
          items: [
            { title: "View/Delete brand", url: "/dashboard/admin/brand" },
            { title: "Add brand", url: "/dashboard/admin/add-brand" },
          ],
        },
        {
          title: "Products",
          url: "#",
          icon: FolderKanban,
          isActive: false,
          items: [
            { title: "View/Delete product", url: "/dashboard/admin/product" },
            { title: "Add product", url: "/dashboard/admin/add-product" },
          ],
        },
      ],
      utilities: [
        { title: "Customers", url: "/dashboard/admin/customers" },
        { title: "Stock", url: "/dashboard/admin/stock" },
        { title: "Sales", url: "/dashboard/admin/sales" },
        { title: "Inventory transactions", url: "/dashboard/admin/inventory-transactions" },
        { title: "Factory orders", url: "/dashboard/admin/factory-orders" },
      ],
    };
  } else if (position === "auditor") {
    return {
      user: { name: employee_name, position },
      navMain: [
        {
          title: "Playground",
          url: "#",
          icon: SquareTerminal,
          isActive: true,
          items: [
            { title: "Dashboard", url: "/dashboard/admin" },
            { title: "Inner", url: "/dashboard/inner" },
            { title: "Settings", url: "#" },
          ],
        },
        {
          title: "Models",
          url: "#",
          icon: Bot,
          items: [
            { title: "Genesis", url: "#" },
            { title: "Explorer", url: "#" },
            { title: "Quantum", url: "#" },
          ],
        },
        {
          title: "Documentation",
          url: "#",
          icon: BookOpen,
          items: [
            { title: "Introduction", url: "dashboard" },
            { title: "Get Started", url: "#" },
            { title: "Tutorials", url: "#" },
            { title: "Changelog", url: "#" },
          ],
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings2,
          items: [
            { title: "General", url: "#" },
            { title: "Team", url: "#" },
            { title: "Billing", url: "#" },
            { title: "Limits", url: "#" },
          ],
        },
      ],
      utilities: [
        // { title: "Add employee", url: "/dashboard/admin/add-employee" },
        // { title: "Feedback", url: "#" },
        // { title: "Settings", url: "#" },
      ],
      projects: [
        { name: "Add employee", url: "/dashboard/admin/add-employee", icon: Frame },
        { name: "Sales & Marketing", url: "#", icon: PieChart },
        { name: "Travel", url: "#", icon: Map },
      ],
    };
  } else if (position === "warehouse-manager") {
  } else if (position === "warehouse-employee") {
  } else if (position === "store-manager") {
  } else if (position === "store-employee") {
  }
  return {};
}
