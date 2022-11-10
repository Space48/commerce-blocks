<?php

namespace App\Nova\Filters;

use Illuminate\Http\Request;
use Laravel\Nova\Filters\BooleanFilter;

class StoreSubscribed extends BooleanFilter
{
    /**
     * Apply the filter to the given query.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param mixed $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply(Request $request, $query, $value)
    {
        if ($value['subscribed'] || $value['not_subscribed']) {
            $query->leftJoin(
                'subscriptions',
                'bigcommerce_stores.id',
                '=',
                'subscriptions.bigcommerce_store_id'
            );
        }

        if ($value['subscribed']) {
            $query->whereNotNull('subscriptions.id');
        }
        if ($value['not_subscribed']) {
            $query->orWhereNull('subscriptions.id');
        }

        $query->select('bigcommerce_stores.*');

        return $query;
    }

    /**
     * Get the filter's available options.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function options(Request $request)
    {
        return [
            'Subscribed' => 'subscribed',
            'Not Subscribed' => 'not_subscribed',
        ];
    }
}
