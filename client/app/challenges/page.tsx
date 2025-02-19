import Challengs from "./_components/Challengs"
import { getChallenges } from "@/actions/challengeAction"

const page = async () => {

  const { result } = await getChallenges();

  return (
    <Challengs Data={result}/>
  )
}

export default page