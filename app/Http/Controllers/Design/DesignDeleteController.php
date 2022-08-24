<?php

namespace App\Http\Controllers\Design;

use App\Http\Controllers\Controller;
use App\Models\BigcommerceStore;
use App\Models\Design;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class DesignDeleteController extends Controller
{
    public function __invoke(
        Request          $request,
        BigcommerceStore $store,
        Design           $design,
    ): JsonResponse
    {
        if ($block = $design->blocks->first()) {
            return $this->jsonErrorResponse(sprintf('This design cannot be deleted. Used by block: %s.', $block->name));
        }

        try {
            $design->delete();
        } catch (Throwable $e) {
            return $this->jsonErrorResponse($e->getMessage(), 500);
        }

        return $this->jsonResponse([]);
    }
}
