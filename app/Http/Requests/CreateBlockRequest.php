<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBlockRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'valid_domain' => 'required|url|max:255',
            'block_type' => 'required|string|max:255',
            'channel_id' => 'required|integer',
            'design_id' => 'nullable|integer',
        ];
    }
}
