import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './formulario.css';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import IProduto from '../../interfaces/IProduto';

interface produtos2 {
  code: number,
  new_price: number
}

export default function Formulario() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<JSX.Element | null>(null);
  const [produtos, setProdutos] = useState<IProduto[]>([])
  const [produtos2, setProdutos2] = useState<produtos2[]>([])

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
      const response = await axios.put('http://localhost:8000/products/atualizar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      const dadosDoBanco = response.data.dadosDoBanco
      const dadosEnviados = response.data.dadosRecebidos
      const erros = response.data.erros
      ;
      
      setProdutos(dadosDoBanco)
      setProdutos2(dadosEnviados)

      const responseContent = (
        <TableContainer component={Paper} elevation={3} style={{ margin: '16px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: '#87CEEB' }}>
                <TableCell align="center">Código</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Preço Anterior</TableCell>
                <TableCell align="center">Novo Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos2.map((produto, i) => (
                <TableRow key={produto.code} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{produto.code}</TableCell>
                  <TableCell align="center">{produtos[i].name}</TableCell>
                  <TableCell align="center">{produtos[i].sales_price}</TableCell>
                  <TableCell align="center">{produto.new_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

      setResponseMessage(responseContent);
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
      alert('Erro ao enviar o arquivo.');
    }
  };

  return (
    <div className='divQueEnglobaTudo'>
      <Link to={`/`}><button>Voltar</button></Link>
      <h1>Formulário de Envio de Arquivo CSV</h1>
      <form onSubmit={handleSubmit}>
        <div className='divDoInput'>
          <label htmlFor="fileInput">Selecione um arquivo</label>
          <input
            type="file"
            id="fileInput"
            name="fileInput"
            onChange={handleFileChange}
            accept=".csv"
          />
          <button type="submit">Enviar Arquivo</button>
        </div>
      </form>
      <div className='divDaResposta'>
        {responseMessage}
      </div>
    </div>
  );
}