import { useEffect } from "react";


export function useLockBody() {
  useEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = originalStyle);
  }, []);
}
