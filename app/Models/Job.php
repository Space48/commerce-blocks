<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $guarded = [
        'id',
    ];

    protected $appends = [
        'displayName',
        'maxTries',
        'delay',
    ];

    protected $casts = [
        'payload' => 'array',
        'available_at' => 'datetime',
        'reserved_at' => 'datetime',
        'created_at' => 'datetime',
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
            $job->available_at = $job->available_at ?: $timestamp;
            $job->created_at = $job->created_at ?: $timestamp;
        });
    }

    /**
     * Get value of displayName attribute.
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->payload['displayName'] ?? '';
    }

    /**
     * Get value of maxTries attribute.
     */
    public function getMaxTriesAttribute(): int
    {
        return $this->payload['maxTries'] ?? 0;
    }

    /**
     * Get value of delay attribute.
     */
    public function getDelayAttribute(): int
    {
        return $this->payload['delay'] ?? 0;
    }
}
