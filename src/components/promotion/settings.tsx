// components/ProductTypeSection.tsx
import { useEffect, useState } from "react";
import promotionService, {
  SetCostData,
} from "../../api/services/promotion.service";
import { NumberInput } from "../common/NairaInput";
import { toast } from "react-toastify";
import { set } from "js-cookie";

export const PromoSetting = () => {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [settings, setSettings] = useState<SetCostData>({
    product_type: "CAR",
    cost_per_day: 0,
  });

  useEffect(() => {
    // Fetch initial settings from the server
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await promotionService.getPromotionCost(
          settings.product_type
        );
        if (response.status === 200) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error("Error fetching promotion settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [settings.product_type]);

  const handleSettingSave = async () => {
    setUpdating(true);
    const formData = new FormData();
    formData.append("product_type", settings.product_type);
    formData.append("cost_per_day", settings.cost_per_day.toString());

    try {
      const response = await promotionService.setPromoCost(formData);
      if (response.status === 200) {
        toast.success("Settings updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");
      console.error("Error updating promotion settings:", error);
    } finally {
      setUpdating(false);
    }
  };
  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
      <h2 className="text-lg font-semibold">Set Promotion Price</h2>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="productType" className="text-sm">
          Select product type
        </label>
        <select
          id="productType"
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              product_type: e.target.value as ProductType,
            }))
          }
          name="product_type"
          value={settings.product_type}
          className="p-3 outline-none w-full rounded-lg border border-primaryBorder"
        >
          <option disabled value="">
            Select
          </option>
          <option value="LAND">Land</option>
          <option value="CAR">Car</option>
          <option value="HOUSE">House</option>
        </select>
      </div>

      {loading ? (
        <p className="text-sm">Loading Price...</p>
      ) : (
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <p className="text-sm">Set price per day</p>
            <NumberInput
              min={0}
              max={1000000}
              step={100}
              defaultValue={settings.cost_per_day}
              onValueChange={(price: number) => {
                setSettings((prev) => ({
                  ...prev,
                  cost_per_day: price,
                }));
              }}
            />
          </div>
          <button
            onClick={handleSettingSave}
            className="text-white   bg-[#F16139] px-5 py-2 rounded-md"
          >
            {updating ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};
