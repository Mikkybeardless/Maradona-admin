import { CarSpecificationsSection } from "./product/carSpecificationSection";
import { ConditionSection } from "./product/conditionSection";
import { MediaSection } from "./product/mediaSection";
import { PricingSection } from "./product/pricingSection";
import { ProductDetailsSection } from "./product/productDetailsSection";
import { ProductDocumentsSection } from "./product/productDocSection";
import { ProductTypeSection } from "./product/productTypeSection";
import { SidebarSection } from "./product/sideBarSection";

interface ProductFormProps {
  productDetails: ProductDetails;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  checkedDoc: CheckboxState;
  handleCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Main AddProductForm component

export const AddProductForm: React.FC<ProductFormProps> = (props) => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      {/* Left Section */}
      <section className="w-full md:w-[70%] flex flex-col gap-y-5 overflow-hidden">
        <ProductTypeSection {...props} />
        <ProductDetailsSection {...props} />
        <MediaSection {...props} />
        <PricingSection {...props} />
        <ConditionSection {...props} />

        {props.productDetails.type === "LAND" && (
          <ProductDocumentsSection {...props} />
        )}

        {props.productDetails.type === "CAR" && (
          <CarSpecificationsSection
            productDetails={props.productDetails as Car}
            setProductDetails={
              props.setProductDetails as React.Dispatch<
                React.SetStateAction<Car>
              >
            }
            handleInputChange={props.handleInputChange}
          />
        )}
      </section>

      {/* Right Sidebar */}
      <SidebarSection {...props} />
    </div>
  );
};
