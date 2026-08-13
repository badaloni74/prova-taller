import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Placeholder from './pages/Placeholder';
import ClientsList from './pages/clients/ClientsList';
import ClientDetail from './pages/clients/ClientDetail';
import ClientForm from './pages/clients/ClientForm';
import PecesList from './pages/peces/PecesList';
import PecaDetail from './pages/peces/PecaDetail';
import PecaForm from './pages/peces/PecaForm';
import VehiclesList from './pages/vehicles/VehiclesList';
import VehicleDetail from './pages/vehicles/VehicleDetail';
import VehicleForm from './pages/vehicles/VehicleForm';
import AlbaransList from './pages/albarans/AlbaransList';
import AlbaraDetail from './pages/albarans/AlbaraDetail';
import AlbaraForm from './pages/albarans/AlbaraForm';
import FacturesList from './pages/factures/FacturesList';
import FacturaDetail from './pages/factures/FacturaDetail';
import FacturaForm from './pages/factures/FacturaForm';
import PersonalList from './pages/personal/PersonalList';
import PersonalDetail from './pages/personal/PersonalDetail';
import PersonalForm from './pages/personal/PersonalForm';
import NominesList from './pages/nomines/NominesList';
import NominaDetail from './pages/nomines/NominaDetail';
import NominaForm from './pages/nomines/NominaForm';
import { navSections } from './nav';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/clients" replace />} />
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/clients/nou" element={<ClientForm />} />
          <Route path="/clients/:id/editar" element={<ClientForm />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
          <Route path="/peces" element={<PecesList />} />
          <Route path="/peces/nou" element={<PecaForm />} />
          <Route path="/peces/:id/editar" element={<PecaForm />} />
          <Route path="/peces/:id" element={<PecaDetail />} />
          <Route path="/vehicles" element={<VehiclesList />} />
          <Route path="/vehicles/nou" element={<VehicleForm />} />
          <Route path="/vehicles/:id/editar" element={<VehicleForm />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/albarans" element={<AlbaransList />} />
          <Route path="/albarans/nou" element={<AlbaraForm />} />
          <Route path="/albarans/:id/editar" element={<AlbaraForm />} />
          <Route path="/albarans/:id" element={<AlbaraDetail />} />
          <Route path="/factures" element={<FacturesList />} />
          <Route path="/factures/nova" element={<FacturaForm />} />
          <Route path="/factures/:id" element={<FacturaDetail />} />
          <Route path="/personal" element={<PersonalList />} />
          <Route path="/personal/nou" element={<PersonalForm />} />
          <Route path="/personal/:id/editar" element={<PersonalForm />} />
          <Route path="/personal/:id" element={<PersonalDetail />} />
          <Route path="/nomines" element={<NominesList />} />
          <Route path="/nomines/nova" element={<NominaForm />} />
          <Route path="/nomines/:id/editar" element={<NominaForm />} />
          <Route path="/nomines/:id" element={<NominaDetail />} />
          {navSections
            .filter((section) => !section.implemented)
            .map((section) => (
              <Route
                key={section.path}
                path={section.path}
                element={<Placeholder titleKey={section.labelKey} />}
              />
            ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
