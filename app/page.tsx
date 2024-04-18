"use client"
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import useSWR from 'swr'




export default function Home() {
  const fetcher = (url:any) => fetch(url).then(r => r.json())
  const { data, error } = useSWR('/api/users', fetcher);
  if(error) return <div>failed to load</div>;
  if(!data) return <div className=' h-screen w-screen justify-center items-center'><h1>loading...</h1></div>;
  return (

    <main className="w-screen h-screen bg-zinc-800">
      <div className=" absolute bottom-0 right-0 " > 
        <button className=' flex  items-center justify-center p-3' onClick={()=>signOut()}>

          <Image src="/logout.png" width={40} height={40}  alt="logout" className="  invert m-3" />
        </button>
      </div>
      <h1 className="text-center font-extrabold text-3xl  ">All Active users at our platform</h1>
      <div className=' w-full h-fit grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5'>
        {data.map((user:any) => (
          <div key={user.id} className="flex  flex-col  p-12 bg-orange-500  h-32 border-[1px] m-3 rounded-lg ">

            <p className="text-2xl font-bold text-center">{user.username}</p>
             <span className=' text-center ' >Email: <p className="text-sm inline">{user.email}</p></span>

          </div>
        ))}
      </div>
    </main>
  );
}
