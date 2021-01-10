<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Departement;

class DepartementController extends Controller
{
    public function getDepartement()
    {
        // return Departement::all();

        return Departement::orderBy('nom')->where('rowid', '>' , 1)->get();
    }
}

