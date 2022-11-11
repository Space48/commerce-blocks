<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\InstalledStoreCount;
use App\Nova\Metrics\StoresPerBigCommercePlan;
use App\Nova\Metrics\StoresPerMonth;
use Laravel\Nova\Dashboards\Main as Dashboard;

class Main extends Dashboard
{

    /**
     * Get the cards that should be displayed on the Nova dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new InstalledStoreCount(),
            new StoresPerBigCommercePlan(),
            new StoresPerMonth(),
        ];
    }
}
