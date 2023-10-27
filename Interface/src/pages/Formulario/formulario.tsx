import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './formulario.css';
import Home from '../Home/produtos';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

interface batatinha {
  code: number,
  name: string,
  sales_price: number,
  new_price: number
}

export default function Formulario() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [produtos, setProdutos] = useState<batatinha[]>([])

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
      });

      setProdutos(response.data)

      setResponseMessage(`${<TableContainer>
        <Paper elevation={3} style={{ margin: '16px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: '#87CEEB' }}>
                <TableCell align="center">Código</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Preço de Custo</TableCell>
                <TableCell align="center">Preço de Venda</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow
                  key={produto.code}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{produto.code}</TableCell>
                  <TableCell align="center">{produto.name}</TableCell>
                  <TableCell align="center">{produto.sales_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>
        }`);

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
        {responseMessage &&
          <p>{responseMessage}</p>}
      </div>
    </div>
  );
}