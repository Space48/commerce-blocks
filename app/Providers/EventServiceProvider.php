<?php

namespace App\Providers;

use App\Events\BlockCreated;
use App\Events\BlockUpdated;
use App\Listeners\StoreEventSubscriber;
use App\Listeners\UpdateGraphQLAccessToken;
use App\Listeners\UpdateWidgetTemplate;
use App\Models\Block;
use App\Observers\BlockObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        BlockCreated::class => [
            UpdateGraphQLAccessToken::class,
            UpdateWidgetTemplate::class,
        ],
        BlockUpdated::class => [
            UpdateGraphQLAccessToken::class,
            UpdateWidgetTemplate::class,
        ],
    ];

    protected $subscribe = [
        StoreEventSubscriber::class,
    ];

    protected $observers = [
        Block::class => [
            BlockObserver::class,
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
