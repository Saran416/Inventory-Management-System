'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

import { SiteHeader } from '@/components/sidebar/SiteHeader';

import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';

import { PieChartComponent, AreaChartComponent, BarChartComponent, BarChartVerticalComponent } from "@/components/ChartComponents";

import { fetchBrandsVsSales, fetchMostSoldProducts, fetchBusiestStores, fetchSales6Months } from "@/api/data-calls";
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
  const [BarChart2YAxisDataKey, setBarChart2YAxisDataKey] = useState("");
  const [BarChart2XAxisDataKey, setBarChart2XAxisDataKey] = useState("");

  const [AreaChart1Data, setAreaChart1Data] = useState([]);
  const [AreaChart1Config, setAreaChart1Config] = useState({});

  const dataFetchWrapper = async() => {
    // const generateColor = (index) => {
    //   const colors = [
    //     "rgb(255, 85, 51)",   // --chart-1: 12 76% 61% (orange-red)
    //     "rgb(49, 152, 128)",  // --chart-2: 173 58% 39% (teal)
    //     "rgb(38, 79, 102)",   // --chart-3: 197 37% 24% (navy blue)
    //     "rgb(225, 225, 91)",  // --chart-4: 43 74% 66% (yellow-green)
    //     "rgb(238, 192, 93)",  // --chart-5: 27 87% 67% (light orange)
    //   ]
    //   return colors[index % colors.length]
    // }

    const generateColor = (index) => {
      const colors = [
        "rgb(0, 0, 0)",   // --chart-1: 12 76% 61% (orange-red)
        "rgb(43, 43, 43)",  // --chart-2: 173 58% 39% (teal)
        "rgb(73, 73, 73)",   // --chart-3: 197 37% 24% (navy blue)
        "rgb(87, 87, 87)",  // --chart-4: 43 74% 66% (yellow-green)
        "rgb(134, 134, 134)",  // --chart-5: 27 87% 67% (light orange)
      ]
      return colors[index % colors.length]
    }
    

    const brandVsSalesRespones = await fetchBrandsVsSales();
    const PieChartData = brandVsSalesRespones.data.map((item, index) => ({
      Brand: item.Brand,
      Total_Sales_Amount: parseFloat(item.Total_Sales_Amount),
      fill: generateColor(index),
    }));
    const PieChartConfig = brandVsSalesRespones.data.reduce((acc, item, index) => {
      acc[item.Brand] = {
        label: item.Brand,
        color: generateColor(index),
      }
      return acc
    }, {
      Total_Sales_Amount: {
        label: "Total Sales Amount",
      },
    });
    setPieChart1Data(PieChartData);
    setPieChart1Config(PieChartConfig);
    setPieChart1DataKey("Total_Sales_Amount");
    setPieChart1NameKey("Brand");

    const mostSoldProductsResponse = await fetchMostSoldProducts();
    const BarChart1Data = mostSoldProductsResponse.data.map((item, index) => ({
      Product: item.Product,
      Total_Quantity_Sold: parseFloat(item.Total_Quantity_Sold),
      fill: 'rgb(32, 32, 32)',
    }));
    const BarChart1Config = mostSoldProductsResponse.data.reduce((acc, item, index) => {
      acc[item.Product] = {
        label: item.Product,
        color: generateColor(index),
      }
      return acc
    }, {
      Total_Quantity_Sold: {
        label: "Quantity Sold",
      },
    });
    setBarChart1Data(BarChart1Data);
    setBarChart1Config(BarChart1Config);
    setBarChart1XAxisDataKey("Total_Quantity_Sold");
    setBarChart1YAxisDataKey("Product");


    const busiestStoresResponse = await fetchBusiestStores();
    const BarChart2Data = busiestStoresResponse.data.map((item, index) => ({
      Store: item.Store,
      Total_Sales_Amount: parseFloat(item.Total_Sales_Amount),
      fill: 'rgb(32, 32, 32)',
    }));
    const BarChart2Config = busiestStoresResponse.data.reduce((acc, item, index) => {
      acc[item.Store] = {
        label: item.Store,
        color: generateColor(index),
      }
      return acc
    }, {
      Total_Sales_Amount: {
        label: "Sales Amount",
      },
    });
    setBarChart2Data(BarChart2Data);
    setBarChart2Config(BarChart2Config);
    setBarChart2XAxisDataKey("Total_Sales_Amount");
    setBarChart2YAxisDataKey("Store");

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


        <div className="flex gap-10  pt-10 pb-10">
          <div className="w-full">
            <PieChartComponent ChartData={PieChart1Data} ChartConfig={PieChart1Config} ChartDataKey={PieChart1DataKey} ChartNameKey={PieChart1NameKey} />
          </div>
          <div className="w-full">
            <BarChartVerticalComponent 
              ChartTitle={"Most Sold Products"} 
              RightMargin={30}
              LeftMargin={10}
              TooltipWidth={20}
              ChartData={BarChart1Data} 
              ChartConfig={BarChart1Config} 
              XAxisDataKey={BarChart1XAxisDataKey} 
              YAxisDataKey={BarChart1YAxisDataKey} 
            />
          </div>
          <div className="w-full">
            <BarChartVerticalComponent 
              ChartTitle={"Busiest Stores"} 
              RightMargin={30}
              TooltipWidth={200}
              ChartData={BarChart2Data} 
              ChartConfig={BarChart2Config} 
              XAxisDataKey={BarChart2XAxisDataKey} 
              YAxisDataKey={BarChart2YAxisDataKey} 
            />
          </div>
        </div>

        


        <AreaChartComponent />
        
      </div>
          
    </>
  );
}

export default DashBoard;