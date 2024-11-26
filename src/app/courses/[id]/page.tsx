import { useRouter } from 'next/router';
 
export default function Page({ params }: { params: { id: string | number } }) {


//   const router = useRouter()
  return <p>Post: {params.id}</p>
}