<?php

namespace App\Http\Controllers\Block;

use App\Http\Controllers\Controller;
use App\Models\BigcommerceStore;
use App\Models\Block;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlockSnippetController extends Controller
{
    public function __invoke(
        Request            $request,
        BigcommerceStore   $store,
        Block              $block,
    ): JsonResponse
    {
        return $this->jsonResponse(['snippet' => (string) view('snippet', [
            'storeHash' => $store->store_hash,
            'blockId' => $block->id,
            'apiUrl' => config('app.url'),
        ])]);
    }
}
