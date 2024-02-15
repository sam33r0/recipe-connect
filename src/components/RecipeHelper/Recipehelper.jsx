import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import OpenAI from "openai"
import Message from './Message';
function Recipehelper() {
  const [message, setMessage] = useState([{
    role: "assistant",
    content: "I am an AI assistant and I am here to help you. How may I assist you today?",
  },{
    role: "user",
    content: "I am an AI assistant and I am here to help you. How may I assist you today?",
  }]);
  // const { register, handleSubmit, reset } = useForm({
  //   defaultValues: {
  //     content: ""
  //   },
  // });
  return (
    <div >
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
    </div>
  )
}

export default Recipehelper