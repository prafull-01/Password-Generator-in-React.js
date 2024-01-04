import { useState, useCallback, useEffect, useRef } from "react";


function PassGen() {
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [spCharAllowed, setSpCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  let generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (spCharAllowed) str += "!@#`$%&'*+,-./";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, spCharAllowed, setPassword]);
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, spCharAllowed, generatePassword]);

  let refPassword = useRef(null);

  let copyPassword = useCallback(() => {
    refPassword.current?.select();
    refPassword.current?.setSelectionRange(0, 21);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="outer">
      <h2>Password Generator</h2>
      <div className="input">
        <input
          type="text"
          placeholder="Password"
          readOnly
          value={password}
          ref={refPassword}
        />
        <button className="copy" onClick={copyPassword}>
          Copy
        </button>
      </div>
      <div className="checkbox">
        <input
          type="range"
          min={8}
          max={20}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <label>{length} : Length </label>
        <input
          type="checkbox"
          value={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        />
        <label>Number</label>
        <input
          type="checkbox"
          value={spCharAllowed}
          onChange={() => {
            setSpCharAllowed((prev) => !prev);
          }}
        />
        <label>Special Character</label>
      </div>
    </div>
  );
}

export default PassGen;
