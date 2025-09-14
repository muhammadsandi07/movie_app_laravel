<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovieStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' =>'required|string|max:255',
            'genre' =>'required|string|max:100',
            'release_date' =>'required|date',
            'duration' =>'required|string|max:50',
            'description' =>'required|string|max:500'
        ];
    }

    public function messages():array
    {
        return [
            'required' =>' field is required',
            'date' =>'field must be a valid date',
        ];
    }
}
