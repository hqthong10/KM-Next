'use client';
import { sendRequest } from '@/libs/request';
import { createArrayIndexes, shuffle } from '@/utils/helper';
import { Button } from '@nextui-org/react';
import { send } from 'process';
import { useEffect, useRef, useState } from 'react';

export default function WordLearn({ data }: { data: any[] }) {
    const [words, setWords] = useState<any[]>([]);
    const [word, setWord] = useState<any>({});
    const [wordIndexs, setWordIndexs] = useState<number[]>([]);
    const [show, setShow] = useState(false);
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        console.log('WordLearn useEffect', data.length);
        setWords(data);
    }, []);
    
    useEffect(() => {
        console.log('words', words.length);
        setup();
    }, [words]);

    useEffect(() => {
        makeCard();
    }, [current]);

    const setup = () => {
        createArrayIndexes(data.length);
        setWordIndexs((state) => state = [...shuffle(state)]);
        makeCard();
    }

    const makeCard = () => {
        setWord(data![wordIndexs[current-1]]);
    };

    const handleNext = () => {
        setShow(false);
        setCurrent((state) => state + 1);
        makeCard();
    };

    const handleShow = () => {
        setShow((state) => !state);
    };

    const speaking = (text: string) => {
        // Kiểm tra trình duyệt có hỗ trợ không
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);

            // Tùy chọn giọng nói
            utterance.lang = 'en-US'; // Tiếng Anh Mỹ (hoặc đổi thành 'vi-VN' cho tiếng Việt)
            utterance.rate = 1; // Tốc độ (0.1 - 10)
            utterance.pitch = 1; // Cao độ (0 - 2)

            window.speechSynthesis.speak(utterance);
        } else {
            console.error('Trình duyệt không hỗ trợ Text-to-Speech');
        }
    };

    const handleDoneWord = async () => {
        const res = await sendRequest<any>({
            url: '/api/words/done',
            method: 'POST',
            data: {
                PW100: word?.PW100 ?? 0,
                FN100: word?.FN100 ?? 0
            }
        });
        if (res?.data > 0) {
            handleNext();
        }
    };

    const handleUnDoneWord = async () => {
        const res = await sendRequest<any>({
            url: '/api/words/fresh',
            method: 'POST',
            data: {
                PW100: word?.PW100 ?? 0,
                FN100: word?.FN100 ?? 0
            }
        });

        if (res?.data > 0) {
            handleNext();
        }
    };

    return (
        <div className="word-learn flex flex-col w-full h-full bg-slate-300 p-2 gap-3">
            <div className="div-top">
                <span>
                    {current} / {words.length}
                </span>
            </div>
            <div className="div-btns flex justify-between">
                {word != null && word?.WN104 == 1 && (
                    <Button v-if="word !== null && word.WN104 == 1" color="warning" onPress={handleUnDoneWord}>
                        Học lại
                    </Button>
                )}
                {word != null && word?.WN104 != 1 && (
                    <Button color="success" onPress={handleDoneWord}>
                        Hoàn thành
                    </Button>
                )}

                <Button color="primary" onPress={() => speaking(word?.WV101)}>
                    Speak
                </Button>

                {show ? (
                    <Button color="primary" onPress={handleNext}>
                        next
                    </Button>
                ) : (
                    <Button color="primary" onPress={handleShow}>
                        Ket qua
                    </Button>
                )}
            </div>
            <div className="div-content flex flex-col justify-center items-center gap-2 pt-5">
                <div className="text">{word?.WV101 || ''}</div>
                <div className="text-info mt-3">{show ? word?.WV102 || '' : ''}</div>
            </div>
        </div>
    );
}
