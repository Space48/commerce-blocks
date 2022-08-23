<?php

namespace App\Http\Controllers\BigcommerceStore;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BigcommerceStoreCollectionController extends Controller
{
    public function __invoke(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        return $this->jsonResponse($user->stores->toArray());
    }
}
