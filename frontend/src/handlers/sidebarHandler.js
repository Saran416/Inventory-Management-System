import { SquareTerminal, Bot, BookOpen, Settings2, Frame, PieChart, Map } from "lucide-react";

export function generateSidebarData(username, position) {
  if (position === "admin") {
    return {
      user: { name: username, position },
      navMain: [
        {
          title: "Employee",
          url: "#",
          icon: '',
          isActive: true,
          items: [
            { title: "Add employee", url: "/dashboard/admin/add-employee" },
            { title: "Inner", url: "/dashboard/inner" },
            { title: "Settings", url: "#" },
          ],
        },
        {
          title: "Sales",
          url: "#",
          icon: '',
          isActive: true,
          items: [
            { title: "View sales", url: "/dashboard/admin" },
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
        { title: "Add employee", url: "/dashboard/admin/add-employee" },
        // { title: "Feedback", url: "#" },
        // { title: "Settings", url: "#" },
      ],
      projects: [
        { name: "Add employee", url: "/dashboard/admin/add-employee", icon: Frame },
        { name: "Sales & Marketing", url: "#", icon: PieChart },
        { name: "Travel", url: "#", icon: Map },
      ],
    };
  } else if (position === "auditor") {
    return {
      user: { name: username, position },
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
        { title: "Add employee", url: "/dashboard/admin/add-employee" },
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
