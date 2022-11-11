<?php

namespace App\Jobs;

use App\Jobs\Middleware\LogMemoryUsageJobMiddleware;
use App\Models\BigcommerceStore;
use App\Models\Slack;
use App\Notifications\AppInstalled;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Support\Facades\Notification;

class SendStoreInstalledNotification extends AbstractJob implements ShouldBeUnique
{
    public $uniqueFor = 3600;

    public function __construct(protected BigcommerceStore $store)
    {
    }

    /**
     * Retrieve store info from BigCommerce and update our local record.
     *
     * @throws \Exception
     */
    public function handle()
    {
        Notification::send(new Slack(), new AppInstalled($this->store));
    }

    /**
     * Only allow one job to be dispatched at a time for each store.
     *
     * @return string
     */
    public function uniqueId()
    {
        return $this->store->id;
    }

    public function middleware()
    {
        return [
            new LogMemoryUsageJobMiddleware(),
        ];
    }
}
