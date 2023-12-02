import ReactDOM from "react-dom/client";
import React from "react";
import {useCompanies} from "./hooks/useCompanies.js";
import CompanyCard from "./components/company/CompanyCard.jsx";

const App = () => {
  const {companies, deleteCompany} = useCompanies();

  return <div>
    <h1>HI Bob</h1>
    {companies.map((company) => <CompanyCard
      company={company}
      key={company.id}
      handleDelete={deleteCompany}
    />)}
  </div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


