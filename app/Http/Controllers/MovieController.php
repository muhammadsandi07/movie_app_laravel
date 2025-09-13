<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResouce;
use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index(){
        $perPage = request()->query('perPage',25);
        $query = Movie::query();
        $query->orderBy('title', 'ASC');
        $movies = MovieResouce::collection($query->paginate($perPage));
        return Inertia::render('movies/index', compact('movies'));

    }
}
