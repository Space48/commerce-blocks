<?php

namespace App\Http\Controllers\Block;

use App\Http\Controllers\Controller;
use App\Models\BigcommerceStore;
use App\Models\Block;
use Illuminate\Http\Request;
use Illuminate\View\View;

class BlockPreviewController extends Controller
{
    public function __invoke(
        Request            $request,
        BigcommerceStore   $store,
        Block              $block,
    ): View
    {
        // todo: requires graphql access token
        return view('preview');
    }
}
