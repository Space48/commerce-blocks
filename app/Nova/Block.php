<?php

namespace App\Nova;

use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\Code;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\HasOne;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

class Block extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = \App\Models\Block::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'name';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id',
        'name',
        'valid_domain',
    ];

    public static $tableStyle = 'tight';

    public static function label()
    {
        return 'Blocks';
    }

    /**
     * Get the fields displayed by the resource.
     */
    public function fields(NovaRequest $request)
    {
        return [
            ID::make(__('ID'), 'id')->sortable(),
            BelongsTo::make(__('Store'), 'store', BigcommerceStore::class),
            HasOne::make(__('Design'), 'design', Design::class),

            Text::make(__('Name'))->sortable()->filterable(),
            Number::make(__('Channel ID'))->hideFromIndex(),
            Text::make(__('Block Type')),
            Text::make(__('Product Selection Type'))->hideFromIndex(),
            Boolean::make(__('Enable Filters'))->hideFromIndex(),
            Boolean::make(__('Enable Search'))->hideFromIndex(),
            Code::make(__('Product Selection Product IDs'))->json()->hideFromIndex(),
            Code::make(__('Product Selection Category IDs'))->json()->hideFromIndex(),
            Code::make(__('Product Selection Search Term'))->hideFromIndex(),
            Text::make(__('Product Selection Sort Order'))->hideFromIndex(),
            Boolean::make(__('Hide out of stock products'))->hideFromIndex(),
            Text::make(__('Valid Domain')),
            Text::make(__('GraphQL Access Token'))->hideFromIndex(),
            Text::make(__('GraphQL Access Token Domain'))->hideFromIndex(),
            DateTime::make(__('GraphQL Access Token Expires At'))->hideFromIndex(),
            Code::make(__('GraphQL Filters'))->json()->hideFromIndex(),

            DateTime::make(__('Created At'))->hideFromIndex()->filterable(),
            DateTime::make(__('Updated At'))->hideFromIndex()->filterable(),
            DateTime::make(__('Deleted At'))->hideFromIndex()->filterable(),
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
