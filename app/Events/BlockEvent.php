<?php

namespace App\Events;

use App\Models\Block;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BlockEvent
{
    use Dispatchable, SerializesModels;

    public function __construct(public Block $block)
    {
    }
}
