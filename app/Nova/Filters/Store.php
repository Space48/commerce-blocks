<?php

namespace App\Nova\Filters;

use App\Models\BigcommerceStore;
use Illuminate\Http\Request;
use Laravel\Nova\Filters\Filter;
use Laravel\Nova\Http\Requests\NovaRequest;

class Store extends Filter
{
    /**
     * The filter's component.
     *
     * @var string
     */
    public $component = 'select-filter';

    /**
     * Apply the filter to the given query.
     *
     * @param NovaRequest $request
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param mixed $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply(NovaRequest $request, $query, $value)
    {
        return $query->where('bigcommerce_store_id', $value);
    }

    /**
     * Get the filter's available options.
     *
     * @return array
     */
    public function options(NovaRequest $request)
    {
        $storesByNameQuery = BigcommerceStore::query()->orderBy('name');
        $options = [];
        foreach ($storesByNameQuery->cursor() as $store) {
            $options[$store->name] = $store->id;
        }

        return $options;
    }
}

