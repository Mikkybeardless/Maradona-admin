import { useState } from "react";
import { BsTrash2, BsTrash3 } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { LuAlertTriangle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Delete Button Component
export function DeleteButton({
  itemId,
  onDelete,
  requestRoute,
  redirectPath,
  deleteLabel = "Delete",
  modalMessage = "Are you sure you want to delete this item? This action cannot be undone.",
}: {
  itemId: string;
  onDelete?: (id: string) => Promise<void>;
  redirectPath?: string;
  requestRoute: string;
  deleteLabel?: string;
  modalMessage?: string;
}) {
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default delete handler if not provided
  const defaultDeleteHandler = async (id: string) => {
    const response = await fetch(`/api/${requestRoute}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.log("Failed to delete the request");
      toast.error("Failed to delete the booking");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      // Use provided delete handler or default
      await (onDelete || defaultDeleteHandler)(itemId);

      // Redirect after successful deletion
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        toast.success("Item deleted successfully");
        window.location.reload();
      }
    } catch (err) {
      // Handle deletion error
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      {/* Delete Button */}
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="flex items-center space-x-2 text-red-500 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors"
        disabled={isDeleting}
      >
        <BsTrash3
          color=""
          size={24}
          className="cursor-pointer"
          title="Delete"
        />
      </button>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <div className="flex items-center mb-4 text-red-500">
              <LuAlertTriangle className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-bold">Confirm Deletion</h2>
            </div>

            <p className="mb-4 text-gray-700">{modalMessage}</p>

            {/* Error Message */}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="flex justify-between space-x-4">
              {/* Cancel Button */}
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 flex items-center justify-center border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                disabled={isDeleting}
              >
                <IoClose className="w-5 h-5 mr-2" />
                Cancel
              </button>

              {/* Confirm Delete Button */}
              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
