<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConfigurationResource;
use App\Models\BigcommerceStore;
use App\Models\Block;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConfigurationController extends Controller
{
    public function __invoke(Request $request, BigcommerceStore $store, Block $block)
    {
        $resource = new ConfigurationResource($block, $store);
        return $this->jsonResponse($resource->toArray($request));
    }
}
