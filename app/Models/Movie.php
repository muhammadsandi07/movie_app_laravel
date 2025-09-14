<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Movie extends Model
{
    /** @use HasFactory<\Database\Factories\MovieFactory> */
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'title',
        'description',
        'duration',
        'genre',
        'director',
        'release_date',
        'poster_url',
        'rating',
        'is_active',
    ];

    protected $dates = ['release_date', 'deleted_at'];
}
