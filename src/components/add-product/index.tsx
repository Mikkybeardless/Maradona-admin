import { CarSpecificationsSection } from "./carSpecificationSection";
import { ConditionSection } from "./conditionSection";
import { MediaSection } from "./mediaSection";
import { PricingSection } from "./pricingSection";
import { ProductDetailsSection } from "./productDetailsSection";
import { ProductDocumentsSection } from "./productDocSection";
import { ProductTypeSection } from "./productTypeSection";
import { SidebarSection } from "./sideBarSection";

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
