<?php

namespace App\Listeners;

use App\Events\StoreUninstalled;

class DeleteWidgetTemplate
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @return void
     */
    public function handle(StoreUninstalled $event)
    {
        \App\Jobs\DeleteWidget::dispatch($event->store)->onQueue('high');
    }
}
