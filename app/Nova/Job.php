<?php

namespace App\Nova;

use Laravel\Nova\Fields\Code;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

class Job extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = \App\Models\Job::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'id';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id',
        'payload',
    ];

    public static $tableStyle = 'tight';

    public static function label()
    {
        return 'Job';
    }

    /**
     * Get the fields displayed by the resource.
     */
    public function fields(NovaRequest $request)
    {
        return [
            ID::make(__('ID'), 'id')->sortable(),
            Text::make(__('Queue'))->sortable()->filterable(),
            Text::make(__('Display Name'))->sortable()->filterable(),
            Code::make(__('Payload'))->json()->hideFromIndex(),
            Number::make(__('Attempts')),
            Number::make(__('Max Tries'))->hideFromIndex(),
            Number::make(__('Delay'))->hideFromIndex(),
            DateTime::make(__('Created At'))->hideFromIndex()->filterable(),
            DateTime::make(__('Reserved At'))->hideFromIndex()->filterable(),
            DateTime::make(__('Available At'))->hideFromIndex()->filterable(),
        ];
    }

    /**
     * Get the cards available for the request.
     */
    public function cards(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     */
    public function filters(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     */
    public function lenses(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     */
    public function actions(NovaRequest $request)
    {
        return [
            new DownloadExcel,
        ];
    }
}
