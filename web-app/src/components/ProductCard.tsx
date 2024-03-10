import React from "react";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Product = {
  name: string;
  image: string;
  rating: string;
  about: string;
  price: string;
  platform: string;
  url: string | null;
};

interface ProductCardProps {
  product: Product;
  key: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  key: key,
  product: product,
}) => {
  return (
    <CardContainer key={key}>
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold max-w-72  text-neutral-600 dark:text-white line-clamp-2"
        >
          {product.name}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
              alt={'image of '+product.name}
            src={product.image}
            height="1000"
            width="1000"
            className="w-72 h-72 object-contain rounded-xl group-hover/card:shadow-xl"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-5">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-md font-normal dark:text-white flex items-center"
          >
            <StarIcon className="h-4 w-4 mr-1" />
            {product.rating}
          </CardItem>
          <CardItem translateZ={20} as="button" data-link={product.url}>
            <Image
            alt={product.platform==='flipkart' ? 'flipkart logo' : 'amazon logo'}
              src={
                product.platform === "flipkart"
                  ? "/flipkart-icon.svg"
                  : "/amazon-a-logo-icon.svg"
              }
              height={50}
              width={50}
              className="h-8 w-8"
            />
          </CardItem>
        </div>
        <div className="flex justify-between items-center mt-2">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-md font-normal dark:text-white"
          >
            {product.price}
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            <Link
              href={{
                pathname: `/product/${product.url?.split("/")[3]}`,
                query: {
                  productUrl: product.url,
                },
              }}
            >
              Show More
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProductCard;
