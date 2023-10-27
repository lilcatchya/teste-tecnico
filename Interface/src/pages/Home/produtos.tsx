import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import IProduto from "../../interfaces/IProduto";
import axios from "axios";
import './produtos.css';

export default function Home() {

  const [produtos, setProdutos] = useState<IProduto[]>([])

  useEffect(() => {
    axios.get<IProduto[]>('http://localhost:8000/products')
      .then(resposta => {
        setProdutos(resposta.data)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, [])

  return (
    <main>

      <TableContainer>
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
                  <TableCell align="center">{produto.cost_price}</TableCell>
                  <TableCell align="center">{produto.sales_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>

    </main>
  )
}