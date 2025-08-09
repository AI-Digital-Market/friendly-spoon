import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";

// Icons removed per project policy

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  // When encountering an error in the development mode, rethrow it and don't display the boundary.
  // The parent UI will take care of showing a more helpful dialog.
  if (import.meta.env.DEV) throw error;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <strong>This spark has encountered a runtime error</strong>
          <p>Something unexpected happened while running the application. The error details are shown below. Contact the spark author and let them know about this issue.</p>
        </div>
        
        <div className="bg-card border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2">Error Details:</h3>
          <pre className="text-xs text-destructive bg-muted/50 p-3 rounded border overflow-auto max-h-32">
            {error.message}
          </pre>
        </div>
        
        <button 
          onClick={resetErrorBoundary} 
          className="w-full mt-3 px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
