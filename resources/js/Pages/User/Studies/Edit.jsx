import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Quill from 'quill';
import QuillResize from 'quill-resize-module';
import 'quill/dist/quill.snow.css';
import 'quill-resize-module/dist/resize.css';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import { useFeedback } from '../../../Components/FeedbackProvider';

const escapeHtml = (value = '') =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

const getCalloutIcon = (variant = 'info') => {
    const icons = {
        info: 'ⓘ',
        success: '✓',
        warning: '⚠',
        danger: '!',
        tip: '💡',
    };

    return icons[variant] || icons.info;
};

const getVideoEmbedUrl = (url = '') => {
    const value = String(url).trim();
    if (!value) return '';

    try {
        const parsed = new URL(value);

        // YouTube
        if (
            parsed.hostname === 'youtube.com' ||
            parsed.hostname === 'www.youtube.com' ||
            parsed.hostname === 'm.youtube.com'
        ) {
            const videoId = parsed.searchParams.get('v');
            return videoId
                ? `https://www.youtube.com/embed/${videoId}`
                : value;
        }

        if (parsed.hostname === 'youtu.be') {
            const videoId = parsed.pathname.replace(/^\/+/, '').split('/')[0];
            return videoId
                ? `https://www.youtube.com/embed/${videoId}`
                : value;
        }

        // Vimeo
        if (
            parsed.hostname === 'vimeo.com' ||
            parsed.hostname === 'www.vimeo.com'
        ) {
            const match = parsed.pathname.match(/\/(\d+)/);
            return match?.[1]
                ? `https://player.vimeo.com/video/${match[1]}`
                : value;
        }

        return value;
    } catch {
        return value;
    }
};

const BlockEmbed = Quill.import('blots/block/embed');
const Delta = Quill.import('delta');

class PdfBlot extends BlockEmbed {
    static blotName = 'pdf';
    static tagName = 'div';
    static className = 'study-pdf-block';

    static create(value) {
        const node = super.create();

        node.setAttribute('contenteditable', 'false');
        node.dataset.url = value.url;
        node.dataset.name = value.name || 'Dokumen PDF';

        const header = document.createElement('div');
        header.className = 'study-pdf-header';

        const info = document.createElement('div');
        info.className = 'study-pdf-info';

        const icon = document.createElement('div');
        icon.className = 'study-pdf-icon';
        icon.textContent = 'PDF';

        const title = document.createElement('div');
        title.className = 'study-pdf-title';

        const strong = document.createElement('strong');
        strong.textContent = value.name || 'Dokumen PDF';

        const type = document.createElement('span');
        type.textContent = 'Dokumen PDF';

        title.appendChild(strong);
        title.appendChild(type);

        info.appendChild(icon);
        info.appendChild(title);

        const openLink = document.createElement('a');
        openLink.href = value.url;
        openLink.target = '_blank';
        openLink.rel = 'noopener noreferrer';
        openLink.className = 'study-pdf-open';
        openLink.textContent = 'Buka penuh';

        header.appendChild(info);
        header.appendChild(openLink);

        const viewer = document.createElement('div');
        viewer.className = 'study-pdf-viewer';

        const iframe = document.createElement('iframe');
        iframe.src =
            `${value.url}#toolbar=1&navpanes=0&view=FitH`;
        iframe.title = value.name || 'Dokumen PDF';
        iframe.loading = 'lazy';

        viewer.appendChild(iframe);

        node.appendChild(header);
        node.appendChild(viewer);

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

        node.setAttribute(
            'contenteditable',
            'false'
        );

        const url = value.url || '';
        const embedUrl = getVideoEmbedUrl(url);

        node.dataset.url = url;
        node.dataset.type =
            value.type || 'video';

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

        node.setAttribute(
            'contenteditable',
            'false'
        );

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
                    title="${escapeHtml('Embed kajian')}"
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

        node.setAttribute(
            'contenteditable',
            'false'
        );

        node.dataset.variant =
            value.variant || 'info';

        node.dataset.title =
            value.title || 'Catatan';

        node.dataset.text =
            value.text || '';

        node.innerHTML = `
            <div class="study-callout study-callout--${value.variant || 'info'}">

                <div class="study-callout__icon">
                    ${getCalloutIcon(value.variant)}
                </div>

                <div class="study-callout__content">

                    <strong>
                        ${escapeHtml(
                            value.title ||
                            'Catatan'
                        )}
                    </strong>

                    <p>
                        ${escapeHtml(
                            value.text || ''
                        )}
                    </p>

                </div>

            </div>
        `;

        return node;
    }

