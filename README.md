# Exemplo de Servidor MCP

Criado para fins educacionais no canal Código Fonte TV, este projeto demonstra como construir um servidor MCP com integração a APIs externas e validação de dados.

Este repositório contém um exemplo de implementação de um servidor MCP (_Model Context Protocol_) em Node.js/TypeScript, que fornece duas ferramentas para obter informações meteorológicas usando a API do National Weather Service (NWS) dos EUA.

## Funcionalidades

- **get-alerts**: Retorna alertas meteorológicos ativos para um estado (código de duas letras, ex: `CA`, `NY`).
- **get-forecast**: Retorna a previsão do tempo para coordenadas geográficas (latitude, longitude).
- Validação de entrada usando [Zod](https://github.com/colinhacks/zod).
- Integração com a API do NWS usando `fetch` (camada de infraestrutura).
- Comunicação via _stdio_ usando o protocolo MCP (`@modelcontextprotocol/sdk`).

## Arquitetura

O projeto segue uma arquitetura em camadas inspirada em padrões de **Domain-Driven Design** (DDD):

- **Domain** (`src/domain`):
  Definição de interfaces e tipos que representam as estruturas de dados (ex: `AlertFeature`, `ForecastPeriod`, `AlertsResponse`).

- **Infrastructure** (`src/infrastructure`):
  Implementação de serviços externos, como o `NWSApiService`, responsável por realizar as chamadas HTTP à API do NWS.

- **Application** (`src/application`):
  Contém a lógica de negócio no `WeatherService`, que processa e formata os dados vindos da infraestrutura.

- **Interface** (`src/interface`):
  Inclui controladores (`WeatherToolsController`) que registram as ferramentas no servidor MCP, definem schemas de validação e retornam os resultados.

- **Entry Point** (`src/main.ts`):
  Inicializa o `McpServer`, configura o transporte (`StdioServerTransport`), instancia serviços e controladores, e inicia escuta em _stdio_.

A estrutura de pastas é a seguinte:

```
src/
├── domain/
│   └── models/           # Interfaces de domínio
├── infrastructure/
│   └── services/         # Implementações da API externa (NWS)
├── application/
│   └── services/         # Lógica de negócio e formatação de dados
├── interface/
│   └── controllers/      # Registro das ferramentas MCP e validação
└── main.ts               # Ponto de entrada do servidor
build/                     # Código JavaScript compilado
```

## Instalação

```bash
git clone <REPOSITÓRIO_URL>
cd mcp-server-sample
npm install
npm run build
```

## Uso

Após o build, você pode executar o servidor diretamente:

```bash
node build/main.js
```

Ou, se registrado como binário (`weather`):

```bash
npm link
weather
```

O servidor iniciará na saída padrão (_stdio_) e aguardará requisições MCP.

## Contribuição

Pull requests são bem-vindos! Sinta-se à vontade para abrir issues e discutir melhorias.

## Código Fonte TV

Para mais detalhes sobre a implementação, assista ao vídeo no canal [Código Fonte TV](https://youtu.be/NUOzYPSNaNk).
