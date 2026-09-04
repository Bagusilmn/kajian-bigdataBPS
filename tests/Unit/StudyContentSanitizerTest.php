<?php

namespace Tests\Unit;

use App\Support\StudyContentSanitizer;
use PHPUnit\Framework\TestCase;

class StudyContentSanitizerTest extends TestCase
{
    public function test_it_removes_scripts_event_handlers_and_unsafe_urls(): void
    {
        $sanitized = (new StudyContentSanitizer())->sanitize(
            '<p onclick="alert(1)">Aman</p>'
            . '<script>alert(1)</script>'
            . '<a href="javascript:alert(1)">Tautan</a>'
            . '<div data-url="javascript:alert(1)"></div>'
        );

        $this->assertSame('<p>Aman</p><a>Tautan</a><div></div>', $sanitized);
    }

    public function test_it_keeps_supported_content_with_safe_urls(): void
    {
        $sanitized = (new StudyContentSanitizer())->sanitize(
            '<div class="study-video-block" data-url="https://youtu.be/demo">'
            . '<iframe src="https://www.youtube.com/embed/demo" allowfullscreen></iframe>'
            . '</div>'
        );

        $this->assertStringContainsString('class="study-video-block"', $sanitized);
        $this->assertStringContainsString(
            'src="https://www.youtube.com/embed/demo"',
            $sanitized
        );
    }
}
