<?php

namespace App\Http\Controllers\Design;

use App\Http\Controllers\Controller;
use App\Http\Resources\DesignResource;
use App\Models\BigcommerceStore;
use App\Models\Design;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DesignViewController extends Controller
{
    public function __invoke(
        Request          $request,
        BigcommerceStore $store,
        Design            $design,
    ): JsonResponse
    {

        $designResource = new DesignResource($design);
        return $this->jsonResponse($designResource->toArray($request));
    }
}
