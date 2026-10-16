// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

// import React,{useEffect,useState} from 'react';
// import img from './assets/N2.jpeg';
// import './App.css';
// import Button from './components/UI/button';
// const App = () => {
//   const [counter, setCounter]=useState(0);
//   const [data,setData] = useState([]);
// function buyProduct(item) {
//   alert(`You selected ${item.title}`);
// }

// function addToCart() {
//   setCounter((prev) => prev + 1);
// }
//   useEffect(()=>
//   {
//     const fetchData = async ()=>{
//       // const response =await fetch('http://jsonplaceholder.typicode.com/users');
//       const response = await fetch('https://fakestoreapi.com/products');
//       const data = await response.json();
//       setData(data)
//     }
//     fetchData();
//   },[])

//   console.log(data,"data")
//   return (

//  <div className="container">


//  <h1>Happy Shopping</h1>
//       <h2>Cart: {counter} items</h2>

//       <div className="products">
//         {data.map((item) => {
//           return (
//             <div className="card" key={item.id}>

//               <img src={item.image} alt={item.title} />

//               <h3>{item.title}</h3>

//               <p>Price: ${item.price}</p>

//               <button onClick={() => buyProduct(item)}>
//                 Buy Now
//               </button>

//               <button onClick={addToCart}>
//                 Add to Cart
//               </button>

//             </div>
//           );
//         })}
//       </div>

//     </div>
//   );
// };

// export default App; 

// import {useState} from "react";
// import Title from "./Title.jsx";
// function App()
// {
//   const [count , setCount] =useState(0);
//   return(
//     <>
//     <Title count={count} />
//     <button onClick={()=> setCount(count +1)} >Click me</button>
//     </>
//   )
// }
// export default App;




import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [retry, setRetry] = useState(0);

  
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "https://fakestoreapi.com/products",
          { signal: controller.signal }
        );

        console.log(
          `Products API Status: ${response.status} ${response.statusText}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result)) {
          throw new Error("Invalid product data!");
        }

        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch Error:", err.message);
          setError(
            navigator.onLine
              ? `Network/API Error: ${err.message}`
              : "No Internet Connection!"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [retry]);

  
  function addToCart() {
    setCounter((prev) => prev + 1);
  }


  function buyProduct(item) {
    alert(`You selected ${item.title}`);
  }


  async function openProduct(item) {
    setDetailLoading(true);
    setError("");
    setSelectedProduct(null);

    window.history.pushState(
      {},
      "",
      `#product-${item.id}`
    );

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${item.id}`
      );

      console.log(
        `Product API Status: ${response.status} ${response.statusText}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const product = await response.json();

      if (!product || !product.id) {
        throw new Error("404 Product Not Found");
      }

      setSelectedProduct(product);
      console.log("Page loaded successfully!");
    } catch (err) {
      console.error("Product Error:", err.message);

      setError(
        navigator.onLine
          ? `Failed to load product: ${err.message}`
          : "No Internet Connection!"
      );
    } finally {
      setDetailLoading(false);
    }
  }

  
  function goBack() {
    window.history.pushState({}, "", "#");
    setSelectedProduct(null);
    setError("");
  }


  const filteredProducts = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Happy Shopping</h1>
      <h2>Cart: {counter} items</h2>

      {}
      {loading || detailLoading ? (
        <div className="status">
          <div className="spinner"></div>
          <p>Loading... Please wait</p>
        </div>

      
      ) : error ? (
        <div className="status">
          <h3 className="error">❌ {error}</h3>

          <button
            onClick={() => {
              if (window.location.hash.startsWith("#product-")) {
                const id = Number(
                  window.location.hash.replace("#product-", "")
                );
                openProduct({ id });
              } else {
                setRetry((prev) => prev + 1);
              }
            }}
          >
            Retry
          </button>

          <button onClick={goBack}>
            Back to Products
          </button>
        </div>

      ) : selectedProduct ? (
        <div className="details">
          <button onClick={goBack}>← Back</button>

          <p className="success">
            ✓ Page loaded successfully!
          </p>

          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
          />

          <h2>{selectedProduct.title}</h2>
          <h3>Price: ${selectedProduct.price}</h3>

          <p>
            Category: {selectedProduct.category}
          </p>

          <p>{selectedProduct.description}</p>

          <p>
            Rating: ⭐ {selectedProduct.rating?.rate ?? "N/A"}
          </p>

          <button onClick={addToCart}>
            Add to Cart
          </button>

          <button onClick={() => buyProduct(selectedProduct)}>
            Buy Now
          </button>
        </div>

      ) : (
        <>
          <input
            type="text"
            className="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredProducts.length === 0 ? (
            <div className="status">
              <h3>No products found!</h3>
            </div>
          ) : (
            <div className="products">
              {filteredProducts.map((item) => (
                <div className="card" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    onClick={() => openProduct(item)}
                  />

                  <h3 onClick={() => openProduct(item)}>
                    {item.title}
                  </h3>

                  <p>Price: ${item.price}</p>

                  <button onClick={() => buyProduct(item)}>
                    Buy Now
                  </button>

                  <button onClick={addToCart}>
                    Add to Cart
                  </button>

                  <button onClick={() => openProduct(item)}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
