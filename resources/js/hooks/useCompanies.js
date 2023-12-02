import {useEffect, useState} from "react";

export function useCompanies () {
  const [ companies, setCompanies ] = useState([]);

  const deleteCompany = (companyId) => {
    const companiesWithoutTheDeletedOne = companies.filter((company) => company.id !== companyId);
    setCompanies(companiesWithoutTheDeletedOne);
  }

  useEffect(() => {
    fetch('http://playlist.localhost/api/companies')
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.data);
      })
  }, [])

  return { companies, deleteCompany }
}
