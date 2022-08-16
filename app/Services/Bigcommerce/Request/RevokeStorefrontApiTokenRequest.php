<?php

namespace App\Services\Bigcommerce\Request;

class RevokeStorefrontApiTokenRequest extends AbstractRequest
{
    public function __construct(string $clientId, string $accessToken, string $storeHash, string $token)
    {
        parent::__construct($clientId, $accessToken, $storeHash);
        $this->setHeaders([
            'Sf-Api-Token' => $token,
        ]);
    }

    public function getPath(): string
    {
        return $this->apiBaseUrl . $this->getStoreHash() . '/v3/storefront/api-token';
    }

    public function getHttpMethod(): string
    {
        return 'DELETE';
    }
}
