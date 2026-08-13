import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Placeholder from './pages/Placeholder';
import ClientsList from './pages/clients/ClientsList';
import ClientDetail from './pages/clients/ClientDetail';
import ClientForm from './pages/clients/ClientForm';
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
