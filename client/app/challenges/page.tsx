import Challengs from "./_components/Challengs"
import { getChallenges } from "@/actions/challengeAction"
const page = async () => {

  const { result } = await getChallenges();
  console.log(result);

  return (
    <Challengs Data={result}/>
  )
}

export default page