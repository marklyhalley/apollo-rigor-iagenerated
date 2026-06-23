# Apollo Rigor — Sistema de Gestão ERP

ERP para loja de ternos e roupas de casamento, gerado por IA como demonstração de iniciação científica.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

```bash
npm run build    # build de produção
npm run preview  # preview do build
```

## Módulos

- **Dashboard** — métricas em tempo real (peças, disponíveis, alugadas, faturamento)
- **Estoque** — cadastro, edição, exclusão e filtro por status
- **Vendas e Aluguéis** — registro de transações, devolução com criação automática de ajuste
- **Ajustes de Costura** — acompanhamento de status, conclusão devolve peça ao estoque
