import Problems from "./_components/Problems"

const page = async ({searchParams } : {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {

  const search = await searchParams;

  return (
    <main className="w-[70%] m-auto flex flex-col gap-10 my-10">
      <Problems searchParams={search}/>
    </main>
  )
}

export default page