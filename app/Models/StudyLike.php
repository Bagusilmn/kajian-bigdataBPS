<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyLike extends Model
{
    use HasFactory;

    protected $fillable = [
        'study_id',
        'user_id',
        'session_id',
    ];

    public function study()
    {
        return $this->belongsTo(Study::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}