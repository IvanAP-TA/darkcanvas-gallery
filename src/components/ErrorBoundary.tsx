import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
    
    // Don't report certain non-critical errors
    const nonCriticalErrors = [
      'Promised response from onMessage listener went out of scope',
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured'
    ];
    
    const isNonCritical = nonCriticalErrors.some(msg => 
      error.message?.includes(msg)
    );
    
    if (!isNonCritical) {
      // Only log critical errors
      console.error('Critical error caught by boundary:', error);
    }
  }

  public render() {
    if (this.state.hasError) {
      // Simple fallback UI - don't show error to users for non-critical issues
      const isNonCritical = this.state.error?.message?.includes('onMessage listener went out of scope');
      
      if (isNonCritical) {
        // For non-critical errors, just render children normally
        return this.props.children;
      }
      
      // For critical errors, show fallback
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-serif mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              We're sorry, but something unexpected happened.
            </p>
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
