// import React from 'react'
import Profile from "./_components/Profile"
import Challengs from "./_components/Challengs"
import Problem from "./_components/Problem"

const page = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {

  const username = (await params).username;
  
  return (
    <main className="w-full flex flex-col gap-5">
      <Profile/>
      <Challengs/>
      <Problem/>
    </main>
  )
}


export default page