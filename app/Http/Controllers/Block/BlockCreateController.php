<?php

namespace App\Http\Controllers\Block;

use App\Events\BlockCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBlockRequest;
use App\Http\Resources\BlockResource;
use App\Models\BigcommerceStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Throwable;

class BlockCreateController extends Controller
{
    public function __invoke(
        Request            $request,
        BigcommerceStore   $store,
        CreateBlockRequest $blockRequest,
    ): JsonResponse
    {
        try {
            $block = $store->blocks()->create($blockRequest->safe()->toArray());
            BlockCreated::dispatch($block);
        } catch (Throwable $e) {
            return $this->jsonErrorResponse($e->getMessage());
        }

        $blockResource = new BlockResource($block);
        return $this->jsonResponse($blockResource->toArray($request));
    }
}
