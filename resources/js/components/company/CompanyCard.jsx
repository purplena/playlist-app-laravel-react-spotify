import React from 'react';

function CompanyCard({ company, handleDelete }) {
  return <>
    <h3>{company.name}</h3>
    <p>{company.address} - <span onClick={() => handleDelete(company.id)}>delete</span></p>
  </>
}

export default CompanyCard;
