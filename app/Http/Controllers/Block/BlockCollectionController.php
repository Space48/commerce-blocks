<?php

namespace App\Http\Controllers\Block;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlockCollectionResource;
use App\Http\Resources\PaginationResource;
use App\Models\BigcommerceStore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BlockCollectionController extends Controller
{

    public function __invoke(Request $request, BigcommerceStore $store)
    {
        $params = $request->input();

        try {
            $blockQuery = $store->blocks()->with('design')->latest();

            if (isset($params['channel_id'])) {
                $blockQuery->where('channel_id', $params['channel_id']);
            }
            if (isset($params['name:like'])) {
                $blockQuery->where(\DB::raw('LOWER(name)'), 'like', '%' . trim(mb_strtolower($params['name:like'])) .    '%');
            }

//            var_dump($blockQuery->toSql());
//            exit;

            $blocks = $blockQuery->paginate($request->get('limit', 100));
            $resource = new BlockCollectionResource($blocks);
            $pagination = new PaginationResource($blocks);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return $this->jsonErrorResponse($e->getMessage(), 500);
        }

        return $this->jsonResponse($resource->toArray($request), 200, $pagination->toArray($request));
    }
}
