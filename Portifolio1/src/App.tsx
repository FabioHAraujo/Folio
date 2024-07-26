import React, { useState } from 'react'
import useLocalStorage from 'use-local-storage';
import "./App.css";
import Toggle from './components/Toggle';

export const App = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference)

  const handleDownload = () => {
    // Cria um link temporário para download
    const link = document.createElement('a');
    link.href = '/curriculum_Fabio_Henrique.pdf';
    link.download = 'curriculum_Fabio_Henrique.pdf';
    link.click();
  };
  
  return (
    <div className='App' data-theme={isDark ? "dark" : "light"}>
      {/* // Header */}
      <div className='header'>
        <div className='logo'>
          <img src={isDark ? "logo-dark.svg" : "logo-light.svg"} alt="logo" width={160}/>
        </div>
        <div className='options'>
          <button className='buttons'>Sobre Mim</button>
          <button className='buttons'>Projetos</button>
          <button className='buttons'>Contato</button>
          <button className='buttons download' onClick={handleDownload}>Baixe Meu Currículo</button>
          <Toggle isChecked={isDark} handleChange={()=>setIsDark(!isDark)}/>
        </div>
      </div>
      <h1 className='title'>Bem-Vindo ao Meu Currículo Virutal</h1>
      <div className='box'>
        <h2>Até o fim do dia será um portifólio</h2>
      </div>
    </div>
  )
}
