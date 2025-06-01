# Conversor de Moedas em Tempo Real - Ionic 

Este projeto é um aplicativo móvel desenvolvido com o framework Ionic e Angular para conversão de moedas em tempo real, consumindo dados de uma API externa (ExchangeRate-API). 

## 📱 Funcionalidades 

- Conversão de moedas em tempo real usando taxas atualizadas de uma API REST. 
- Seleção de moeda de origem e destino com pesquisa. 
- Histórico de conversões salvo localmente. 
- Funcionalidade offline: utiliza a última taxa salva caso não haja conexão. 
- Validação de valor: impede conversão de valores nulos, zero ou negativos. 
- Interface responsiva e intuitiva. 
- Inversão rápida das moedas selecionadas. 
- Cores e tema personalizados. 

## 🚀 Tecnologias Utilizadas 

- Ionic Framework 
- Angular 
- ExchangeRate-API 
- Chart.js (para gráficos, se implementado) 
- Local Storage (para histórico/offline) 

## ⚙️ Instalação e Execução 

1. Clone o repositório: 
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ``` 

2. Instale as dependências: 
   ```bash
   npm install
   ``` 

3. Configure sua chave da API: 
   - Edite o arquivo `src/environments/environment.ts` e adicione sua chave da [ExchangeRate-API](https://www.exchangerate-api.com/): 
   ```typescript
   export const environment = {
     production: false,
     exchangeRateApiKey: 'SUA_API_KEY_AQUI'
   };
   ``` 
   - **Nunca compartilhe sua chave real em repositórios públicos!** 

4. Execute o app em modo desenvolvimento: 
   ```bash
   ionic serve
   ``` 

5. Para rodar no dispositivo: 
   ```bash
   ionic capacitor run android
   # ou
   ionic capacitor run ios
   ``` 

## 📂 Estrutura Principal 

src/ 
 ├── app/ 
 │    ├── pages/ 
 │    │    └── home/ 
 │    │         ├── home.page.ts 
 │    │         ├── home.page.html 
 │    │         └── home.page.scss 
 │    ├── pages/ 
 │    │    └── history/ 
 │    │         ├── history.page.ts 
 │    │         ├── history.page.html 
 │    │         └── history.page.scss 
 │    └── services/ 
 │         └── exchange-rate-api.service.ts 
 │         └── conversion-history.service.ts 
 └── environments/ 
      ├── environment.ts 
      └── environment.prod.ts 
 └── theme/ 
      └── variables.scss 

## 🛡️ Segurança 

- Não exponha sua chave da API em repositórios públicos. 
- Use arquivos de ambiente apenas localmente ou configure variáveis de ambiente em produção. 

## 📋 TODO 

- [x] Tela de histórico de conversões 
- [x] Funcionalidade offline completa 
- [ ] Gráfico de cotações 
- [ ] Tela de configurações 
- [ ] Melhorias de UX e tratamento de erros 

---

Desenvolvido para fins de estudo e demonstração. 
Sinta-se à vontade para contribuir! 