    static value(node) {
        return {
            title:
                node.dataset.title ||
                node.querySelector('.study-callout__content strong')?.textContent ||
                'Catatan',

            variant:
                node.dataset.variant ||
                'info',

            text:
                node.dataset.text ||
                node.querySelector('.study-callout__content p')?.textContent ||
                '',
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

        node.setAttribute(
            'contenteditable',
            'false'
        );

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

        node.setAttribute(
            'contenteditable',
            'false'
        );

        node.dataset.url =
            value.url || '';

        node.dataset.label =
            value.label ||
            'Lihat Selengkapnya';

        node.innerHTML = `
            <a
                href="${value.url || '#'}"
                target="_blank"
                rel="noopener noreferrer"
                class="study-content-button"
            >
                ${escapeHtml(
                    value.label ||
                    'Lihat Selengkapnya'
                )}
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

        node.setAttribute(
            'contenteditable',
            'false'
        );

        const images =
            Array.isArray(value.images)
                ? value.images
                : [];

        node.dataset.images =
            JSON.stringify(images);

        node.innerHTML = `
            <div class="study-gallery">
                ${images.map((image) => `
                    <figure class="study-gallery__item">

                        <img
                            src="${image.url}"
                            alt="${escapeHtml(
                                image.alt ||
                                'Gambar kajian'
                            )}"
                        />

                        ${
                            image.caption
                                ? `<figcaption>${escapeHtml(
                                    image.caption
                                )}</figcaption>`
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
                    node.dataset.images ||
                    '[]'
                ),
            };

        } catch {

            return {
                images: [],
            };
        }
    }
}

Quill.register(PdfBlot);
Quill.register(VideoBlot);
Quill.register(CalloutBlot);
Quill.register(DividerBlot);
Quill.register(ButtonBlot);
Quill.register(GalleryBlot);

Quill.register(
    'modules/resize',
    QuillResize
);

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
        icon: 'GH',
    },

    {
        group: 'EMBED',
        type: 'gitlab',
        label: 'GitLab',
        description: 'Tampilkan repository GitLab',
        keywords: ['gitlab', 'repository', 'repo', 'code'],
        icon: 'GL',
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

export default function Edit({ study, categories }) {
    const {
        showToast,
        openConfirm,
    } = useFeedback();
    const [editorModal, setEditorModal] = useState({
        open: false,
        type: null,
        title: '',
        fields: {},
    });
    const [showPreview, setShowPreview] = useState(false);
    const [pendingImage, setPendingImage] = useState(null);

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

    const slashRangeRef = useRef(null);
    const insertRangeRef = useRef(null);

    const [showBlockMenu, setShowBlockMenu] =
        useState(false);

    const [showSlashMenu, setShowSlashMenu] =
        useState(false);

    const [slashQuery, setSlashQuery] =
        useState('');

    const [slashMenuPosition, setSlashMenuPosition] = useState({
        top: 0,
        left: 0,
    });

    const [activeMenu, setActiveMenu] =
        useState('PRIMARY');

    const [selectedCommand, setSelectedCommand] =
        useState(0);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [coverPreview, setCoverPreview] = useState(
        study.cover_image
            ? `/storage/${study.cover_image}`
            : null
    );

    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const [keywordInput, setKeywordInput] = useState('');

    const [keywords, setKeywords] = useState(
        study.keywords?.map(
            (keyword) => keyword.name
        ) ?? []
    );

    const form = useForm({
        title: study.title ?? '',
        category_id: study.category_id ?? '',
        excerpt: study.excerpt ?? '',
        content: study.content ?? '',
        cover_image: null,
        keywords: study.keywords?.map(
            (keyword) => keyword.name
        ) ?? [],
        approval_flow: study.approval_flow ?? 'reviewer_director',
    });
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
            showToast(
                'Maksimal 7 kata kunci.',
                'warning'
            );
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
        form.setData('keywords', keywords);
    }, [keywords]);
    const latestReview = study.reviews?.[0] ?? null;

    const uploadImage = async (file, altText = '') => {

        if (!file) {
            return;
        }

        if (file.size > 4 * 1024 * 1024) {

            showToast(
                'Ukuran gambar maksimal 4 MB.',
                'error'
            );

            return;
        }

        setUploadingImage(true);

        const data = new FormData();

        data.append(
            'image',
            file
        );

        try {

            const response = await fetch(
                `/user/studies/${study.id}/content-image`,
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
                    'Gagal mengupload gambar.'
                );
            }

            const quill =
                quillRef.current;

            if (!quill) {
                return;
            }

            const range = getEditorRange();

            if (!range) {
                return;
            }

            if (range.length > 0) {
                quill.deleteText(
                    range.index,
                    range.length,
                    'user'
                );
            }

            quill.insertEmbed(
                range.index,
                'image',
                result.url,
                'user'
            );

            slashRangeRef.current = null;

            setTimeout(() => {

                const images =
                    quill.root.querySelectorAll(
                        `img[src="${result.url}"]`
                    );

                const image =
                    images[images.length - 1];

                if (image) {

                    image.setAttribute(
                        'alt',
                        altText.trim() ||
                            'Ilustrasi kajian Big Data BPS'
                    );
                }

            }, 0);

            quill.setSelection(
                range.index + 1,
                0,
                'user'
            );

        } catch (error) {

            console.error(error);

            showToast(
                error.message ||
                    'Gambar gagal diupload.',
                'error'
            );

        } finally {

            setUploadingImage(false);
        }
    };


    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg,image/png,image/webp';
        input.click();

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            if (file.size > 4 * 1024 * 1024) {
                showToast('Ukuran gambar maksimal 4 MB.', 'error');
                return;
            }

            setPendingImage(file);
            openEditorModal('image', {
                alt: file.name
                    .replace(/\.[^/.]+$/, '')
                    .replace(/[-_]/g, ' '),
            });
        };
    };

    const handleGalleryUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/jpeg,image/png,image/webp';
        input.click();

        input.onchange = async () => {
            const files = Array.from(input.files || []);
            if (!files.length) return;
            if (files.length > 8) {
                showToast('Gallery maksimal 8 gambar.', 'error');
                return;
            }
            if (files.some((file) => file.size > 4 * 1024 * 1024)) {
                showToast('Setiap gambar maksimal 4 MB.', 'error');
                return;
            }

            setUploadingGallery(true);
            try {
                const images = [];
                for (const file of files) {
                    const data = new FormData();
                    data.append('image', file);
                    const response = await fetch('/user/studies/content-image', {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                            Accept: 'application/json',
                        },
                        body: data,
                    });
                    const result = await response.json();
                    if (!response.ok || !result.success) {
                        throw new Error(result.message || 'Gagal mengupload gallery.');
                    }
                    images.push({ url: result.url, alt: file.name, caption: '' });
                }

                const quill = quillRef.current;
                if (!quill) return;
                const range = getEditorRange();
                if (!range) return;
                if (range.length > 0) quill.deleteText(range.index, range.length, 'user');
                quill.insertEmbed(range.index, 'gallery', { images }, 'user');
                quill.insertText(range.index + 1, '\n', 'user');
                quill.setSelection(range.index + 2, 0, 'user');
                slashRangeRef.current = null;
            } catch (error) {
                console.error(error);
                showToast(error.message || 'Gallery gagal diupload.', 'error');
            } finally {
                setUploadingGallery(false);
            }
        };
    };

    async function handlePdfUpload() {
        const input = document.createElement('input');

        input.type = 'file';
        input.accept = 'application/pdf';

        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];

            if (!file) {
                return;
            }

            if (file.type !== 'application/pdf') {
                showToast(
                    'File yang dipilih harus berupa PDF.',
                    'error'
                );
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                showToast(
                    'Ukuran PDF maksimal 10 MB.',
                    'error'
                );
                return;
            }

            setUploadingPdf(true);

            const data = new FormData();
            data.append('pdf', file);

            try {
                const response = await fetch(
                    `/user/studies/${study.id}/content-pdf`,
                    {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN':
                                document
                                    .querySelector(
                                        'meta[name="csrf-token"]'
                                    )
                                    ?.getAttribute('content'),

                            'Accept': 'application/json',
                        },
                        body: data,
                    }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        'Upload PDF gagal.'
                    );
                }

                const quill = quillRef.current;

                if (!quill) {
                    return;
                }

                const range = quill.getSelection(true);

                quill.insertEmbed(
                    range.index,
                    'pdf',
                    {
                        url: result.url,
                        name: result.name,
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

                showToast(
                    error.message ||
                    'PDF gagal diupload.',
                    'error'
                );
            } finally {
                setUploadingPdf(false);
            }
        };
    }

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
            setShowSlashMenu(false);
            return;
        }

        const [line, offset] =
            quill.getLine(range.index);

        if (!line) {
            setShowSlashMenu(false);
            return;
        }

        const lineText =
            line.domNode.textContent || '';

        const beforeCursor =
            lineText.slice(0, offset);

        /*
        |--------------------------------------------------------------------------
        | Deteksi slash
        |--------------------------------------------------------------------------
        */

        const match =
            beforeCursor.match(/^\/([^\s]*)$/);
        // console.log(
        //     'SLASH CHECK:',
        //     beforeCursor,
        //     match
        // );
        if (!match) {

            setShowSlashMenu(false);

            setSlashQuery('');

            slashRangeRef.current = null;

            return;
        }


        const query =
            match[1].toLowerCase();


        /*
        |--------------------------------------------------------------------------
        | Simpan posisi slash
        |--------------------------------------------------------------------------
        */

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

        /*
        |--------------------------------------------------------------------------
        | Update menu
        |--------------------------------------------------------------------------
        */

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

    const executeCommand = (command) => {
        if (!command) return;

        const quill = quillRef.current;
        if (!quill) return;

        const slashRange = slashRangeRef.current;

        if (slashRange) {
            insertRangeRef.current = {
                index: slashRange.index,
                length: slashRange.length,
            };
        } else {
            const selection = quill.getSelection(true);
            insertRangeRef.current = selection
                ? { index: selection.index, length: selection.length || 0 }
                : { index: Math.max(0, quill.getLength() - 1), length: 0 };
        }

        // Untuk semua command, hapus teks slash sekarang.
        // Posisi insertion tetap disimpan di insertRangeRef karena modal/file picker
        // akan membuat editor kehilangan focus.
        if (slashRange) {
            quill.deleteText(slashRange.index, slashRange.length, 'user');
            quill.setSelection(slashRange.index, 0, 'user');
            slashRangeRef.current = null;
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
                handleImageUpload();
                break;
            case 'gallery':
                handleGalleryUpload();
                break;
            case 'divider':
                insertDivider();
                break;
            case 'quote':
                insertQuote();
                break;
            case 'callout':
                openEditorModal('callout', { title: 'Catatan', text: '', variant: 'info' });
                break;
            case 'video':
            case 'youtube':
            case 'vimeo':
                openEditorModal('video', {
                    preset: command.type,
                    url: '',
                });
                break;

            case 'github':
            case 'gitlab':
            case 'embed':
                openEditorModal('embed', {
                    preset: command.type === 'embed'
                        ? 'url'
                        : command.type,
                    url: '',
                });
                break;
            case 'file':
                handlePdfUpload();
                break;
            case 'button':
                openEditorModal('button', { label: 'Lihat Selengkapnya', url: '' });
                break;
            case 'code':
                insertCode();
                break;
            default:
                break;
        }
    };

    const handleEditorKeyDown = (event) => {

        if (!showSlashMenu) {
            return;
        }


        if (event.key === 'ArrowDown') {

            event.preventDefault();

            setSelectedCommand((current) => {

                const total =
                    filteredCommands.length;

                if (!total) {
                    return 0;
                }

                return (
                    (current + 1) %
                    total
                );
            });

            return;
        }


        if (event.key === 'ArrowUp') {

            event.preventDefault();

            setSelectedCommand((current) => {

                const total =
                    filteredCommands.length;

                if (!total) {
                    return 0;
                }

                return (
                    (current - 1 + total) %
                    total
                );
            });

            return;
        }


        if (event.key === 'Escape') {

            event.preventDefault();

            setShowSlashMenu(false);

            slashRangeRef.current = null;

            return;
        }

        if (event.key !== 'Enter') {
            return;
        }

        const command =
            filteredCommands[selectedCommand];

        if (!command) {
            return;
        }

        event.preventDefault();

        executeCommand(command);
    };



    /*
    |--------------------------------------------------------------------------
    | Remove Slash
    |--------------------------------------------------------------------------
    */

    const removeSlash = () => {

        const quill =
            quillRef.current;

        const slashRange =
            slashRangeRef.current;

        if (
            !quill ||
            !slashRange
        ) {
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
    const getEditorRange = () => {
        const quill = quillRef.current;

        if (!quill) {
            return null;
        }

        const savedRange = insertRangeRef.current;

        if (savedRange) {
            return {
                index: savedRange.index,
                length: savedRange.length || 0,
            };
        }

        const slashRange = slashRangeRef.current;

        if (slashRange) {
            return { index: slashRange.index, length: slashRange.length };
        }

        const selection = quill.getSelection(true);

        if (selection) {
            return {
                index: selection.index,
                length: selection.length || 0,
            };
        }

        return {
            index: Math.max(0, quill.getLength() - 1),
            length: 0,
        };
    };

    /*
    |--------------------------------------------------------------------------
    | Insert Image
    |--------------------------------------------------------------------------
    */

    const insertImage = (
        url,
        alt = ''
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


    /*
    |--------------------------------------------------------------------------
    | Insert PDF
    |--------------------------------------------------------------------------
    */

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


    /*
    |--------------------------------------------------------------------------
    | Insert Divider
    |--------------------------------------------------------------------------
    */

    const insertDivider = () => {

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


    /*
    |--------------------------------------------------------------------------
    | Insert Callout
    |--------------------------------------------------------------------------
    */

    const insertCallout = ({
        title = 'Catatan',
        text = '',
        variant = 'info',
    } = {}) => {

        const quill = quillRef.current;

        if (!quill) {
            return;
        }

        const range = getEditorRange();

        if (!range) {
            return;
        }

        if (range.length > 0) {
            quill.deleteText(
                range.index,
                range.length,
                'user'
            );
        }

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

        insertRangeRef.current = null;
        slashRangeRef.current = null;
    };


    /*
    |--------------------------------------------------------------------------
    | Insert Video
    |--------------------------------------------------------------------------
    */

    const insertVideo = ({
        url,
        preset = 'video',
    } = {}) => {

        const quill = quillRef.current;

        if (!quill || !url) {
            return;
        }

        const range = getEditorRange();

        if (!range) {
            return;
        }

        if (range.length > 0) {
            quill.deleteText(
                range.index,
                range.length,
                'user'
            );
        }

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

        insertRangeRef.current = null;
        slashRangeRef.current = null;
    };
    const insertEmbed = ({
        url,
        type = 'url',
    } = {}) => {
        const quill = quillRef.current;

        if (!quill || !url) {
            return;
        }

        removeSlash();

        const range = quill.getSelection(true);

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

    /*
    |--------------------------------------------------------------------------
    | Insert Button
    |--------------------------------------------------------------------------
    */

    const insertButton = ({
        label = 'Lihat Selengkapnya',
        url = '',
    } = {}) => {

        const quill = quillRef.current;

        if (!quill || !url) {
            return;
        }

        const range = getEditorRange();

        if (!range) {
            return;
        }

        if (range.length > 0) {
            quill.deleteText(
                range.index,
                range.length,
                'user'
            );
        }

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

        insertRangeRef.current = null;
        slashRangeRef.current = null;
    };


    /*
    |--------------------------------------------------------------------------
    | Quote
    |--------------------------------------------------------------------------
    */

    const insertQuote = () => {
        const quill = quillRef.current;

        if (!quill) {
            return;
        }

        removeSlash();

        const range = quill.getSelection(true);

        if (!range) {
            return;
        }

        quill.formatLine(
            range.index,
            1,
            'blockquote',
            true,
            'user'
        );

        quill.focus();
    };


    /*
    |--------------------------------------------------------------------------
    | Code
    |--------------------------------------------------------------------------
    */

    const insertCode = () => {
        const quill = quillRef.current;

        if (!quill) {
            return;
        }

        removeSlash();

        const range = quill.getSelection(true);

        if (!range) {
            return;
        }

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
    | Text / Heading
    |--------------------------------------------------------------------------
    */

    const insertText = () => {

        const quill =
            quillRef.current;

        if (!quill) {
            return;
        }

        removeSlash();

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

        removeSlash();

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

    useEffect(() => {

        if (
            !editorRef.current ||
            quillRef.current
        ) {
            return;
        }

        const quill =
            new Quill(
                editorRef.current,
                {
                    theme: 'snow',

                    placeholder:
                        'Perbaiki isi kajian... Ketik / untuk menambahkan blok.',

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

        /*
        |----------------------------------------------------------------------
        | Load Existing Content
        |----------------------------------------------------------------------
        */

        if (study.content) {
            const delta = quill.clipboard.convert({
                html: study.content,
            });

            delta.ops = delta.ops.map((op) => {
                if (
                    op.insert &&
                    op.insert.video &&
                    typeof op.insert.video === 'string' &&
                    /\.pdf(?:#.*)?$/i.test(op.insert.video)
                ) {
                    const url = op.insert.video;

                    return {
                        insert: {
                            pdf: {
                                url: url.replace(/#.*$/, ''),
                                name: 'Dokumen PDF',
                            },
                        },
                    };
                }

                return op;
            });

            quill.setContents(delta, 'api');

            form.setData(
                'content',
                quill.root.innerHTML
            );
        }


        /*
        |----------------------------------------------------------------------
        | Events
        |----------------------------------------------------------------------
        */

        const handleTextChange = () => {

            form.setData(
                'content',
                quill.root.innerHTML
            );

            requestAnimationFrame(() => {
                updateSlashMenu();
            });
        };


        const handleSelectionChange = () => {

            updateSlashMenu();
        };


        const handleKeyDown = (event) => {

            handleEditorKeyDown(event);

        };


        const handleKeyUp = () => {

            updateSlashMenu();

        };
        const handlePaste = (event) => {
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

                uploadImage(
                    file,
                    'Ilustrasi kajian Big Data BPS'
                );

                break;
            }
        };
        quill.root.addEventListener(
            'paste',
            handlePaste,
            true
        );
        quill.on(
            'text-change',
            handleTextChange
        );

        quill.on(
            'selection-change',
            handleSelectionChange
        );
        quill.root.addEventListener(
            'keydown',
            handleKeyDown
        );

        quill.root.addEventListener(
            'keyup',
            handleKeyUp
        );

        quillRef.current =
            quill;


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
                'keydown',
                handleKeyDown
            );

            quill.root.removeEventListener(
                'keyup',
                handleKeyUp
            );
            quill.root.removeEventListener(
                'paste',
                handlePaste,
                true
            );

            quillRef.current =
                null;
        };

    }, []);

    
    function handleCoverChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        form.setData('cover_image', file);
        setCoverPreview(URL.createObjectURL(file));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const quill = quillRef.current;

        form.transform((data) => ({
            ...data,
            content: quill
                ? quill.root.innerHTML
                : data.content,
            keywords,
        }));

        const options = {
            preserveScroll: true,
        };

        if (form.data.cover_image) {
            form.transform((data) => ({
                ...data,
                _method: 'PATCH',
                content: quill
                    ? quill.root.innerHTML
                    : data.content,
                keywords,
            }));

            form.post(
                `/user/studies/${study.id}`,
                {
                    ...options,
                    forceFormData: true,
                }
            );

            return;
        }

        form.patch(
            `/user/studies/${study.id}`,
            options
        );
    }
    function handleResubmit() {
        openConfirm({
            title: 'Ajukan Ulang Kajian?',
            message:
                'Perubahan kajian akan disimpan terlebih dahulu, kemudian diajukan kembali untuk proses review.',
            confirmText: 'Ya, Simpan & Ajukan',
            cancelText: 'Batal',
            onConfirm: () => {
                const quill = quillRef.current;

                const saveData = (data) => ({
                    ...data,
                    content: quill
                        ? quill.root.innerHTML
                        : data.content,
                    keywords,
                });

                form.transform(saveData);

                const submitAfterSave = () => {
                    form.patch(
                        `/user/studies/${study.id}/resubmit`
                    );
                };

                if (form.data.cover_image) {
                    form.transform((data) => ({
                        ...saveData(data),
                        _method: 'PATCH',
                    }));

                    form.post(
                        `/user/studies/${study.id}`,
                        {
                            forceFormData: true,
                            preserveScroll: true,
                            onSuccess: () => {
                                submitAfterSave();
                            },
                        }
                    );

                    return;
                }

                form.patch(
                    `/user/studies/${study.id}`,
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            submitAfterSave();
                        },
                    }
                );
            },
        });
    }

    return (
        <DashboardLayout>

            <div className="study-create-page">

                <div className="study-create-header">

                    <div>
                        <div className="dashboard-eyebrow">
                            {study.status === 'revision'
                                ? 'REVISI KAJIAN'
                                : 'EDIT KAJIAN'}
                        </div>

                        <h1>
                            Perbarui Kajian
                        </h1>

                        <p>
                            Perbaiki dan perbarui kajian
                            sebelum diajukan kembali.
                        </p>
                    </div>

                    <a
                        href="/user/dashboard"
                        className="study-create-back"
                    >
                        ← Kembali ke Dashboard
                    </a>

                </div>


                {study.status === 'revision' &&
                    latestReview && (

                    <div className="revision-note">
                        <div className="dashboard-eyebrow">
                            CATATAN REVIEWER
                        </div>

                        <p>
                            {latestReview.notes}
                        </p>
                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                    className="study-create-form"
                >

                    <div className="form-section">

                        <div className="form-section__heading">

                            <span>01</span>

                            <div>
                                <h2>
                                    Informasi Kajian
                                </h2>

                                <p>
                                    Perbarui judul dan kategori.
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

                                {categories?.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}

                            </select>

                            {form.errors.category_id && (
                                <div className="form-error">
                                    {form.errors.category_id}
                                </div>
                            )}

                        </div>

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
                                    checked={
                                        form.data.approval_flow ===
                                        'reviewer'
                                    }
                                    onChange={(event) =>
                                        form.setData(
                                            'approval_flow',
                                            event.target.value
                                        )
                                    }
                                />

                                <div>
                                    <strong>
                                        Reviewer saja
                                    </strong>

                                    <p>
                                        Setelah disetujui Reviewer,
                                        kajian langsung dipublikasikan.
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
                                    <strong>
                                        Reviewer + Direktur
                                    </strong>

                                    <p>
                                        Setelah disetujui Reviewer,
                                        kajian diteruskan ke Direktur
                                        untuk persetujuan akhir.
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

                                {keywords.map((keyword) => (

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
                                                removeKeyword(keyword)
                                            }
                                        >
                                            ×
                                        </button>
                                    </span>

                                ))}

                            </div>

                            <input
                                type="text"
                                value={keywordInput}
                                onChange={(event) =>
                                    setKeywordInput(
                                        event.target.value
                                    )
                                }
                                onKeyDown={handleKeywordKeyDown}
                                placeholder={
                                    keywords.length >= 7
                                        ? 'Maksimal 7 kata kunci'
                                        : 'Ketik kata kunci lalu tekan Enter...'
                                }
                                disabled={keywords.length >= 7}
                            />

                        </div>

                        <small>
                            Tambahkan 3–7 kata kunci yang paling relevan dengan kajian.
                        </small>

                        {form.errors.keywords && (
                            <div className="form-error">
                                {form.errors.keywords}
                            </div>
                        )}

                    </div>

                    <div className="form-section">

                        <div className="form-section__heading">

                            <span>02</span>

                            <div>
                                <h2>
                                    Ringkasan & Cover
                                </h2>

                                <p>
                                    Perbarui cover atau ringkasan kajian.
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
                                        alt={study.title}
                                    />
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleCoverChange}
                            />

                            <small>
                                Kosongkan jika tidak ingin mengganti cover.
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
                            />

                            {form.errors.excerpt && (
                                <div className="form-error">
                                    {form.errors.excerpt}
                                </div>
                            )}

                        </div>

                    </div>


                    <div className="form-section">

                        <div className="form-section__heading">

                            <span>03</span>

                            <div>
                                <h2>
                                    Isi Kajian
                                </h2>

                                <p>
                                    Perbaiki isi sesuai catatan reviewer.
                                </p>
                            </div>

                        </div>

                        <div className="form-field">

                            <label>
                                Isi Kajian
                            </label>


                            <div className="study-editor-shell">

                                {/* EDITOR TOOLBAR */}

                                <div className="study-editor-toolbar">

                                    <button
                                        type="button"
                                        className="study-editor-add-button"
                                        onClick={() => {
                                            setShowBlockMenu(
                                                !showBlockMenu
                                            );

                                            setShowSlashMenu(false);
                                        }}
                                    >
                                        <span className="study-editor-add-button__icon">
                                            +
                                        </span>

                                        <span>
                                            Tambahkan blok
                                        </span>
                                    </button>


                                    <div className="study-editor-hint">

                                        Ketik

                                        <kbd>
                                            /
                                        </kbd>

                                        untuk command

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
                                                        setActiveMenu('PRIMARY')
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
                                                        setActiveMenu('EMBED')
                                                    }
                                                >
                                                    EMBED
                                                </button>

                                            </div>

                                            <div className="study-command-menu__items">

                                                {COMMANDS
                                                    .filter(
                                                        (command) =>
                                                            command.group === activeMenu
                                                    )
                                                    .map((command) => (

                                                        <button
                                                            type="button"
                                                            key={command.type}
                                                            className="study-command-item"
                                                            onClick={() => {
                                                                setShowBlockMenu(false);
                                                                executeCommand(command);
                                                            }}
                                                        >

                                                            <span className="study-command-item__icon">
                                                                {command.icon}
                                                            </span>

                                                            <span className="study-command-item__text">

                                                                <strong>
                                                                    {command.label}
                                                                </strong>

                                                                <small>
                                                                    {command.description}
                                                                </small>

                                                            </span>

                                                        </button>

                                                    ))}

                                            </div>

                                        </div>

                                    )}

                                </div>


                                {/* QUILL EDITOR */}

                                <div
                                    ref={editorRef}
                                    className="study-editor"
                                />


                                {/* SLASH MENU */}

                                {showSlashMenu && (
                                    <div
                                        className="study-slash-menu"
                                        style={{
                                            top: `${slashMenuPosition.top}px`,
                                            left: `${slashMenuPosition.left}px`,
                                        }}
                                    >

                                        <div className="study-block-menu__header">

                                            <span>
                                                BLOK
                                            </span>

                                            {slashQuery && (
                                                <small>
                                                    /{slashQuery}
                                                </small>
                                            )}

                                        </div>


                                        <div className="study-block-menu__items">

                                            {filteredCommands.length === 0 ? (

                                                <div className="study-slash-menu__empty">
                                                    Tidak ada command yang cocok.
                                                </div>

                                            ) : (

                                                filteredCommands.map(
                                                    (command, index) => (

                                                        <button
                                                            key={command.type}
                                                            type="button"
                                                            className={
                                                                `study-block-menu__item ${
                                                                    selectedCommand === index
                                                                        ? 'is-selected'
                                                                        : ''
                                                                }`
                                                            }
                                                            onMouseDown={(event) => {
                                                                event.preventDefault();

                                                                executeCommand(command);
                                                            }}
                                                        >

                                                            <span className="study-block-menu__icon">
                                                                {command.icon}
                                                            </span>

                                                            <span className="study-block-menu__content">

                                                                <strong>
                                                                    {command.label}
                                                                </strong>

                                                                <small>
                                                                    {command.description}
                                                                </small>

                                                            </span>

                                                        </button>

                                                    )
                                                )

                                            )}

                                        </div>

                                    </div>

                                )}


                                {uploadingImage && (

                                    <div className="editor-upload-status">
                                        Mengupload gambar...
                                    </div>

                                )}


                                {uploadingPdf && (

                                    <div className="editor-upload-status">
                                        Mengupload PDF...
                                    </div>

                                )}

                                {uploadingGallery && (
                                    <div className="editor-upload-status">
                                        Mengupload gallery...
                                    </div>
                                )}


                                {form.errors.content && (

                                    <div className="form-error">
                                        {form.errors.content}
                                    </div>

                                )}

                            </div>

                        </div>

                    </div>


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
                            {'Preview'}
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
                            {form.processing
                                ? 'Menyimpan...'
                                : 'Simpan sebagai Draft'}
                        </button>

                        <button
                            type="button"
                            className="dashboard-primary-button"
                            onClick={handleResubmit}
                            disabled={
                                form.processing ||
                                uploadingImage ||
                                uploadingPdf ||
                                uploadingGallery
                            }
                        >
                            Ajukan Kajian
                        </button>

                    </div>

                </form>


                {/* {(study.status === 'revision' ||
                    study.status === 'draft') && (

                    <div className="resubmit-panel">

                        <div>
                            <strong>
                                Sudah selesai memperbaiki?
                            </strong>

                            <p>
                                Ajukan kembali kajian untuk
                                diproses oleh reviewer.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="dashboard-primary-button"
                            onClick={handleResubmit}
                            disabled={form.processing}
                        >
                            Ajukan Ulang untuk Review
                        </button>

                    </div>
                )} */}

            </div>

            {editorModal.open && (
                <div
                    className="study-editor-modal__overlay"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeEditorModal();
                    }}
                >
                    <div className="study-editor-modal" role="dialog" aria-modal="true">
                        <div className="study-editor-modal__header">
                            <div>
                                <div className="dashboard-eyebrow">{'EDITOR'}</div>
                                <h2>{editorModal.title}</h2>
                            </div>
                            <button type="button" className="study-editor-modal__close" onClick={closeEditorModal}>×</button>
                        </div>

                        <div className="study-editor-modal__body">
                            {editorModal.type === 'callout' && (
                                <>
                                    <div className="study-editor-modal__field">
                                        <label>{'Judul Callout'}</label>
                                        <input type="text" value={editorModal.fields.title ?? ''} autoFocus placeholder={'Masukkan judul callout...'} onChange={(e) => setEditorModal(c => ({ ...c, fields: { ...c.fields, title: e.target.value } }))} />
                                    </div>
                                    <div className="study-editor-modal__field">
                                        <label>{'Isi Callout'}</label>
                                        <textarea rows="5" value={editorModal.fields.text ?? ''} placeholder={'Tulis informasi yang ingin ditonjolkan...'} onChange={(e) => setEditorModal(c => ({ ...c, fields: { ...c.fields, text: e.target.value } }))} />
                                    </div>
                                    <div className="study-editor-modal__field">
                                        <label>{'Informasi'}</label>
                                        <select value={editorModal.fields.variant ?? 'info'} onChange={(e) => setEditorModal(c => ({ ...c, fields: { ...c.fields, variant: e.target.value } }))}>
                                            <option value="info">Informasi</option>
                                            <option value="warning">{'Peringatan'}</option>
                                            <option value="success">Sukses</option>
                                            <option value="important">{'Penting'}</option>
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
                                            ?  'URL Vimeo'
                                            : 'URL Embed'}
                                    </label>
                                    <input type="url" value={editorModal.fields.url ?? ''} autoFocus placeholder="https://..." onChange={(e) => setEditorModal(c => ({ ...c, fields: { ...c.fields, url: e.target.value } }))} />
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
                                        autoFocus
                                        placeholder="https://..."
                                        onChange={(e) =>
                                            setEditorModal((c) => ({
                                                ...c,
                                                fields: {
                                                    ...c.fields,
                                                    url: e.target.value,
                                                },
                                            }))
                                        }
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
                                        <label>{'Teks Tombol'}</label>
                                        <input type="text" value={editorModal.fields.label ?? ''} autoFocus placeholder={'Contoh: Lihat Selengkapnya'} onChange={(e) => setEditorModal(c => ({ ...c, fields: { ...c.fields, label: e.target.value } }))} />
                                    </div>
                                    <div className="study-editor-modal__field">
                                        <label>{'Deskripsi Gambar'}</label>
                                        <input type="url" value={editorModal.fields.url ?? ''} placeholder="https://..." onChange={(e) => setEditorModal(c => ({ ...c, fields: { ...c.fields, url: e.target.value } }))} />
                                    </div>
                                </>
                            )}

                            {editorModal.type === 'image' && (
                                <div className="study-editor-modal__field">
                                    <label>Deskripsi Gambar</label>
                                    <input type="text" value={editorModal.fields.alt ?? ''} autoFocus placeholder={'Jelaskan isi gambar...'} onChange={(e) => setEditorModal(c => ({ ...c, fields: { ...c.fields, alt: e.target.value } }))} />
                                    <small>{'Digunakan untuk aksesibilitas dan SEO.'}</small>
                                </div>
                            )}
                        </div>

                        <div className="study-editor-modal__footer">
                            <button type="button" className="study-secondary-button" onClick={closeEditorModal}>{'Batal'}</button>
                            <button
                                type="button"
                                className="dashboard-primary-button"
                                disabled={uploadingImage}
                                onClick={async () => {
                                    if (editorModal.type === 'callout') {
                                        insertCallout(editorModal.fields);
                                        closeEditorModal();
                                        return;
                                    }
                                    if (editorModal.type === 'video') {
                                        const url = editorModal.fields.url?.trim();
                                        if (!url) { showToast('URL tidak boleh kosong.', 'warning'); return; }
                                        insertVideo({ url, preset: editorModal.fields.preset || 'video' });
                                        closeEditorModal();
                                        return;
                                    }
                                    if (editorModal.type === 'embed') {
                                        const url = editorModal.fields.url?.trim();

                                        if (!url) {
                                            showToast('URL tidak boleh kosong.', 'warning');
                                            return;
                                        }

                                        insertEmbed({
                                            url,
                                            type: editorModal.fields.preset || 'url',
                                        });

                                        closeEditorModal();
                                        return;
                                    }
                                    if (editorModal.type === 'button') {
                                        const url = editorModal.fields.url?.trim();
                                        if (!url) { showToast('URL tidak boleh kosong.', 'warning'); return; }
                                        insertButton({ label: editorModal.fields.label || 'Lihat Selengkapnya', url });
                                        closeEditorModal();
                                        return;
                                    }
                                    if (editorModal.type === 'image') {
                                        const file = pendingImage;
                                        if (!file) { closeEditorModal(); return; }
                                        setUploadingImage(true);
                                        const data = new FormData();
                                        data.append('image', file);
                                        try {
                                            const response = await fetch(`/user/studies/${study.id}/content-image`, {
                                                method: 'POST',
                                                headers: {
                                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                                                    Accept: 'application/json',
                                                },
                                                body: data,
                                            });
                                            const result = await response.json();
                                            if (!response.ok || !result.success) throw new Error(result.message || 'Gagal mengupload gambar.');
                                            insertImage(result.url, editorModal.fields.alt?.trim() || 'Ilustrasi kajian Big Data BPS');
                                            setPendingImage(null);
                                            closeEditorModal();
                                        } catch (error) {
                                            console.error(error);
                                            showToast(error.message || 'Gagal mengupload gambar.', 'error');
                                        } finally {
                                            setUploadingImage(false);
                                        }
                                    }
                                }}
                            >
                                {uploadingImage ? 'Mengupload...' : 'Tambahkan'}
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
                            <article
                                className="study-public-preview__content"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        form.data.content ||
                                        '<p>Belum ada isi kajian.</p>',
                                }}
                            />

                        </main>

                    </div>
                </div>
            )}

        </DashboardLayout>
    );
}
