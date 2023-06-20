import { loginImage } from '../../assets'
import { Link } from 'react-router-dom';

const Login = () => {


    return (
        <div className="login w-screen h-screen bg-purple-500 flex justify-center items-center " >
            <div className="card flex md:w-[70%] lg:w-[50%] bg-white rounded-[10px] max-h-[600px] overflow-hidden" >
                <div style={{ backgroundImage: `url(${loginImage})` }} className={`left flex flex-col gap-[30px] text-white w-[50%] flex-1 bg-cover bg-center p-[40px] inset-0 bg-gradient-to-b from-blue-600 to-black opacity-75 `} >
                    <h1 className="text-[80px] leading-[80px] font-bold " >Hello World.</h1>
                    <p className=" " >loremipsum dolar sit amet sonsectetur sdeipsicing elit. Libero cum alias tortam numquam ipsa exercitationem dignessimos, error nam, consequeaatur.</p>
                    <span className="text-[14px] " >Dont' you have an account?</span>
                    <Link to="/register" > <button className="bg-white text-purple-600 p-[10px] border-none w-[50%] font-bold " >Register</button></Link>
                </div>
                <div className="right w-[50%] flex-1 p-[40px] flex flex-col justify-center gap-[30px] " >
                    <h1 className="text-[#555] font-semibold text-[24px] " >Login</h1>
                    <form className="flex flex-col gap-[30px]  " >
                        <input type='text' placeholder='Username' className=" outline-none border-b-[1px] border-gray-300 px-[10px] py-[20px] " />
                        <input type='password' placeholder='Password' className=" outline-none border-b-[1px] border-gray-300 px-[10px] py-[20px] " />
                        <button className="w-[50%] p-[10px] border-none bg-purple-600 text-white font-bold " >Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login;