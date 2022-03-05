import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Repo from '../components/Repo';
import Tabs from '../components/Tabs';
import Loading from '../components/Loading';
import UsersContainer from '../components/UsersContainer';

export default function UserInfo() {
    const [user, setUser] = useState([]);
    const [type, setType] = useState("Repos");
    const [infos, setInfos] = useState([]);
    const [loading, setLoading] = useState(null);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    let BaseURL = 'https://api.github.com/users'; 

    async function GetUserInfo() {
        const res = await fetch(BaseURL + pathname); 
        const data = await res.json();
        setUser(() => [data]);
    }

    async function GetUrls() {
        setUser([]);
        setLoading(true)
        const res = await fetch(BaseURL + pathname + `/${type}`);
        const data = await res.json();
        setInfos(data);
        setLoading(null);
    }

    useEffect(() => {
        GetUserInfo();
        GetUrls();
    }, [pathname, type]);

    return (
       <div className='py-5'>
           <button onClick={() => navigate('/')} className='px-4 py-1 font-medium mx-1 my-4 bg-gray-600 rounded text-gray-200'>Back</button>
           {user && user?.map((uinfo, i) => (
               <div key={i} className="flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10">
                   <img src={uinfo.avatar_url} className='w-[350px] border-4 border-teal-400 md:mx-0 mx-auto'/>
                   <div className='text-lg px-3 leading-10'>
                       <h1 className='text-3xl pb-4'>{uinfo?.name}</h1>
                       <h1><span className='text-teal-400'>ID: </span>{uinfo?.id}</h1>
                       <h1><span className='text-teal-400'>Username: </span>{uinfo?.login}</h1>
                       <h1><span className='text-teal-400 '>Location: </span>{uinfo?.location}</h1>
                       <h1><span className='text-teal-400 '>Blog: </span><a className='text-blue-500 hover:text-blue-700' href={uinfo?.blog} rel="noreferrer" target='_blank'>{uinfo?.blog}</a></h1>
                       <h1><span className='text-teal-400 '>Followers: </span>{uinfo?.followers}</h1>
                       <h1><span className='text-teal-400 '>Public Repos: </span>{uinfo?.public_repos}</h1>
                       <a href={uinfo?.html_url} target='_blank' rel="noreferrer" className='text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-gray-600 my-3 tracking-wide'>Visit</a>
                   </div>
               </div>
           ))}

            <div className='flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl'> 
               <Tabs type={type} setType={setType} />     
            </div>

            {loading && <Loading />}
            
            {type === 'repos' && (
                <div className='grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto'>
                  {infos && <Repo repos={infos} />}
                </div>
            )} 

            {type === 'followers' && (
                <div>
                    <UsersContainer users={infos} />
                </div>
            )}
       </div> 
    )
}
