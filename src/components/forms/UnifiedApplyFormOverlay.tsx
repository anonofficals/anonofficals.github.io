import React from 'react';
import { X } from 'lucide-react';
import { UnifiedApplyForm, FormType } from './UnifiedApplyForm';

interface UnifiedApplyFormOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  formType: FormType;
  targetId?: string;
  targetTitle?: string;
}

export const UnifiedApplyFormOverlay: React.FC<UnifiedApplyFormOverlayProps> = ({
  isOpen,
  onClose,
  formType,
  targetId,
  targetTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-lg shadow-2xl max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="p-6">
          <UnifiedApplyForm
            formType={formType}
            targetId={targetId}
            targetTitle={targetTitle}
            onSuccess={onClose}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};
