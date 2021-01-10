<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticleEsp extends Model 
{

    protected $table = 'art_esp';

    protected $fillable = [
        'id',
        'title_article',
        'descripcio1',
        'content',
        'categoria',
        'img'
        
    ];
}

