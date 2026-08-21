<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Study extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'user_id',
        'category_id',
        'current_reviewer_id',
        'title',
        'slug',
        'excerpt',
        'cover_image',
        'content',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function views()
    {
        return $this->hasMany(StudyView::class);
    }    
    public function likes()
    {
        return $this->hasMany(StudyLike::class);
    }
    public function comments()
    {
        return $this->hasMany(StudyComment::class);
    }
    public function reviews()
    {
        return $this->hasMany(StudyReview::class);
    }
    public function deletionRequests()
    {
        return $this->hasMany(StudyDeletionRequest::class);
    }
    public function shares()
    {
        return $this->hasMany(StudyShare::class);
    }
    public function currentReviewer()
    {
        return $this->belongsTo(User::class, 'current_reviewer_id');
    }
    public function keywords()
    {
        return $this->belongsToMany(
            Keyword::class,
            'study_keywords'
        )->withTimestamps();
    }
}