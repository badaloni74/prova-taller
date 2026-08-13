import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Placeholder from './pages/Placeholder';
import ClientsList from './pages/clients/ClientsList';
import ClientDetail from './pages/clients/ClientDetail';
import ClientForm from './pages/clients/ClientForm';
import PecesList from './pages/peces/PecesList';
import PecaDetail from './pages/peces/PecaDetail';
import PecaForm from './pages/peces/PecaForm';
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
