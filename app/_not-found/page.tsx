import { Suspense } from "react";
import NotFoundContent from "./NotFoundContent/page";


export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Lädt...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}