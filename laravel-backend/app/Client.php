<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    public $timestamps = false;
    
    protected $table = 'llxdt_societe';

    protected $fillable = [
        'rowid',
        'nom',
        'name_alias', 
        'email', 
        'phone', 
        'address', 
        'town', 
        'fk_pays', 
        'fk_department', 
        'zip', 
        'siren', 
        'client',
        'fournisseur'
    ];
}
