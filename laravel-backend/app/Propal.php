<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Propal extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'rowid'; // or null

    protected $table = 'llxdt_propal';
    protected $fillable = ['rowid', 'ref', 'fk_soc', 'fk_projet', 'last_main_doc'];
}
