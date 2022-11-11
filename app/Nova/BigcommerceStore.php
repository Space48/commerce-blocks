<?php

namespace App\Nova;

use Laravel\Nova\Fields\BelongsToMany;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\Country;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Timezone;
use Laravel\Nova\Http\Requests\NovaRequest;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

class BigcommerceStore extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = \App\Models\BigcommerceStore::class;

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
        'domain',
        'name',
        'store_hash',
    ];

    public static $tableStyle = 'tight';

    public static function label()
    {
        return 'Stores';
    }

    /**
     * Get the fields displayed by the resource.
     */
    public function fields(NovaRequest $request)
    {
        return [
            ID::make(__('ID'), 'id')->sortable(),
            Text::make(__('Store Hash'))->sortable(),
            Text::make(__('Domain'))->sortable(),
            Text::make(__('Name'))->sortable(),
            Boolean::make(__('Installed'))->sortable()->filterable(),
            DateTime::make(__('Trial Ends At'))->sortable()->filterable(),
            Country::make(__('Country'))->sortable()->filterable(),
            Text::make('Stripe Id')->hideFromIndex(),
            Text::make(__('Currency'))->sortable()->hideFromIndex(),
            Text::make(__('Plan Name'))->sortable()->filterable(),
            Text::make(__('Plan Level'))->sortable()->filterable(),
            Boolean::make(__('Plan Is Trial'))->hideFromIndex(),
            Text::make(__('Status'))->hideFromIndex(),
            Timezone::make(__('Timezone Name'))->hideFromIndex(),
            Number::make(__('Timezone Raw Offset'))->hideFromIndex(),
            Number::make(__('Timezone Dst Offset'))->hideFromIndex(),
            Boolean::make(__('Timezone Dst Correction'))->hideFromIndex(),
            Text::make(__('Access Token'))->hideFromIndex(),
            DateTime::make(__('Created At'))->hideFromIndex()->filterable(),
            DateTime::make(__('Updated At'))->hideFromIndex()->filterable(),

            HasMany::make(__('Store Owner'), 'owners', 'App\Nova\User'),
            BelongsToMany::make(__('Users'))->allowDuplicateRelations(),

            HasMany::make(__('Blocks'), 'blocks', Block::class),
            HasMany::make(__('Designs'), 'designs', Design::class),
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
