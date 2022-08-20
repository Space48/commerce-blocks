<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
 */
class Block extends Model
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
        'channel_id',
        'design_id',
        'block_type',
        'valid_domain',
        'graphql_access_token',
        'graphql_access_token_expires_at',
        'graphql_filters',
    ];

    public function design()
    {
        $this->belongsTo(Design::class);
    }

    public function store()
    {
        $this->belongsTo(BigcommerceStore::class);
    }

}
