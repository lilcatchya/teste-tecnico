import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Formulario() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Selecione um arquivo antes de enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/products/validar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseMessage(`Arquivo enviado com sucesso. Resposta do servidor: ${response.data}`);
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
      alert('Erro ao enviar o arquivo.');
    }
  };

  return (
    <div>
      <Link to={`/`}><button>Voltar</button></Link>
      <h1>Formulário de Envio de Arquivo CSV</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileInput">Selecione um arquivo CSV:</label>
          <input
            type="file"
            id="fileInput"
            name="fileInput"
            onChange={handleFileChange}
            accept=".csv"
          />
        </div>
        <div>
          <button type="submit">Enviar Arquivo CSV</button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}