<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticleCat extends Model 
{
    protected $table = 'art_cat';

    protected $fillable = [
        'id',
        'title_article',
        'descripcio1',
        'content',
        'categoria',
        'img'
    ];
}

