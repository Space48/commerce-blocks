<?php

namespace App\Jobs;

use App\Services\Bigcommerce;
use App\Models\BigcommerceStore;
use App\Services\Bigcommerce\Request\Payload\StorefrontApiTokenPayload;

class CreateToken extends BigcommerceJob
{
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(protected BigcommerceStore $store, protected int $channelId, protected string $domain)
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Bigcommerce $bc)
    {
        $payload = new StorefrontApiTokenPayload(
            $this->domain,
            $this->channelId,
            now()->addDay(20)->unix()
        );
        $result = $bc->createStoreFrontApiToken($this->store->access_token, $this->store->store_hash, $payload);
        // todo: store token against product block.
        dd($result);
    }
}
