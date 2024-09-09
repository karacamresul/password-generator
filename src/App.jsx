import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef();

  const generatePassword = useCallback(() => {
    //usecallbackte memorize olayı var
    let pass = ""; //oluşturulcak password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghıjklmnopqrstuvwxyz"; //deafult password items
    if (isNumberAllowed) str += "0123456789"; //number checkbox true ise numberları concat ediyoruz
    if (isCharAllowed) str += "!@#$%^&*()_+-/"; //char checkbox true ise caharları concat ediyoruz

    for (let i = 1; i <= length; i++) {
      //ekranda seçilen sliderın uzunluğu kadar dönecek
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
      //mat.random 0 ila 1 arası random sayı, str.lenght ile çarptığımızda  str uzunluğu ila 0 arası bir sayı oluşturdu. +1 ve floor yaparak sayıyı yuvarladık
      //char at iler stringin girilen değerindeki valuesuna ulaşır
    }

    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isCharAllowed]);

  function handleSlider(event) {
    setLength(event.target.value);
  }

  function handleCheckboxNumbers() {
    setIsNumberAllowed((prevState) => !prevState);
  }

  function handleCheckboxChars() {
    setIsCharAllowed((prevState) => !prevState);
  }

  function handleClickCopy() {
    window.navigator.clipboard.writeText(password); //copy butonuna tıklandığında inputdaki değeri kopyalar. password stateini çekiyor. wtiretext clipoboarda yazı yzıyor
    passwordRef.current.select();
  }

  function handleClickChange() {
    generatePassword();
  }

  return (
    <div className="items-container">
      <h2 className="title">Password Generator</h2>
      <div className="input-area">
        <input
          type="text"
          value={password}
          className="input-box"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        ></input>
        <button className="btn-copy" onClick={handleClickChange}>
          Change
        </button>
        <button className="btn-copy" onClick={handleClickCopy}>
          Copy
        </button>
      </div>
      <div className="slider">
        <input
          /* type range old zaman slider veriyo. sliderın min value 6 max value 20
        onchange de herhangi bir değişiklikte lenth i setliyoruz */
          type="range"
          min={6}
          max={20}
          value={length}
          name=""
          id=""
          className="slider-view"
          onChange={
            handleSlider
          } /* on change kullanıyorsak event objesini kullanmamız gerekir */
        />
        <label htmlFor="length"> Length: {length} </label>
      </div>
      <div className="checkbox">
        <input
          type="checkbox"
          name=""
          id=""
          defaultChecked={isNumberAllowed}
          onChange={handleCheckboxNumbers}
        ></input>
        <label htmlFor="number"> Numbers </label>
        <input
          type="checkbox"
          name=""
          id=""
          defaultChecked={isCharAllowed}
          onChange={handleCheckboxChars}
        ></input>
        <label htmlFor="charInput"> Characters </label>
      </div>
    </div>
  );
}

export default App;
