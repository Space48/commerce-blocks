<?php

namespace App\Http\Requests;

use App\Models\Block;
use App\Rules\UrlWithNoPath;
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
            'valid_domain' => [
                'url',
                'max:255',
                new UrlWithNoPath(),
            ],
            'block_type' => 'string|max:255',
            'channel_id' => 'integer',
            'design_id' => 'nullable|integer',
            'enable_filters' => 'boolean',
            'enable_search' => 'boolean',
            'product_selection_type' => 'nullable|string|max:255',
            'product_selection_product_ids' => 'nullable|array',
            'product_selection_category_ids' => 'nullable|array',
            'product_selection_search_term' => 'nullable|string|max:255',
            'product_selection_sort_order' => [
                'nullable',
                Rule::in(array_keys(Block::$sortOrders)),
            ],
            'hide_out_of_stock_products' => 'boolean',
            'currency_code' => 'required|string|max:255'
        ];
    }
}
