<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Design
 *
 * @property int $id
 * @property int $bigcommerce_store_id
 * @property string $name
 * @property string $heading_font_family
 * @property string $heading_font_size
 * @property string $heading_font_weight
 * @property string $heading_colour
 * @property string $text_font_family
 * @property string $text_font_size
 * @property string $text_colour
 * @property string $price_font_family
 * @property string $price_font_size
 * @property string $price_font_weight
 * @property string $price_colour
 * @property string $sale_price_font_size
 * @property string $sale_price_font_weight
 * @property string $sale_price_colour
 * @property string $link_colour
 * @property string $link_hover_colour
 * @property string $button_font_family
 * @property string $button_font_weight
 * @property string $button_font_size
 * @property string $button_colour
 * @property string $button_hover_colour
 * @property string $button_text_colour
 * @property string $button_hover_text_colour
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Database\Factories\DesignFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Design newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Design newQuery()
 * @method static \Illuminate\Database\Query\Builder|Design onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Design query()
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereBigcommerceStoreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereButtonColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereButtonFontFamily($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereButtonFontSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereButtonFontWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereButtonHoverColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereButtonHoverTextColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereButtonTextColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereHeadingColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereHeadingFontFamily($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereHeadingFontSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereHeadingFontWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereLinkColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereLinkHoverColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design wherePriceColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design wherePriceFontFamily($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design wherePriceFontSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design wherePriceFontWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereSalePriceColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereSalePriceFontSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereSalePriceFontWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereTextColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereTextFontFamily($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereTextFontSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Design withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Design withoutTrashed()
 * @mixin \Eloquent
 * @property string|null $text_font_weight
 * @property int|null $limit
 * @property int|null $columns
 * @property string|null $sale_price_font_family
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Block[] $blocks
 * @property-read int|null $blocks_count
 * @property-read \App\Models\BigcommerceStore|null $store
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereColumns($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereSalePriceFontFamily($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Design whereTextFontWeight($value)
 */
class Design extends Model
{
    use HasFactory, SoftDeletes;

    protected $casts = [
        'graphql_filters' => 'array',
    ];

    protected $dates = [
        'graphql_access_token_expires_at',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'bigcommerce_store_id',
        'name',
        'limit',
        'columns',
        'heading_font_family',
        'heading_font_size',
        'heading_font_weight',
        'heading_colour',
        'text_font_family',
        'text_font_weight',
        'text_font_size',
        'text_colour',
        'price_font_family',
        'price_font_size',
        'price_font_weight',
        'price_colour',
        'sale_price_font_family',
        'sale_price_font_size',
        'sale_price_font_weight',
        'sale_price_colour',
        'link_colour',
        'link_hover_colour',
        'button_font_family',
        'button_font_weight',
        'button_font_size',
        'button_colour',
        'button_hover_colour',
        'button_text_colour',
        'button_hover_text_colour'
    ];

    public function blocks()
    {
        return $this->hasMany(Block::class);
    }

    public function store()
    {
        return $this->belongsTo(BigcommerceStore::class, 'bigcommerce_store_id', 'id');
    }
}
