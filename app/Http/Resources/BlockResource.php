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
            'design' => $this->design ? $this->design->toArray() : null,
            'name' => $this->name,
            'graphql_access_token' => $this->graphql_access_token,
            'graphql_access_token_domain' => $this->graphql_access_token_domain,
            'graphql_access_token_expires_at' => $this->graphql_access_token_expires_at,
            'valid_domain' => $this->valid_domain,
        ];
    }
}
