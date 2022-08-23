<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'valid_domain' => 'string|max:255',
            'block_type' => 'string|max:255',
            'channel_id' => 'integer',
            'design_id' => 'nullable|integer',
        ];
    }
}
