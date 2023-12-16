"use client"
import React, { useEffect, useState } from 'react'
import { socket,orderSocket } from './socket'
const page = () => {
  useEffect(()=>{
    orderSocket.on('connect',()=>{
      addMessage(`Connected with ${socket.id}`);
      setRoom(`Joined ${socket.id}`);
    });
    socket.on('connect',()=>{
      addMessage(`Connected with ${socket.id}`);
      setRoom(`Joined ${socket.id}`);
    });
    socket.on('receive',(msg)=>{
      addMessage(msg);
    });
    socket.emit('join-room','test',message=>{
      addMessage(`Joined ${message}`);
      setRoom(message);
    });
    console.log('zzzz')
  },[]);
  const [room, setRoom] = useState('');
  const [msgs, setMsgs] = useState([]);
  function addMessage(message){
    setMsgs((prevMsg)=>[...prevMsg,message])
  };
  function sendMessage(message,room){
    message.preventDefault();
    socket.emit('message',message.target[0].value,room);
  };
  function joinRoom(room){
    room.preventDefault();
    socket.emit('join-room',room.target[0].value,message=>{
      addMessage(message);
      setRoom(message);
    });
  };
  function privateRoom(event){
    event.preventDefault();
    socket.emit('message',event.target[0].value,event.target[1].value);
  };
  return (
    <div className='container'>
      <div className='content'>
        {msgs.map((each,index)=><p key={index} className='msg'>{each}</p>)}
      </div>
      <form onSubmit={(e)=>sendMessage(e,room)} className='func'>
        <p>Message</p>
        <input className='send btn' type='text'/>
        <button type='submit'>Send</button>
      </form>
      <form onSubmit={joinRoom} className='func'>
        <p>Room</p>
        <input className='join btn' type='text'/>
        <button type='submit'>Join</button>
      </form>
      <form onSubmit={privateRoom} className='func-pr'>
        <p>Message</p>
        <input className='send btn' type='text'/>
        <p>Room</p>
        <input className='join btn' type='text'/>
        <button type='submit'>Send Private</button>
      </form>
    </div>
  )
}

export default page