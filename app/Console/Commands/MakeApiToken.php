<?php

namespace App\Console\Commands;

use App\Jobs\CreateToken;
use App\Models\BigcommerceStore;
use App\Services\Bigcommerce;
use App\Services\Bigcommerce\Request\Payload\StorefrontApiTokenPayload;
use Illuminate\Console\Command;

class MakeApiToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api-token:make {store_hash} {channel_id} {domain}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates the default settings for the specified store';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(Bigcommerce $bc)
    {
        $storeHash = $this->argument('store_hash');
        $channelId = $this->argument('channel_id');
        $domain = $this->argument('domain');

        if ($storeHash && $store = BigcommerceStore::whereStoreHash($storeHash)->first()) {
            $payload = new StorefrontApiTokenPayload(
                $domain,
                $channelId,
                now()->addDays(30)->unix()
            );

            $result = $bc->createStoreFrontApiToken($store->access_token, $store->store_hash, $payload);
            dd($result);
        }
    }
}
