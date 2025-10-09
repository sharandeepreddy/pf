import React, { useState } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

const CertificateUpload = ({ onUploadSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    credential: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({
          type: 'error',
          text: 'Please select a PDF, JPEG, or PNG file.'
        });
        return;
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setMessage({
          type: 'error',
          text: 'File size must be less than 10MB.'
        });
        return;
      }
      
      setSelectedFile(file);
      setMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setMessage({
        type: 'error',
        text: 'Please select a certificate file.'
      });
      return;
    }

    if (!formData.name || !formData.issuer || !formData.date) {
      setMessage({
        type: 'error',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      // Convert file to base64
      const base64File = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1]; // Remove data:type;base64, prefix
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      // Prepare data as JSON
      const uploadData = {
        name: formData.name,
        issuer: formData.issuer,
        date: formData.date,
        credential: formData.credential,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileData: base64File
      };

      const response = await fetch('/.netlify/functions/upload-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({
          type: 'success',
          text: 'Certificate uploaded successfully!'
        });
        
        // Reset form
        setFormData({
          name: '',
          issuer: '',
          date: '',
          credential: ''
        });
        setSelectedFile(null);
        
        // Notify parent component
        if (onUploadSuccess) {
          onUploadSuccess();
        }
        
        // Close modal after short delay
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to upload certificate.'
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({
        type: 'error',
        text: 'An error occurred while uploading. Please try again.'
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">Upload Certificate</CardTitle>
            <CardDescription>
              Add a new certificate with PDF or image file
            </CardDescription>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Certificate Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Certificate Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., AWS Solutions Architect"
              required
            />
          </div>

          {/* Issuer */}
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization *</Label>
            <Input
              id="issuer"
              name="issuer"
              value={formData.issuer}
              onChange={handleInputChange}
              placeholder="e.g., Amazon Web Services"
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Issue Date *</Label>
            <Input
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="e.g., 2024 or March 2024"
              required
            />
          </div>

          {/* Credential ID */}
          <div className="space-y-2">
            <Label htmlFor="credential">Credential ID</Label>
            <Input
              id="credential"
              name="credential"
              value={formData.credential}
              onChange={handleInputChange}
              placeholder="e.g., AWS-SAA-2024-001 (optional)"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Certificate File *</Label>
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Choose file or drag and drop
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, JPEG, PNG up to 10MB
                      </span>
                    </label>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Message */}
          {message.text && (
            <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950' : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'}>
              {message.type === 'error' ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={message.type === 'error' ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            {onClose && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={uploading}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={uploading || !selectedFile}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                'Upload Certificate'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CertificateUpload;