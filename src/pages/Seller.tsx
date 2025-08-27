import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../api/services/userMgt.service";
import AdminCustomer from "../components/Customer";
import { Spinner } from "../components/common/spinner";
import { toast } from "react-toastify";
import { DetailLoadingState } from "../components/common/detailLoadingState";

export default function Seller() {
  const [isLoading, setIsLoading] = useState(true);
  const [seller, setSeller] = useState<ApiSeller>({
    id: 4,
    name: "",
    email: "",
    email_verified_at: null,
    type: "seller",
    created_at: "",
    updated_at: "",
    seller_profile: {
      id: 1,
      user_id: "4",
      shop_name: "",
      email: "",
      phone: "",
      profile_pic: "",
      is_approved: false,
      created_at: "",
      updated_at: "",
    },
  });

  const { id } = useParams();
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const response = await UserService.getSeller(parseInt(id));
          console.log("Seller details:", response.data);
          setSeller(response.data);
        } catch (error) {
          toast.error("An unknown error occured, please refresh the page");
          console.error("Error fetching seller details:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Seller ID is undefined.");
      }
    };

    fetchProductDetails();
  }, [id]);

  return isLoading ? (
    <DetailLoadingState message="Loading seller details" />
  ) : (
    <AdminCustomer user={seller} customer="buyer" />
  );
}
