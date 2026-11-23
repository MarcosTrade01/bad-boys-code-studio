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
- Primeira execução do GitHub Actions identificou uma condição excessivamente rígida na contagem de blocos CSS; o validador foi ajustado para considerar o bloco real e tolerar trechos de template HTML dentro do JavaScript.
- Execução seguinte do GitHub Actions concluída com sucesso: 31 verificações aprovadas e 0 falhas (run 45198325521).
- Foram validadas sintaxe do JavaScript inline e do Service Worker, estrutura básica de HTML/CSS, IDs, sandbox do iframe, chaves de armazenamento, rotinas de backup e manifesto PWA.
- Teste físico no Android e teste de interação ponta a ponta: não executados; permanecem necessários para validar comportamento real do aplicativo.

## Etapa 3 — testes de regressão no navegador — 2026-11-23
- Adicionado Playwright como ferramenta exclusiva do ambiente temporário do GitHub Actions; nenhuma dependência foi adicionada ao aplicativo publicado nem foi alterado o `index.html`.
- Criado `playwright.config.mjs`, com Chromium headless, Service Worker bloqueado durante os testes e servidor local temporário.
- Criado `scripts/serve-test.mjs`, servidor HTTP local mínimo para servir os arquivos reais do repositório durante os testes.
- Criado `tests/e2e/studio.spec.mjs`, cobrindo criação de projeto, criação/alternância de arquivos, salvamento e persistência após recarregar, execução da pré-visualização HTML/CSS/JS, exportação de backup, importação com conflito sem duplicatas e rejeição de backup inválido sem sobrescrever dados.
- Atualizado `.github/workflows/quality.yml` com job separado de regressão Chromium. A instalação do Playwright e do navegador ocorre somente no runner do GitHub.
- Atualizados README e checklist para distinguir validação estática, teste automatizado no Chromium e teste físico no Android.
- Escopo de segurança: sem mudanças nas chaves de armazenamento, no algoritmo de backup/importação, no sandbox, no Service Worker ou nos arquivos de execução do aplicativo.
- Resultado do GitHub Actions: aguardando execução após o commit desta etapa; não declarar testes aprovados até inspecionar os logs.
- Limitação: o Chromium em CI não comprova compatibilidade física Android, instalação PWA ou comportamento offline em aparelho real.
