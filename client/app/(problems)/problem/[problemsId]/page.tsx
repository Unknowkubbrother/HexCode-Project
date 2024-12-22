
interface Props {
  params: {
    problemsId: string;
  }
}

export default function Page({params}: Props) {
  return (
    <div>pages problems {params.problemsId}</div>
  )
}
