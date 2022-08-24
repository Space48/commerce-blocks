<?php

namespace App\Http\Controllers\Design;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBlockRequest;
use App\Http\Requests\CreateDesignRequest;
use App\Http\Resources\BlockResource;
use App\Http\Resources\DesignResource;
use App\Models\BigcommerceStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Throwable;

class DesignCreateController extends Controller
{
    public function __invoke(
        Request            $request,
        BigcommerceStore   $store,
        CreateDesignRequest $createDesignRequest,
    ): JsonResponse
    {
        try {
            $design = $store->designs()->create($createDesignRequest->safe()->toArray());
        } catch (Throwable $e) {
            return $this->jsonErrorResponse($e->getMessage());
        }

        $designResource = new DesignResource($design);
        return $this->jsonResponse($designResource->toArray($request));
    }
}
