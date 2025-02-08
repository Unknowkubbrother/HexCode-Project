// import React from 'react'
import Profile from "./_components/Profile"
import Challengs from "./_components/Challengs"
import Problem from "./_components/Problem"

const page = () => {
  return (
    <main className="w-full flex flex-col gap-5">
      <Profile/>
      <Challengs/>
      <Problem/>
    </main>
  )
}

export default page