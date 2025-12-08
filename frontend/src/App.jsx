import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import BrowseServices from './pages/BrowseServices';
import ServiceDetail from './pages/ServiceDetail';
import FreelancerDashboard from './pages/FreelancerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import PostProject from './pages/PostProject';
import FreelancerProfile from './pages/FreelancerProfile';
import AdminPanel from './pages/AdminPanel';
import PaymentScreen from './pages/PaymentScreen';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        { }
        <Route index element={<Home />} />
        <Route path="services" element={<BrowseServices />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="profile/:id" element={<FreelancerProfile />} />
        { }
        <Route path="freelancer/dashboard" element={<FreelancerDashboard />} />
        { }
        <Route path="client/dashboard" element={<ClientDashboard />} />
        <Route path="client/post-project" element={<PostProject />} />
        <Route path="client/edit-project/:id" element={<PostProject />} />
        { }
        <Route path="payments" element={<PaymentScreen />} />
        { }
        <Route path="admin" element={<AdminPanel />} />
        { }
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
export default App;