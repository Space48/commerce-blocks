<?php

namespace App\Models;


use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * App\Models\Block
 *
 * @property int $id
 * @property int $bigcommerce_store_id
 * @property int $channel_id
 * @property int $design_id
 * @property string $block_type
 * @property string $valid_domain
 * @property string $graphql_access_token
 * @property \Illuminate\Support\Carbon $graphql_access_token_expires_at
 * @property array $graphql_filters
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Database\Factories\BlockFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Block newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Block newQuery()
 * @method static \Illuminate\Database\Query\Builder|Block onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Block query()
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereBigcommerceStoreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereBlockType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereChannelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereDesignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereGraphqlAccessToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereGraphqlAccessTokenExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereGraphqlFilters($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereValidDomain($value)
 * @method static \Illuminate\Database\Query\Builder|Block withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Block withoutTrashed()
 * @mixin \Eloquent
 * @property string $name
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereName($value)
 * @property string $uuid
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereUuid($value)
 * @property string|null $graphql_access_token_domain
 * @property-read \App\Models\Design|null $design
 * @property-read \App\Models\BigcommerceStore|null $store
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereGraphqlAccessTokenDomain($value)
 * @property string|null $product_selection_type
 * @property bool $enable_filters
 * @property bool $enable_search
 * @property array|null $product_selection_product_ids
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereEnableFilters($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereEnableSearch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereProductSelectionProductIds($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereProductSelectionType($value)
 * @property array|null $product_selection_category_ids
 * @property string|null $product_selection_search_term
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereProductSelectionCategoryIds($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereProductSelectionSearchTerm($value)
 */
class Block extends Model
{
    use HasUuid, HasFactory, SoftDeletes;

    protected $casts = [
        'enable_filters' => 'boolean',
        'enable_search' => 'boolean',
        'graphql_filters' => 'array',
        'product_selection_product_ids' => 'array',
        'product_selection_category_ids' => 'array',
    ];

    protected $dates = [
        'graphql_access_token_expires_at',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'bigcommerce_store_id',
        'block_type',
        'channel_id',
        'design_id',
        'graphql_access_token',
        'graphql_access_token_domain',
        'graphql_access_token_expires_at',
        'graphql_filters',
        'name',
        'product_selection_type',
        'valid_domain',
        'enable_filters',
        'enable_search',
        'product_selection_product_ids',
        'product_selection_category_ids',
        'product_selection_search_term',
    ];

    public static array $blockTypes = [
        'CAROUSEL',
        'GRID',
    ];

    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    public function store()
    {
        return $this->belongsTo(BigcommerceStore::class, 'bigcommerce_store_id', 'id');
    }

    public function requiresTokenUpdate(): bool
    {
        // Update if no domain or token yet
        if (is_null($this->graphql_access_token)) return true;
        if (is_null($this->graphql_access_token_domain)) return true;

        // Update if token is for a different domain
        if ($this->graphql_access_token_domain !== $this->valid_domain) return true;

        // Update if token has less than one day left of life.
        if ($this->graphql_access_token_expires_at->lessThan(Carbon::now()->addDay())) return true;
        return false;
    }

}
