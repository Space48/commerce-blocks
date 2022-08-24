<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDesignRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'limit' => 'nullable|integer',
            'columns' => 'nullable|integer',
            'heading_font_family' => 'nullable|string',
            'heading_font_size' => 'nullable|string|max:10',
            'heading_font_weight' => 'nullable|string|max:10',
            'heading_colour' => 'nullable|string|max:10',
            'text_font_family' => 'nullable|string',
            'text_font_weight' => 'nullable|string|max:10',
            'text_font_size' => 'nullable|string|max:10',
            'text_colour' => 'nullable|string|max:10',
            'price_font_family' => 'nullable|string',
            'price_font_size' => 'nullable|string|max:10',
            'price_font_weight' => 'nullable|string|max:10',
            'price_colour' => 'nullable|string|max:10',
            'sale_price_font_family' => 'nullable|string',
            'sale_price_font_size' => 'nullable|string|max:10',
            'sale_price_font_weight' => 'nullable|string|max:10',
            'sale_price_colour' => 'nullable|string|max:10',
            'link_colour' => 'nullable|string|max:10',
            'link_hover_colour' => 'nullable|string|max:10',
            'button_font_family' => 'nullable|string',
            'button_font_weight' => 'nullable|string|max:10',
            'button_font_size' => 'nullable|string|max:10',
            'button_colour' => 'nullable|string|max:10',
            'button_hover_colour' => 'nullable|string|max:10',
            'button_text_colour' => 'nullable|string|max:10',
            'button_hover_text_colour' => 'nullable|string|max:10',
        ];
    }
}
