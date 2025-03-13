import { SquareTerminal, Bot, BookOpen, Settings2, Frame, PieChart, Map } from "lucide-react";

export function generateSidebarData(username, position) {
  if (position === "admin") {
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
  } else if (position === "supervisor") {
  } else if (position === "employee") {
  }
  return {};
}
