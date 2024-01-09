import Navbar from "@/components/Navbar/Navbar"


const HomeLayout=({ children,
}: {
    children: React.ReactNode
}
) =>{

    return (
        <div className='Home'>
           <Navbar/>
           {children}
        </div>
    )
}
export default HomeLayout