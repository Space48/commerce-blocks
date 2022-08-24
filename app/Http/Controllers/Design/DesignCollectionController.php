<?php

namespace App\Http\Controllers\Design;

use App\Http\Controllers\Controller;
use App\Http\Resources\DesignCollectionResource;
use App\Models\BigcommerceStore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DesignCollectionController extends Controller
{

    public function __invoke(Request $request, BigcommerceStore $store)
    {
        try {
            $resource = new DesignCollectionResource($store->designs);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return $this->jsonErrorResponse($e->getMessage(), 500);
        }

        return $this->jsonResponse($resource->toArray($request));
    }
}
