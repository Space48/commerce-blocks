<?php

namespace App\Jobs;

use App\Models\BigcommerceStore;
use App\Models\Block;
use App\Services\Bigcommerce;
use App\Services\WidgetManager;
use Illuminate\Support\Facades\Log;

class PublishWidget extends BigcommerceJob
{
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(protected BigcommerceStore $store)
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Bigcommerce $bc, WidgetManager $widgetManager)
    {
        $channels = $bc->fetchChannels($this->store->access_token, $this->store->store_hash);

        if (isset($channels['data']) && count($channels['data']) > 0) {

            foreach($channels['data'] as $channel) {
                $channelId = (int) $channel['id'];
                $blocks = Block::whereChannelId($channelId)->get();
                $payload = new Bigcommerce\Request\Payload\WidgetTemplatePayload(
                    $widgetManager->widgetName(),
                    $widgetManager->toHtml($this->store),
                    $widgetManager->appIdentifier(),
                    $widgetManager->widgetId(),
                    $widgetManager->getSectionsSchema($blocks),
                    $channelId
                );

                $widgetData = $bc->fetchWidgetTemplates($this->store->access_token, $this->store->store_hash, $channelId);
                $template = $widgetManager->findTemplate($widgetData);

                Log::info('TEMPLATE', [$template]);

                if ($template) {
                    $bc->updateWidgetTemplate($this->store->access_token, $this->store->store_hash, $template['uuid'], $payload);
                } else {
                    $bc->createWidgetTemplate($this->store->access_token, $this->store->store_hash, $payload);
                }

                Log::info('PUBLISH WIDGET', [
                    'type' => $template ? 'update' : 'create',
                    'store_hash' => $this->store->store_hash,
                    'template_uuid' => $template ? $template['uuid'] : 'none',
                    'channel_id' => $channelId
                ]);
            }
        }
    }
}
