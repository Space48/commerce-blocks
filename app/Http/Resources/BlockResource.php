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
            'channel_id' => $this->channel_id,
            'design' => $this->design->toArray(),
            'block_type' => $this->block_type,
            'valid_domain' => $this->valid_domain,
            'graphql_access_token' => $this->graphql_access_token,
            'graphql_access_token_expires_at' => $this->graphql_access_token_expires_at
        ];
    }
}
