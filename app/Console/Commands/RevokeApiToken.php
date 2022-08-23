<?php

namespace App\Console\Commands;

use App\Jobs\RevokeToken;
use App\Models\BigcommerceStore;
use Illuminate\Console\Command;

class RevokeApiToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api-token:revoke {store_hash} {token}';

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
    public function handle()
    {
        $storeHash = $this->argument('store_hash');
        $token = $this->argument('token');
        if ($storeHash && $store = BigcommerceStore::whereStoreHash($storeHash)->first()) {
            RevokeToken::dispatchSync($store, $token);
        }
    }
}
