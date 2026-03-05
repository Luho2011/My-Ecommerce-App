"use client";
import { useSearchParams } from "next/navigation";

export default function NotFoundContent() {
  const params = useSearchParams();
  return <div>404 - Seite nicht gefunden. Query: {params.get("query")}</div>;
}