import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "./Button";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("TaskFlow Pro encountered an unexpected error.", error);
    console.error("Component error details:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
          <section
            role="alert"
            className="w-full max-w-md rounded-3xl border border-line bg-white p-7 text-center shadow-floating sm:p-9"
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <AlertTriangle size={27} aria-hidden="true" />
            </span>

            <h1 className="mt-5 text-xl font-extrabold text-ink-950">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm leading-6 text-ink-500">
              TaskFlow Pro ran into an unexpected problem. Try reloading the
              application. Your saved tasks are kept in browser storage when
              storage is available.
            </p>

            <Button
              className="mt-6 w-full"
              onClick={() => window.location.reload()}
              leftIcon={<RefreshCw size={16} aria-hidden="true" />}
            >
              Reload application
            </Button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
