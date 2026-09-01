import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Quill from 'quill';
import QuillResize from 'quill-resize-module';
import 'quill/dist/quill.snow.css';
import 'quill-resize-module/dist/resize.css';

import DashboardLayout from '../../../Layouts/DashboardLayout';
const BlockEmbed = Quill.import('blots/block/embed');

class PdfBlot extends BlockEmbed {
    static blotName = 'pdf';
    static tagName = 'div';
    static className = 'pdf-embed';

    static create(value) {
        const node = super.create();

        const iframe = document.createElement('iframe');

        iframe.src = value.url;
        iframe.title = value.name || 'Dokumen PDF';
        iframe.loading = 'lazy';

        node.setAttribute('contenteditable', 'false');
        node.dataset.url = value.url;
        node.dataset.name = value.name || 'Dokumen PDF';

        iframe.style.width = '100%';
        iframe.style.height = '700px';
        iframe.style.border = '0';
        iframe.style.borderRadius = '8px';

        node.appendChild(iframe);

        return node;
    }

    static value(node) {
        return {
            url: node.dataset.url,
            name: node.dataset.name,
        };
    }
}

Quill.register(PdfBlot);
Quill.register('modules/resize', QuillResize);
export default function Create({ categories }) {

    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [keywordInput, setKeywordInput] = useState('');
    const [keywords, setKeywords] = useState([]);

    const form = useForm({
        title: '',
        category_id: '',
        excerpt: '',
        content: '',
        cover_image: null,
        keywords: [],
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
        form.setData('keywords', keywords);
    }, [keywords]);
    useEffect(() => {
        const quill = new Quill(editorRef.current, {
            theme: 'snow',

            placeholder: 'Tulis isi kajian di sini...',

            modules: {
                toolbar: {
                    container: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ indent: '-1' }, { indent: '+1' }],
                        ['blockquote'],
                        ['link', 'image', 'pdf'],
                        ['clean'],
                    ],

                    handlers: {
                        image: handleImageUpload,
                        pdf: handlePdfUpload,
                    },
                },

                resize: {
                    modules: [
                        'Resize',
                        'DisplaySize',
                    ],
                },
            },
        });

        quill.on('text-change', () => {
            form.setData(
                'content',
                quill.root.innerHTML
            );
        });

        quillRef.current = quill;

        return () => {
            quill.off('text-change');
            quillRef.current = null;
        };

    }, []);


    const handleImageUpload = () => {

        const input = document.createElement('input');

        input.type = 'file';
        input.accept = 'image/jpeg,image/png,image/webp';

        input.click();

        input.onchange = async () => {

            const file = input.files?.[0];

            if (!file) {
                return;
            }
            const altText = window.prompt(
                'Deskripsi gambar untuk aksesibilitas dan SEO:',
                ''
            );

            if (altText === null) {
                return;
            }
            if (file.size > 4 * 1024 * 1024) {
                alert('Ukuran gambar maksimal 4 MB.');
                return;
            }

            setUploadingImage(true);

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

                            'Accept': 'application/json',
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

                const quill = quillRef.current;

                if (!quill) {
                    return;
                }

                const range = quill.getSelection(true);

                quill.insertEmbed(
                    range.index,
                    'image',
                    result.url,
                    'user'
                );

                setTimeout(() => {
                    const images = quill.root.querySelectorAll(
                        `img[src="${result.url}"]`
                    );

                    const image = images[images.length - 1];

                    if (image) {
                        image.setAttribute(
                            'alt',
                            altText.trim() ||
                                'Ilustrasi kajian Big Data BPS'
                        );
                    }
                }, 0);

                quill.setSelection(
                    range.index + 1
                );

            } catch (error) {

                console.error(error);

                alert(
                    error.message ||
                    'Gagal mengupload gambar.'
                );

            } finally {

                setUploadingImage(false);

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
                alert('File yang dipilih harus berupa PDF.');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert('Ukuran PDF maksimal 10 MB.');
                return;
            }

            setUploadingPdf(true);

            const data = new FormData();
            data.append('pdf', file);

            try {
                const response = await fetch(
                    '/user/studies/content-pdf',
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

                alert(
                    error.message ||
                    'PDF gagal diupload.'
                );
            } finally {
                setUploadingPdf(false);
            }
        };
    }


    const handleCoverChange = (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        form.setData('cover_image', file);

        const previewUrl = URL.createObjectURL(file);

        setCoverPreview(previewUrl);
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        form.post(
            '/user/studies',
            {
                forceFormData: true,

                onSuccess: () => {
                    //
                    // Redirect ditangani oleh Laravel
                    //
                },
            }
        );
    };


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
                            Buat kajian baru untuk dipublikasikan
                            melalui portal Kajian Big Data BPS.
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

                    {/* TITLE */}

                    <div className="form-section">

                        <div className="form-section__heading">

                            <span>
                                01
                            </span>

                            <div>
                                <h2>
                                    Informasi Kajian
                                </h2>

                                <p>
                                    Tentukan judul dan kategori kajian.
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
                                                aria-label={`Hapus ${keyword}`}
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
                    </div>


                    {/* COVER + EXCERPT */}

                    <div className="form-section">

                        <div className="form-section__heading">

                            <span>
                                02
                            </span>

                            <div>

                                <h2>
                                    Ringkasan
                                </h2>

                                <p>
                                    Tambahkan cover dan ringkasan singkat.
                                </p>

                            </div>

                        </div>


                        <div className="form-field">

                            <label>
                                Cover Kajian
                            </label>

                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleCoverChange}
                            />

                            <small>
                                JPG, PNG, atau WebP. Maksimal 2 MB.
                            </small>

                            {coverPreview && (

                                <div className="cover-preview">

                                    <img
                                        src={coverPreview}
                                        alt="Preview cover"
                                    />

                                </div>

                            )}

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
                                placeholder="Jelaskan secara singkat isi kajian..."
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


                    {/* CONTENT */}

                    <div className="form-section">

                        <div className="form-section__heading">

                            <span>
                                03
                            </span>

                            <div>

                                <h2>
                                    Isi Kajian
                                </h2>

                                <p>
                                    Tulis kajian menggunakan rich text editor.
                                </p>

                            </div>

                        </div>


                        <div className="form-field">

                            <label>
                                Isi Kajian
                            </label>

                            <div
                                ref={editorRef}
                                className="study-editor"
                            />

                            {uploadingImage && (

                                <div className="editor-upload-status">
                                    Mengupload gambar...
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
                            type="submit"
                            className="dashboard-primary-button"
                            disabled={form.processing}
                        >
                            {form.processing
                                ? 'Menyimpan...'
                                : 'Simpan sebagai Draft'}
                        </button>

                    </div>

                </form>

            </div>

        </DashboardLayout>
    );
}