"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { usePathname } from "next/navigation";
import TextToSpeech from "@/utils/textToSpeech";

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

const filters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "descending-price", label: "High to Low" },
      { value: "ascending-price", label: "Low to High" },
    ],
  },
  {
    id: "ratings",
    name: "Ratings",
    options: [
      { value: "descending-ratings", label: "High to Low" },
      { value: "ascending-ratings", label: "Low to High" },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([products]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const axiosHeaders = {
    "ngrok-skip-browser-warning": "1231",
  };
  const pathname = usePathname();
  useEffect(() => {
    const query = pathname.split("/")[2];
    const queryDecoded = decodeURIComponent(query);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/search?term=${queryDecoded}`, {
        headers: axiosHeaders,
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        res.data.forEach((product:any) => {
          console.log(product);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const sortedProducts = [...products];
    if (selectedFilter) {
      sortedProducts.sort((a, b) => {
        // Adjust the sorting logic based on the selected filter
        if (selectedFilter === "descending-ratings") {
          // Sort in descending order
          return parseFloat(b.rating) - parseFloat(a.rating);
        } else if (selectedFilter === "ascending-ratings") {
          // Sort in ascending order
          return parseFloat(a.rating) - parseFloat(b.rating);
        } else if (selectedFilter === "descending-price") {
          // Sort in descending order
          return parseFloat(b.price) - parseFloat(a.price);
        } else if (selectedFilter === "ascending-price") {
          // Sort in ascending order
          return parseFloat(a.price) - parseFloat(b.price);
        }
      });
    }
    setSortedProducts(sortedProducts); // Update the state here
  }, [selectedFilter, products]); // Include products dependency


  useEffect(() => {
      if (products.length > 0) {
        TextToSpeech('Press spacebar to listen to the product details, Press enter to go that product page');

      }
  }, [products]);

  const [currentProdIndex, setCurrentProdIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && currentProdIndex < 5) {
        TextToSpeech(`The product name is products[currentProdIndex].name
        The product price is products[currentProdIndex].price
        The rating of the product is products[currentProdIndex].rating
        The product is available on products[currentProdIndex].platform
        `);
        setCurrentProdIndex(currentProdIndex + 1);
      }
      // else if (e.key === 'Enter') {
      //   window.location.href = products[currentProdIndex].url;
      // }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="border-t border-gray-200 pt-4 pb-4"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 h-7 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="pt-4 pb-2 px-4">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`${section.id}-${optionIdx}-mobile`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}-mobile`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 lg:px-20">
          <Loader
            loadingStates={loadingStates}
            loading={loading}
            duration={2000}
          />
          {loading && (
            <button
              className="fixed top-4 right-4 text-black dark:text-white z-[120]"
              onClick={() => setLoading(false)}
            >
              <IconSquareRoundedX className="h-10 w-10" />
            </button>
          )}
          <div className="border-b border-gray-200 pt-10 pb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Related Products
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Checkout out the all the products across various websites!
            </p>
          </div>

          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-5">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <XMarkIcon
                  className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              <div className="hidden lg:block">
                <form className="divide-y divide-gray-200 space-y-10">
                  {filters.map((section, sectionIdx) => (
                    <div
                      key={section.name}
                      className={sectionIdx === 0 ? null : "pt-10"}
                    >
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">
                          {section.name}
                        </legend>
                        <div className="pt-6 space-y-3">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                onChange={() => setSelectedFilter(option.value)}
                                checked={option.value === selectedFilter} // Check if the option is selected
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:mt-0 col-span-4"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="flex flex-wrap gap-5 w-[100%]">
                {sortedProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
