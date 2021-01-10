<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    public $timestamps = false;
    protected $table = 'llxdt_c_country';
    protected $fillable = ['rowid', 'code_iso', 'label'];
}