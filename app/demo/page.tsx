'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import axios from 'axios';


export default async function Demo() {
  const [text, setText] = useState('');
  const [transInp, setTransInp] = useState('');
  const [transOut, setTransOut] = useState('');

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const pronounce = () => {
    // Kiểm tra trình duyệt có hỗ trợ không
    if ('speechSynthesis' in window) {
        const textToSpeak = "Hello, this is a free text-to-speech feature.";
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        // Tùy chọn giọng nói
        utterance.lang = "en-US"; // Tiếng Anh Mỹ (hoặc đổi thành 'vi-VN' cho tiếng Việt)
        utterance.rate = 1;       // Tốc độ (0.1 - 10)
        utterance.pitch = 1;      // Cao độ (0 - 2)

        window.speechSynthesis.speak(utterance);
    } else {
        console.error("Trình duyệt không hỗ trợ Text-to-Speech");
    }
  }

  const speaking = () => {
      // Kiểm tra trình duyệt hỗ trợ Web Speech API
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRecognition();

          recognition.lang = "en-US"; // Ngôn ngữ (có thể đổi thành 'vi-VN' cho tiếng Việt)
          recognition.interimResults = false; // Kết quả cuối cùng
          recognition.maxAlternatives = 1; // Số lượng kết quả thay thế

          // Bắt đầu nghe
          recognition.start();

          recognition.onresult = (event: any) => {
              const transcript = event.results[0][0].transcript; // Văn bản chuyển đổi
              setText(transcript);
          };

          recognition.onerror = (error: any) => {
              console.error("Lỗi nhận diện giọng nói: ", error);
          };
      } else {
          console.error("Trình duyệt không hỗ trợ Speech-to-Text");
      }
  }

  async function translate() {
      const text = 'hi guy';
      const targetLang = 'vi';
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

      const response = await axios.get(url);
      const translatedText = response.data[0][0][0];
      setTransOut(translatedText)
  }

  

  return (
    <main className="flex min-h-screen flex-col p-4 bg-white">
      <div className='flex flex-col gap-3 bg-slate-200 w-[450px] p-4'>

        <Button color="primary" onClick={pronounce}>sound</Button>
        <div> 
          <p>{text}</p>
          <Button color="primary" variant="solid" className='bg-primary' onClick={speaking}>speak</Button>
        </div>
        <div>
          <Input />
          <p>{transOut}</p>
          <Button color="primary" onClick={() => translate()}>transtale</Button>
        </div>

      </div>
    </main>
  );
}
