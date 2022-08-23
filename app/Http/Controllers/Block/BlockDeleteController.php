<?php

namespace App\Http\Controllers\Block;

use App\Http\Controllers\Controller;
use App\Models\BigcommerceStore;
use App\Models\Block;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class BlockDeleteController extends Controller
{
    public function __invoke(
        Request          $request,
        BigcommerceStore $store,
        Block            $block,
    ): JsonResponse
    {
        try {
            $block->delete();
        } catch (Throwable $e) {
            return $this->jsonErrorResponse($e->getMessage(), 500);
        }

        return $this->jsonResponse([]);
    }
}
