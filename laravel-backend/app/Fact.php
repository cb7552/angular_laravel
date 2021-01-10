<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fact extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'rowid'; // or null

    protected $table = 'llxdt_facture';
    protected $fillable = ['rowid', 'ref', 'fk_soc', 'fk_projet', 'last_main_doc'];
}
