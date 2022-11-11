<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FailedJob
 *
 * @property int $id
 * @property string $uuid
 * @property string $connection
 * @property string $queue
 * @property array $payload
 * @property string $exception
 * @property \Illuminate\Support\Carbon $failed_at
 * @property-read string $display_name
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob query()
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereConnection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereException($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereFailedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob wherePayload($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereQueue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereUuid($value)
 * @mixin \Eloquent
 */
class FailedJob extends Model
{
    protected $guarded = [
        'id',
    ];

    protected $appends = [
        'displayName',
    ];

    protected $casts = [
        'payload' => 'array',
        'failed_at' => 'datetime',
    ];

    public $timestamps = false;

    /**
     * The "booting" method of the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function (self $job) {
            $timestamp = now()->getTimeStamp();
            $job->failed_at = $job->failed_at ?: $timestamp;
        });
    }

    /**
     * Get value of displayName attribute.
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->payload['displayName'] ?? '';
    }
}
