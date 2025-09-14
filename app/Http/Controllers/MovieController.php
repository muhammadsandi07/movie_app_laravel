<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovieStoreRequest;
use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Cloudinary\Cloudinary;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary as FacadesCloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Cloudinary\Api\Upload\UploadApi;

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
    public function store(MovieStoreRequest $request)
{
        $data = $request->validated();

        // Pastikan ada file dan valid
        if (! $request->hasFile('poster') || ! $request->file('poster')->isValid()) {
            return back()->with('error', 'Poster tidak ditemukan atau tidak valid.');
        }

        $file = $request->file('poster');
        $filePath = $file->getRealPath();

        // Validasi path file
        if (! $filePath || ! file_exists($filePath)) {
            return back()->with('error', 'File sementara tidak ditemukan di server.');
        }

        try {
            $cloudinary = new \Cloudinary\Cloudinary(env('CLOUDINARY_URL'));
            $result = $cloudinary->uploadApi()->upload($filePath, ['folder' => 'movies']);

            if (is_array($result) && isset($result['secure_url'])) {
                $data['poster_url'] = $result['secure_url'];
            } elseif (is_object($result) && method_exists($result, 'getArrayCopy')) {
                $arr = $result->getArrayCopy();
                $data['poster_url'] = $arr['secure_url'] ?? null;
            } else {
                // fallback: coba cast ke array dan cek
                $arr = (array) $result;
                $data['poster_url'] = $arr['secure_url'] ?? null;
            }

            if (! $data['poster_url']) {
                throw new \Exception('Tidak dapat menemukan secure_url di response Cloudinary.');
            }
        } catch (\Throwable $e) {
            // log detail supaya gampang debugging
            Log::error('Cloudinary upload error: '.$e->getMessage(), [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'file_info' => [
                    'originalName' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'path' => $filePath,
                ],
                'cloudinary_result' => $result ?? null,
            ]);

            return back()->with('error', 'Upload poster gagal: ' . $e->getMessage());
        }

        Movie::create($data);

        return redirect()->to('/data-movies')->with('success', 'Data movie berhasil disimpan');
    }

    public function update(MovieStoreRequest $request, $movie_id){
       $movie = Movie::findOrFail($movie_id);
        $data = $request->validated();

        if ($request->hasFile('poster')) {
            $uploadedFileUrl = FacadesCloudinary::upload(
                $request->file('poster')->getRealPath(),
                ['folder' => 'movies']
            )->getSecurePath();

            $data['poster_url'] = $uploadedFileUrl;
        }

        $movie->update($data);
            return redirect()->to('/data-movies')->with('success', 'Data Movie success updated');

    }

    public function destroy($movie_id){
        $movie = Movie::findOrFail($movie_id);
        $movie->delete();
        return redirect()->to('/data-movies')->with('success', 'Data Movie success deleted');
    }

    public function restore($movie_id){
        $movie = Movie::withTrashed()->findOrFail($movie_id);
        $movie->restore();
        return redirect()->back()->with('success', 'Data Movie restored');
}

    public function forceDestroy($movie_id){
    $movie = Movie::withTrashed()->findOrFail($movie_id);
    $movie->forceDelete();
    return redirect()->back()->with('success', 'Data Movie permanently deleted');
}


}
