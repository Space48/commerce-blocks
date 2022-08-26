<?php

namespace App\Jobs;

use App\Models\BigcommerceStore;
use App\Services\Bigcommerce;
use App\Services\WidgetManager;
use Illuminate\Support\Facades\Log;

class DeleteWidget extends BigcommerceJob
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
            foreach ($channels['data'] as $channel) {
                $channelId = (int) $channel['id'];
                $widgetData = $bc->fetchWidgetTemplates($this->store->access_token, $this->store->store_hash, $channelId);
                $template = $widgetManager->findTemplate($widgetData);

                if ($template) {
                    $bc->deleteWidgetTemplate($this->store->access_token, $this->store->store_hash, $template['uuid']);
                }

                Log::info('DELETE WIDGET', [
                    'store_hash' => $this->store->store_hash,
                    'template_uuid' => $template ? $template['uuid'] : 'none',
                    'channel_id' => $channel['id']
                ]);
            }
        }
    }
}
