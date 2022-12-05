<?php

namespace App\Observers;

use App\Events\BlockCreated;
use App\Events\BlockUpdated;
use App\Models\Block;

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
        event(new BlockUpdated($block));
    }
}
