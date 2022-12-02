<?php

namespace App\Observers;

use App\Events\BlockCreated;
use App\Events\BlockUpdated;
use App\Models\Block;
use Illuminate\Support\Facades\Log;

class BlockObserver
{
    /**
     * Handle the Block "created" event.
     *
     * @param  \App\Models\Block  $block
     * @return void
     */
    public function created(Block $block): void
    {
        Log::info('CREATED');
        event(new BlockCreated($block));
    }
    /**
     * Handle the Block "updated" event.
     *
     * @param  \App\Models\Block  $block
     * @return void
     */
    public function updated(Block $block): void
    {
        Log::info('UPDATED');
        event(new BlockUpdated($block));
    }
}
