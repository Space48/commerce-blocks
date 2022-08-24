<?php

namespace App\Http\Resources;

use App\Models\BigcommerceStore;
use Illuminate\Http\Resources\Json\JsonResource;

class ConfigurationResource extends JsonResource
{
    public function __construct($resource, private BigcommerceStore $store)
    {
        parent::__construct($resource);
    }

    public function toArray($request)
    {
        $design = new DesignResource($this->design);
        return [
            'store_url' => $this->store->domain,
            'block_type' => $this->block_type,
            'access_token' => $this->graphql_access_token,
            'enable_search' => $this->enable_search ?? true,
            'enable_filters' => $this->enable_filters ?? true,
            'design' => $design->toArray($request),
        ];
    }
}