export default function Tabs({type, setType}) {
    return (
        <div className='flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl'>
            <button className={`${type === "repos" && "text-teal-400"}`} onClick={() => setType("repos")}>Repositories</button>
            <button className={`${type === "followers" && "text-teal-400"}`} onClick={() => setType("followers")}>Followers</button>
        </div>
    )
}
