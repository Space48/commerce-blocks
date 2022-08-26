<?php

namespace App\Listeners;

use App\Events\BlockEvent;
use App\Jobs\PublishWidget;

class UpdateWidgetTemplate
{

    public function handle(BlockEvent $event): void
    {
        PublishWidget::dispatchSync($event->block->store);
    }
}
