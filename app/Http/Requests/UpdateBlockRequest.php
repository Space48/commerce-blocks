<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlockRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'string|max:255',
            'valid_domain' => 'url|max:255',
            'block_type' => 'string|max:255',
            'channel_id' => 'integer',
            'design_id' => 'nullable|integer',
            'product_selection_type' => 'nullable|string|max:255',
        ];
    }
}
