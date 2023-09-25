"use client";
import ReactTypingEffect from 'react-typing-effect';

export default function HeroTyping() {
    const tsent = ["Engage Visitors", "Get More Leads", "Without Coding"];

    return <ReactTypingEffect text={tsent} speed={70} eraseSpeed={10} eraseDelay={1000} typingDelay={100} className='font-bold' />
}