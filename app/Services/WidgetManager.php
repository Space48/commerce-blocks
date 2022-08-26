<?php

namespace App\Services;

use App\Models\BigcommerceStore;
use App\Models\Block;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class WidgetManager
{

    public function toHtml(BigcommerceStore $store): string
    {
        $html = (string) view('widget', [
            'apiUrl' => config('app.url'),
            'storeHash' => $store->store_hash,
        ]);
        return $html;
    }

    public function widgetName(): string
    {
        return config('app.name');
    }

    public function widgetId(): string
    {
        return config('bigcommerce.app_id');
    }

    public function appIdentifier(): string
    {
        return 'space48-' . Str::slug($this->widgetName());
    }

    public function getSectionsSchema(Collection $blocks): array
    {
        return [
            $this->getBlocksSection($blocks),
        ];
    }

    private function getBlockOptions(Collection $blocks): array
    {
        $blockOptions[] =  [
            'label' => 'Select block',
            'value' => '',
        ];

        foreach($blocks as $block) {
            $blockOptions[] = [
                'label' => $block->name,
                'value' => $block->id
            ];
        }
        return $blockOptions;
    }

    private function getBlocksSection(Collection $blocks): array
    {
        return [
            'label' => 'Block',
            'settings' => [
                [
                    'type' => 'select',
                    'label' => 'Block name',
                    'id' => 'block_id',
                    'typeMeta' => [
                        'selectOptions' => $this->getBlockOptions($blocks)
                    ]
                ],

            ]
        ];
    }

    public function findTemplate(array $widgetData): array|null
    {
        return collect($widgetData['data'])->filter(function ($template) {
            return isset($template['schema']);
        })->first(function ($apps) {
            // remove general schema elements
            $items = collect($apps['schema'])->filter(function ($item) {
                return isset($item['type']) && $item['type'] === 'hidden';
            });
            // check the remaining items for our identifiers
            $config = $items->flatten()->toArray();
            return in_array($this->appIdentifier(), $config) &&
                in_array($this->widgetId(), $config);
        });
    }
}
