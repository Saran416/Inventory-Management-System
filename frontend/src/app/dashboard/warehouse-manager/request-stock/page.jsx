'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, use } from 'react';
import { toast } from "sonner"

import { fetchEmployeeID } from '@/api/employee-call';


import { fetchProducts } from '@/api/product-calls';

import { fetchWarehouses } from '@/api/facility-calls';

import { addInventoryTransaction } from '@/api/transactions-calls';

import { addFactoryOrder } from '@/api/transactions-calls';

function AddFactoryOrderForm() {
  
  const [employeeID, setEmployeeID] = useState("");
  
  const [warehouseID, setWarehouseID] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [productID, setProductID] = useState();
  const [quantity, setQuantity] = useState("");
  

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

  useEffect(() => {
    const wrapper = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      
      const employeeIDResponse = await fetchEmployeeID(storedUser.username);
      if (!employeeIDResponse.success) {
        toast.error("Error", {
          description: employeeIDResponse.message,
        });
        return;
      }
      setEmployeeID(employeeIDResponse.employee_ID);
    }
    wrapper();
  }, []);

  const handleAddSale = async (e) => {
    e.preventDefault();

    if (!selectedProductName || !productID || !quantity) {
      toast.error("Error", {
        description: "Please fill in all fields",
      });
      return;
    }


    let response = await addFactoryOrder(productID, quantity, employeeID);
    



    if (response.success) {
      toast.success("Success", {
        description: response.message,
      });
      setSelectedProductName("");
      setProductID("");
      setQuantity("");


    } else {
      toast.error("Error", {
        description: response.message,
      });
    }

    

  }

  return (
    <>
      <form onSubmit={handleAddSale} className='w-[50%] pt-10'>
        <div className="flex flex-col gap-6">

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
            Request stock
          </Button>
        </div>
      </form>
    </>
  )


}


function RequestStockPage() {
  return (
    <div className="p-10">
      <div className="font-semibold tracking-tight text-3xl">Request Stock</div>
      <AddFactoryOrderForm />
    </div>
  );
}

export default RequestStockPage;