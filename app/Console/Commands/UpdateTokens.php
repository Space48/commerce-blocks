<?php

namespace App\Console\Commands;

use App\Jobs\CreateToken;
use App\Models\BigcommerceStore;
use Illuminate\Console\Command;

class UpdateTokens extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api-token:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update any tokens that need updating';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Checking installed stores that have tokens that require update');

        $stores = BigcommerceStore::installed()->cursor();
        /** @var BigcommerceStore $store */
        foreach ($stores as $store) {
            foreach ($store->blocks as $block) {
                if (!$block->requiresTokenUpdate()) continue;

                $this->info(sprintf(
                    'Updating token for block %s (%s) for store %s',
                    $block->name,
                    $block->id,
                    $store->store_hash
                ));
                CreateToken::dispatch($block);
            }
        }

        return 0;
    }
}
