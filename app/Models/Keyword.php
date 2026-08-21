<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Keyword extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function studies()
    {
        return $this->belongsToMany(
            Study::class,
            'study_keywords'
        )->withTimestamps();
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = trim($value);

        $this->attributes['slug'] = Str::slug($value);
    }
}