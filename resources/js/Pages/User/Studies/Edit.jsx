import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Quill from 'quill';
import QuillResize from 'quill-resize-module';
import 'quill/dist/quill.snow.css';
import 'quill-resize-module/dist/resize.css';

import DashboardLayout from '../../../Layouts/DashboardLayout';
Quill.register('modules/resize', QuillResize);
export default function Edit({ study, categories }) {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [coverPreview, setCoverPreview] = useState(
        study.cover_image
            ? `/storage/${study.cover_image}`
            : null
    );

    const [uploadingImage, setUploadingImage] = useState(false);

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
    const latestReview = study.reviews?.[0] ?? null;

    useEffect(() => {
        if (!editorRef.current || quillRef.current) {
            return;
        }

        const quill = new Quill(editorRef.current, {
            theme: 'snow',
            placeholder: 'Perbaiki isi kajian...',
            modules: {
                toolbar: {
                    container: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ indent: '-1' }, { indent: '+1' }],
                        ['blockquote', 'code-block'],
                        ['link', 'image'],
                        ['clean'],
                    ],

                    handlers: {
                        image: handleImageUpload,
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

        if (study.content) {
            quill.root.innerHTML = study.content;
        }

        quill.on('text-change', () => {
            form.setData('content', quill.root.innerHTML);
        });

        quillRef.current = quill;

        return () => {
            quill.off('text-change');
            quillRef.current = null;
        };
    }, []);

    async function handleImageUpload() {
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
                    `/user/studies/${study.id}/content-image`,
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
                        'Upload gambar gagal.'
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

                quill.setSelection(range.index + 1);

            } catch (error) {
                console.error(error);

                alert(
                    error.message ||
                    'Gambar gagal diupload.'
                );
            } finally {
                setUploadingImage(false);
            }
        };
    }

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

        form.patch(
            `/user/studies/${study.id}`,
            {
                forceFormData: true,
            }
        );
    }

    function handleResubmit() {
        if (
            !window.confirm(
                'Sudah memastikan revisi selesai dan ingin mengajukannya kembali?'
            )
        ) {
            return;
        }

        form.patch(
            `/user/studies/${study.id}/resubmit`
        );
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
                                : 'Simpan Perubahan'}
                        </button>

                    </div>

                </form>


                {(study.status === 'revision' ||
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
                )}

            </div>

        </DashboardLayout>
    );
}