<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;

class CompanyController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $company = Company::all();

    return CompanyResource::collection($company);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreCompanyRequest $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Company $company)
  {
    return CompanyResource::make($company);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateCompanyRequest $request, Company $company)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Company $company)
  {
    //
  }
}
