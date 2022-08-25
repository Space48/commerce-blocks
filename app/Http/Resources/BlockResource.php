<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlockResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'bigcommerce_store_id' => $this->bigcommerce_store_id,
            'block_type' => $this->block_type,
            'channel_id' => $this->channel_id,
            'design_id' => $this->design_id,
            'design' => $this->design ? $this->design->toArray() : null,
            'name' => $this->name,
            'enable_search' => $this->enable_search,
            'enable_filters' => $this->enable_filters,
            'graphql_access_token' => $this->graphql_access_token,
            'graphql_access_token_domain' => $this->graphql_access_token_domain,
            'graphql_access_token_expires_at' => $this->graphql_access_token_expires_at,
            'product_selection_type' => $this->product_selection_type,
            'product_selection_product_ids' => $this->product_selection_product_ids,
            'product_selection_category_ids' => $this->product_selection_category_ids,
            'product_selection_search_term' => $this->product_selection_search_term,
            'product_selection_sort_order' => $this->product_selection_sort_order,
            'valid_domain' => $this->valid_domain,
        ];
    }
}
