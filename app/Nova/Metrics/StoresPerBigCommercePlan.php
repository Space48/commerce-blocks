<?php

namespace App\Nova\Metrics;

use App\Models\BigcommerceStore;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Metrics\Partition;

class StoresPerBigCommercePlan extends Partition
{
    /**
     * Calculate the value of the metric.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     * @return mixed
     */
    public function calculate(NovaRequest $request)
    {
        $stores = BigcommerceStore::installed();

        return $this->count($request, $stores, 'plan_level');
    }

    public function name()
    {
        return 'Stores per BigCommerce Plan';
    }

    /**
     * Determine the amount of time the results of the metric should be cached.
     *
     * @return \DateTimeInterface|\DateInterval|float|int|null
     */
    public function cacheFor()
    {
        // return now()->addMinutes(5);
    }

    /**
     * Get the URI key for the metric.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'stores-per-big-commerce-plan';
    }
}
