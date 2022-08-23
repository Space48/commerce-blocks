<?php

namespace App\Http\Controllers\Block;

use App\Events\BlockUpdated;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateBlockRequest;
use App\Http\Resources\BlockResource;
use App\Models\BigcommerceStore;
use App\Models\Block;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class BlockUpdateController extends Controller
{
    public function __invoke(
        Request            $request,
        BigcommerceStore   $store,
        Block              $block,
        UpdateBlockRequest $blockRequest,
    ): JsonResponse
    {
        try {
            $block->update($blockRequest->safe()->toArray());
            BlockUpdated::dispatch($block);
        } catch (Throwable $e) {
            Log::error($e->getMessage(), [$e->getTrace()[0]]);
            return $this->jsonErrorResponse($e->getMessage(), 500);
        }

        $blockResource = new BlockResource($block);
        return $this->jsonResponse($blockResource->toArray($request));
    }
}
