<?php

namespace App\Listeners;

use App\Events\BlockEvent;
use App\Jobs\CreateToken;
use Illuminate\Support\Facades\Log;

class UpdateGraphQLAccessToken
{

    public function handle(BlockEvent $event): void
    {
        Log::info('Updating token?', [$event->block->id, $event->block->requiresTokenUpdate()]);
        if (!$event->block->requiresTokenUpdate()) return;
        CreateToken::dispatch($event->block);
    }
}
