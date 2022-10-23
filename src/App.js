import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter'
import {Switch} from 'antd'
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from '@mui/material/Slider';
import {FaClipboard} from "react-icons/fa"

function App() {
  const [blackTheme, SetBlackTheme] = useState(true)
  const [passwdLength, SetpasswdLength] = useState(8)
  const [password, SetPassword] = useState("")
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const copynotify = () => {
    toast.success('Password Copy To Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: blackTheme ? "black":"white",
      });
  }

  const errornotify = () => {
    toast.error('!password content cannot be blank please select an option', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: blackTheme ? "black":"white",
      });
  }

  const toggle = () => {
    blackTheme ? SetBlackTheme(false):SetBlackTheme(true)
    console.log(blackTheme);
  }

  const generatePassword = () => {
      let password = ''
      for (let i = 0; i < passwdLength; i++) {
        let choice = random(0, 3)
        if (lowercase && choice === 0) {
          password += randomLower()
        } else if (uppercase && choice === 1) {
          password += randomUpper()
        } else if (symbols && choice === 2) {
          password += randomSymbol()
        } else if (numbers && choice === 3) {
          password += random(0, 9)
        } else {
          i--
        }
      }
      SetPassword(password)
  }

  const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }

  const randomLower = () => {
    return String.fromCharCode(random(97, 122))
  }

  const randomUpper = () => {
    return String.fromCharCode(random(65, 90))
  }

  const randomSymbol = () => {
    const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>"
    return symbols[random(0, symbols.length - 1)]
  }

  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme={`${blackTheme ? "black":"white"}`}
    />
    <div className={`h-screen ${blackTheme ? "bg-[#151515]":"bg-white"} flex flex-col items-center`}>
      <div className={`w-[30%] h-[25px] flex flex-row items-center justify-between mt-5`}>
        <span className={`${blackTheme ? "text-white":"text-[#151515]"} font-[300] text-2xl tracking-widest`}>
        <Typewriter
          words={["Generate a secure password"]}
          typeSpeed={0}
          cursor
          cursorStyle="|"
          cursorColor="#00ff41"
        />
        </span>
        <Switch onChange={toggle}/>
      </div>
      <div className={`relative text-[#00ff41] text-lg font-medium tracking-wider flex flex-row items-center pl-3 w-[30%] h-[35px] outline-none mt-10 bg-transparent border-[1px] shadow-xl shadow-[${blackTheme ? "white":"black"}] border-[${blackTheme ? "white":"black"}]`}>
        <input className="outline-none bg-transparent w-[100%] h-[100%] justify-center" value={password} type="text" readOnly/>
        <FaClipboard className="mr-3 cursor-pointer" onClick={() => {navigator.clipboard.writeText(password);copynotify()}}/>
      </div>
      <hr className={`w-[30%] mt-10 border-dashed border-[1px] ${blackTheme ? "border-white/50":"border-black/50"}`}/>
      <div className={`w-[30%] h-[200px] flex bg-transparent border-[1px] ${blackTheme ? "border-white/70":"border-black/70"} mt-10 flex flex-row items-center justify-between`}>
        <div className="w-[40%] h-[90%] flex flex-col ml-10 gap-2 justify-center">

        <div className="page__toggle">
          <label className="toggle">
            <input className={`toggle__input`} type="checkbox"/>
            <span className="toggle__label">
              <span className={`${blackTheme ? "text-white":"text-black"} toggle__text outline-none`} onClick={() => setUppercase(!uppercase)}>Uppercase</span>
            </span>
          </label>
        </div>

        <div className="page__toggle">
          <label className="toggle">
            <input className={`toggle__input`} type="checkbox" disabled checked/>
            <span className="toggle__label">
              <span className={`${blackTheme ? "text-white":"text-black"} toggle__text outline-none`} onClick={() => setLowercase(!lowercase)}>Lowercase</span>
            </span>
          </label>
        </div>

        <div className="page__toggle">
          <label className="toggle">
            <input className={`toggle__input`} type="checkbox"/>
            <span className="toggle__label">
              <span className={`${blackTheme ? "text-white":"text-black"} toggle__text outline-none`} onClick={() => setNumbers(!numbers)}>Numeric</span>
            </span>
          </label>
        </div>

        <div className="page__toggle">
          <label className="toggle">
            <input className={`toggle__input`} type="checkbox"/>
            <span className="toggle__label">
              <span className={`${blackTheme ? "text-white":"text-black"} toggle__text outline-none`} onClick={() => setSymbols(!symbols)}>Symbols</span>
            </span>
          </label>
        </div>
        </div>

        <div className="w-[60%] h-[90%] flex flex-col items-center justify-center bg-transparent mr-10">
        <h1 className="font-normal text-xl text-[#00ff41]">Passwd Length: {passwdLength}</h1>
        <Slider
          aria-label="Temperature"
          defaultValue={8}
          min={8}
          max={30}
          onChange={(e) => SetpasswdLength(e.target.value)}
        />
        </div>
      </div>
        <button className="p-3 rounded-sm mt-5 bg-[#00ff41]/50 hover:scale-90 transition-all duration-200" onClick={() => generatePassword()}>Generate Password</button>
    </div>
    </>
  );
}

export default App;