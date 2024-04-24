"use client"
import { useRef } from 'react';

export default function LearnComp(props: any) {
    const ref = useRef(0);

    function handleClick() {
        ref.current = ref.current + 1;
        alert('You clicked ' + ref.current + ' times!');
    }

    return (<div className="flex flex-col bg-slate-50 p-2">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        {props.children}
        <button onClick={handleClick}>
            Click me!
        </button>
    </div>)
}