
# Projeto Brose – Sistema de Contagem e Classificação Automática de Peças Automotivas




## 📌 Visão Geral
O Projeto Brose é um sistema desenvolvido para automatizar a contagem e categorização de peças automotivas na linha de produção. Ele utiliza técnicas de visão computacional e inteligência artificial para detectar, identificar e contabilizar peças em tempo real, reduzindo erros manuais e aumentando a eficiência operacional.
## 🚨 Problema
A contagem manual de peças automotivas no chão de fábrica gera:

- Erros humanos frequentes

- Retrabalho

- Falta de precisão em tempo real

- Dificuldades no controle e monitoramento

- Redução da produtividade e confiabilidade dos processos

Esse cenário compromete a gestão da produção e dificulta tomadas de decisão rápidas e assertivas.
## 💡 Solução
O projeto oferece uma solução automática baseada em IA, utilizando modelos de detecção de objetos para:

- Realizar contagem automática das peças

- Classificar os itens em categorias pré-definidas

- Minimizar falhas humanas

- Fornecer dados mais precisos, ágeis e acessíveis

- Otimizar o fluxo operacional da equipe responsável pela contagem
## Arquitetura Geral

O sistema é composto por dois módulos principais:

## 1️⃣  brose_app

Responsável pela camada de aplicação e gerenciamento das peças cadastradas.
Inclui:

- **Back-end (Flask + SQLAlchemy)**
  Gerencia rotas, regras de negócio, controle de peças, registros  e geração de relatórios.

- **Front-end (HTML, CSS e JavaScript)**
  Oferece uma interface para gerenciamento das peças cadastradas,  permitindo operações completas de *CRUD: criação, leitura, atualização e exclusão de forma simples e organizada.*

## 2️⃣ yolo_app

Módulo dedicado exclusivamente ao processamento de imagens e reconhecimento de peças utilizando:

- **YOLO (Ultralytics)** para detecção de objetos.

- **OpenCV** para leitura, captura e manipulação de imagens.
## 📂 Estrutura Completa do Projeto

```bash
├── brose_app
│   ├── backend
│   │   ├── app.py
│   │   ├── controllers
│   │   │   ├── __init__.py
│   │   │   └── routes.py
│   │   ├── data
│   │   │   └── structure.py
│   │   ├── __init__.py
│   │   ├── models
│   │   │   ├── database.py
│   │   │   ├── __init__.py
│   │   │   ├── Produto_model.py
│   │   │   └── Registra_model.py
│   │   ├── repositories
│   │   │   └── produto_repository.py
│   │   ├── services
│   │   │   ├── __init__.py
│   │   │   ├── produto_service.py
│   │   │   └── relatorio_service.py
│   │   └── tests
│   │       ├── __init__.py
│   │       └── test_cadastro.py
│   ├── config.py
│   ├── frontend
│   │   ├── integration
│   │   │   └── produto.js
│   │   ├── pages
│   │   │   └── homepage.html
│   │   ├── pictures
│   │   │   ├── editar-bottom-contabilizar.png
│   │   │   ├── homepage_button_plus.svg
│   │   │   ├── homepage_lupa.svg
│   │   │   ├── index_back_image.svg
│   │   │   ├── index_logotipo.svg
│   │   │   ├── logotipo.svg
│   │   │   └── status-error-filled-svgrepo-com.svg
│   │   ├── scripts
│   │   │   ├── homepage.js
│   │   │   └── modal.js
│   │   ├── style
│   │   │   ├── footer.css
│   │   │   ├── global.css
│   │   │   ├── header.css
│   │   │   ├── homepage.css
│   │   │   ├── index.css
│   │   │   └── modal.css
│   │   └── style.css
│   └── __init__.py
├── __init__.py
├── insert_fake_products.py
├── requirements.txt
├── run.py
├── runtests.py
└── yolo_app
    ├── __init__.py
    ├── yolo_models
    │   └── best.pt
    └── yolo_runner.py

```

## 🛠️ Stacks, FrameWorks e Bibliotecas

**Front-end**

- Html
- CSS
- JavaScript

**Back-end**

- Flask → Framework para criação de API REST

- SQLAlchemy → ORM para gerenciamento e consultas ao banco

- Python

**Banco de Dados**

- SQLite → Banco leve para persistência local das peças, categorias e contagens

**Visão Computacional / IA**

- OpenCV → Processamento de imagens, leitura de câmera, manipulação visual

- YOLO (Ultralytics) → Detecção de objetos em tempo real e classificação


## ▶️ Como Executar o Projeto

**1. Clone o repositório**

```bash

  git clone https://github.com/usuario/projeto-brose.git
  cd projeto-brose
```

**2. Crie um ambiente virtual**

```bash

  python -m venv venv

  source venv/bin/activate   # Linux/Mac
  
  venv\Scripts\activate      # Windows
```
**3. Instale as dependências**

```bash

  pip install -r requirements.txt
```
**4. Criar o banco de dados local**

```bash

  python brose_app/backend/data/structure.py
```
**5. Iniciar o servidor da aplicação**

```bash

  python run.py
```
**Após iniciado, o sistema fica disponível em:**

```bash

  http://localhost:5000
```
**6. Executar o algoritmo de detecção (YOLO)**

```bash

  python -m yolo_app.yolo_runner
```
## Autores e Contribuidores

- 👨🏽‍💻[andreprogama](https://github.com/andreprograma)
- 👨🏾‍💻[Arth1Droid](https://github.com/Arth1Droid)
- 👨🏾‍💻[Petrux081](https://github.com/Petrux081)
- 👩🏼‍💻[barbpsouza](https://github.com/barbpsouza)
- 👩🏻‍💻[BeatrizAlcantaraa](https://github.com/BeatrizAlcantaraa)
- 👩🏻‍💻[beatrizcdev](https://github.com/beatrizcdev)
- 👩🏻‍💻[Beatriz-Cristiny](https://github.com/Beatriz-Cristiny)
- 👩🏻‍💻 [camilabrasil1](https://github.com/camilabrasil1)


