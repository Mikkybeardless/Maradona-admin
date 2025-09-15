import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../api/services/userMgt.service";
import Customer from "../components/Customer";
import { toast } from "react-toastify";
import { DetailLoadingState } from "../components/common/detailLoadingState";
import customerService from "../api/services/customer.service";

export default function Buyer() {
  const [isLoading, setIsLoading] = useState(true);
  const [buyer, setBuyer] = useState<ApiBuyer | null>(null);
  const [buyerStats, setBuyerStats] = useState<Customer | undefined>(undefined);

  const { id } = useParams();
  useEffect(() => {
    const fetchBuyerDetails = async () => {
      if (id) {
        try {
          // const response = await UserService.getBuyer(parseInt(id));
          const res = await customerService.getOneCustomer(id);
          console.log("Buyer details:", res.data);
          setBuyer(res.data.customer);
          setBuyerStats(res.data);
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
  ) : buyer ? (
    <Customer user={buyer} buyerStats={buyerStats} customer="buyer" />
  ) : null;
}
