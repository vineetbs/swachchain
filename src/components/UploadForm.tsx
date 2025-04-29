
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Map, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useLocation } from '@/hooks/useLocation';
import axiosApi from '@/lib/axios';

interface UploadFormProps {}

const UploadForm: React.FC<UploadFormProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { city, loading: locationLoading, error: locationError } = useLocation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      toast.error('Unable to access camera');
      console.error('Error accessing camera:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select an image to upload');
      return;
    }
    
    if (!city) {
      toast.error('Unable to determine your location');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('city', city);

    try {
      const response = await axiosApi.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      toast.error('Failed to upload report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full animate-fade-in"
              onClick={handleCapture}
            >
              <Camera className="mr-2 h-4 w-4" />
              Take photo
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full animate-fade-in"
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose file
            </Button>
          </div>
          
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          
          {locationLoading ? (
            <div className="text-center p-4">
              <Loader2 className="animate-spin h-6 w-6 mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">Detecting location...</p>
            </div>
          ) : locationError ? (
            <div className="text-center text-destructive p-4">
              {locationError}
            </div>
          ) : (
            <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
              <Map className="h-4 w-4 mr-2" />
              <span>{city}</span>
            </div>
          )}
          
          {preview ? (
            <Card>
              <CardContent className="p-2">
                <div className="aspect-video w-full overflow-hidden rounded-md">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="h-full w-full object-cover animate-scale-in" 
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Select a photo to upload
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full animate-fade-in" disabled={isSubmitting || !city}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          'Submit Report'
        )}
      </Button>

      <video 
        ref={videoRef}
        className={`w-full aspect-video rounded-lg ${preview ? 'hidden' : ''}`}
        playsInline
      />
    </form>
  );
};

export default UploadForm;
