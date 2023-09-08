import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import IProduto from "../../interfaces/IProduto";
import axios from "axios";

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
      {<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Preço de Custo&nbsp;(g)</TableCell>
              <TableCell align="right">Preço de Venda&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow
                key={produto.code}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell align="right">{produto.code}</TableCell>  
              <TableCell align="right">{produto.name}</TableCell>
              <TableCell align="right">{produto.cost_price}</TableCell>
              <TableCell align="right">{produto.sales_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </main>
  )
}