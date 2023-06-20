import { Link, NavLink } from "react-router-dom"
import { SiShopware } from "react-icons/si"
import { MdOutlineCancel } from "react-icons/md"
import { TooltipComponent } from "@syncfusion/ej2-react-popups"
import { useStateContext } from "../contexts/ContextProvider"
import { links } from "../data/dummy"
const activeMenu = true;
const activeLink = 'flex item-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 '    // border-radius:8px - rouded-lg
const normalLink = 'flex item-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 '

const Sidebar = () => {

    const { setActiveMenu, activeMenu, screenSize, currentColor } = useStateContext()


    const handleCloseSidebar = () => {      // this functin is for whenever we click certain navLink of sidebar - we have to close the sidebar
        if (activeMenu && screenSize <= 900) {      // screenSize<=900 - mobile screen
            setActiveMenu(false)
        }
    }





    return (
        <div className="ml:3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10" >
            {
                activeMenu &&
                <>

                    {/* Logo and title */}
                    <div className="flex justify-between items-center " >
                        {/* title */}
                        <Link to="/" onClick={handleCloseSidebar} className="item-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900 " >   {/* tracking-tight - letter-spacing:-.25rem */}
                            <SiShopware /> <span>Shoppy</span>
                        </Link>
                        {/* sidebar close icon */}
                        <TooltipComponent content="Menu" position="BottomCenter" >
                            <button type="button" onClick={() => setActiveMenu((prev) => !prev)}
                                className="text-2xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                            >
                                <MdOutlineCancel />
                            </button>
                        </TooltipComponent>
                    </div>


                    {/* all sidebar items */}
                    <div className="mt-10" >
                        {
                            links.map((item) => (
                                <div key={item.title}>
                                    <p className="text-gray-400 m-3 mt-4 uppercase"  >
                                        {item.title}
                                    </p>
                                    {
                                        item.links.map((link) => (
                                            <NavLink
                                                to={`/${link.name}`}
                                                key={link.name}
                                                onClick={handleCloseSidebar}
                                                style={({ isActive }) => ({ backgroundColor: isActive && currentColor })}   // isActive byDefault provided by NavLink component of react-router-dom
                                                className={({ isActive }) => isActive ? activeLink : normalLink}
                                            >
                                                {link.icon}
                                                <span className="capitalize" >{link.name}</span>
                                            </NavLink>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </>

            }
        </div>
    )
}

export default Sidebar
