import React, { ErrorInfo } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

/* 클래스형 컴포넌트 제네릭에 { children: React.ReactNode } 명시
fallback도 명시하여 입력하여야 함 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  ErrorBoundaryState
> {
  /* constructor props에도 { children: React.ReactNode } 명시
  fallback도 명시하여 입력하여야 함 */
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 에러 로깅 또는 서버로 전송하는 등의 작업 수행
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <div>오류가 발생했습니다.</div>; // 대체 UI 표시
    }

    return this.props.children; // 자식 컴포넌트 반환
  }
}

export default ErrorBoundary;
