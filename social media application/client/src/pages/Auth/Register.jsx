import { Link } from 'react-router-dom';
import { RegisterImage } from '../../assets'


const Register = () => {


    return (
        <div className="Register w-screen h-screen bg-purple-500 flex justify-center items-center " >
            <div className="card flex md:w-[70%] lg:w-[50%] bg-white rounded-[10px] max-h-[600px] overflow-hidden" >
                <div className="right w-[50%] flex-1 p-[32px] flex flex-col justify-center gap-[30px] " >
                    <h1 className="text-[#555] font-semibold text-[24px] " >Register</h1>
                    <form className="flex flex-col gap-[30px]  " >
                        <input type='text' placeholder='Username' className={` outline-none border-b-[1px] border-border ${isDarkMode && 'border-border-dark'} px-[10px] py-[20px] `} />
                        <input type='text' placeholder='Email' className={` outline-none border-b-[1px] border-border ${isDarkMode && 'border-border-dark'} px-[10px] py-[20px] `} />
                        <input type='text' placeholder='Confirm Password' className={` outline-none border-b-[1px] border-border ${isDarkMode && 'border-border-dark'} px-[10px] py-[20px] `} />
                        <input type='password' placeholder='Password' className={` outline-none border-b-[1px] border-border ${isDarkMode && 'border-border-dark'} px-[10px] py-[20px] `} />
                        <button className="w-[50%] p-[10px] border-none bg-purple-600 text-white font-bold " >Register</button>
                    </form>
                </div>
                <div style={{ backgroundImage: `url(${RegisterImage})` }} className={`left flex flex-col gap-[30px] text-white w-[50%] flex-1 bg-cover bg-center p-[32px] inset-0 bg-gradient-to-b from-blue-600 to-black opacity-75 `} >
                    <h1 className="text-[80px] leading-[70px] font-bold " >Lama Social.</h1>
                    <p className=" " >loremipsum dolar sit amet sonsectetur sdeipsicing elit. Libero cum alias tortam numquam ipsa exercitationem dignessimos, error nam, consequeaatur.</p>
                    <span className="text-[14px] " >Already have an account?</span>
                    <Link to='/login' ><button className="bg-white text-purple-600 p-[10px] border-none w-[50%] font-bold " >Login</button></Link>
                </div>
            </div>
        </div>
    )
}


export default Register;