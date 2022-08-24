<?php

namespace App\Http\Controllers\Design;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateDesignRequest;
use App\Http\Resources\DesignResource;
use App\Models\BigcommerceStore;
use App\Models\Design;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class DesignUpdateController extends Controller
{
    public function __invoke(
        Request             $request,
        BigcommerceStore    $store,
        Design              $design,
        UpdateDesignRequest $updateDesignRequest,
    ): JsonResponse
    {
        try {
            $design->update($updateDesignRequest->safe()->toArray());
        } catch (Throwable $e) {
            Log::error($e->getMessage(), [$e->getTrace()[0]]);
            return $this->jsonErrorResponse($e->getMessage(), 500);
        }

        $designResource = new DesignResource($design);
        return $this->jsonResponse($designResource->toArray($request));
    }
}
