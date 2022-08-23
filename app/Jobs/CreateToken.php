<?php

namespace App\Jobs;

use App\Models\BigcommerceStore;
use App\Models\Block;
use App\Services\Bigcommerce;
use App\Services\Bigcommerce\Request\Payload\StorefrontApiTokenPayload;
use Illuminate\Support\Facades\Log;

class CreateToken extends BigcommerceJob
{
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(protected Block $block)
    {
    }

    /**
     * Execute the job.
     *
     * @throws Bigcommerce\Response\Exception
     * @throws Bigcommerce\Response\NotFoundException
     * @throws Bigcommerce\Response\TooManyRequestsException
     * @throws Bigcommerce\Response\UnauthorizedException
     * @throws Bigcommerce\Response\UnprocessableException
     */
    public function handle(Bigcommerce $bc)
    {
        $expiryDate = now()->addDays(30);
        $payload = new StorefrontApiTokenPayload(
            $this->block->valid_domain,
            $this->block->channel_id,
            $expiryDate->unix()
        );
        /** @var BigcommerceStore $store */
        $store = $this->block->store;

        $result = $bc->createStoreFrontApiToken($store->access_token, $store->store_hash, $payload);

        $token = $result['data']['token'] ?? throw new \UnexpectedValueException('No token in response');

        $this->block->update([
            'graphql_access_token' => $token,
            'graphql_access_token_expires_at' => $expiryDate,
            'graphql_access_token_domain' => $this->block->valid_domain,
        ]);
    }
}
