import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import Dashboard from "./pages/Dashboard"
import LoggedInAuthenticator from "./components/LoggedInAuthenticator"
import Products from "./pages/Products"
import AddProducts from "./pages/AddProducts"
import ProductDetails from "./pages/ProductDetails"
import Customers from "./pages/Customers"
import AddCustomer from "./pages/AddCustomer"
import Orders from "./pages/Orders"
import Reports from "./pages/Reports"
import Promotions from "./pages/Promotions"
import Documents from "./pages/Documents"
import Shipments from "./pages/Shipments"
import NotFound from "./pages/NotFound"
import AdminLogin from "./pages/AdminLogin"
import AdminCustomer from "./pages/AdminCustomer"
import AdminOrder from "./pages/AdminOrder"
import TransactionHistory from "./pages/TransactionHistory"
import CustomerNotifications from "./pages/CustomerNotifications"
import CustomerFeedback from "./pages/CustomerFeedback"
import Listings from "./pages/Listings"
import Listing from "./pages/Listing"
import TrackShipment from "./pages/TrackShipment"
import FieldAgents from "./pages/FieldAgents"
import Agent from "./pages/Agent"
import Auction from "./pages/Auction"
import AddAuction from "./pages/AddAuction"
import AuctionDetails from "./pages/AuctionDetails"

function App() {
    const {} = useSelector((state: RootState) => state.user)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoggedInAuthenticator />}>
                    <Route index element={<Dashboard />} />
                    <Route path="login" element={<AdminLogin />} />
                    <Route path="products">
                        <Route index element={<Products />} />
                        <Route path="add-product" element={<AddProducts />} />
                        <Route path="product" element={<ProductDetails />} />
                    </Route>
                    <Route path="customers">
                        <Route index element={<Customers />} />
                        <Route path="customer">
                            <Route index element={<AdminCustomer />} />
                            <Route
                                path="transaction-history"
                                element={<TransactionHistory />}
                            />
                            <Route
                                path="notifications"
                                element={<CustomerNotifications />}
                            />
                            <Route
                                path="feedback"
                                element={<CustomerFeedback />}
                            />
                        </Route>
                        <Route path="add-customer" element={<AddCustomer />} />
                    </Route>
                    <Route path="listings">
                        <Route index element={<Listings />} />
                        <Route path="listing" element={<Listing />} />
                    </Route>
                    <Route path="orders">
                        <Route index element={<Orders />} />
                        <Route path="order" element={<AdminOrder />} />
                    </Route>
                    <Route path="reports" element={<Reports />} />
                    <Route path="promotions" element={<Promotions />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="shipments">
                        <Route index element={<Shipments />} />
                        <Route
                            path="track-shipment"
                            element={<TrackShipment />}
                        />
                    </Route>
                    <Route path="agents">
                        <Route index element={<FieldAgents />} />
                        <Route path="agent" element={<Agent />} />
                        <Route path="request" element={<ProductDetails />} />
                    </Route>
                    <Route path="auctions">
                        <Route index element={<Auction />} />
                        <Route path="add-auction" element={<AddAuction />} />
                        <Route path="auction" element={<AuctionDetails />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
