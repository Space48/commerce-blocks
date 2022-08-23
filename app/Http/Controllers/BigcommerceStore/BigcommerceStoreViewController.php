<?php

namespace App\Http\Controllers\BigcommerceStore;

use App\Http\Controllers\Controller;
use App\Models\BigcommerceStore;
use Illuminate\Http\Request;

class BigcommerceStoreViewController extends Controller
{
    public function __invoke(Request $request, BigcommerceStore $store)
    {
        return $this->jsonResponse($store->toArray());
    }
}
