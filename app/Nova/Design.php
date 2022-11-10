<?php

namespace App\Nova;

use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\Code;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

class Design extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = \App\Models\Design::class;

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
    ];

    public static $tableStyle = 'tight';

    public static function label()
    {
        return 'Design';
    }

    /**
     * Get the fields displayed by the resource.
     */
    public function fields(NovaRequest $request)
    {
        return [
            ID::make(__('ID'), 'id')->sortable(),
            BelongsTo::make(__('Store'), 'store', BigcommerceStore::class),
            Text::make(__('Name'))->sortable()->filterable(),
            Number::make(__('Limit'))->hideFromIndex(),
            Number::make(__('Columns'))->hideFromIndex(),
            Text::make(__('Heading Font Family'))->hideFromIndex(),
            Text::make(__('Heading Font Size'))->hideFromIndex(),
            Text::make(__('Heading Font Weight'))->hideFromIndex(),
            Text::make(__('Heading Colour'))->hideFromIndex(),
            Text::make(__('Text Font Family'))->hideFromIndex(),
            Text::make(__('Text Font Size'))->hideFromIndex(),
            Text::make(__('Text Font Weight'))->hideFromIndex(),
            Text::make(__('Text Colour'))->hideFromIndex(),
            Text::make(__('Price Font Family'))->hideFromIndex(),
            Text::make(__('Price Font Size'))->hideFromIndex(),
            Text::make(__('Price Font Weight'))->hideFromIndex(),
            Text::make(__('Price Colour'))->hideFromIndex(),
            Text::make(__('Sale Price Font Family'))->hideFromIndex(),
            Text::make(__('Sale Price Font Size'))->hideFromIndex(),
            Text::make(__('Sale Price Font Weight'))->hideFromIndex(),
            Text::make(__('Sale Price Colour'))->hideFromIndex(),
            Text::make(__('Link Colour'))->hideFromIndex(),
            Text::make(__('Link Hover Colour'))->hideFromIndex(),
            Text::make(__('Button Font Family'))->hideFromIndex(),
            Text::make(__('Button Font Size'))->hideFromIndex(),
            Text::make(__('Button Colour'))->hideFromIndex(),
            Text::make(__('Button Hover Colour'))->hideFromIndex(),
            Text::make(__('Button Text Colour'))->hideFromIndex(),
            Text::make(__('Button Hover Text Colour'))->hideFromIndex(),

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
