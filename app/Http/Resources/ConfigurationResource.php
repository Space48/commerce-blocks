<?php

namespace App\Http\Resources;

use App\Models\BigcommerceStore;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ConfigurationResource extends JsonResource
{
    public function __construct($resource, private BigcommerceStore $store)
    {
        parent::__construct($resource);
    }

    public function toArray($request)
    {
        $design = new DesignResource($this->design);
        // todo: store_url should be: sprintf('store-%s-%s.mybigcommerce.com', $this->store->store_hash, $this->channel_id)
        // so that the addToCart URL in the response reflects the channel specific store.
        // However, there's a graphql bug with filters right now, so when it's fixed it will work.
        return [
            'store_url' => sprintf('store-%s.mybigcommerce.com', $this->store->store_hash),
            'block_name' => Str::slug($this->name),
            'block_type' => $this->block_type,
            'access_token' => $this->graphql_access_token,
            'enable_search' => $this->enable_search ?? true,
            'enable_filters' => $this->enable_filters ?? true,
            'hide_out_of_stock_products' => $this->hide_out_of_stock_products ?? false,
            'product_selection_type' => $this->product_selection_type,
            'product_selection_product_ids' => $this->product_selection_product_ids,
            'product_selection_category_ids' => $this->product_selection_category_ids,
            'product_selection_search_term' => $this->product_selection_search_term,
            'product_selection_sort_order' => $this->product_selection_sort_order,
            'design' => $design->toArray($request),
            'currency_code' => $this->currency_code,
        ];
    }
}
