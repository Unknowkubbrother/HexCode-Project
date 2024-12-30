import Problem from "./_components/Problem";
interface Props {
  params: {
    problemsId: string;
  }
}

export default async function Page({params}: Props) {

  return (
    <div className="w-full h-full">
      <Problem params={params}/>
    </div>
  )
}
