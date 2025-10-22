import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoggedInAuthenticator from "./components/LoggedInAuthenticator";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import ProductDetails from "./pages/ProductDetails";
import Buyers from "./pages/Buyers";
import Sellers from "./pages/Sellers";
import AddCustomer from "./pages/AddCustomer";
import Promotions from "./pages/Promotions";
import Documents from "./pages/Documents";
import Shipments from "./pages/Shipments";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import TransactionHistory from "./pages/TransactionHistory";
import CustomerNotifications from "./pages/CustomerNotifications";
import CustomerFeedback from "./pages/CustomerFeedback";
import TrackShipment from "./pages/TrackShipment";
import FieldAgents from "./pages/FieldAgents";
import Agent from "./pages/Agent";
import Auction from "./pages/Auction";
import AddAuction from "./pages/AddAuction";
import AuctionDetails from "./pages/AuctionDetails";
import AddPromotion from "./pages/AddPromition";
import AddAdvert from "./pages/AddAdvert";
import CustomerCare from "./pages/CustomerCare";
import CustomerChat from "./pages/CustomerChat";
import SaleReport from "./pages/SalesReport";
import RevenueReport from "./pages/RevenueReport";
import ExpensesReport from "./pages/ExpensesReport";
import FinancialTracking from "./pages/FinancialTracking";
import EditProduct from "./pages/UpdateProduct";
import Buyer from "./pages/Buyer";
import Seller from "./pages/Seller";
import NotificationsPage from "./pages/Notification";
import Reports from "./pages/Reports";
import PurchaseEnquiries from "./pages/PurchaseEnquiries";
import Enquiry from "./pages/Enquiry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from home "/" to "/admin" */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="admin" element={<LoggedInAuthenticator />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<AdminLogin />} />

          <Route path="products">
            <Route index element={<Products />} />
            <Route path="add-product" element={<AddProducts />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="product/:id" element={<ProductDetails />} />
          </Route>

          <Route path="buyers">
            <Route index element={<Buyers />} />
            <Route path="buyer/:id">
              <Route index element={<Buyer />} />
              <Route
                path="transaction-history"
                element={<TransactionHistory customer="buyer" />}
              />
              <Route
                path="notifications"
                element={<CustomerNotifications customer="buyer" />}
              />
              <Route
                path="feedback"
                element={<CustomerFeedback customer="buyer" />}
              />
            </Route>
            <Route
              path="add-buyer"
              element={<AddCustomer customer="buyer" />}
            />
          </Route>

          <Route path="sellers">
            <Route index element={<Sellers />} />
            <Route path="seller/:id">
              <Route index element={<Seller />} />
              <Route
                path="transaction-history"
                element={<TransactionHistory customer="seller" />}
              />
              <Route
                path="notifications"
                element={<CustomerNotifications customer="seller" />}
              />
              <Route
                path="feedback"
                element={<CustomerFeedback customer="seller" />}
              />
            </Route>
            <Route
              path="add-seller"
              element={<AddCustomer customer="Seller" />}
            />
          </Route>

          <Route path="purchase-enquiries">
            <Route index element={<PurchaseEnquiries />} />
            <Route path="enquiry/:id" element={<Enquiry />} />
          </Route>
          <Route path="reports">
            <Route index element={<Reports />} />
            <Route path="sale-report" element={<SaleReport />} />
            <Route path="revenue-report" element={<RevenueReport />} />
            <Route path="admin-revenue-report" element={<ExpensesReport />} />
            <Route path="financial-tracking" element={<FinancialTracking />} />
          </Route>
          <Route path="promotions">
            <Route index element={<Promotions />} />
            <Route path="add-promotion" element={<AddPromotion />} />
            <Route path="add-ads" element={<AddAdvert />} />
          </Route>

          <Route path="documents" element={<Documents />} />

          <Route path="shipments">
            <Route index element={<Shipments />} />
            <Route path="track-shipment" element={<TrackShipment />} />
          </Route>

          <Route path="agents">
            <Route index element={<FieldAgents />} />
            <Route path="agent/:id" element={<Agent />} />
            <Route path="request/:id" element={<ProductDetails />} />
          </Route>

          <Route path="auctions">
            <Route index element={<Auction />} />
            <Route path="add-auction" element={<AddAuction />} />
            <Route path="auction/:id" element={<AuctionDetails />} />
          </Route>

          <Route path="customer-care">
            <Route index element={<CustomerCare />} />
            <Route path="ticket">
              <Route path=":ticketId" element={<CustomerChat />} />
            </Route>
          </Route>
          <Route path="notifications">
            <Route index element={<NotificationsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
