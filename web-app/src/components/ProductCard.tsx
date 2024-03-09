import React from "react";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

type Product = {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  url: string | null;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <CardContainer key={product.id}>
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {product.name}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={product.imageSrc}
            height="1000"
            width="1000"
            className="w-80 h-80 object-cover rounded-xl group-hover/card:shadow-xl"
            alt={product.imageAlt}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
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
            data-link={product.url}
          >
            Show More
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProductCard;