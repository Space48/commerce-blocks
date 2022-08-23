<?php

namespace App\Http\Controllers\Block;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlockResource;
use App\Models\BigcommerceStore;
use App\Models\Block;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlockViewController extends Controller
{
    public function __invoke(
        Request          $request,
        BigcommerceStore $store,
        Block            $block,
    ): JsonResponse
    {

        $blockResource = new BlockResource($block);
        return $this->jsonResponse($blockResource->toArray($request));
    }
}
