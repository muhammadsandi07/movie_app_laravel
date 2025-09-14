<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovieStoreRequest;
use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index(){
        $perPage = request()->query('perPage', 25);
        $search = request()->query('search', '');

        $query = Movie::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('genre', 'LIKE', "%{$search}%");
            });
        }

        $movies = MovieResource::collection(
            $query->orderBy('title', 'ASC')->paginate($perPage)->withQueryString()
        );

        return Inertia::render('movies/Index', [
            'movies' => $movies,
        ]);

    }
    public function store(MovieStoreRequest $request){
        Movie::create($request->all());
        return redirect()->to('/data-movies')->with('success', 'Data movie success saved');
    }
}
