const allowedKeysMap: {
  [K in keyof ProductPayloadMap]: (keyof ProductPayloadMap[K])[];
} = {
  LAND: [
    "name",
    "description",
    "price",
    "category_id",
    "type",
    "land_type",
    "land_size",
    "accessibility",
    "topography",
    "fencing",
    "status",
    "media",
    "tags",
    "documents",
    "condition",
    "inventory",
  ],
  HOUSE: [
    "name",
    "description",
    "price",
    "category_id",
    "type",
    "house_type",
    "house_beds",
    "house_furnished",
    "house_condition",
    "house_size",
    "accessibility",
    "media",
    "tags",
    "documents",
    "inventory",
  ],
  CAR: [
    "name",
    "description",
    "price",
    "category_id",
    "type",
    "body_type",
    "engine_type",
    "mileage",
    "gear_type",
    "status",
    "media",
    "tags",
    "documents",
    "condition",
    "inventory",
  ],
} as const;

export function getProductShape(
  product: Extract<ProductDetails, { type: ProductType }>
): ProductPayloadMap[ProductType] {
  const allowedKeys = allowedKeysMap[product.type];

  const filtered = Object.fromEntries(
    Object.entries(product).filter(([key]) =>
      allowedKeys.includes(key as keyof ProductPayloadMap[ProductType])
    )
  ) as ProductPayloadMap[ProductType];

  return filtered;
}
