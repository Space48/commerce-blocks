<?php

namespace Tests\Unit\Models;

use App\Models\Block;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class BlockTest extends TestCase
{
    public function getValidDomainWithProtocol()
    {
        /** @var Block $block */
        $block = Block::factory()->make(['valid_domain' => 'https://www.test.com']);
        $this->assertEquals('https://www.test.com', $block->valid_domain);
    }

    public function getValidDomainWithoutProtocol()
    {
        /** @var Block $block */
        $block = Block::factory()->make(['valid_domain' => 'www.test.com']);
        $this->assertEquals('https://www.test.com', $block->valid_domain);
    }

    public function testRequiresTokenUpdateWhenNoToken()
    {
        /** @var Block $block */
        $block = Block::factory()->make();
        $this->assertTrue($block->requiresTokenUpdate());
    }

    public function testRequiresTokenUpdateWhenDomainMismatch()
    {
        /** @var Block $block */
        $block = Block::factory()->make(['graphql_access_token_domain' => 'www.foo.com', 'valid_domain' => 'www.bar.com']);
        $this->assertTrue($block->requiresTokenUpdate());
    }

    public function testRequiresTokenWhenCurrentTokenIsCloseToExpiring()
    {
        /** @var Block $block */
        $block = Block::factory()->make([
            'valid_domain' => 'www.test.com',
            'graphql_access_token' => 'test',
            'graphql_access_token_domain' => 'www.test.com',
            'graphql_access_token_expires_at' => Carbon::now()->addDay()->subMinute(),
        ]);
        $this->assertTrue($block->requiresTokenUpdate());
    }

    public function testDoesNotRequireToken()
    {
        /** @var Block $block */
        $block = Block::factory()->make([
            'valid_domain' => 'www.test.com',
            'graphql_access_token' => 'test',
            'graphql_access_token_domain' => 'https://www.test.com',
            'graphql_access_token_expires_at' => Carbon::now()->addDay()->addMinute(),
        ]);
        $this->assertFalse($block->requiresTokenUpdate());
    }
}
