import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    // Clear caches and reload
    if ('serviceWorker' in navigator) {
      caches.keys().then((names) => {
        for (const name of names) caches.delete(name);
      });
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="w-10 h-10" />
            </div>
            
            <h1 className="text-2xl font-black text-slate-900 mb-4">
              عذراً، حدث خطأ غير متوقع
            </h1>
            
            <p className="text-slate-500 font-bold mb-8 leading-relaxed">
              واجه التطبيق مشكلة تقنية. يرجى محاولة إعادة تحميل الصفحة أو العودة للرئيسية.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                إعادة تحميل الصفحة
              </button>
              
              <button
                onClick={this.handleReset}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                العودة للرئيسية وتنظيف الكاش
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 pt-8 border-t border-slate-50 text-left">
                <p className="text-[10px] font-mono text-slate-400 break-all overflow-hidden">
                  {this.state.error?.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
