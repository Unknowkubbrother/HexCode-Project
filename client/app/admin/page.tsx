export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import AdminHome from "./_components/AdminHome";
import { getMyAccount } from "@/actions/profileAction";

export default async function page() {
  const { account } = await getMyAccount();

  if (account.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminHome/>
  )
}
