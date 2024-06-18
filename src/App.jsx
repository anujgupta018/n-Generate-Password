import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [ch, setCh] = useState(false);
  const [password, setPassword] = useState(" ");

  const passwordGenerator = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) {
      str += "0123456789";
    }
    if (ch) {
      str += "!@#$%^&*()_+[}]{<>.,?/|-=~";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, num, ch, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, num, ch, passwordGenerator]);
  // useRef hook
  const passwordRef = useRef(null);
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-5 my-8 mb-4 text-orange-500 bg-gray-700">
        <h1 className="text-center text-white">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex-items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="Number Input"
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="Number Input">Numbers</label>
          </div>
          <div className="flex-items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={ch}
              id="Character Input"
              onChange={() => {
                setCh((prev) => !prev);
              }}
            />
            <label htmlFor="Character Input">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
