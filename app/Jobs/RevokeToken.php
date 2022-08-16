<?php

namespace App\Jobs;

use App\Services\Bigcommerce;
use App\Jobs\BigcommerceJob;
use App\Models\BigcommerceStore;
use Carbon\Carbon;

class RevokeToken extends BigcommerceJob
{
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(protected BigcommerceStore $store, protected string $token)
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Bigcommerce $bc)
    {
        $result = $bc->revokeStoreFrontApiToken($this->store->access_token, $this->store->store_hash, $this->token);
        // todo: remove token on product block
        dd($result);
    }
}
