<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    public $timestamps = false;
    protected $table = 'llxdt_c_departements';
    protected $fillable = ['rowid', 'nom'];
}