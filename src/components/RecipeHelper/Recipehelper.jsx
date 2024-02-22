import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import OpenAI from "openai"
import { Input } from "../../@/components/ui/input"
import { Button } from "../../@/components/ui/button"
import { ScrollArea } from "../../@/components/ui/scroll-area"
import Message from './Message';
import { openAiAPI } from './../../envconfig';


function Recipehelper() {
  const scrRef= useRef(null);
  const openai = new OpenAI({ apiKey: openAiAPI, dangerouslyAllowBrowser: true });
  const [message, setMessage] = useState([{
    role: "assistant",
    content: "I am an AI assistant and I am here to help you. How may I assist you today?",
  }]);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: ""
    },
  });
  const submit = async (data) => {
    message.push({
      role: "user",
      content: data.content,

    })
    setMessage(message);
    reset();
    try {
      const completion = await openai.chat.completions.create({
        messages: message,
        model: "gpt-3.5-turbo",
      });
      message.push({
        role: 'assistant',
        content: completion.choices[0].message.content,
      })
      setMessage(message);
      reset();
    }
    catch (error) {
      console.log(error);
    }
    await scrRef.current?.scrollIntoView({ behavior: 'smooth' });

  }
  return (
    <div id="checking">
      <ScrollArea className="h-[500px] rounded-md">
        {message.map((item) => (
          item.role == "user" ?
            <div className='w-3/4 relative left-1/4' key={Math.random()}>
              <Message role={item.role} content={item.content} />
            </div>
            :
            <div className='w-3/4 relative ' key={Math.random()}>
              <Message role={item.role} content={item.content} />
            </div>
        ))}
        <span className="text-lime-200 " >bottom</span><br/>
        <span className="text-lime-200 " ref={scrRef}>bottom</span>
      </ScrollArea>
      <form onSubmit={handleSubmit(submit)} >
        <div className='flex flex-wrap '>
          <Input
            autoComplete="off"
            className='focus:outline-none focus:border-none w-5/6'
            {...register("content", { required: true })}
            type="text"
            placeholder="enter your question"
          />
          <Button className="w-1/6 z-100" variant="ghost">Send</Button>
        </div>
      </form>
    </div>
  )
}

export default Recipehelper