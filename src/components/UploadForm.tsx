import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Upload,
  Map,
  Loader2,
  XCircle,
  CheckCircle,
  FileImage,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useLocation } from "@/hooks/useLocation";
import axios from "axios";

interface UploadFormProps {
  onSuccess: (result: { score: number; message: string }) => void;
}

interface ApiResponse {
  area_name: string;
  marks: number;
  total_garbage_items: number;
  garbage_coverage_percent: number;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    city,
    loading: locationLoading,
    error: locationError,
  } = useLocation();

  // --- Stop Camera Function ---
  const stopCameraStream = useCallback(() => {
    if (stream) {
      console.log("Stopping camera stream..."); // Log
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraActive(false); // Ensure camera view is hidden
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Clear srcObject
      }
    }
  }, [stream]);

  // --- Effect for cleanup on unmount ---
  useEffect(() => {
    return () => {
      stopCameraStream();
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [stopCameraStream, preview]);

  // --- File Input Handling ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopCameraStream(); // Stop camera if user chooses file
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
    e.target.value = "";
  };

  // --- Start Camera Handling ---
  const handleOpenCamera = async () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    console.log("Attempting to open camera...");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Camera access is not supported by this browser.");
      return;
    }

    // Stop any existing stream first before getting a new one
    stopCameraStream();

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      console.log("getUserMedia success. Stream obtained.");
      // Set the stream and activate the camera view
      setStream(mediaStream);
      setIsCameraActive(true); // This will trigger the useEffect below
    } catch (err) {
      console.error("Error accessing camera (getUserMedia failed):", err);
      if (err instanceof Error && err.name === "NotAllowedError") {
        toast.error("Camera permission denied.");
      } else {
        toast.error("Unable to access camera");
      }
      setIsCameraActive(false); // Ensure state is false on error
      setStream(null);
    }
  };

  // --- Effect to handle setting up video AFTER camera is active ---
  useEffect(() => {
    // Only run when camera is active, stream is available, and videoRef is attached
    if (isCameraActive && stream && videoRef.current) {
      console.log(
        "Camera active, stream ready, videoRef attached. Setting srcObject and playing."
      );
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;
      videoElement
        .play()
        .then(() =>
          console.log("Video playback started successfully via useEffect.")
        )
        .catch((err) => {
          console.error("Video play failed via useEffect:", err);
          toast.error("Could not start camera preview.");
          stopCameraStream(); // Clean up if play fails even here
        });
    } else {
      // Optional: Log why this effect didn't run
      // console.log(`Effect skipped: isCameraActive=${isCameraActive}, stream=${!!stream}, videoRef=${!!videoRef.current}`);
    }
  }, [isCameraActive, stream, stopCameraStream]); // Dependencies: run when these change

  // --- Photo Capture Logic ---
  const handleTakePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !stream) {
      toast.error("Camera not ready or stream missing.");
      return;
    }
    // Check if video has dimensions (indicates it's playing/loaded)
    if (
      videoRef.current.videoWidth === 0 ||
      videoRef.current.videoHeight === 0
    ) {
      toast.error("Video stream not fully loaded yet. Please wait a moment.");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      toast.error("Could not get canvas context.");
      return;
    }
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const fileName = `capture_${Date.now()}.jpg`;
          const capturedFile = new File([blob], fileName, {
            type: "image/jpeg",
          });
          setFile(capturedFile);

          if (preview) URL.revokeObjectURL(preview);
          const previewUrl = URL.createObjectURL(blob);
          setPreview(previewUrl);

          console.log("Photo captured:", capturedFile.name);
          stopCameraStream(); // Stop camera after taking photo
        } else {
          toast.error("Failed to capture image.");
        }
      },
      "image/jpeg",
      0.9
    );
  };

  // --- Form Submission ---
  // --- Form Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select or capture an image to upload");
      return;
    }
    const areaName = city; // Assuming 'city' holds the area name
    if (!areaName) {
      toast.error(
        locationError || "Unable to determine location. Location is required."
      );
      return;
    }

    setIsSubmitting(true);

    // Create FormData object (Browser's built-in)
    const formData = new FormData();
    formData.append("image", file); // Key matches backend ('image')
    formData.append("area_name", areaName); // Key matches backend ('area_name')

    // --- HARDCODED API URL ---
    const apiUrl = "https://41c5-106-221-210-77.ngrok-free.app/rate-image/";
    // --- END HARDCODED URL ---

    try {
      console.log("Submitting FormData to:", apiUrl);

      // Send the request using axios
      // REMOVED the 'headers' option - Browser handles it automatically
      const response = await axios.post<ApiResponse>(apiUrl, formData);

      console.log("Backend Response Status:", response.status);
      console.log("Backend Response Data:", response.data);

      // Process the successful response (This part was already correct)
      const result = response.data;
      const successMessage = `Area "${result.area_name}" rated successfully. Score: ${result.marks}/10. Found ${result.total_garbage_items} items (${result.garbage_coverage_percent}% coverage).`;
      onSuccess({ score: result.marks, message: successMessage });
      toast.success("Report submitted successfully!");
    } catch (error: any) {
      // Handle errors (This part was already correct)
      console.error("Upload failed:", error);
      let errorMessage = "Failed to upload report.";
      if (axios.isAxiosError(error) && error.response) {
        console.error("Backend Error Status:", error.response.status);
        console.error("Backend Error Data:", error.response.data);
        errorMessage =
          error.response.data?.detail ||
          `Server error: ${error.response.status}`;
      } else if (axios.isAxiosError(error) && error.request) {
        errorMessage =
          "No response from server. Check API URL and server status.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render Logic ---
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* --- Section 1: File Upload / Camera Button (Show when camera is OFF) --- */}
      {!isCameraActive && (
        <div className="space-y-4">
          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleOpenCamera}
              disabled={isSubmitting}
            >
              <Camera className="mr-2 h-4 w-4" /> Use Camera
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
            >
              <Upload className="mr-2 h-4 w-4" /> Choose file
            </Button>
          </div>
          <input
            id="photo-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Location */}
          {locationLoading ? (
            <div className="text-center p-4">
              <Loader2 className="animate-spin h-6 w-6 mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">
                Detecting location...
              </p>
            </div>
          ) : locationError ? (
            <div className="text-center text-destructive p-4 bg-destructive/10 rounded-lg">
              {locationError}
            </div>
          ) : city ? (
            <div className="flex items-center justify-center p-3 bg-muted rounded-lg text-sm">
              <Map className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Location: {city}</span>
            </div>
          ) : (
            <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-lg text-sm">
              Waiting for location...
            </div>
          )}

          {/* Preview or Placeholder */}
          {preview ? (
            <Card>
              <CardContent className="p-2 relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 bg-black/50 text-white hover:bg-black/75 z-10 rounded-full"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    if (preview) URL.revokeObjectURL(preview);
                  }}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
                <div className="aspect-video w-full overflow-hidden rounded-md">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-32">
                <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Use camera or choose file
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* --- Section 2: Camera View (Show when camera is ON) --- */}
      {isCameraActive && (
        <div className="space-y-4 border rounded-md p-4 bg-secondary/30">
          {/* The actual video feed */}
          <video
            ref={videoRef}
            className={`w-full aspect-video rounded-lg bg-black`}
            playsInline // Essential for mobile
            autoPlay // Should work with muted
            muted // Essential for autoplay
          />
          {/* Buttons for camera */}
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              onClick={handleTakePhoto}
              disabled={isSubmitting}
              className="flex-1"
            >
              <Camera className="mr-2 h-4 w-4" /> Take Photo
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={stopCameraStream}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel Camera
            </Button>
          </div>
        </div>
      )}

      {/* --- Section 3: Submit Button (Always visible, but disabled state changes) --- */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !file || (!locationLoading && !city)}
      >
        {isSubmitting ? (
          <>
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...{" "}
          </>
        ) : (
          <>
            {" "}
            Submit Report{" "}
            {file && city && <CheckCircle className="ml-2 h-4 w-4" />}{" "}
          </>
        )}
      </Button>
    </form>
  );
};

export default UploadForm;
