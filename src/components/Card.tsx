import type { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="card h1 text-center text-capitalize p-4 w-100 bg-info-subtle border-0 shadow-sm">
      {children}
    </div>
  );
}
