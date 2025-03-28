'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

import { SiteHeader } from '@/components/sidebar/SiteHeader';

import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';

import { PieChartComponent, AreaChartComponent, BarChartComponent } from "@/components/ChartComponents";

import { fetchBrandsVsSales, fetchMostSoldProducts } from "@/api/data-calls";
import { set } from "lodash";


function DashBoard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { auth, loading, logout } = useAuth();

  const [PieChart1Data, setPieChart1Data] = useState([]);
  const [PieChart1Config, setPieChart1Config] = useState({});
  const [PieChart1DataKey, setPieChart1DataKey] = useState("");
  const [PieChart1NameKey, setPieChart1NameKey] = useState("");

  const [BarChart1Data, setBarChart1Data] = useState([]);
  const [BarChart1Config, setBarChart1Config] = useState({});
  const [BarChart1YAxisDataKey, setBarChart1YAxisDataKey] = useState("");
  const [BarChart1XAxisDataKey, setBarChart1XAxisDataKey] = useState("");

  const [BarChart2Data, setBarChart2Data] = useState([]);
  const [BarChart2Config, setBarChart2Config] = useState({});

  const [AreaChart1Data, setAreaChart1Data] = useState([]);
  const [AreaChart1Config, setAreaChart1Config] = useState({});

  const dataFetchWrapper = async() => {
    const brandVsSalesRespones = await fetchBrandsVsSales()
    console.log(brandVsSalesRespones.data)

    const generateColor = (index) => {
      const colors = [
        "oklch(0.646 0.222 41.116)",
        "oklch(0.6 0.118 184.704)",
        "oklch(0.398 0.07 227.392)",
        "oklch(0.828 0.189 84.429)",
        "oklch(0.769 0.188 70.08)",
      ]
      return colors[index % colors.length]
    }

    // Generate PieChartData and PieChartConfig
    const PieChartData = brandVsSalesRespones.data.map((item, index) => ({
      Brand: item.Brand,
      Total_Sales_Amount: parseFloat(item.Total_Sales_Amount),
      fill: generateColor(index),
    }))

    const PieChartConfig = brandVsSalesRespones.data.reduce((acc, item, index) => {
      acc[item.Brand] = {
        label: item.Brand,
        color: `hsl(var(--chart-${index + 1}))`,
      }
      return acc
    }, {
      Total_Sales_Amount: {
        label: "Total Sales Amount",
      },
    })

    // Set the data and config
    // After setting data and config
    setPieChart1Data(PieChartData)
    setPieChart1Config(PieChartConfig)
    setPieChart1DataKey("Total_Sales_Amount")
    setPieChart1NameKey("Brand")


    const barChart1Data = [
      { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
      { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
      { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
      { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
      { browser: "other", visitors: 90, fill: "var(--color-other)" },
    ]
    
    const barChart1Config = {
      visitors: {
        label: "Visitors",
      },
      chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
      },
      safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
      },
      firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
      },
      edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
      },
      other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
      },
    }

    setBarChart1Data(barChart1Data)
    setBarChart1Config(barChart1Config)
    setBarChart1XAxisDataKey("visitors")
    setBarChart1YAxisDataKey("browser")


  }

  useEffect(() => {
    // Redirect to login if no user
    if (!auth) {
      router.push("/login");
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(storedUser);
    
    

  }, [auth, loading, router]);

  useEffect(() => {
    dataFetchWrapper();
  }, [])

  if (!user) return <p>Loading...</p>;



  

  return (
    <>
      <div className="p-10">
        <h1>Welcome, {user.username}</h1>
        <div className="flex flex-wrap  pt-10">
          <div className="w-[30%]">
            <PieChartComponent ChartData={PieChart1Data} ChartConfig={PieChart1Config} ChartDataKey={PieChart1DataKey} ChartNameKey={PieChart1NameKey} />

          </div>
          
          <div className="w-[30%]">
            <BarChartComponent ChartData={BarChart1Data} ChartConfig={BarChart1Config} XAxisDataKey={BarChart1XAxisDataKey} YAxisDataKey={BarChart1YAxisDataKey} />

          </div>
        </div>
        <AreaChartComponent />
        
      </div>
          
    </>
  );
}

export default DashBoard;