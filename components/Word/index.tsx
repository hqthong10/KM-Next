"use client"
import { useRef } from 'react';

export default function WordComp({ data}: { data: any}) {

    return (
        <div className="flex flex-col bg-slate-100 p-2">
            <h1>{data.WV101}</h1>
            <p>{data.WV102}</p>
        </div>
    )
}