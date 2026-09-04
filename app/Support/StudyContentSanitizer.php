<?php

namespace App\Support;

use DOMDocument;
use DOMElement;
use DOMNode;

class StudyContentSanitizer
{
    private const ALLOWED_TAGS = [
        'a', 'blockquote', 'br', 'code', 'div', 'em', 'figcaption',
        'figure', 'h1', 'h2', 'h3', 'h4', 'iframe', 'img', 'li',
        'ol', 'p', 'pre', 'source', 'span', 'strong', 'u', 's', 'ul',
        'video',
    ];

    private const REMOVE_WITH_CONTENT = [
        'base', 'embed', 'form', 'input', 'object', 'script', 'style',
        'svg', 'template',
    ];

    public function sanitize(string $html): string
    {
        if ($html === '') {
            return '';
        }

        $document = new DOMDocument('1.0', 'UTF-8');
        $previousUseInternalErrors = libxml_use_internal_errors(true);

        $document->loadHTML(
            '<div id="study-content-root">' . $html . '</div>',
            LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
        );

        libxml_clear_errors();
        libxml_use_internal_errors($previousUseInternalErrors);

        $root = $document->getElementById('study-content-root');

        if (! $root instanceof DOMElement) {
            return '';
        }

        foreach (iterator_to_array($root->childNodes) as $child) {
            $this->sanitizeNode($child);
        }

        $sanitized = '';

        foreach ($root->childNodes as $child) {
            $sanitized .= $document->saveHTML($child);
        }

        return $sanitized;
    }

    private function sanitizeNode(DOMNode $node): void
    {
        foreach (iterator_to_array($node->childNodes) as $child) {
            $this->sanitizeNode($child);
        }

        if (! $node instanceof DOMElement) {
            return;
        }

        $tag = strtolower($node->tagName);

        if (in_array($tag, self::REMOVE_WITH_CONTENT, true)) {
            $node->parentNode?->removeChild($node);

            return;
        }

        if (! in_array($tag, self::ALLOWED_TAGS, true)) {
            $this->unwrap($node);

            return;
        }

        $this->sanitizeAttributes($node, $tag);
    }

    private function sanitizeAttributes(DOMElement $element, string $tag): void
    {
        foreach (iterator_to_array($element->attributes) as $attribute) {
            $name = strtolower($attribute->name);
            $value = $attribute->value;

            if ($name === 'class') {
                continue;
            }

            if (str_starts_with($name, 'data-')) {
                if (! $this->isSafeDataAttribute($name, $value)) {
                    $element->removeAttribute($attribute->name);
                }

                continue;
            }

            if (
                $tag === 'a'
                && in_array($name, ['href', 'title', 'target', 'rel'], true)
            ) {
                if ($name === 'href' && ! $this->isSafeUrl($value, true)) {
                    $element->removeAttribute($attribute->name);
                }

                continue;
            }

            if (
                in_array($tag, ['img', 'iframe', 'source'], true)
                && $name === 'src'
            ) {
                if (! $this->isSafeUrl($value)) {
                    $element->removeAttribute($attribute->name);
                }

                continue;
            }

            if (
                $tag === 'img'
                && in_array($name, ['alt', 'title', 'width', 'height'], true)
            ) {
                continue;
            }

            if (
                $tag === 'iframe'
                && in_array($name, ['title', 'loading', 'allow', 'allowfullscreen'], true)
            ) {
                continue;
            }

            if (
                $tag === 'source'
                && $name === 'type'
            ) {
                continue;
            }

            if (
                $tag === 'video'
                && in_array($name, ['controls', 'poster'], true)
            ) {
                if ($name === 'poster' && ! $this->isSafeUrl($value)) {
                    $element->removeAttribute($attribute->name);
                }

                continue;
            }

            $element->removeAttribute($attribute->name);
        }

        if (
            $tag === 'a'
            && $element->getAttribute('target') === '_blank'
        ) {
            $element->setAttribute('rel', 'noopener noreferrer');
        }
    }

    private function isSafeUrl(string $url, bool $allowFragment = false): bool
    {
        $url = trim(html_entity_decode($url, ENT_QUOTES | ENT_HTML5, 'UTF-8'));

        if (
            $url === ''
            || preg_match('/[\x00-\x20"\'<>]/', $url)
        ) {
            return false;
        }

        if ($allowFragment && str_starts_with($url, '#')) {
            return true;
        }

        if (str_starts_with($url, '/')) {
            return true;
        }

        $scheme = parse_url($url, PHP_URL_SCHEME);

        return in_array(strtolower((string) $scheme), ['http', 'https'], true);
    }

    private function isSafeDataAttribute(string $name, string $value): bool
    {
        if ($name === 'data-url') {
            return $this->isSafeUrl($value);
        }

        if ($name === 'data-images') {
            $images = json_decode($value, true);

            if (! is_array($images)) {
                return false;
            }

            foreach ($images as $image) {
                if (
                    ! is_array($image)
                    || ! isset($image['url'])
                    || ! is_string($image['url'])
                    || ! $this->isSafeUrl($image['url'])
                ) {
                    return false;
                }
            }
        }

        if ($name === 'data-variant') {
            return in_array(
                $value,
                ['info', 'success', 'warning', 'important'],
                true
            );
        }

        return true;
    }

    private function unwrap(DOMElement $element): void
    {
        $parent = $element->parentNode;

        if (! $parent) {
            return;
        }

        while ($element->firstChild) {
            $parent->insertBefore($element->firstChild, $element);
        }

        $parent->removeChild($element);
    }
}
