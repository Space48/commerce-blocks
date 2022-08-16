<?php

namespace App\Services\Bigcommerce\Request\Payload;

class StorefrontApiTokenPayload
{
    public function __construct(
        private string $domain,
        private int $channelId,
        private int $unixTimestamp,
    )
    {
    }

    public function toArray(): array
    {
        return [
            'allowed_cors_origins' => [$this->domain],
            'channel_id' => $this->channelId,
            'expires_at' => $this->unixTimestamp,
        ];
    }
}
