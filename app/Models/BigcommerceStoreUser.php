<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * App\Models\BigcommerceStoreUser
 *
 * @property int $id
 * @property int $user_id
 * @property int $bigcommerce_store_id
 * @property bool $is_owner
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\BigcommerceStore $store
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\BigcommerceStoreUserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser owner()
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser whereBigcommerceStoreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser whereIsOwner($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BigcommerceStoreUser whereUserId($value)
 * @mixin \Eloquent
 */
class BigcommerceStoreUser extends Pivot
{
    use HasFactory;

    public $table = 'bigcommerce_store_users';

    public $incrementing = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'is_owner', 'user_id', 'bigcommerce_store_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function store()
    {
        return $this->belongsTo(BigcommerceStore::class, 'bigcommerce_store_id', 'id');
    }

    /**
     * Scope a query to only include owner users.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOwner($query)
    {
        return $query->where('is_owner', true);
    }

}
