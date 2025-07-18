import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import CompanyListPage from "./pages/CompanyListPage.jsx";
import CreateCompanyPage from "./pages/CreateCompanyPage.jsx";
import EditCompanyPage from "./pages/EditCompanyPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/companies" element={<CompanyListPage />} />
        <Route path="/companies/create" element={<CreateCompanyPage />} />
        <Route path="/companies/:id/edit" element={<EditCompanyPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
