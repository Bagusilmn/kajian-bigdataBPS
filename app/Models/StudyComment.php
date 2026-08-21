<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'study_id',
        'user_id',
        'comment',
        'status',
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