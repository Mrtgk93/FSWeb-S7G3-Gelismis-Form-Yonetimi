import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";

const formSchema = Yup.object().shape({
  isim: Yup.string()
    .required("İsim alanı zorunludur")
    .min(3, "İsim en az 3 karakter olmalı"),
  soyisim: Yup.string()
    .required("Soyisim alanı zorunludur")
    .min(3, "Soyisim en az 3 karakter olmalı"),
  email: Yup.string()
    .email("Lütfen geçerli bir email adresi girin")
    .required("Email alanı zorunludur"),
  sifre: Yup.string().required(
    "şifre alanı zorunludur!  sifrenizi kimseyle paylaşmayın!!!"
  ),

  kosulKabul: Yup.boolean().oneOf(
    [true],
    "Uygulamayı kullanmak için koşulları kabul etmelisiniz"
  ),
});

export default function Form(props) {
  const { handleSubmitCallBack } = props;
  const [kullanicilar, setKullanicilar] = useState([]);
  const [uye, setUye] = useState({
    isim: "",
    soyisim: "",
    email: "",
    sifre: "",
    kosulKabul: false,
  });
  const [buttonDisabledMi, setButtonDisabledMi] = useState(true);
  useEffect(() => {
    formSchema.isValid(uye).then((valid) => setButtonDisabledMi(!valid));
  }, [uye]);

  const [errors, setErrors] = useState({
    isim: "",
    soyisim: "",
    email: "",
    sifre: "",
    kosulKabul: "",
  });

  const checkFormErrors = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  function handleChange(e) {
    let valueToUse =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    checkFormErrors(e.target.name, valueToUse);
    setUye({
      ...uye,
      [e.target.name]: valueToUse,
    });
  }

  console.log(errors);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(uye);
    console.log("submitted!");
    axios
      .post("https://reqres.in/api/users", uye)
      .then((res) => {
        setKullanicilar([...kullanicilar, res.data]);
        // setPost(res.data); // get just the form data from the REST api
      })
      .catch((err) => console.log(err.response));
    return handleSubmitCallBack(uye);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Kayıt Formu</legend>
          <p>
            <label>
              İsim:
              <input
                onChange={handleChange}
                type="text"
                id="fisim"
                name="isim"
                data-cy="dataisim"
                value={uye.isim}
              />
            </label>
          </p>
          {errors.isim !== "" && <div>{errors.isim}</div>}
          <p>
            <label>
              Soyisim:
              <input
                onChange={handleChange}
                type="text"
                id="fsoyisim"
                name="soyisim"
                value={uye.soyisim}
              />
            </label>
          </p>
          {errors.soyisim !== "" && (
            <div>{errors.soyisim /* su yazımı kontrol et */}</div>
          )}
          <p>
            <label>
              e-mail:
              <input
                onChange={handleChange}
                type="email"
                id="femail"
                name="email"
                data-cy="dataemail"
                value={uye.email}
              />
            </label>
          </p>
          {errors.email !== "" && <div>{errors.email}</div>}
          <p>
            <label>
              şifre:
              <input
                onChange={handleChange}
                type="password"
                id="fsifre"
                name="sifre"
                data-cy="datasifre"
                value={uye.sifre}
              />
            </label>
          </p>
          {errors.sifre !== "" && <div>{errors.sifre}</div>}
          <p className="form-line">
            <label htmlFor="kosul">
              Koşulları kabul ediyorum
              <input
                type="checkbox"
                id="kosul"
                name="kosulKabul"
                data-cy="datacheckbox"
                onChange={handleChange}
                checked={uye.kosulKabul}
              />
            </label>
          </p>
          {errors.kosulKabul !== "" && <div>{errors.kosulKabul}</div>}
          <button type="submit" data-cy="datasubmit">
            Gönder
          </button>
        </fieldset>
      </form>
    </div>
  );
}
