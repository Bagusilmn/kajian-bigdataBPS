import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import { useFeedback } from '../../../Components/FeedbackProvider';

export default function Index({ categories = [] }) {
    const {
        showToast,
        openConfirm,
    } = useFeedback();
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const form = useForm({
        name: '',
        description: '',
        image: null,
    });

    function openCreate() {
        setEditingCategory(null);

        form.setData({
            name: '',
            description: '',
            image: null,
        });

        form.clearErrors();
        setShowForm(true);
    }

    function openEdit(category) {
        setEditingCategory(category);

        form.setData({
            name: category.name ?? '',
            description: category.description ?? '',
            image: null,
        });

        form.clearErrors();
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditingCategory(null);

        form.reset();
        form.clearErrors();
    }

    function submit(event) {
        event.preventDefault();

        if (editingCategory) {
            form.transform((data) => ({
                ...data,
                _method: 'PATCH',
            }));

            form.post(
                `/admin/categories/${editingCategory.id}`,
                {
                    forceFormData: true,
                    onSuccess: () => closeForm(),
                }
            );

            return;
        }

        form.post('/admin/categories', {
            forceFormData: true,
            onSuccess: () => closeForm(),
        });
    }

    function deleteCategory(category) {

        if (Number(category.studies_count) > 0) {

            showToast(
                'Kategori ini masih digunakan oleh kajian dan tidak dapat dihapus.',
                'warning'
            );

            return;
        }

        openConfirm({
            title: 'Hapus Kategori?',
            message:
                `Kategori "${category.name}" akan dihapus secara permanen.`,
            confirmText: 'Ya, Hapus',
            cancelText: 'Batal',
            danger: true,

            onConfirm: () => {

                form.delete(
                    `/admin/categories/${category.id}`
                );

            },
        });
    }

    return (
        <DashboardLayout>

            <div className="admin-dashboard">

                <div className="admin-header">

                    <div>

                        <div className="dashboard-eyebrow">
                            CATEGORY MANAGEMENT
                        </div>

                        <h1>
                            Kategori
                        </h1>

                        <p>
                            Kelola kategori yang digunakan
                            untuk mengelompokkan kajian.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="dashboard-primary-button"
                        onClick={openCreate}
                    >
                        + Tambah Kategori
                    </button>

                </div>


                <section className="admin-section">

                    <div className="admin-section__heading">

                        <div>

                            <div className="dashboard-eyebrow">
                                DAFTAR KATEGORI
                            </div>

                            <h2>
                                Semua Kategori
                            </h2>

                        </div>


                        <span className="admin-queue-count">
                            {categories.length} kategori
                        </span>

                    </div>


                    <div className="admin-category-grid">

                        {categories.length > 0 ? (

                            categories.map((category) => (

                                <article
                                    key={category.id}
                                    className="admin-category-card"
                                >

                                    <div>

                                        <div className="admin-category-card__number">
                                            #{String(
                                                category.id
                                            ).padStart(2, '0')}
                                        </div>

                                        <h3>
                                            {category.name}
                                        </h3>

                                        <p>
                                            {category.description ||
                                                'Belum ada deskripsi kategori.'}
                                        </p>

                                    </div>


                                    <div className="admin-category-card__footer">

                                        <span>
                                            {category.studies_count ?? 0}{' '}
                                            kajian
                                        </span>


                                        <div className="admin-user-actions">

                                            <button
                                                type="button"
                                                className="admin-table-button"
                                                onClick={() =>
                                                    openEdit(category)
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                type="button"
                                                className="admin-table-button admin-table-button--danger"
                                                onClick={() =>
                                                    deleteCategory(category)
                                                }
                                            >
                                                Hapus
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))

                        ) : (

                            <div className="admin-empty">
                                Belum ada kategori.
                            </div>

                        )}

                    </div>

                </section>


                {showForm && (

                    <div className="admin-modal-backdrop">

                        <div className="admin-modal">

                            <div className="admin-modal__header">

                                <div>

                                    <div className="dashboard-eyebrow">
                                        {editingCategory
                                            ? 'EDIT CATEGORY'
                                            : 'NEW CATEGORY'}
                                    </div>

                                    <h2>
                                        {editingCategory
                                            ? 'Edit Kategori'
                                            : 'Tambah Kategori'}
                                    </h2>

                                </div>


                                <button
                                    type="button"
                                    className="admin-modal__close"
                                    onClick={closeForm}
                                >
                                    ×
                                </button>

                            </div>


                            <form
                                onSubmit={submit}
                                className="admin-form"
                            >

                                <div className="admin-form-field">

                                    <label>
                                        Nama Kategori
                                    </label>

                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(event) =>
                                            form.setData(
                                                'name',
                                                event.target.value
                                            )
                                        }
                                        placeholder="Contoh: Web Scraping"
                                    />

                                    {form.errors.name && (
                                        <div className="form-error">
                                            {form.errors.name}
                                        </div>
                                    )}

                                </div>


                                <div className="admin-form-field">

                                    <label>
                                        Deskripsi
                                    </label>

                                    <textarea
                                        value={
                                            form.data.description
                                        }
                                        onChange={(event) =>
                                            form.setData(
                                                'description',
                                                event.target.value
                                            )
                                        }
                                        rows="5"
                                        placeholder="Deskripsi singkat kategori"
                                    />

                                    {form.errors.description && (
                                        <div className="form-error">
                                            {
                                                form.errors.description
                                            }
                                        </div>
                                    )}

                                </div>

                                <div className="admin-form-field">
                                    <label>
                                        Gambar Kategori
                                    </label>

                                    {/* Preview gambar yang sudah tersimpan */}
                                    {editingCategory?.image_url && !form.data.image && (
                                        <div className="admin-category-image-preview">
                                            <img
                                                src={editingCategory.image_url}
                                                alt={editingCategory.name}
                                            />
                                        </div>
                                    )}

                                    {/* Upload / pilih gambar */}
                                    <div className="admin-image-upload">
                                        <input
                                            id="category-image"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="admin-image-upload__input"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0] ?? null;

                                                form.setData('image', file);
                                            }}
                                        />

                                        <label
                                            htmlFor="category-image"
                                            className="admin-image-upload__box"
                                        >
                                            <div className="admin-image-upload__icon">
                                                ↑
                                            </div>

                                            <div className="admin-image-upload__text">
                                                <strong>
                                                    {form.data.image
                                                        ? form.data.image.name
                                                        : 'Pilih gambar kategori'}
                                                </strong>

                                                <span>
                                                    {form.data.image
                                                        ? 'Klik untuk mengganti gambar'
                                                        : 'JPG, PNG, atau WebP'}
                                                </span>
                                            </div>

                                            <div className="admin-image-upload__button">
                                                Pilih Gambar
                                            </div>
                                        </label>
                                    </div>

                                    <small className="admin-form-help">
                                        Maksimal 5 MB · Disarankan menggunakan gambar landscape.
                                    </small>

                                    {form.errors.image && (
                                        <div className="form-error">
                                            {form.errors.image}
                                        </div>
                                    )}
                                </div>


                                {/* ACTION BUTTONS */}
                                <div className="admin-modal__actions">

                                    <button
                                        type="button"
                                        className="admin-table-button"
                                        onClick={closeForm}
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        className="dashboard-primary-button"
                                        disabled={form.processing}
                                    >
                                        {form.processing
                                            ? 'Menyimpan...'
                                            : editingCategory
                                                ? 'Simpan Perubahan'
                                                : 'Tambah Kategori'}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
}