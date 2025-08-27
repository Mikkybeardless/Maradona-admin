import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../api/services/userMgt.service";
import AdminCustomer from "../components/Customer";
import { toast } from "react-toastify";
import { DetailLoadingState } from "../components/common/detailLoadingState";

export default function Buyer() {
  const [isLoading, setIsLoading] = useState(true);
  const [buyer, setBuyer] = useState<ApiBuyer>({
    id: 4,
    name: "",
    email: "",
    email_verified_at: null,
    type: "buyer",
    created_at: "",
    updated_at: "",
    buyer_profile: {
      id: 1,
      user_id: "4",
      created_at: "",
      updated_at: "",
    },
  });

  const { id } = useParams();
  useEffect(() => {
    const fetchBuyerDetails = async () => {
      if (id) {
        try {
          const response = await UserService.getBuyer(parseInt(id));
          console.log("Buyer details:", response.data);
          setBuyer(response.data);
        } catch (error) {
          toast.error("An unknown error occured, please refresh the page");
          console.error("Error fetching buyer details:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Buyer ID is undefined.");
      }
    };

    fetchBuyerDetails();
  }, [id]);

  return isLoading ? (
    <DetailLoadingState message="Loading buyer details..." />
  ) : (
    <AdminCustomer user={buyer} customer="buyer" />
  );
}
