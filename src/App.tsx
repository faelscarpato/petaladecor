import { Navigate, Route, Routes } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";

const DEFAULT_SLUG = "petshop-sf";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/c/${DEFAULT_SLUG}`} replace />} />
      <Route path="/c/:slug" element={<CatalogPage />} />
      <Route path="*" element={<Navigate to={`/c/${DEFAULT_SLUG}`} replace />} />
    </Routes>
  );
}
