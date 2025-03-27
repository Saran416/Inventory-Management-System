import { SquareTerminal, Bot, BookOpen, Settings2, Frame, PieChart, Map, Users, Store, FolderKanban } from "lucide-react";

export function generateSidebarData(employee_name, position) {
  if (position === "admin") {
    return {
      user: { name: employee_name, position },
      navTop: [
        { title: "Dashboard", url: "/dashboard/admin", icon: SquareTerminal },
      ],
      
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
      navTop: [
        { title: "Dashboard", url: "/dashboard/auditor", icon: SquareTerminal },
      ],
      
      navMain: [
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
  } else if (position === "warehouse-manager") {
    return {
      user: { name: employee_name, position },
      navTop: [
        { title: "Dashboard", url: "/dashboard/warehouse-manager", icon: SquareTerminal },
      ],
      
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
  } else if (position === "warehouse-employee") {
    return {
      user: { name: employee_name, position },
      navTop: [
        { title: "Dashboard", url: "/dashboard/warehouse-employee", icon: SquareTerminal },
      ],
      
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
  } else if (position === "store-manager") {
    return {
      user: { name: employee_name, position },
      navTop: [
        { title: "Dashboard", url: "/dashboard/store-manager", icon: SquareTerminal },
      ],
      
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
  } else if (position === "store-employee") {
    return {
      user: { name: employee_name, position },
      navTop: [
        { title: "Dashboard", url: "/dashboard/store-employee", icon: SquareTerminal },
      ],
      
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
  }
  return {};
}
