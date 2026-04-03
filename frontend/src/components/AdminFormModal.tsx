import { useEffect, type ReactNode } from "react";

type AdminFormModalProps = {
    title: string;
    children: ReactNode;
    onClose: () => void;
};

/**
 * Full-screen dimmed overlay + centered panel for admin add/edit forms.
 */
function AdminFormModal({ title, children, onClose }: AdminFormModalProps) {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-form-modal-title"
            style={{ backgroundColor: "rgba(33, 37, 41, 0.55)" }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header border-secondary-subtle bg-body-secondary">
                        <h2
                            className="modal-title h5 mb-0"
                            id="admin-form-modal-title"
                        >
                            {title}
                        </h2>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        />
                    </div>
                    <div className="modal-body p-4">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default AdminFormModal;
