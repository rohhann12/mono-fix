// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Dashboard from "./m_page" // <-- yeh aapka client component hai

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    // Agar login nahi hai to sign-in page pe bhej do
    redirect("/")
  }

  return <Dashboard />
}
