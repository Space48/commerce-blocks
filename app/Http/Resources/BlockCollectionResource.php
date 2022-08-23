<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class BlockCollectionResource extends ResourceCollection
{

    public function toArray($request)
    {
        return $this->collection->map(function ($item) use ($request) {
            $resource = new BlockResource($item);
            return $resource->toArray($request);
        })->toArray();
    }
}
