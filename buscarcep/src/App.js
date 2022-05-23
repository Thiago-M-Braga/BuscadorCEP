import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './styles.css'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function alerts() {
    if (input === '') {
      alert('Insira algum CEP!');
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
    } catch {
      alert("Insira um CEP válido!")
      setInput("");
    }
  }

  async function limpar() {
    window.location.reload();
  }

  return (
    <div className="Container">

      <h1 className="title">Buscar CEP</h1>

      <div className="ContainerInput">

        <input type="text" placeholder="Digite o CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)} />

        <button className="Botao" onClick={alerts}>
          <FiSearch size={25} color="#fff" />
        </button>

      </div>

      {Object.keys(cep).length > 0 && (
        <div className="ContainerInfos">
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
          <button className="BotaoLimpar" onClick={limpar}>Limpar</button>
        </div>
      )}

    </div>
  );
}

export default App;
