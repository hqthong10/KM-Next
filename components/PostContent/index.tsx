"use client"
import { useRef } from 'react';
import styles from './styles.module.css';
import MarkdownIt from "markdown-it";

export default function PostContent(props: any) {
    const post = props.data;

    const markdown = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true
      })
    

    return (
        <div className="flex flex-col bg-slate-50 p-2">
            <h1>{post.PV101}</h1>
            <div dangerouslySetInnerHTML={{ __html: markdown.render(post.PV102) }}></div>
        </div>
    )
}