<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use InvalidArgumentException;

/**
 * App\Models\BigcommerceStore
 *
 * @property int $id
 * @property string $store_hash
 * @property string $scope
 * @property string $access_token
 * @property bool $installed
 * @property string|null $domain
 * @property string|null $name
 * @property string|null $country
 * @property string|null $currency
 * @property string|null $plan_name
 * @property string|null $plan_level
 * @property string|null $plan_is_trial
 * @property string|null $status
 * @property int|null $store_id
 * @property string|null $timezone_name
 * @property int|null $timezone_raw_offset
 * @property int|null $timezone_dst_offset
 * @property bool|null $timezone_dst_correction
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read mixed $active
 * @property-read int|null $timezone_offset
 * @property-read Collection|\App\Models\User[] $owners
 * @property-read int|null $owners_count
 * @property-read Collection|\App\Models\BigcommerceStoreUser[] $store_users
 * @property-read int|null $store_users_count
 * @property-read Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Database\Factories\BigcommerceStoreFactory factory(...$parameters)
 * @method static Builder|BigcommerceStore installed()
 * @method static Builder|BigcommerceStore newModelQuery()
 * @method static Builder|BigcommerceStore newQuery()
 * @method static Builder|BigcommerceStore query()
 * @method static Builder|BigcommerceStore whereAccessToken($value)
 * @method static Builder|BigcommerceStore whereCountry($value)
 * @method static Builder|BigcommerceStore whereCreatedAt($value)
 * @method static Builder|BigcommerceStore whereCurrency($value)
 * @method static Builder|BigcommerceStore whereDomain($value)
 * @method static Builder|BigcommerceStore whereId($value)
 * @method static Builder|BigcommerceStore whereInstalled($value)
 * @method static Builder|BigcommerceStore whereName($value)
 * @method static Builder|BigcommerceStore wherePlanIsTrial($value)
 * @method static Builder|BigcommerceStore wherePlanLevel($value)
 * @method static Builder|BigcommerceStore wherePlanName($value)
 * @method static Builder|BigcommerceStore whereScope($value)
 * @method static Builder|BigcommerceStore whereStatus($value)
 * @method static Builder|BigcommerceStore whereStoreHash($value)
 * @method static Builder|BigcommerceStore whereStoreId($value)
 * @method static Builder|BigcommerceStore whereTimezoneDstCorrection($value)
 * @method static Builder|BigcommerceStore whereTimezoneDstOffset($value)
 * @method static Builder|BigcommerceStore whereTimezoneName($value)
 * @method static Builder|BigcommerceStore whereTimezoneRawOffset($value)
 * @method static Builder|BigcommerceStore whereUpdatedAt($value)
 * @method static Builder|BigcommerceStore withStoreHash(string $storeHash)
 * @method static Builder|BigcommerceStore withStoreId(int $storeId)
 * @mixin \Eloquent
 * @property-read Collection|\App\Models\Block[] $blocks
 * @property-read int|null $blocks_count
 * @property-read Collection|\App\Models\Design[] $designs
 * @property-read int|null $designs_count
 */
class BigcommerceStore extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'access_token',
        'country',
        'currency',
        'domain',
        'name',
        'scope',
        'store_hash',
        'installed',
        'plan_is_trial',
        'plan_level',
        'plan_name',
        'status',
        'store_id',
        'timezone_name',
        'timezone_raw_offset',
        'timezone_dst_offset',
        'timezone_dst_correction',
    ];

    protected $appends = [
        'active',
        'timezone_offset',
    ];

    protected $hidden = [
        'access_token',
    ];

    protected $casts = [
        'trial_ends_at' => 'datetime',
    ];

    /**
     * Get users for a BigCommerce Store
     *
     * @return BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'bigcommerce_store_users')->using(BigcommerceStoreUser::class);
    }

    public function store_users()
    {
        return $this->hasMany(BigcommerceStoreUser::class);
    }

    /**
     * @return BelongsToMany
     */
    public function owners()
    {
        return $this->users()->where('is_owner', true);
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(Block::class);
    }

    public function designs(): HasMany
    {
        return $this->hasMany(Design::class);
    }

    /**
     * @return User|null
     */
    public function getOwner()
    {
        return $this->owners->first();
    }

    /**
     * Scope a query to only include BigCommerce stores with a specific hash
     *
     * @param Builder $query
     * @param string $storeHash
     * @return Builder
     */
    public function scopeWithStoreHash(Builder $query, string $storeHash)
    {
        return $query->where('store_hash', $storeHash);
    }

    /**
     * Scope a query to only include BigCommerce stores with a specific store_id
     *
     * @param Builder $query
     * @param int $storeId
     * @return Builder
     */
    public function scopeWithStoreId(Builder $query, int $storeId)
    {
        return $query->where('store_id', $storeId);
    }

    /**
     * Scope a query to just installed stores.
     *
     * @param Builder $query
     * @return Builder
     */
    public function scopeInstalled(Builder $query)
    {
        return $query->where('installed', true);
    }

    public function getNameAttribute()
    {
        return $this->attributes['name'] ?? $this->attributes['domain'];
    }

    /**
     * Set access token
     *
     * @param string $value
     * @return void
     */
    public function setAccessTokenAttribute(string $value)
    {
        $this->attributes['access_token'] = encrypt($value);
    }

    /**
     * Get access token
     *
     * @return string
     */
    public function getAccessTokenAttribute()
    {
        return decrypt($this->attributes['access_token']);
    }


    /**
     * Get timezone offset.
     *
     * @return int|null
     */
    public function getTimezoneOffsetAttribute()
    {
        if (is_null($this->timezone_raw_offset) ||
            is_null($this->timezone_dst_offset) ||
            is_null($this->timezone_dst_correction)) {
            return null;
        }

        $offset = $this->timezone_raw_offset;
        if ($this->timezone_dst_correction) {
            $offset += $this->timezone_dst_offset;
        }

        return $offset;
    }

    public function getRouteKeyName()
    {
        return 'store_hash';
    }


    /**
     * Get store hash from 'stores/${store_hash' string that BigCommerce regularly
     * use
     *
     * @throws InvalidArgumentException
     */
    public static function getStoreHashFromContext(string $context): string
    {
        $parts = explode('/', $context);
        if (isset($parts[1])) {
            return $parts[1];
        }

        throw new InvalidArgumentException(
            'Provided context is not in expected format of `stores/$store_hash`'
        );
    }

    public function uri(): string
    {
        return sprintf('https://store-%s.mybigcommerce.com', $this->store_hash);
    }

    public function active(): bool
    {
        return $this->installed;
    }

    public function getActiveAttribute()
    {
        return $this->active();
    }
}
