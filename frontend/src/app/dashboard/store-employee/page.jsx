'use client';
import { SiteHeader } from '@/components/sidebar/SiteHeader';

import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, use } from 'react';
import { toast } from "sonner"

import { fetchEmployeeID } from '@/api/employee-call';

import { addSale } from '@/api/sales-call';

import { fetchProducts } from '@/api/product-calls';

function AddSaleForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [productID, setProductID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProductsWrapper = async () => {
      const productsResponse = await fetchProducts("", "");
      if (!productsResponse.success) {
        console.error("Error fetching products:", productsResponse.message);
        return;
      }
      const formattedProducts = productsResponse.data.map((item) => ({
        id: item.product_ID,
        name: item.product_name,
      }));
      
      setProductList(formattedProducts);
    }
    fetchProductsWrapper();
  }, [])

  useEffect(() => {
    if (selectedProductName === "") {
      return;
    }
    const product = productList.find((product) => product.name === selectedProductName);
    setProductID(product.id);
  }, [selectedProductName])

  // useEffect(() => {
  //   console.log("Product ID:", productID);
  // }, [productID])

  // useEffect(() => {
  //   console.log("Product list:", productList);
  // }, [productList])

  useEffect(() => {
    const wrapper = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      // console.log("Stored user:", storedUser.username);
      
      const employeeIDResponse = await fetchEmployeeID(storedUser.username);
      if (!employeeIDResponse.success) {
        toast.error("Error", {
          description: employeeIDResponse.message,
        });
        return;
      }
      // console.log("Employee ID:", employeeIDResponse.employee_ID);
      setEmployeeID(employeeIDResponse.employee_ID);
    }
    wrapper();
  }, []);

  const handleAddSale = async (e) => {
    e.preventDefault();

    

    if (!customerName || !customerNumber || !productID || !quantity) {
      toast.error("Error", {
        description: "Please fill in all fields",
      });
      return;
    }

    if (!/^\d{10}$/.test(customerNumber)) {
      toast.error("Error", {
        description: "Customer number must be a 10-digit number",
      });
      return;
    }

    let response = await addSale(customerName, customerNumber, productID, quantity, employeeID);

    // let response = { success: true, message: "Added" };

    if (response.success) {
      toast.success("Success", {
        description: response.message,
      });
      setCustomerName("");
      setCustomerNumber("");
      setProductID("");
      setQuantity("");
      setSelectedProductName("");
    } else {
      toast.error("Error", {
        description: response.message,
      });
    }


    // console.log("Adding sale");
    // console.log("Customer name:", customerName);
    // console.log("Customer number:", customerNumber);
    // console.log("Product ID:", productID);
    // console.log("Quantity:", quantity);

    

  }

  return (
    <>
      <form onSubmit={handleAddSale} className='w-[50%] pt-10'>
        <div className="flex flex-col gap-6">

        <div className="grid gap-2">
            <Input 
              id="customerName" 
              type="text" 
              placeholder="Customer name"
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
              required 
            />
          </div>

          <div className="grid gap-2">
            <Input 
              id="customerNumber" 
              type="mobile" 
              placeholder="Customer number (9xxxxxxxxx)"
              value={customerNumber} 
              onChange={(e) => setCustomerNumber(e.target.value)} 
              required 
            />
          </div>

          <div className="grid gap-2">
            <Select onValueChange={setSelectedProductName} value={selectedProductName} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {productList.map((product, index) => (
                  <SelectItem key={index} value={product.name}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Input 
              id="quantity" 
              type="number" 
              placeholder="Quantity"
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              required 
            />
          </div>



          
          <Button type="submit" className="w-full">
            Add sale
          </Button>
        </div>
      </form>
    </>
  )


}


function DashBoard() {


  return (
    <div className="p-10">
      <div className="font-semibold tracking-tight text-3xl">Add sale</div>
      <AddSaleForm />
      
          
    </div>
  );
}

export default DashBoard;