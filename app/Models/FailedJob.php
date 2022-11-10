<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
