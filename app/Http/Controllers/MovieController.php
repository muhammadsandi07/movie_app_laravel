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
        $search = request()->query('search', '');
        $query = Movie::query();

        if($search){
            $query->where('title', 'LIKE', "%". $search ."%")
                ->orWhere("genre", 'LIKE', "%". $search ."%");

        }
        $query->orderBy('title', 'ASC');
        $movies = MovieResouce::collection($query->paginate($perPage));
        return Inertia::render('movies/index', compact('movies'));

    }
}
