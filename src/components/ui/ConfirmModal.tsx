import { Button } from "./Button";
import { Modal } from "./Modal";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Delete",
  loading,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <p className="mb-6 text-sm text-gray-600">
        {description}
      </p>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
