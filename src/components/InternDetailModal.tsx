import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, GraduationCap, Calendar } from "lucide-react";

interface InternDetailModalProps {
  intern: any;
  open: boolean;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void;
  onDelete?: (applicationId: string) => void;
}

const InternDetailModal = ({ intern, open, onClose }: InternDetailModalProps) => {
  if (!intern) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-green-600";
      case "Rejected": return "bg-red-600";
      case "Under Review": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">{intern.name}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Application ID: {intern.applicationId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Status</span>
            <Badge className={getStatusColor(intern.status)}>{intern.status}</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>{intern.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-400" />
              <span>{intern.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <span>{intern.university}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-orange-400" />
              <span>Applied: {intern.submittedDate}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-gray-400 mb-1">Program</p>
            <p className="font-medium">{intern.program}</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InternDetailModal;
