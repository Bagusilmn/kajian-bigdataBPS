import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';

import Quill from 'quill';
import QuillResize from 'quill-resize-module';

import 'quill/dist/quill.snow.css';
import 'quill-resize-module/dist/resize.css';

import DashboardLayout from '../../../Layouts/DashboardLayout';

const BlockEmbed = Quill.import('blots/block/embed');

/*
|--------------------------------------------------------------------------
| PDF
|--------------------------------------------------------------------------
*/

class PdfBlot extends BlockEmbed {
    static blotName = 'pdf';
    static tagName = 'div';
    static className = 'study-pdf-block';

    static create(value) {
        const node = super.create();

        node.setAttribute('contenteditable', 'false');

        node.dataset.url = value.url;
        node.dataset.name = value.name || 'Dokumen PDF';

        node.innerHTML = `
            <div class="study-pdf-header">
                <div class="study-pdf-info">
                    <div class="study-pdf-icon">
                        PDF
                    </div>

                    <div class="study-pdf-title">
                        <strong>
                            ${escapeHtml(value.name || 'Dokumen PDF')}
                        </strong>

                        <span>
                            Dokumen PDF
                        </span>
                    </div>
                </div>

                <a
                    href="${value.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="study-pdf-open"
                >
                    Buka penuh
                </a>
            </div>

            <div class="study-pdf-viewer">
                <iframe
                    src="${value.url}#toolbar=1&navpanes=0&view=FitH"
                    title="${escapeHtml(value.name || 'Dokumen PDF')}"
                    loading="lazy"
                ></iframe>
            </div>
        `;

        return node;
    }

    static value(node) {
        return {
            url: node.dataset.url,
            name: node.dataset.name,
        };
    }
}


/*
|--------------------------------------------------------------------------
| Video
|--------------------------------------------------------------------------
*/

class VideoBlot extends BlockEmbed {
    static blotName = 'studyVideo';
    static tagName = 'div';
    static className = 'study-video-block';

    static create(value) {
        const node = super.create();

        node.setAttribute('contenteditable', 'false');

        const url = value.url || '';
        const embedUrl = getVideoEmbedUrl(url);

        node.dataset.url = url;
        node.dataset.type = value.type || 'video';

        if (embedUrl) {
            node.innerHTML = `
                <div class="study-video-frame">
                    <iframe
                        src="${embedUrl}"
                        title="${escapeHtml('Video kajian')}"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            `;
        } else {
            node.innerHTML = `
                <div class="study-video-frame">
                    <video controls>
                        <source src="${url}">
                    </video>
                </div>
            `;
        }

        return node;
    }

    static value(node) {
        return {
            url: node.dataset.url,
            type: node.dataset.type,
        };
    }
}

/*
|--------------------------------------------------------------------------
| Embed
|--------------------------------------------------------------------------
*/

class EmbedBlot extends BlockEmbed {
    static blotName = 'studyEmbed';
    static tagName = 'div';
    static className = 'study-embed-block';

    static create(value) {
        const node = super.create();

        node.setAttribute('contenteditable', 'false');

        const url = String(value.url || '').trim();
        const type = value.type || 'url';

        node.dataset.url = url;
        node.dataset.type = type;

        if (!url) {
            return node;
        }

        if (type === 'github' || type === 'gitlab') {
            const platform =
                type === 'github'
                    ? 'GitHub'
                    : 'GitLab';

            node.innerHTML = `
                <div class="study-repository-card">
                    <div class="study-repository-platform">
                        ${platform}
                    </div>

                    <div class="study-repository-url">
                        ${url}
                    </div>

                    <a
                        href="${url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Buka Repository
                    </a>
                </div>
            `;

            return node;
        }

        node.innerHTML = `
            <div class="study-embed-frame">
                <iframe
                    src="${url}"
                    title="${escapeHtml('Konten embed kajian')}"
                    loading="lazy"
                    allowfullscreen
                ></iframe>
            </div>
        `;

        return node;
    }

    static value(node) {
        return {
            url: node.dataset.url,
            type: node.dataset.type,
        };
    }
}

Quill.register(EmbedBlot);

/*
|--------------------------------------------------------------------------
| Callout
|--------------------------------------------------------------------------
*/

class CalloutBlot extends BlockEmbed {
    static blotName = 'callout';
    static tagName = 'div';
    static className = 'study-callout-block';

    static create(value) {
        const node = super.create();

        node.setAttribute('contenteditable', 'false');

        node.dataset.variant = value.variant || 'info';
        node.dataset.text = value.text || '';

        node.innerHTML = `
            <div class="study-callout study-callout--${value.variant || 'info'}">
                <div class="study-callout__icon">
                    ${getCalloutIcon(value.variant)}
                </div>

                <div class="study-callout__content">
                    <strong>
                        ${escapeHtml(value.title || 'Catatan')}
                    </strong>

                    <p>
                        ${escapeHtml(value.text || '')}
                    </p>
                </div>
            </div>
        `;

        return node;
    }

    static value(node) {
        return {
            variant: node.dataset.variant || 'info',
            text: node.dataset.text || '',
        };
    }
}


/*
|--------------------------------------------------------------------------
| Divider
|--------------------------------------------------------------------------
*/

class DividerBlot extends BlockEmbed {
    static blotName = 'divider';
    static tagName = 'div';
    static className = 'study-divider-block';

    static create() {
        const node = super.create();

        node.setAttribute('contenteditable', 'false');

        node.innerHTML = `
            <div class="study-divider"></div>
        `;

        return node;
    }

    static value() {
        return true;
    }
}


/*
|--------------------------------------------------------------------------
| Button
|--------------------------------------------------------------------------
*/

class ButtonBlot extends BlockEmbed {
    static blotName = 'studyButton';
    static tagName = 'div';
    static className = 'study-button-block';

    static create(value) {
        const node = super.create();

        node.setAttribute('contenteditable', 'false');

        node.dataset.url = value.url || '';
        node.dataset.label = value.label || 'Lihat Selengkapnya';

        node.innerHTML = `
            <a
                href="${value.url || '#'}"
                target="_blank"
                rel="noopener noreferrer"
                class="study-content-button"
            >
                ${escapeHtml(value.label || 'Lihat Selengkapnya')}
            </a>
        `;

        return node;
    }

    static value(node) {
        return {
            url: node.dataset.url,
            label: node.dataset.label,
        };
    }
}


/*
|--------------------------------------------------------------------------
| Gallery
|--------------------------------------------------------------------------
*/

class GalleryBlot extends BlockEmbed {
    static blotName = 'gallery';
    static tagName = 'div';
    static className = 'study-gallery-block';

    static create(value) {
        const node = super.create();

        node.setAttribute('contenteditable', 'false');

        const images = Array.isArray(value.images)
            ? value.images
            : [];

        node.dataset.images = JSON.stringify(images);

        node.innerHTML = `
            <div class="study-gallery">
                ${images.map((image) => `
                    <figure class="study-gallery__item">
                        <img
                            src="${image.url}"
                            alt="${escapeHtml(image.alt || 'Gambar kajian')}"
                        />
                        ${
                            image.caption
                                ? `<figcaption>${escapeHtml(image.caption)}</figcaption>`
                                : ''
                        }
                    </figure>
                `).join('')}
            </div>
        `;

        return node;
    }

    static value(node) {
        try {
            return {
                images: JSON.parse(
                    node.dataset.images || '[]'
                ),
            };
        } catch {
            return {
                images: [],
            };
        }
    }
}


/*
|--------------------------------------------------------------------------
| Register Blots
|--------------------------------------------------------------------------
*/

