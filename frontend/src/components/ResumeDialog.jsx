import React, { useState } from 'react';
import { Download, FileText, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';

const ResumeDialog = ({ children, triggerClassName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/resume/download`);
      const data = await response.json();
      
      if (data.success && data.resumeUrl) {
        const link = document.createElement('a');
        link.href = data.resumeUrl;
        link.download = 'Sharandeep_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <button className={triggerClassName}>
            View Resume
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="w-5 h-5" />
            Resume Preview
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Preview the resume or download it for offline viewing
          </DialogDescription>
        </DialogHeader>
        
        <div className="w-full h-[600px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-slate-800">
          <iframe
            src="/Resume.pdf"
            className="w-full h-full"
            title="Resume Preview"
          />
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-gray-300 dark:border-gray-600"
          >
            Close
          </Button>
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDialog;
