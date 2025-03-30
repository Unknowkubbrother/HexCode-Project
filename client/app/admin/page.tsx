import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Users, ShieldPlus, ShieldCheck, FolderKanban } from 'lucide-react';
import ManageUsers from "./_components/ManageUsers";
import MangeVerify from "./_components/MangeVerify";

export default function page() {
  return (
    <main className="w-full h-full">
      <header>
        <div className="w-[90%] m-auto mt-10 mb-5">
          <span className="flex justify-start items-center gap-2">
            <ShieldPlus size={30} className="text-primary" />
            <h1 className="text-2xl font-semibold">Admin</h1>
          </span>
        </div>
      </header>
      <Tabs defaultValue="users" className="w-[90%] m-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <div className="flex items-center justify-center">
              <FolderKanban className="mr-2" />
              <span>OverView</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="users">
            <div className="flex items-center justify-center">
              <Users className="mr-2" />
              <span>Users</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="verify">
            <div className="flex items-center justify-center">
              <ShieldCheck className="mr-2" />
              <span>Verify</span>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          a
        </TabsContent>
        <TabsContent value="users">
          <ManageUsers/>
        </TabsContent>
        <TabsContent value="verify">
          <MangeVerify/>
        </TabsContent>
      </Tabs>
    </main>
  )
}