Quill.register(PdfBlot);
Quill.register(VideoBlot);
Quill.register(CalloutBlot);
Quill.register(DividerBlot);
Quill.register(ButtonBlot);
Quill.register(GalleryBlot);

Quill.register('modules/resize', QuillResize);


/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/
function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}


function getCalloutIcon(variant = 'info') {
    if (variant === 'warning') {
        return '!';
    }

    if (variant === 'success') {
        return '✓';
    }

    if (variant === 'important') {
        return '!';
    }

    return 'i';
}


function getVideoEmbedUrl(url) {
    if (!url) {
        return null;
    }

    try {
        const parsed = new URL(url);

        if (
            parsed.hostname.includes('youtube.com')
        ) {
            const videoId = parsed.searchParams.get('v');

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        if (
            parsed.hostname === 'youtu.be'
        ) {
            const videoId =
                parsed.pathname.replace('/', '');

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        if (
            parsed.hostname.includes('vimeo.com')
        ) {
            const videoId =
                parsed.pathname.split('/').filter(Boolean).pop();

            if (videoId) {
                return `https://player.vimeo.com/video/${videoId}`;
            }
        }

    } catch {
        return null;
    }

    return null;
}


/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
*/

const COMMANDS = [
    {
        group: 'PRIMARY',
        type: 'text',
        label: 'Teks',
        description: 'Tulis paragraf biasa',
        keywords: ['text', 'teks', 'paragraph', 'paragraf'],
        icon: 'T',
    },

    {
        group: 'PRIMARY',
        type: 'heading',
        label: 'Heading',
        description: 'Judul bagian utama',
        keywords: ['heading', 'judul', 'h1'],
        icon: 'H',
    },

    {
        group: 'PRIMARY',
        type: 'subheading',
        label: 'Subheading',
        description: 'Subjudul bagian',
        keywords: ['subheading', 'subjudul', 'h2', 'h3'],
        icon: 'H2',
    },

    {
        group: 'PRIMARY',
        type: 'image',
        label: 'Gambar',
        description: 'Upload atau tambahkan gambar',
        keywords: ['image', 'gambar', 'img', 'foto'],
        icon: '▧',
    },

    {
        group: 'PRIMARY',
        type: 'gallery',
        label: 'Gallery',
        description: 'Buat galeri beberapa gambar',
        keywords: ['gallery', 'galeri', 'photos', 'foto'],
        icon: '▦',
    },

    {
        group: 'PRIMARY',
        type: 'divider',
        label: 'Divider',
        description: 'Tambahkan garis pemisah',
        keywords: ['divider', 'line', 'garis', 'separator'],
        icon: '—',
    },

    {
        group: 'PRIMARY',
        type: 'quote',
        label: 'Quote',
        description: 'Tambahkan kutipan',
        keywords: ['quote', 'kutipan', 'blockquote'],
        icon: '"',
    },

    {
        group: 'PRIMARY',
        type: 'callout',
        label: 'Callout',
        description: 'Kotak informasi yang menonjol',
        keywords: ['callout', 'info', 'catatan', 'warning'],
        icon: '!',
    },

    {
        group: 'PRIMARY',
        type: 'video',
        label: 'Video',
        description: 'Tambahkan video dari URL',
        keywords: ['video', 'mp4', 'movie'],
        icon: '▶',
    },

    {
        group: 'PRIMARY',
        type: 'file',
        label: 'File / PDF',
        description: 'Upload dokumen PDF',
        keywords: ['file', 'pdf', 'dokumen', 'document'],
        icon: 'PDF',
    },

    {
        group: 'PRIMARY',
        type: 'button',
        label: 'Button',
        description: 'Tambahkan tombol tautan',
        keywords: ['button', 'tombol', 'link'],
        icon: '↗',
    },

    {
        group: 'PRIMARY',
        type: 'code',
        label: 'Code',
        description: 'Tambahkan blok kode',
        keywords: ['code', 'kode', 'programming'],
        icon: '</>',
    },

    {
        group: 'EMBED',
        type: 'youtube',
        label: 'YouTube',
        description: 'Embed video YouTube',
        keywords: ['youtube', 'video'],
        icon: '▶',
    },
    {
        group: 'EMBED',
        type: 'github',
        label: 'GitHub',
        description: 'Tampilkan repository GitHub',
        keywords: ['github', 'repository', 'repo', 'code'],
    },
    {
        group: 'EMBED',
        type: 'gitlab',
        label: 'GitLab',
        description: 'Tampilkan repository GitLab',
        keywords: ['gitlab', 'repository', 'repo', 'code'],
    },
    {
        group: 'EMBED',
        type: 'vimeo',
        label: 'Vimeo',
        description: 'Embed video Vimeo',
        keywords: ['vimeo', 'video'],
        icon: 'V',
    },

    {
        group: 'EMBED',
        type: 'embed',
        label: 'Embed',
        description: 'Masukkan URL embed',
        keywords: ['embed', 'url', 'iframe'],
        icon: '↗',
    },
];


export default function Create({ categories = [] }) {
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const slashRangeRef = useRef(null);

    const [coverPreview, setCoverPreview] = useState(null);

    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    const [keywordInput, setKeywordInput] = useState('');
    const [keywords, setKeywords] = useState([]);

    const [showBlockMenu, setShowBlockMenu] = useState(false);
    const [showSlashMenu, setShowSlashMenu] = useState(false);

    const [slashMenuPosition, setSlashMenuPosition] = useState({
        top: 0,
        left: 0,
    });

    const [slashQuery, setSlashQuery] = useState('');

    const [activeMenu, setActiveMenu] = useState('PRIMARY');

    const [selectedCommand, setSelectedCommand] = useState(0);
    const [editorModal, setEditorModal] = useState({
        open: false,
        type: null,
        title: '',
        fields: {},
    });
    const [showPreview, setShowPreview] = useState(false);
    const [submitAction, setSubmitAction] = useState(null);
    const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
    const [pendingImage, setPendingImage] = useState(null);
    const form = useForm({
        title: '',
        category_id: '',
        excerpt: '',
        content: '',
        cover_image: null,
        keywords: [],
        approval_flow: 'reviewer_director',
        submit_for_review: false,
    });
    const openEditorModal = (type, fields = {}) => {
        setEditorModal({
            open: true,
            type,
            title:
                type === 'callout'
                    ? 'Tambahkan Callout'
                    : type === 'video'
                        ? 'Tambahkan Video'
                        : type === 'button'
                            ? 'Tambahkan Button'
                            : 'Tambahkan Blok',
            fields,
        });
    };

    const closeEditorModal = () => {
        setEditorModal({
            open: false,
            type: null,
            title: '',
            fields: {},
        });
    };
    const openPreview = () => {
        const quill = quillRef.current;

        if (quill) {
            form.setData(
                'content',
                quill.root.innerHTML
            );
        }

        setShowPreview(true);
    };

    const closePreview = () => {
        setShowPreview(false);
    };
    /*
    |--------------------------------------------------------------------------
    | Keywords
    |--------------------------------------------------------------------------
    */

    const addKeyword = () => {

        const value = keywordInput.trim();

        if (!value) {
            return;
        }

        const normalized = value.toLowerCase();

        if (keywords.includes(normalized)) {
            setKeywordInput('');
            return;
        }

        if (keywords.length >= 7) {
            alert('Maksimal 7 kata kunci.');
            return;
        }

        setKeywords([
            ...keywords,
            normalized,
        ]);

        setKeywordInput('');
    };


    const removeKeyword = (keyword) => {

        setKeywords(
            keywords.filter(
                (item) => item !== keyword
            )
        );
    };


    const handleKeywordKeyDown = (event) => {

        if (event.key === 'Enter') {

            event.preventDefault();

            addKeyword();
        }
    };


    useEffect(() => {

        form.setData(
            'keywords',
            keywords
        );

    }, [keywords]);


    /*
    |--------------------------------------------------------------------------
    | Upload Image
    |--------------------------------------------------------------------------
    */

    const handleImageUpload = () => {

        const input = document.createElement('input');

        input.type = 'file';
        input.accept =
            'image/jpeg,image/png,image/webp';

        input.click();

        input.onchange = () => {

            const file =
                input.files?.[0];

            if (!file) {
                return;
            }

            if (
                file.size >
                4 * 1024 * 1024
            ) {
                alert(
                    'Ukuran gambar maksimal 4 MB.'
                );

                return;
            }

            setPendingImage(file);

            setEditorModal({
                open: true,
                type: 'image',
                title: 'Tambahkan Gambar',
                fields: {
                    alt: '',
                },
            });
        };
    };


    /*
    |--------------------------------------------------------------------------
    | Gallery Upload
    |--------------------------------------------------------------------------
    */

    const handleGalleryUpload = () => {

        const input =
            document.createElement('input');

        input.type = 'file';

        input.multiple = true;

        input.accept =
            'image/jpeg,image/png,image/webp';

        input.click();

        input.onchange = async () => {

            const files =
                Array.from(
                    input.files || []
                );

            if (!files.length) {
                return;
            }

            if (files.length > 8) {
                alert(
                    'Gallery maksimal 8 gambar.'
                );

                return;
            }

            const invalid =
                files.find(
                    (file) =>
                        file.size >
                        4 * 1024 * 1024
                );

            if (invalid) {
                alert(
                    'Setiap gambar maksimal 4 MB.'
                );

                return;
            }

            setUploadingGallery(true);

            try {

                const images = [];

                for (
                    const file of files
                ) {

                    const data =
                        new FormData();

                    data.append(
                        'image',
                        file
                    );

                    const response =
                        await fetch(
                            '/user/studies/content-image',
                            {
                                method: 'POST',

                                headers: {
                                    'X-CSRF-TOKEN':
                                        document
                                            .querySelector(
                                                'meta[name="csrf-token"]'
                                            )
                                            ?.getAttribute(
                                                'content'
                                            ),

                                    Accept:
                                        'application/json',
                                },

                                body: data,
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        !response.ok ||
                        !result.success
                    ) {
                        throw new Error(
                            result.message ||
                            'Gagal mengupload gallery.'
                        );
                    }

                    images.push({
                        url: result.url,
                        alt: file.name,
                        caption: '',
                    });
                }

                const quill =
                    quillRef.current;

                if (!quill) {
                    return;
                }

                const range =
                    quill.getSelection(true);

                removeSlash();

                quill.insertEmbed(
                    range.index,
                    'gallery',
                    {
                        images,
                    },
                    'user'
                );

                quill.insertText(
                    range.index + 1,
                    '\n',
                    'user'
                );

                quill.setSelection(
                    range.index + 2,
                    0,
                    'user'
                );

            } catch (error) {

                console.error(error);

                alert(
                    error.message ||
                    'Gallery gagal diupload.'
                );

            } finally {

                setUploadingGallery(false);
            }
        };
    };


    /*
    |--------------------------------------------------------------------------
    | PDF Upload
    |--------------------------------------------------------------------------
    */

    const handlePdfUpload = () => {

        const input =
            document.createElement('input');

        input.type = 'file';
        input.accept = 'application/pdf';

        input.click();

        input.onchange = async () => {

            const file =
                input.files?.[0];

            if (!file) {
                return;
            }

            if (
                file.type !==
                'application/pdf'
            ) {
                alert(
                    'File yang dipilih harus berupa PDF.'
                );

                return;
            }

            if (
                file.size >
                10 * 1024 * 1024
            ) {
                alert(
                    'Ukuran PDF maksimal 10 MB.'
                );

                return;
            }

            setUploadingPdf(true);

            const data =
                new FormData();

            data.append(
                'pdf',
                file
            );

            try {

                const response =
                    await fetch(
                        '/user/studies/content-pdf',
                        {
                            method: 'POST',

                            headers: {
                                'X-CSRF-TOKEN':
                                    document
                                        .querySelector(
                                            'meta[name="csrf-token"]'
                                        )
                                        ?.getAttribute(
                                            'content'
                                        ),

                                Accept:
                                    'application/json',
                            },

                            body: data,
                        }
                    );

                const result =
                    await response.json();

                if (
                    !response.ok ||
                    !result.success
                ) {
                    throw new Error(
                        result.message ||
                        'Upload PDF gagal.'
                    );
                }

                insertPdf(
                    result.url,
                    result.name
                );

            } catch (error) {

                console.error(error);

                alert(
                    error.message ||
                    'PDF gagal diupload.'
                );

            } finally {

                setUploadingPdf(false);
            }
        };
    };


    /*
    |--------------------------------------------------------------------------
    | Editor
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!editorRef.current) {
            return;
        }

        const quill =
            new Quill(
                editorRef.current,
                {
                    theme: 'snow',

                    placeholder:
                        'Mulai menulis kajian... Ketik / untuk menambahkan blok.',

                    modules: {

                        toolbar: false,

                        resize: {
                            modules: [
                                'Resize',
                                'DisplaySize',
                            ],
                        },
                    },
                }
            );
        const handlePaste = async (event) => {

            const items = event.clipboardData?.items;


            if (!items) return;

            for (const item of items) {

                if (!item.type.startsWith('image/')) {
                    continue;
                }

                const file = item.getAsFile();

                if (!file) {
                    continue;
                }

                event.preventDefault();
                const data = new FormData();

                data.append('image', file);

                try {
                    const response = await fetch(
                        '/user/studies/content-image',
                        {
                            method: 'POST',

                            headers: {
                                'X-CSRF-TOKEN':
                                    document
                                        .querySelector(
                                            'meta[name="csrf-token"]'
                                        )
                                        ?.getAttribute('content'),

                                Accept: 'application/json',
                            },

                            body: data,
                        }
                    );

                    const result = await response.json();


                    if (!response.ok || !result.success) {
                        throw new Error(
                            result.message ||
                                'Gagal mengupload gambar.'
                        );
                    }
                    insertImage(
                        result.url,
                        'Ilustrasi kajian Big Data BPS'
                    );

                } catch (error) {
                    console.error(
                        '❌ GAGAL UPLOAD:',
                        error
                    );

                    alert(
                        error.message ||
                            'Gagal mengupload gambar.'
                    );
                }
            }
        };
        quill.root.addEventListener(
            'paste',
            handlePaste,
            true
        );
        const handleTextChange = () => {

            form.setData(
                'content',
                quill.root.innerHTML
            );

            updateSlashMenu();
        };


        const handleSelectionChange = () => {

            updateSlashMenu();
        };


        quill.on(
            'text-change',
            handleTextChange
        );

        quill.on(
            'selection-change',
            handleSelectionChange
        );

        quillRef.current = quill;

        return () => {
            quill.off(
                'text-change',
                handleTextChange
            );

            quill.off(
                'selection-change',
                handleSelectionChange
            );

            quill.root.removeEventListener(
                'paste',
                handlePaste,
                true
            );

            quillRef.current = null;
        };

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Slash Menu
    |--------------------------------------------------------------------------
    */

    const updateSlashMenu = () => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        const range =
            quill.getSelection();

        if (!range) {
            return;
        }

        const [line, offset] =
            quill.getLine(
                range.index
            );

        if (!line) {
            setShowSlashMenu(false);
            return;
        }

        const lineText =
            line.domNode.textContent || '';

        const beforeCursor =
            lineText.slice(
                0,
                offset
            );

        const match =
            beforeCursor.match(
                /^\/([^\s]*)$/
            );

        if (!match) {

            setShowSlashMenu(false);

            slashRangeRef.current = null;

            return;
        }
        const query = match[1].toLowerCase();

        slashRangeRef.current = {
            index:
                range.index -
                beforeCursor.length,

            length:
                beforeCursor.length,
        };

        const bounds = quill.getBounds(range.index);

        const editorElement = editorRef.current;

        if (!editorElement) {
            return;
        }

        const shellElement =
            editorElement.closest('.study-editor-shell');

        if (!shellElement) {
            return;
        }

        const editorRect =
            editorElement.getBoundingClientRect();

        const shellRect =
            shellElement.getBoundingClientRect();

        setSlashMenuPosition({
            top:
                editorRect.top -
                shellRect.top +
                bounds.top +
                bounds.height +
                8,

            left:
                editorRect.left -
                shellRect.left +
                bounds.left,
        });

        setSlashQuery(query);
        setSelectedCommand(0);
        setShowSlashMenu(true);
    };


    const filteredCommands =
        COMMANDS.filter(
            (command) => {

                if (!slashQuery) {
                    return true;
                }

                const searchable = [
                    command.label,
                    command.description,
                    ...command.keywords,
                ]
                    .join(' ')
                    .toLowerCase();

                return searchable.includes(
                    slashQuery
                );
            }
        );


    /*
    |--------------------------------------------------------------------------
    | Insert Helpers
    |--------------------------------------------------------------------------
    */
    const removeSlash = () => {
        const quill = quillRef.current;
        const slashRange = slashRangeRef.current;

        if (!quill || !slashRange) {
            return;
        }

        quill.deleteText(
            slashRange.index,
            slashRange.length,
            'user'
        );

        quill.setSelection(
            slashRange.index,
            0,
            'user'
        );

        slashRangeRef.current = null;
    };
    const insertImage = (
        url,
        alt = ''
    ) => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        const range =
            quill.getSelection(true);

        quill.insertEmbed(
            range.index,
            'image',
            url,
            'user'
        );

        setTimeout(() => {

            const images =
                quill.root.querySelectorAll(
                    `img[src="${url}"]`
                );

            const image =
                images[images.length - 1];

            if (image) {
                image.setAttribute(
                    'alt',
                    alt
                );
            }

        }, 0);

        quill.insertText(
            range.index + 1,
            '\n',
            'user'
        );

        quill.setSelection(
            range.index + 2,
            0,
            'user'
        );
    };


    const insertPdf = (
        url,
        name
    ) => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        removeSlash();

        const range =
            quill.getSelection(true);

        quill.insertEmbed(
            range.index,
            'pdf',
            {
                url,
                name,
            },
            'user'
        );

        quill.insertText(
            range.index + 1,
            '\n',
            'user'
        );

        quill.setSelection(
            range.index + 2,
            0,
            'user'
        );
    };


    const insertDivider = () => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        const range =
            quill.getSelection(true);

        quill.insertEmbed(
            range.index,
            'divider',
            true,
            'user'
        );

        quill.insertText(
            range.index + 1,
            '\n',
            'user'
        );

        quill.setSelection(
            range.index + 2,
            0,
            'user'
        );
    };


    const insertCallout = ({
        title = 'Catatan',
        text = '',
        variant = 'info',
    } = {}) => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        removeSlash();

        const range =
            quill.getSelection(true);

        quill.insertEmbed(
            range.index,
            'callout',
            {
                title,
                text,
                variant,
            },
            'user'
        );

        quill.insertText(
            range.index + 1,
            '\n',
            'user'
        );

        quill.setSelection(
            range.index + 2,
            0,
            'user'
        );
    };


    const insertVideo = ({
        url,
        preset = 'video',
    } = {}) => {

        const quill =
            quillRef.current;

        if (!quill || !url) {
            return;
        }

        removeSlash();

        const range =
            quill.getSelection(true);

        quill.insertEmbed(
            range.index,
            'studyVideo',
            {
                url: url.trim(),
                type: preset,
            },
            'user'
        );

        quill.insertText(
            range.index + 1,
            '\n',
            'user'
        );

        quill.setSelection(
            range.index + 2,
            0,
            'user'
        );
    };

    const insertEmbed = ({
        url,
        type = 'url',
    } = {}) => {

        const quill =
            quillRef.current;

        if (!quill || !url) {
            return;
        }

        removeSlash();

        const range =
            quill.getSelection(true);

        quill.insertEmbed(
            range.index,
            'studyEmbed',
            {
                url: url.trim(),
                type,
            },
            'user'
        );

        quill.insertText(
            range.index + 1,
            '\n',
            'user'
        );

        quill.setSelection(
            range.index + 2,
            0,
            'user'
        );
    };

    const insertButton = ({
        label = 'Lihat Selengkapnya',
        url = '',
    } = {}) => {

        const quill =
            quillRef.current;

        if (!quill || !url) {
            return;
        }

        removeSlash();

        const range =
            quill.getSelection(true);

        quill.insertEmbed(
            range.index,
            'studyButton',
            {
                label,
                url: url.trim(),
            },
            'user'
        );

        quill.insertText(
            range.index + 1,
            '\n',
            'user'
        );

        quill.setSelection(
            range.index + 2,
            0,
            'user'
        );
    };


    const insertText = () => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        quill.focus();
    };


    const insertHeading = (
        level
    ) => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        const range =
            quill.getSelection(true);

        quill.formatLine(
            range.index,
            1,
            'header',
            level,
            'user'
        );

        quill.focus();
    };


    const insertQuote = () => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        const range =
            quill.getSelection(true);

        quill.formatLine(
            range.index,
            1,
            'blockquote',
            true,
            'user'
        );

        quill.focus();
    };


    const insertCode = () => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        const range =
            quill.getSelection(true);

        quill.formatLine(
            range.index,
            1,
            'code-block',
            true,
            'user'
        );

        quill.focus();
    };


    /*
    |--------------------------------------------------------------------------
    | Execute Command
    |--------------------------------------------------------------------------
    */

    const executeCommand = (
        command
    ) => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        const slashRange =
            slashRangeRef.current;

        if (slashRange) {

            quill.deleteText(
                slashRange.index,
                slashRange.length,
                'user'
            );

            quill.setSelection(
                slashRange.index,
                0,
                'user'
            );
        }

        setShowSlashMenu(false);
        setShowBlockMenu(false);
        setSlashQuery('');

        switch (command.type) {

            case 'text':
                insertText();
                break;

            case 'heading':
                insertHeading(2);
                break;

            case 'subheading':
                insertHeading(3);
                break;

            case 'image':
                removeSlash();
                handleImageUpload();
                break;

            case 'gallery':
                removeSlash();
                handleGalleryUpload();
                break;

            case 'divider':
                removeSlash();
                insertDivider();
                break;

            case 'quote':
                removeSlash();
                insertQuote();
                break;

            case 'callout':
                openEditorModal('callout', {
                    title: 'Catatan',
                    text: '',
                    variant: 'info',
                });
                break;

            case 'video':
                openEditorModal('video', {
                    preset: 'video',
                    url: '',
                });
                break;

            case 'file':
                removeSlash();
                handlePdfUpload();
                break;

            case 'button':
                openEditorModal('button', {
                    label: 'Lihat Selengkapnya',
                    url: '',
                });
                break;

            case 'code':
                removeSlash();
                insertCode();
                break;

            case 'youtube':
                openEditorModal('video', { preset: 'youtube', url: '' });
                break;

            case 'github':
                openEditorModal('embed', { preset: 'github', url: '' });
                break;

            case 'gitlab':
                openEditorModal('embed', { preset: 'gitlab', url: '' });
                break;

            case 'vimeo':
                openEditorModal('video', { preset: 'vimeo', url: '' });
                break;

            case 'embed':
                openEditorModal('embed', { preset: 'url', url: '' });
                break;

            default:
                break;
        }
    };


    /*
    |--------------------------------------------------------------------------
    | Slash Keyboard
    |--------------------------------------------------------------------------
    */

    const handleEditorKeyDown = (
        event
    ) => {

        // Saat "/" pertama kali diketik,
        // tunggu Quill memperbarui selection,
        // lalu cek kembali slash menu.
        if (event.key === '/') {
            setTimeout(() => {
                updateSlashMenu();
            }, 0);

            return;
        }

        if (!showSlashMenu) {
            return;
        }

        if (
            event.key ===
            'ArrowDown'
        ) {

            event.preventDefault();

            setSelectedCommand(
                (current) =>
                    Math.min(
                        current + 1,
                        filteredCommands.length - 1
                    )
            );

            return;
        }

        if (
            event.key ===
            'ArrowUp'
        ) {

            event.preventDefault();

            setSelectedCommand(
                (current) =>
                    Math.max(
                        current - 1,
                        0
                    )
            );

            return;
        }

        if (
            event.key ===
            'Enter'
        ) {

            if (
                filteredCommands.length
            ) {

                event.preventDefault();

                executeCommand(
                    filteredCommands[
                        selectedCommand
                    ]
                );
            }
        }

        if (
            event.key ===
            'Escape'
        ) {

            event.preventDefault();

            setShowSlashMenu(false);
        }
    };


    /*
    |--------------------------------------------------------------------------
    | Cover
    |--------------------------------------------------------------------------
    */

    const handleCoverChange = (
        event
    ) => {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        if (
            file.size >
            2 * 1024 * 1024
        ) {
            alert(
                'Ukuran cover maksimal 2 MB.'
            );

            event.target.value = '';

            return;
        }

        form.setData(
            'cover_image',
            file
        );

        const previewUrl =
            URL.createObjectURL(
                file
            );

        setCoverPreview(
            previewUrl
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (event) => {
        event.preventDefault();

        setSubmitAction('draft');

        form.post('/user/studies', {
            forceFormData: true,

            onSuccess: () => {
                setSubmitAction(null);
            },

            onError: () => {
                setSubmitAction(null);
            },
        });
    };
    const handleSubmitForReview = () => {
        setShowSubmitConfirm(true);
    };
    const confirmSubmitForReview = () => {
        setShowSubmitConfirm(false);
        setSubmitAction('review');

        const quill = quillRef.current;

        form.transform((data) => ({
            ...data,
            content: quill
                ? quill.root.innerHTML
                : data.content,
            keywords,
            submit_for_review: true,
        }));

        form.post('/user/studies', {
            forceFormData: true,

            onSuccess: () => {
                setSubmitAction(null);
            },

            onError: () => {
                setSubmitAction(null);
            },
        });
    };
    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <DashboardLayout>

            <div className="study-create-page">

                <div className="study-create-header">

                    <div>

                        <div className="dashboard-eyebrow">
                            NEW STUDY
                        </div>

                        <h1>
                            Ajukan Kajian
                        </h1>

                        <p>
                            Buat kajian baru untuk
                            dipublikasikan melalui portal
                            Kajian Big Data BPS.
                        </p>

                    </div>

                    <a
                        href="/user/dashboard"
                        className="study-create-back"
                    >
                        ← Kembali
                    </a>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="study-create-form"
                >

                    {/* INFORMASI */}

                    <div className="form-section">

                        <div className="form-section__heading">

                            <span>01</span>

                            <div>
                                <h2>
                                    Informasi Kajian
                                </h2>

                                <p>
                                    Tentukan judul,
                                    kategori, dan kata kunci.
                                </p>
                            </div>

                        </div>


                        <div className="form-field">

                            <label>
                                Judul Kajian
                            </label>

                            <input
                                type="text"
                                value={form.data.title}
                                onChange={(event) =>
                                    form.setData(
                                        'title',
                                        event.target.value
                                    )
                                }
                                placeholder="Masukkan judul kajian..."
                            />

                            {form.errors.title && (
                                <div className="form-error">
                                    {form.errors.title}
                                </div>
                            )}

                        </div>


                        <div className="form-field">

                            <label>
                                Kategori
                            </label>

                            <select
                                value={form.data.category_id}
                                onChange={(event) =>
                                    form.setData(
                                        'category_id',
                                        event.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Pilih kategori
                                </option>

                                {categories.map(
                                    (category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    )
                                )}

                            </select>

                            {form.errors.category_id && (
                                <div className="form-error">
                                    {form.errors.category_id}
                                </div>
                            )}
                        </div>
                        <div className="form-field">
                            <label>
                                Alur Persetujuan
                            </label>

                            <div className="approval-flow-options">
                                <label className="approval-flow-option">
                                    <input
                                        type="radio"
                                        name="approval_flow"
                                        value="reviewer"
                                        checked={form.data.approval_flow === 'reviewer'}
                                        onChange={(event) =>
                                            form.setData(
                                                'approval_flow',
                                                event.target.value
                                            )
                                        }
                                    />

                                    <div>
                                        <strong>Reviewer saja</strong>
                                        <p>
                                            Setelah disetujui Reviewer, kajian
                                            langsung dipublikasikan.
                                        </p>
                                    </div>
                                </label>

                                <label className="approval-flow-option">
                                    <input
                                        type="radio"
                                        name="approval_flow"
                                        value="reviewer_director"
                                        checked={
                                            form.data.approval_flow ===
                                            'reviewer_director'
                                        }
                                        onChange={(event) =>
                                            form.setData(
                                                'approval_flow',
                                                event.target.value
                                            )
                                        }
                                    />

                                    <div>
                                        <strong>Reviewer + Direktur</strong>
                                        <p>
                                            Setelah disetujui Reviewer, kajian
                                            diteruskan ke Direktur untuk persetujuan
                                            akhir.
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {form.errors.approval_flow && (
                                <div className="form-error">
                                    {form.errors.approval_flow}
                                </div>
                            )}
                        </div>

                        <div className="form-field">

                            <label>
                                Kata Kunci
                            </label>

                            <div className="keyword-input-wrapper">

                                <div className="keyword-tags">

                                    {keywords.map(
                                        (keyword) => (
                                            <span
                                                key={keyword}
                                                className="keyword-tag"
                                            >
                                                <span>
                                                    {keyword}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeKeyword(
                                                            keyword
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )
                                    )}

                                </div>

                                <input
                                    type="text"
                                    value={keywordInput}
                                    onChange={(event) =>
                                        setKeywordInput(
                                            event.target.value
                                        )
                                    }
                                    onKeyDown={
                                        handleKeywordKeyDown
                                    }
                                    placeholder={
                                        keywords.length >= 7
                                            ? 'Maksimal 7 kata kunci'
                                            : 'Ketik kata kunci lalu tekan Enter...'
                                    }
                                    disabled={
                                        keywords.length >= 7
                                    }
                                />

                            </div>

                            <small>
                                Tambahkan 3–7 kata kunci
                                yang paling relevan
                                dengan kajian.
                            </small>

                            {form.errors.keywords && (
                                <div className="form-error">
                                    {form.errors.keywords}
                                </div>
                            )}

                        </div>

                    </div>

                    {/* RINGKASAN */}

                    <div className="form-section">

                        <div className="form-section__heading">

                            <span>02</span>

                            <div>

                                <h2>
                                    Ringkasan
                                </h2>

                                <p>
                                    Tambahkan cover dan
                                    ringkasan singkat.
                                </p>

                            </div>

                        </div>

                        <div className="form-field">

                            <label>
                                Cover Kajian
                            </label>

                            {coverPreview && (
                                <div className="cover-preview">
                                    <img
                                        src={coverPreview}
                                        alt={'Preview cover'}
                                    />
                                </div>
                            )}

                            <div className="admin-image-upload">

                                <input
                                    id="study-cover"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="admin-image-upload__input"
                                    onChange={handleCoverChange}
                                />

                                <label
                                    htmlFor="study-cover"
                                    className="admin-image-upload__box"
                                >
                                    <div className="admin-image-upload__icon">
                                        ↑
                                    </div>

                                    <div className="admin-image-upload__text">
                                        <strong>
                                            Pilih cover kajian
                                        </strong>

                                        <span>
                                            JPG, PNG, atau WebP
                                        </span>
                                    </div>

                                    <div className="admin-image-upload__button">
                                        Pilih Gambar
                                    </div>
                                </label>

                            </div>

                            <small className="admin-form-help">
                                Maksimal 2 MB · Disarankan menggunakan gambar landscape.
                            </small>

                            {form.errors.cover_image && (
                                <div className="form-error">
                                    {form.errors.cover_image}
                                </div>
                            )}

                        </div>


                        <div className="form-field">

                            <label>
                                Ringkasan Kajian
                            </label>

                            <textarea
                                rows="5"
                                maxLength="500"
                                value={form.data.excerpt}
                                onChange={(event) =>
                                    form.setData(
                                        'excerpt',
                                        event.target.value
                                    )
                                }
                                placeholder={'Jelaskan secara singkat isi kajian...'}
                            />

                            <small>
                                Maksimal 500 karakter.
                            </small>

                            {form.errors.excerpt && (
                                <div className="form-error">
                                    {form.errors.excerpt}
                                </div>
                            )}

                        </div>

                    </div>


                    {/* EDITOR */}

                    <div className="form-section study-editor-section">

                        <div className="form-section__heading">

                            <span>03</span>

                            <div>

                                <h2>
                                    Isi Kajian
                                </h2>

                                <p>
                                    Tulis kajian seperti
                                    dokumen profesional.
                                    Ketik <strong>/</strong>
                                    untuk menambahkan blok.
                                </p>

                            </div>

                        </div>


                        <div className="form-field">

                            <label>
                                Isi Kajian
                            </label>


                            <div
                                className="study-editor-shell"
                                onKeyDown={
                                    handleEditorKeyDown
                                }
                            >

                                <div className="study-editor-toolbar">

                                    <button
                                        type="button"
                                        className="study-add-block"
                                        onClick={() => {
                                            setShowBlockMenu(
                                                (value) =>
                                                    !value
                                            );

                                            setShowSlashMenu(
                                                false
                                            );
                                        }}
                                    >
                                        <span>+</span>
                                        Tambahkan blok
                                    </button>


                                    <div className="study-editor-hint">
                                        Ketik <kbd>/</kbd> untuk command
                                    </div>

                                </div>


                                {showBlockMenu && (

                                    <div className="study-command-menu study-command-menu--button">

                                        <div className="study-command-menu__tabs">

                                            <button
                                                type="button"
                                                className={
                                                    activeMenu === 'PRIMARY'
                                                        ? 'is-active'
                                                        : ''
                                                }
                                                onClick={() =>
                                                    setActiveMenu(
                                                        'PRIMARY'
                                                    )
                                                }
                                            >
                                                PRIMARY
                                            </button>

                                            <button
                                                type="button"
                                                className={
                                                    activeMenu === 'EMBED'
                                                        ? 'is-active'
                                                        : ''
                                                }
                                                onClick={() =>
                                                    setActiveMenu(
                                                        'EMBED'
                                                    )
                                                }
                                            >
                                                EMBED
                                            </button>

                                        </div>


                                        <div className="study-command-menu__items">

                                            {COMMANDS
                                                .filter(
                                                    (command) =>
                                                        command.group ===
                                                        activeMenu
                                                )
                                                .map(
                                                    (command) => (
                                                        <button
                                                            type="button"
                                                            key={
                                                                command.type
                                                            }
                                                            className="study-command-item"
                                                            onClick={() =>
                                                                executeCommand(
                                                                    command
                                                                )
                                                            }
                                                        >

                                                            <span className="study-command-item__icon">
                                                                {
                                                                    command.icon
                                                                }
                                                            </span>

                                                            <span className="study-command-item__text">

                                                                <strong>
                                                                    {
                                                                        command.label
                                                                    }
                                                                </strong>

                                                                <small>
                                                                    {
                                                                        command.description
                                                                    }
                                                                </small>

                                                            </span>

                                                        </button>
                                                    )
                                                )}

                                        </div>

                                    </div>

                                )}

                                {showSlashMenu && (

                                    <div
                                        className="study-command-menu study-command-menu--slash"
                                        style={{
                                            top: `${slashMenuPosition.top}px`,
                                            left: `${slashMenuPosition.left}px`,
                                        }}
                                    >

                                        <div className="study-command-menu__label">
                                            {slashQuery
                                                ? `COMMAND /${slashQuery}`
                                                : 'COMMAND'}
                                        </div>

                                        <div className="study-command-menu__items">

                                            {filteredCommands.length === 0 ? (

                                                <div className="study-command-empty">
                                                    Tidak ada block yang cocok.
                                                </div>

                                            ) : (

                                                filteredCommands.map(
                                                    (
                                                        command,
                                                        index
                                                    ) => (

                                                        <button
                                                            type="button"
                                                            key={
                                                                command.type
                                                            }
                                                            className={
                                                                `study-command-item ${
                                                                    index ===
                                                                    selectedCommand
                                                                        ? 'is-selected'
                                                                        : ''
                                                                }`
                                                            }
                                                            onMouseDown={(
                                                                event
                                                            ) => {
                                                                event.preventDefault();

                                                                executeCommand(
                                                                    command
                                                                );
                                                            }}
                                                        >

                                                            <span className="study-command-item__icon">
                                                                {
                                                                    command.icon
                                                                }
                                                            </span>

                                                            <span className="study-command-item__text">

                                                                <strong>
                                                                    {
                                                                        command.label
                                                                    }
                                                                </strong>

                                                                <small>
                                                                    {
                                                                        command.description
                                                                    }
                                                                </small>

                                                            </span>

                                                        </button>

                                                    )
                                                )
                                            )}

                                        </div>

                                    </div>

                                )}


                                <div
                                    ref={editorRef}
                                    className="study-editor"
                                />

                            </div>


                            {(uploadingImage ||
                                uploadingPdf ||
                                uploadingGallery) && (

                                <div className="editor-upload-status">

                                    {uploadingImage &&
                                        'Mengupload gambar...'}

                                    {uploadingPdf &&
                                        'Mengupload PDF...'}

                                    {uploadingGallery &&
                                        'Mengupload gallery...'}

                                </div>

                            )}


                            {form.errors.content && (
                                <div className="form-error">
                                    {form.errors.content}
                                </div>
                            )}

                        </div>

                    </div>


                    {/* ACTION */}

                    <div className="study-create-actions">

                        <a
                            href="/user/dashboard"
                            className="study-secondary-button"
                        >
                            Batal
                        </a>

                        <button
                            type="button"
                            className="study-secondary-button"
                            onClick={openPreview}
                            disabled={
                                form.processing ||
                                uploadingImage ||
                                uploadingPdf ||
                                uploadingGallery
                            }
                        >
                            Preview
                        </button>

                        <button
                            type="submit"
                            className="dashboard-primary-button"
                            disabled={
                                form.processing ||
                                uploadingImage ||
                                uploadingPdf ||
                                uploadingGallery
                            }
                        >
                            {submitAction === 'draft'
                                ? 'Menyimpan...'
                                : 'Simpan sebagai Draft'}
                        </button>

                        <button
                            type="button"
                            className="dashboard-primary-button"
                            onClick={handleSubmitForReview}
                            disabled={
                                form.processing ||
                                uploadingImage ||
                                uploadingPdf ||
                                uploadingGallery
                            }
                        >
                            {submitAction === 'review'
                                ? 'Mengajukan...'
                                : 'Ajukan Kajian'}
                        </button>

                    </div>

                </form>


                {/* EDITOR MODAL */}

                {editorModal.open && (

                    <div
                        className="study-editor-modal__overlay"
                        onMouseDown={(event) => {
                            if (
                                event.target === event.currentTarget
                            ) {
                                closeEditorModal();
                            }
                        }}
                    >

                        <div
                            className="study-editor-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="study-editor-modal-title"
                        >

                            <div className="study-editor-modal__header">

                                <div>
                                    <div className="dashboard-eyebrow">
                                        EDITOR
                                    </div>

                                    <h2 id="study-editor-modal-title">
                                        {editorModal.title}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    className="study-editor-modal__close"
                                    onClick={closeEditorModal}
                                    aria-label={'Tutup'}
                                >
                                    ×
                                </button>

                            </div>

                            <div className="study-editor-modal__body">

                                {editorModal.type === 'callout' && (
                                    <>
                                        <div className="study-editor-modal__field">

                                            <label>
                                                Judul Callout
                                            </label>

                                            <input
                                                type="text"
                                                value={editorModal.fields.title ?? ''}
                                                onChange={(event) =>
                                                    setEditorModal((current) => ({
                                                        ...current,
                                                        fields: {
                                                            ...current.fields,
                                                            title: event.target.value,
                                                        },
                                                    }))
                                                }
                                                placeholder={'Catatan'}
                                                autoFocus
                                            />

                                        </div>


                                        <div className="study-editor-modal__field">

                                            <label>
                                                Isi Callout
                                            </label>

                                            <textarea
                                                rows="5"
                                                value={editorModal.fields.text ?? ''}
                                                onChange={(event) =>
                                                    setEditorModal((current) => ({
                                                        ...current,
                                                        fields: {
                                                            ...current.fields,
                                                            text: event.target.value,
                                                        },
                                                    }))
                                                }
                                                placeholder={'Tulis informasi yang ingin ditonjolkan...'}
                                            />

                                        </div>


                                        <div className="study-editor-modal__field">

                                            <label>
                                                Tipe
                                            </label>

                                            <select
                                                value={editorModal.fields.variant ?? 'info'}
                                                onChange={(event) =>
                                                    setEditorModal((current) => ({
                                                        ...current,
                                                        fields: {
                                                            ...current.fields,
                                                            variant: event.target.value,
                                                        },
                                                    }))
                                                }
                                            >
                                                <option value="info">
                                                    Informasi
                                                </option>

                                                <option value="warning">
                                                    Peringatan
                                                </option>

                                                <option value="success">
                                                    Sukses
                                                </option>

                                                <option value="important">
                                                    Penting
                                                </option>
                                            </select>

                                        </div>
                                    </>
                                )}


                                {editorModal.type === 'video' && (
                                    <div className="study-editor-modal__field">

                                        <label>
                                            {editorModal.fields.preset === 'youtube'
                                                ? 'URL YouTube'
                                                : editorModal.fields.preset === 'vimeo'
                                                    ? 'URL Vimeo'
                                                    : editorModal.fields.preset === 'embed'
                                                        ? 'URL Embed'
                                                        : 'URL Video'}
                                        </label>

                                        <input
                                            type="url"
                                            value={editorModal.fields.url ?? ''}
                                            onChange={(event) =>
                                                setEditorModal((current) => ({
                                                    ...current,
                                                    fields: {
                                                        ...current.fields,
                                                        url: event.target.value,
                                                    },
                                                }))
                                            }
                                            placeholder="https://..."
                                            autoFocus
                                        />

                                        <small>
                                            Masukkan URL video yang ingin ditampilkan.
                                        </small>

                                    </div>
                                )}

                                {editorModal.type === 'embed' && (
                                    <div className="study-editor-modal__field">
                                        <label>
                                            {editorModal.fields.preset === 'github'
                                                ? 'URL Repository GitHub'
                                                : editorModal.fields.preset === 'gitlab'
                                                    ? 'URL Repository GitLab'
                                                    : 'URL Embed'}
                                        </label>

                                        <input
                                            type="url"
                                            value={editorModal.fields.url ?? ''}
                                            onChange={(event) =>
                                                setEditorModal((current) => ({
                                                    ...current,
                                                    fields: {
                                                        ...current.fields,
                                                        url: event.target.value,
                                                    },
                                                }))
                                            }
                                            placeholder="https://..."
                                            autoFocus
                                        />

                                        <small>
                                            {editorModal.fields.preset === 'github'
                                                ? 'Masukkan URL repository GitHub.'
                                                : editorModal.fields.preset === 'gitlab'
                                                    ? 'Masukkan URL repository GitLab.'
                                                    : 'Masukkan URL yang ingin di-embed ke dalam kajian.'}
                                        </small>

                                    </div>
                                )}

                                {editorModal.type === 'button' && (
                                    <>
                                        <div className="study-editor-modal__field">

                                            <label>
                                                Teks Tombol
                                            </label>

                                            <input
                                                type="text"
                                                value={editorModal.fields.label ?? ''}
                                                onChange={(event) =>
                                                    setEditorModal((current) => ({
                                                        ...current,
                                                        fields: {
                                                            ...current.fields,
                                                            label: event.target.value,
                                                        },
                                                    }))
                                                }
                                                placeholder={'Lihat Selengkapnya'}
                                                autoFocus
                                            />

                                        </div>


                                        <div className="study-editor-modal__field">

                                            <label>
                                                URL Tujuan
                                            </label>

                                            <input
                                                type="url"
                                                value={editorModal.fields.url ?? ''}
                                                onChange={(event) =>
                                                    setEditorModal((current) => ({
                                                        ...current,
                                                        fields: {
                                                            ...current.fields,
                                                            url: event.target.value,
                                                        },
                                                    }))
                                                }
                                                placeholder="https://..."
                                            />

                                        </div>
                                    </>
                                )}

                                {editorModal.type === 'image' && (
                                    <div className="study-editor-modal__field">

                                        <label>
                                            Deskripsi Gambar
                                        </label>

                                        <input
                                            type="text"
                                            value={editorModal.fields.alt ?? ''}
                                            onChange={(event) =>
                                                setEditorModal((current) => ({
                                                    ...current,
                                                    fields: {
                                                        ...current.fields,
                                                        alt: event.target.value,
                                                    },
                                                }))
                                            }
                                            placeholder={'Jelaskan isi gambar...'}
                                            autoFocus
                                        />

                                        <small>
                                            Digunakan untuk aksesibilitas dan SEO.
                                        </small>

                                    </div>
                                )}

                                {!['callout', 'video', 'button', 'image'].includes(
                                    editorModal.type
                                ) && (
                                    <p>
                                        Formulir blok belum tersedia.
                                    </p>
                                )}

                            </div>


                            <div className="study-editor-modal__footer">

                                <button
                                    type="button"
                                    className="study-secondary-button"
                                    onClick={closeEditorModal}
                                >
                                    Batal
                                </button>

                                <button
                                    type="button"
                                    className="dashboard-primary-button"
                                    onClick={() => {

                                        if (editorModal.type === 'callout') {

                                            insertCallout({
                                                title: editorModal.fields.title,
                                                text: editorModal.fields.text,
                                                variant: editorModal.fields.variant,
                                            });

                                            closeEditorModal();

                                            return;
                                        }


                                        if (editorModal.type === 'video') {

                                            if (!editorModal.fields.url?.trim()) {
                                                return;
                                            }

                                            insertVideo({
                                                url: editorModal.fields.url,
                                                preset:
                                                    editorModal.fields.preset || 'video',
                                            });

                                            closeEditorModal();

                                            return;
                                        }

                                        if (editorModal.type === 'embed') {

                                            if (!editorModal.fields.url?.trim()) {
                                                return;
                                            }

                                            insertEmbed({
                                                url: editorModal.fields.url,
                                                type: editorModal.fields.preset || 'url',
                                            });

                                            closeEditorModal();

                                            return;
                                        }                                  

                                        if (editorModal.type === 'button') {

                                            if (!editorModal.fields.url?.trim()) {
                                                return;
                                            }

                                            insertButton({
                                                label:
                                                    editorModal.fields.label ||
                                                    'Lihat Selengkapnya',

                                                url: editorModal.fields.url,
                                            });

                                            closeEditorModal();

                                            return;
                                        }


                                        /* IMAGE */

                                        if (editorModal.type === 'image') {

                                            const file = pendingImage;

                                            if (!file) {
                                                closeEditorModal();
                                                return;
                                            }

                                            setUploadingImage(true);

                                            const data = new FormData();

                                            data.append(
                                                'image',
                                                file
                                            );

                                            fetch(
                                                '/user/studies/content-image',
                                                {
                                                    method: 'POST',

                                                    headers: {
                                                        'X-CSRF-TOKEN':
                                                            document
                                                                .querySelector(
                                                                    'meta[name="csrf-token"]'
                                                                )
                                                                ?.getAttribute(
                                                                    'content'
                                                                ),

                                                        Accept:
                                                            'application/json',
                                                    },

                                                    body: data,
                                                }
                                            )
                                                .then(async (response) => {

                                                    const result =
                                                        await response.json();

                                                    if (
                                                        !response.ok ||
                                                        !result.success
                                                    ) {
                                                        throw new Error(
                                                            result.message ||
                                                            'Gagal mengupload gambar.'
                                                        );
                                                    }

                                                    insertImage(
                                                        result.url,
                                                        editorModal.fields.alt?.trim() ||
                                                            'Ilustrasi kajian Big Data BPS'
                                                    );

                                                    setPendingImage(null);

                                                    closeEditorModal();
                                                })
                                                .catch((error) => {

                                                    console.error(error);

                                                    alert(
                                                        error.message ||
                                                        'Gagal mengupload gambar.'
                                                    );
                                                })
                                                .finally(() => {

                                                    setUploadingImage(false);
                                                });

                                            return;
                                        }

                                    }}
                                >
                                    Tambahkan
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                {showPreview && (
                    <div
                        className="study-public-preview-overlay"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                closePreview();
                            }
                        }}
                    >
                        <div className="study-public-preview">

                            {/* CLOSE */}
                            <button
                                type="button"
                                className="study-public-preview__close"
                                onClick={closePreview}
                                aria-label={'Tutup preview'}
                            >
                                ×
                            </button>

                            {/* HERO */}
                            <section
                                className="study-public-preview__hero"
                                style={
                                    coverPreview
                                        ? {
                                            backgroundImage: `
                                                linear-gradient(
                                                    rgba(5, 25, 48, 0.78),
                                                    rgba(5, 45, 80, 0.88)
                                                ),
                                                url("${coverPreview}")
                                            `,
                                        }
                                        : undefined
                                }
                            >
                                <div className="study-public-preview__hero-pattern" />

                                <div className="study-public-preview__hero-inner">

                                    <div className="study-public-preview__back">
                                        ← Kembali ke Kajian
                                    </div>

                                    <div className="study-public-preview__category">
                                        {categories.find(
                                            (category) =>
                                                String(category.id) ===
                                                String(form.data.category_id)
                                        )?.name || 'Kategori'}
                                    </div>

                                    <h1>
                                        {form.data.title ||
                                            'Judul Kajian'}
                                    </h1>

                                    <div className="study-public-preview__meta">
                                        <span>{'Preview'}</span>
                                        <span>•</span>
                                        <span>
                                            Kajian Big Data BPS
                                        </span>
                                    </div>

                                    <div className="study-public-preview__actions">
                                        <button
                                            type="button"
                                            className="study-public-preview__like"
                                        >
                                            ♥ &nbsp; Suka
                                        </button>

                                        <button
                                            type="button"
                                            className="study-public-preview__share"
                                        >
                                            ↗ &nbsp; Bagikan
                                        </button>
                                    </div>

                                </div>
                            </section>


                            {/* CONTENT */}
                            <main className="study-public-preview__main">

                                {/* EXCERPT */}
                                {form.data.excerpt && (
                                    <div className="study-public-preview__excerpt">
                                        {form.data.excerpt}
                                    </div>
                                )}

                                {/* DIVIDER */}
                                <div className="study-public-preview__divider" />

                                {/* KEYWORDS */}
                                {keywords.length > 0 && (
                                    <div className="study-public-preview__keywords">

                                        <strong>
                                            Kata Kunci
                                        </strong>

                                        <div className="study-public-preview__keyword-list">
                                            {keywords.map(
                                                (keyword) => (
                                                    <span
                                                        key={keyword}
                                                        className="study-public-preview__keyword"
                                                    >
                                                        {keyword}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                    </div>
                                )}

                                {/* ISI KAJIAN */}
                                <iframe
                                    className="study-public-preview__content"
                                    title="Pratinjau isi kajian"
                                    sandbox=""
                                    srcDoc={
                                        form.data.content ||
                                        '<p>Belum ada isi kajian.</p>'
                                    }
                                />

                            </main>

                        </div>
                    </div>
                )}

            </div>
            {showSubmitConfirm && (
                <div
                    className="study-confirm-overlay"
                    onClick={() => setShowSubmitConfirm(false)}
                >
                    <div
                        className="study-confirm-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="study-confirm-header">

                            <div>
                                <div className="study-confirm-label">
                                    KONFIRMASI
                                </div>

                                <h2>
                                    Ajukan Kajian?
                                </h2>
                            </div>

                            <button
                                type="button"
                                className="study-confirm-close"
                                onClick={() =>
                                    setShowSubmitConfirm(false)
                                }
                                aria-label={'Tutup'}
                            >
                                ×
                            </button>

                        </div>

                        <div className="study-confirm-body">
                            Kajian akan diajukan untuk proses review.
                        </div>

                        <div className="study-confirm-actions">

                            <button
                                type="button"
                                className="study-confirm-cancel"
                                onClick={() =>
                                    setShowSubmitConfirm(false)
                                }
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                className="study-confirm-submit"
                                onClick={confirmSubmitForReview}
                            >
                                Ya, Ajukan
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
