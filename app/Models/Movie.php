<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    /** @use HasFactory<\Database\Factories\MovieFactory> */
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'duration',
        'genre',
        'director',
        'release_date',
        'poster_url',
        'trailer_url',
        'rating',
        'is_active',        
    ];

    public static function nomorPasien(){
        

    }
}
