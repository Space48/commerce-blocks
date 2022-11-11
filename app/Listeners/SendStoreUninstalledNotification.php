<?php

namespace App\Listeners;

use App\Events\StoreUninstalled;
use App\Models\Slack;
use App\Notifications\AppUninstalled;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;

class SendStoreUninstalledNotification implements ShouldQueue
{
    /**
     * Send slack notification
     */
    public function handle(StoreUninstalled $event): void
    {
        Notification::send(new Slack(), new AppUninstalled($event->store));
    }
}
