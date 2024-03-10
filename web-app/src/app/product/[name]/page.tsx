"use client";
import { useEffect, useState } from "react";
import { RadioGroup, Tab, Disclosure } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { InfiniteMovingCards } from "@/components/ui/infinite-product-card-slider";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import MyResponsiveLine from "@/components/PriceGraph";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import Image from "next/image";
import ChatBot from "@/components/Chatbot";

const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

const loadingStates = [
  {
    text: "Scouring the web for the perfect product",
  },
  {
    text: "Analyzing product features and details from multiple sources",
  },
  {
    text: "Connecting to various product databases",
  },
  {
    text: "Retrieving comprehensive information about the product",
  },
  {
    text: "Compiling specifications and reviews from different websites",
  },
  {
    text: "Sorting and organizing data for a thorough presentation",
  },
  {
    text: "Preparing to aggregate information from diverse sources",
  },
  {
    text: "Welcome to the products page, sourced from various websites!",
  },
];

type ProductType = {
  about: string;
  image: string;
  negative_aspects: string;
  positive_aspects: string;
  price: string;
  rating: string;
  recommendations: string[];
  review_count: string;
  summary: string;
  title: string;
  url: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductType>({
    about: "",
    image: "",
    negative_aspects: "",
    positive_aspects: "",
    price: "",
    rating: "",
    recommendations: [],
    review_count: "",
    summary: "",
    title: "",
    url: "",
  });
  //how can i get params passed in pathname
  const { name } = useParams();
  //console.log(productUrl);
  const axiosHeaders = {
    "ngrok-skip-browser-warning": "1231",
  };
  useEffect(() => {
    const productUrl = localStorage.getItem("productUrl");
    let productType;
    if (productUrl.includes("amazon")) {
      productType = "amazon";
    } else if (productUrl.includes("flipkart")) {
      productType = "flipkart";
    } else {
      // Handle other cases or set a default type
      productType = "unknown";
    }
    let url = "";
    if (productType === "amazon") {
      url = `${
        process.env.NEXT_PUBLIC_API_URL
      }/product_amazon?url=${decodeURIComponent(productUrl)}`;
    } else {
      url = `${
        process.env.NEXT_PUBLIC_API_URL
      }/product_flipkart?url=${decodeURIComponent(productUrl)}`;
    }
    axios
      .get(url, {
        headers: axiosHeaders,
      })
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <main className="pt-5 sm:pt-16 relative">
        <div className="mx-auto py-6 px-4 sm:py-6 sm:px-6 lg:px-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <Loader
              loadingStates={loadingStates}
              loading={loading}
              duration={2000}
            />
            {/* Image gallery */}
            <Image
              src={product.image}
              className="w-full max-w-xl max-h-xl object-center object-cover sm:rounded-lg"
              height={500}
              width={500}
            />

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">Rs. {product.price}</p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          parseFloat(product.rating) > rating
                            ? "text-indigo-500"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-md">
                    {product.rating} ({product.review_count})
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product.about }}
                />
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="border-t divide-y divide-gray-200">
                  {product.positive_aspects && (
                    <Disclosure as="div" key={1}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                Positive Aspects
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <ul role="list" className="list-disc">
                              {product.positive_aspects
                                .split(",")
                                .map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                  {product.negative_aspects && (
                    <Disclosure as="div" key={1}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                Negative Aspects
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <ul role="list" className="list-disc">
                              {product.negative_aspects
                                .split(", ")
                                .map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                  <MyResponsiveLine price={product.price}/>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Related products */}
        <section
          aria-labelledby="related-products-heading"
          className="bg-white"
        >
          {product.recommendations && (
            <div className="py-14 px-4 sm:px-20">
              <h2
                id="related-products-heading"
                className="text-xl font-bold tracking-tight text-gray-900"
              >
                Similar Products
              </h2>
              <InfiniteMovingCards
                products={product.recommendations}
                direction="right"
                speed="slow"
              />
            </div>
          )}
        </section>
        <ChatBot description={product.about}/>
      </main>
    </div>
  );
}
