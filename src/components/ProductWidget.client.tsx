import {ProductPrice, ProductTitle, useProduct} from '@shopify/hydrogen/client';
import {useState} from 'react';
import {SanityProduct} from '../types';
import ButtonSelectedVariantAddToCart from './ButtonSelectedVariantAddToCart.client';
import ButtonSelectedVariantBuyNow from './ButtonSelectedVariantBuyNow.client';
import ProductOptions from './ProductOptions.client';

type Props = {
  sanityProduct: SanityProduct;
};

function ProductActions() {
  const {selectedVariant} = useProduct();
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = !selectedVariant?.availableForSale;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="space-y-2">
      {/* Quantity */}
      {!isOutOfStock && (
        <div className="mt-2 inline-flex items-center overflow-auto rounded border border-gray-300">
          <button
            aria-label="Decrease quantity"
            className="disabled:pointer-events-all p-2"
            disabled={quantity === 1}
            onClick={handleDecreaseQuantity}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="p-2 text-center text-xs text-gray-900">
            {quantity}
          </div>
          <button
            aria-label="Increase quantity"
            className="disabled:pointer-events-all p-2 text-gray-400"
            onClick={handleIncreaseQuantity}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      <ButtonSelectedVariantAddToCart quantity={quantity} />
      {!isOutOfStock && <ButtonSelectedVariantBuyNow quantity={quantity} />}
    </div>
  );
}

function ProductPrices() {
  const storefrontProduct = useProduct();

  if (!storefrontProduct?.selectedVariant) {
    return null;
  }

  return (
    <>
      <ProductPrice
        className="font-semibold line-through"
        priceType="compareAt"
        variantId={storefrontProduct.selectedVariant.id}
      />
      <ProductPrice
        className="font-semibold"
        variantId={storefrontProduct.selectedVariant.id}
      />
    </>
  );
}

export default function ProductWidget({sanityProduct}: Props) {
  const storefrontProduct = useProduct();

  // console.log('storefrontProduct', storefrontProduct);

  return (
    <div className="rounded bg-gray-100 p-4">
      <ProductTitle as="h1" className="font-medium" />
      {/* {storefrontProduct?.vendor && <div>{storefrontProduct.vendor}</div>} */}
      <ProductPrices />
      <ProductOptions
        customProductOptions={sanityProduct.customProductOptions}
      />
      <ProductActions />
    </div>
  );
}
