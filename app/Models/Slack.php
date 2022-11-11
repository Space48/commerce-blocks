<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;

class Slack
{
    use Notifiable;

    public function routeNotificationForSlack($notification)
    {
        return config('services.slack.webhook_url');
    }
}
