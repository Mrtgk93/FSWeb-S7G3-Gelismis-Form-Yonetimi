import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import Form from "./Form";

function App() {
  const [kullanıcılar, setKullanıcılar] = useState([]);
  function uyeEkle(eklenenUye) {
    const yeniUye = [...kullanıcılar, eklenenUye];
    setKullanıcılar(yeniUye);
  }
  console.log("kullanıcılar listesi", kullanıcılar);
  return (
    <div className="App">
      <Form handleSubmitCallBack={uyeEkle} />
    </div>
  );
}

export default App;
