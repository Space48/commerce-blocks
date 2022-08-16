<?php

namespace App\Console\Commands;

use App\Models\BigcommerceStore;
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
    public function handle()
    {
        $storeHash = $this->argument('store_hash');
        $channelId = $this->argument('channel_id');
        $domain = $this->argument('domain');
        if ($storeHash && $store = BigcommerceStore::whereStoreHash($storeHash)->first()) {
            \App\Jobs\CreateToken::dispatchSync($store, $channelId, $domain);
        }
    }
}
