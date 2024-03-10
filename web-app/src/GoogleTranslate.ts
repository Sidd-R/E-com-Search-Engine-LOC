"use client"
import { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import { getCookie,hasCookie, setCookie } from 'cookies-next';

const languages = [
  {label: 'English', value:'/auto/en'},
  {label: `Русский`, value:'/auto/ru'},
{label: 'Polski', value:'/auto/pl'} ];

export default function GoogleTranslate() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
}, [])

if(hasCookie('googtrans')){
  setSelected(getCookie('googtrans'))
  }
  else{
  setSelected('/auto/en')
  }
  return (
    <SelectPicker
      data={languages}
      value={lang}
      onChange={setLang}
      style={{ width: 224 }}
    />
  );
}
```