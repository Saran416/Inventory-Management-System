'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from 'react';
import { toast } from "sonner"

import { fetchCategories } from '@/api/category-calls';
import { fetchBrandNames } from '@/api/brand-calls';

import { addProduct } from '@/api/product-calls';


export default function AddFacilityPage() {
  const [categoryList, setCategoryList] = useState([])
  const [brandNamesList, setBrandNamesList] = useState([])

  useEffect(() => {
    const fetchBrandNamesWrapper = async () => {
      const brandNamesResponse = await fetchBrandNames()
      if (!brandNamesResponse.success) {
        console.error("Error fetching brand names:", brandNamesResponse.message)
        return
      }
      const formattedData = brandNamesResponse.data.map((item) => [
        item.brand_name,
      ])
      setBrandNamesList(formattedData)
    }
    fetchBrandNamesWrapper()

    const fetchCategoryListWrapper = async () => {
      const categoriesResponse = await fetchCategories()
      if (!categoriesResponse.success) {
        console.error("Error fetching brand names:", brandNamesResponse.message)
        return
      }
      const formattedData = categoriesResponse.data.map((item) => [
        item.category_ID,
        item.category_name,
      ])
      setCategoryList(formattedData)
    }
    fetchCategoryListWrapper()

  }, [])

  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState(0)
  const [productCategoryID, setProductCategoryID] = useState(null);
  const [productCategoryName, setProductCategoryName] = useState("");
  const [productBrandName, setProductBrandName] = useState("")



  useEffect(() => {
    if (productCategoryName === "") {
      return
    }
    const selectedCategory = categoryList.find(
      (category) => category[1] === productCategoryName
    )
    setProductCategoryID(selectedCategory[0])
  }, [productCategoryName])



  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !productCategoryID || !productCategoryName || !productBrandName) {
      toast.error("Error", {
        description: "Please fill all fields",
      });
      return;
    }

    if (isNaN(productPrice)) {
      toast.error("Error", {
        description: "Price must be a valid number",
      });
      return;
    }

    let response = await addProduct(productName, productPrice, productCategoryID, productBrandName)
    // let response = { success: true, message: "Added" };

    console.log("Added ", productName, productPrice, productCategoryID, productBrandName);

    if (response.success) {
      toast.success("Success", {
        description: response.message,
      });
      setProductName("")
      setProductPrice("")
      setProductCategoryName("")
      setProductCategoryID(null)
      setProductBrandName("")
      

    } else {
      toast.error("Error", {
        description: response.message,
      });
    }
  };


  return (
    <div className="p-10">
      <div className="font-semibold tracking-tight text-3xl">Add facility</div>

      <form onSubmit={handleAddProduct} className='w-[50%] pt-10'>
        <div className="flex flex-col gap-6">

          <div className="grid gap-2">
            <Input 
              id="productName" 
              type="text" 
              placeholder="Product name"
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
              required 
            />
          </div>

          <div className="grid gap-2">
            <Input 
              id="productPrice" 
              type="number" 
              placeholder="Price in Rs."
              value={productPrice} 
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setProductPrice(value);
                }
              }} 
              required 
            />
          </div>

          <div className="grid gap-2">
            <Select onValueChange={setProductBrandName} value={productBrandName} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brandNamesList.map((brand_name, index) => (
                  <SelectItem key={index} value={brand_name[0]}>
                    {brand_name[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Select
              onValueChange={setProductCategoryName}
              value={productCategoryName}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category type">
                  {productCategoryName}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categoryList.map((category, index) => (
                  <SelectItem key={index} value={category[1]}>
                    {category[1]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          
          <Button type="submit" className="w-full">
            Add product
          </Button>
        </div>
      </form>

    </div>
  )
}