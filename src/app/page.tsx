"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Alert, AlertDescription } from "~/components/ui/alert";
import {
  Upload,
  FileText,
  Key,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function DocumentProcessor() {
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [error, setError] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      setIsProcessed(false);
    }
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
    setError("");
  };

  const handleProcessDocument = async () => {
    // Validation
    if (!file) {
      setError("Please select a file to process");
      return;
    }

    if (!apiKey.trim()) {
      setError("Please enter your API key");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // Simulate API processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the file and API key to your processing endpoint
      // const formData = new FormData()
      // formData.append('file', file)
      // formData.append('apiKey', apiKey)
      // const response = await fetch('/api/process', { method: 'POST', body: formData })

      setIsProcessed(true);
    } catch {
      setError("Failed to process document. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setApiKey("");
    setIsProcessed(false);
    setError("");
    // Reset file input
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8 pt-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Document Processor
          </h1>
          <p className="text-gray-600">
            Upload your document and process it with AI
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Process Document
            </CardTitle>
            <CardDescription>
              Upload a file and provide your API key to process the document
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="file-input" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Select Document
              </Label>
              <Input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.md"
                className="cursor-pointer"
              />
              {file && (
                <p className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                  MB)
                </p>
              )}
            </div>

            {/* API Key Section */}
            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Key
              </Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  className="pr-10 font-mono"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowApiKey(!showApiKey)}
                  aria-label={showApiKey ? "Hide API key" : "Show API key"}
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <svg
                    className="mt-0.5 h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-blue-800">
                    Seguridad y Privacidad
                  </p>
                  <p className="text-sm text-blue-700">
                    Tu API key no se guarda en nuestras bases de datos. Se
                    utiliza únicamente para procesar tu documento y se elimina
                    inmediatamente después del procesamiento.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Message */}
            {isProcessed && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Document processed successfully! Your file &quot;{file?.name}
                  &quot; been analyzed and processed.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleProcessDocument}
                disabled={isProcessing || isProcessed}
                className="flex-1"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  "Process Document"
                )}
              </Button>

              {isProcessed && (
                <Button onClick={resetForm} variant="outline" size="lg">
                  Process Another
                </Button>
              )}
            </div>

            {/* Processing Info */}
            <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-500">
              <p className="mb-1 font-medium">Supported file types:</p>
              <p>PDF, DOC, DOCX, TXT, MD (Max size: 10MB)</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your files and API keys are processed securely and not stored.</p>
        </div>
      </div>
    </div>
  );
}
