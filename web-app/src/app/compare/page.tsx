// pages/compare.js
"use client";
import axios from "axios";
import React, { useState } from "react";

const Compare = () => {
  const [product1, setProduct1] = useState({
    name: "POCO C55 (Forest Green, 6GB RAM, 128GB Storage)",
    price: "6499",
    image: "https://m.media-amazon.com/images/I/51kVviU7ZbL._SY606_.jpg",
  });
  const [product2, setProduct2] = useState({
    name: "realme narzo N53 (Feather Black, 8GB+128GB) 33W Segment Fastest Charging | Slimmest Phone in Segment | 90 Hz Smooth Display",
    price: "11999",
    image: "https://m.media-amazon.com/images/I/71DSxfKzkJL._SX569_.jpg",
  });
  const [loading, setLoading] = useState(false);
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");

  const handleCompare = () => {
    setLoading(true);

    // Simulating API call delay for demonstration purposes
    setTimeout(() => {
      // fetchProduct(url1).then(data => setProduct1(data));
      // fetchProduct(url2).then(data => setProduct2(data));
      // axios.get(process.env.NEXT_PUBLIC_API_URL+'/product_amazon?url='+url1).then((res) => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/amazon_product?url=${url1}`).then((res) => {
        setProduct1(res.data);
      })

      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/amazon_product?url=${url2}`).then((res) => {
        setProduct2(res.data);
      })



      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-white via-blue-500 to-white py-5">
      <div className="max-w-6xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-blue-800">
          Product Comparison
        </h1>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Enter URL for Product 1"
            className="flex-grow p-2 border border-blue-500 rounded-l-md focus:outline-none focus:border-blue-500 transition-all duration-300 w-2/3 mr-2"
            onChange={(e) => setUrl1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter URL for Product 2"
            className="flex-grow p-2 border border-blue-500 rounded-r-md focus:outline-none focus:border-blue-500 transition-all duration-300 w-2/3 ml-2"
            onChange={(e) => setUrl2(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-all duration-300"
            onClick={handleCompare}
          >
            Compare
          </button>
        </div>

        <div className="flex">
          {/* Product Card 1 */}
          <div className="flex-1 mr-4 transform hover:scale-105 transition-all duration-300">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <img
                src={product1.image}
                alt={product1.name}
                className="mb-4 rounded-md"
              />
              <h2 className="text-xl font-semibold">{product1.name}</h2>
              <p className="text-gray-600">${product1.price}</p>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="flex-1 ml-4 transform hover:scale-105 transition-all duration-300">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <img
                src={product2.image}
                alt={product2.name}
                className="mb-4 rounded-md"
              />
              <h2 className="text-xl font-semibold">{product2.name}</h2>
              <p className="text-gray-600">${product2.price}</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-8 bg-blue-100 p-6 rounded-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            Comparison Summary
          </h2>
          {/* Include any relevant summary information here */}
        </div>
      </div>
    </div>
  );
};

export default Compare;
