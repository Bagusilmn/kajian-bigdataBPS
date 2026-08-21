<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'study_id',
        'reviewer_id',
        'decision',
        'stage',
        'notes',
    ];

    public function study()
    {
        return $this->belongsTo(Study::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}