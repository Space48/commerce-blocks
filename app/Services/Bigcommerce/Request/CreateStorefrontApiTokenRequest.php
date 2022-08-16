<?php

namespace App\Services\Bigcommerce\Request;

use App\Services\Bigcommerce\Request\Payload\StorefrontApiTokenPayload;

class CreateStorefrontApiTokenRequest extends AbstractRequest
{
    public function __construct(string $clientId, string $accessToken, string $storeHash, StorefrontApiTokenPayload $payload)
    {
        parent::__construct($clientId, $accessToken, $storeHash);
        $this->setData($payload->toArray());
    }

    public function getPath(): string
    {
        return $this->apiBaseUrl . $this->getStoreHash() . '/v3/storefront/api-token';
    }

    public function getHttpMethod(): string
    {
        return 'POST';
    }
}
