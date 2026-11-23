# Histórico de trabalho

Este arquivo registra decisões relevantes, alterações e validações para facilitar a continuidade entre sessões.

## Estado inicial da documentação — 2026-11-23
- Projeto analisado: BAD BOYS CODE STUDIO 4.0.
- Aplicação estática HTML/CSS/JavaScript; lógica principal em `index.html`.
- PWA configurado em `manifest.webmanifest` e `sw.js`.
- Armazenamento local usa as chaves `bbcs30-projects-v1` e `bbcs30-active-v1`.
- Não foi encontrado `AGENTS.md` antes desta etapa.
- README existente continha apenas o título do projeto.
- Não foi identificada estrutura de testes automatizados nesta inspeção.
- Decisão: adotar práticas úteis do Vibe Coding Toolkit de forma parcial e proporcional, sem instalar ferramentas ou mudar a stack.
- Prioridade: preservar projetos locais, backup/importação, sandbox da pré-visualização e funcionamento PWA.
- Esta etapa adiciona documentação e instruções; não altera o código de execução do aplicativo.
- Validação realizada: inspeção dos arquivos atuais no GitHub antes das alterações.
- Testes no navegador/Android: não executados nesta etapa.
- Pendência: testar a documentação/links no repositório e, em etapa posterior, definir verificações automatizadas leves sem dependências desnecessárias.

## Etapa 2 — verificações automáticas leves — 2026-11-23
- Criado `scripts/validate-project.mjs`, sem dependências externas, usando módulos nativos do Node.js.
- Criado `.github/workflows/quality.yml` para executar o validador no GitHub Actions em push para `main`, pull request para `main` e execução manual.
- O validador confere presença dos arquivos principais, estrutura básica do HTML, equilíbrio de delimitadores do CSS, sintaxe do JavaScript inline e do Service Worker, IDs duplicados, sandbox do iframe, chaves de armazenamento e JSON/configuração essencial do manifesto PWA.
- O workflow usa Node.js no ambiente hospedado do GitHub; não exige instalação no Android.
- Não foram alterados os arquivos de execução do aplicativo, dados locais, backup/importação ou cache do PWA.
- Validação local e teste físico no Android: não executados.
- Próxima confirmação: observar a primeira execução real do GitHub Actions e corrigir qualquer falha do validador, se houver.
