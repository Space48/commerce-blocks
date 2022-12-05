<?php

namespace App\Jobs;

use App\Models\BigcommerceStore;
use App\Models\Block;
use App\Services\Bigcommerce;
use App\Services\Bigcommerce\Request\Payload\StorefrontApiTokenPayload;
use Illuminate\Support\Facades\Log;

class CreateToken extends BigcommerceJob
{
    const MAIN_CHANNEL = 1;

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
        // while the channel specific graphql route doesn't work, we need to use channel 1 for any tokens
        $payload = new StorefrontApiTokenPayload(
            $this->block->valid_domain,
            self::MAIN_CHANNEL,
            $expiryDate->unix()
        );
        /** @var BigcommerceStore $store */
        $store = $this->block->store;
        $result = $bc->createStoreFrontApiToken($store->access_token, $store->store_hash, $payload);
        $token = $result['data']['token'] ?? throw new \UnexpectedValueException('No token in response');
        $domain = $this->block->valid_domain;

        // prevent publishing widget on update
        Block::withoutEvents(function() use ($token, $expiryDate, $domain) {
            $this->block->update([
                'graphql_access_token' => $token,
                'graphql_access_token_expires_at' => $expiryDate,
                'graphql_access_token_domain' => $domain,
            ]);
        });

        Log::info('PUBLISH TOKEN', [
            'store_hash' => $this->block->store->store_hash,
            'domain' => $this->block->valid_domain
        ]);
    }
}
