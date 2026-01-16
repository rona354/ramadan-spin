import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleReload = () => {
    localStorage.clear();
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-night flex items-center justify-center p-4">
          <div className="w-full max-w-sm text-center">
            <span className="text-6xl block mb-4">😵</span>
            <h1 className="text-gold font-bold text-2xl mb-2">Oops!</h1>
            <p className="text-white/70 mb-6">
              Terjadi kesalahan. Coba refresh halaman.
            </p>
            <div className="flex gap-2">
              <button
                onClick={this.handleRetry}
                className="flex-1 py-3 rounded-xl bg-card text-white hover:bg-card/80"
              >
                Coba Lagi
              </button>
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 rounded-xl bg-gold text-night font-bold"
              >
                Reset App
              </button>
            </div>
            <p className="text-white/40 text-xs mt-4">
              Reset akan menghapus data tersimpan
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
