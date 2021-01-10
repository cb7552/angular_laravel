<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Country;

class CountryController extends Controller
{
    public function getCountries()
    {
        // $results = Country::all('rowid', 'code_iso', 'label');
        // $results->sortBy('label');
        // return $results;

        return Country::orderBy('label')->where('rowid', '>' , 0)->get();
    }
}
