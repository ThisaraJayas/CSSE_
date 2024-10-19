import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BinCollection from './pages/BinCollection';
import BinPage from './pages/BinsPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import PrivateRoute from './components/PrivateRoute';
import './styles/styles.css';
import AddBin from './pages/AddBin';
import { AuthProvider } from './middleware/AuthContext';

import AddWasteType from './pages/AddWasteType';
import PaymentList from './pages/PaymentList';
import WasteTypesTable from './pages/WasteTypeTable';
import RefundPage from './pages/RefundPage';
import GarbageCollection from './pages/GarbageCollection';
import WasteCollection from './pages/WasteCollection';
import SpeWasteCollection from './pages/WasteCollection';

import SubmitReview from './pages/SubmitReview';
import ManageWasteType from './dashboard/ManageWasteType';
import ManageRefund from './dashboard/ManageRefund';
import Dashboard from './dashboard/Dashboard';
import VerifyBinPage from './pages/VerifyBin';
import WasteRequestsTable from './pages/WasteRequestTable';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/add-bin" element={<AddBin />} />
          <Route path="/collections" element={<BinCollection />} />
          <Route path="/bin" element={<BinPage />} />
          <Route path="/requests" element={<VerifyBinPage />} />

          <Route path="/addwaste" element={<AddWasteType />} />
          
          <Route path="/wtable" element={<WasteRequestsTable />} />
          <Route path="/payments" element={<PaymentList/>}/>

          
          <Route path="/wastecollection" element={<GarbageCollection/>}/>
          <Route path="/specialwastecollection" element={<SpeWasteCollection/>}/>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="wastetypeman" element={<ManageWasteType />} />
            <Route path="wastetype" element={<WasteTypesTable />} />
            <Route path="managerefund" element={<ManageRefund />} />
            <Route path="addwaste" element={<AddWasteType />} />
            <Route path="refund" element={<RefundPage/>}/>
            <Route path="wtable" element={<WasteRequestsTable />} />
          </Route>

          

          <Route path="/payments" element={<PaymentList />} />


          <Route path="/submit-review" element={<SubmitReview />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
