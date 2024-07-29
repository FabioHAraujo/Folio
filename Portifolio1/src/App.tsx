import React, { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import "./App.css";
import Toggle from './components/Toggle';
import profileImage from './assets/fabio.jpg';

const App = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const [age, setAge] = useState(0);
  const [isProfessional, setIsProfessional] = useState(false);
  const [bio, setBio] = useState({ professionalBio: '', detailedBio: '' });

  const handleDownload = () => {
    // Cria um link temporário para download
    const link = document.createElement('a');
    link.href = '/curriculum_Fabio_Henrique.pdf';
    link.download = 'curriculum_Fabio_Henrique.pdf';
    link.click();
  };

  useEffect(() => {
    const birthDate = new Date('2000-08-18');
    const ageCalc = new Date().getFullYear() - birthDate.getFullYear();
    setAge(ageCalc);

    fetch('/bio.json')
      .then(response => response.json())
      .then(data => setBio(data));
  }, []);

  const services = [
    "Backup automático de pastas vitais do meu PC (NextCloud Server)",
    "Sincronização de pastas de trabalho, com ignore configurado para ignorar módulos como do node e java, a serem instalados de máquina a máquina (Syncthing server)",
    "Streaming acessível de qualquer dispositivo, incluso TV (Plex e Jellyfin)",
    "Gerência de Projetos (OpenProject)",
    "Documentação Pessoal (Outline)",
    "Lowcode pra desenvolvimento pontual (Tooljet)",
    "Proxy para meus domínios (4 domínios) e subdomínios (+ de 80) - (Nginx Proxy Manager)",
    "Portainer (anteriormente usava muito máquina virtuais e tinha meus servers com o proxmox, mas migrei tudo para docker a fim de gerir melhor os recursos)",
    "VPN de fácil acesso, mesmo a partir de celular (TailScale)",
    "Server de jogos (LinuxGSM)",
    "1 VM Dedicada puramente à desenvolvimento, única com SSH habilitado usando senha. É resetada periodicamente, assim que subo algo para minha própria \"produção\".",
    "Banco de Dados SQL (Oracle 21c XE e PostgresSQL)",
    "Banco de dados não relacional para cada aplicação (Pocketbase)",
    "Autenticação via OAuth (Pocketbase e Firebase)",
    "Vault de senhas (Bitwarden)"
  ];

  // Embaralhar a lista de serviços
  const shuffledServices = services.sort(() => 0.5 - Math.random());

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
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)}/>
        </div>
      </div>
      <h1 className='title'>Bem-Vindo ao Meu Currículo Virtual</h1>
      {/* // Sobre Mim */}
      <div className='about'>
        <div className='personal'>
          <img src={profileImage} alt="Fábio Henrique Araújo" className='profile-pic'/>
          <h2>Fábio Henrique Araújo</h2>
          <p>Idade: {age} anos (18/08/2000)</p>
          <p>Localização: Novo Hamburgo / RS</p>
        </div>
        <div className='services'>
          <h2>Sobre mim:</h2>
          <div className='container-switch'>
            <label className="switch">
              <input type="checkbox" checked={isProfessional} onChange={() => setIsProfessional(!isProfessional)} />
              <span className="slider"></span>
              Forma Profissional e Resumida? (Sim | Não)
            </label>
          </div>
          <p className='personal-text'>
            {isProfessional ? bio.professionalBio : bio.detailedBio}
          </p>
          <ul>
            {shuffledServices.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
