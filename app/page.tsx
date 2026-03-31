// app/page.tsx
import { redirect } from "next/navigation";

// damit immer auf /herren gestartet wird
export default function Home() {
  redirect("/herren");
}
