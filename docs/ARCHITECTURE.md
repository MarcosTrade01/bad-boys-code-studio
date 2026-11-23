# Arquitetura atual

> Documento de referência do BAD BOYS CODE STUDIO 4.0. Atualize-o quando o comportamento real do aplicativo mudar.

## Visão geral
- Aplicação web estática, sem backend próprio.
- Interface e lógica principal estão em `index.html` (HTML, CSS e JavaScript).
- Publicação pelo GitHub Pages.
- PWA configurado por `manifest.webmanifest` e `sw.js`.
- Projetos do usuário são guardados no `localStorage` do navegador.

## Arquivos principais

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Interface, editor, gerenciamento de projetos/arquivos, backup/importação, pré-visualização e console |
| `manifest.webmanifest` | Nome, ícones, escopo, início e aparência de instalação PWA |
| `sw.js` | Cache do app shell, atualização de recursos e fallback offline |
| `icon-192.png`, `icon-512.png` | Ícones usados pelo PWA |
| `AGENTS.md` | Regras para manutenção assistida por IA |
| `docs/` | Arquitetura, checklist de qualidade e histórico de trabalho |

## Fluxo de dados
- Chave de projetos: `bbcs30-projects-v1`.
- Chave do projeto ativo: `bbcs30-active-v1`.
- O conteúdo é serializado em JSON no armazenamento local do navegador.
- A função `persist()` captura o arquivo ativo e grava os projetos e o projeto selecionado.
- `loadStore()` tenta recuperar os projetos existentes ao iniciar.
- O evento `beforeunload` também tenta persistir o estado atual.
- Os dados ficam vinculados ao navegador/dispositivo e podem ser perdidos se os dados do site forem apagados. O usuário deve exportar backups periodicamente.

## Projetos, arquivos e backup
- Cada projeto é um objeto de arquivos, com nome de arquivo e conteúdo textual.
- O projeto inicial usa `index.html`, `style.css` e `script.js`.
- O backup completo exporta os projetos em JSON.
- A importação reconhece backups com coleção `projects` e alguns formatos legados.
- Quando um nome de projeto já existe, a importação solicita confirmação e atualiza esse projeto; não deve criar uma cópia com nome duplicado.
- Preserve o projeto e arquivo que estavam abertos quando isso for possível.

## Pré-visualização e isolamento
- A pré-visualização é exibida em um `iframe` com `srcdoc`.
- O iframe usa sandbox com permissões limitadas: `allow-scripts allow-forms allow-modals allow-popups`.
- O editor injeta o conteúdo de `style.css` e `script.js` no HTML de `index.html`.
- Mensagens de console e erros são encaminhados ao painel do editor por `postMessage`, com validação da janela de origem e de uma marca de mensagem.
- Não amplie as permissões do iframe sem análise de segurança.

## PWA e cache
- O manifesto usa escopo e início relativos ao diretório do projeto.
- O Service Worker usa prefixo de cache `bbcs40-` e cache principal `bbcs40-studio-v1`.
- O app shell inclui a raiz, `index.html`, manifesto e ícones.
- Navegações tentam buscar a versão de rede e usam o HTML em cache como fallback.
- Recursos GET da mesma origem usam cache com atualização em segundo plano.
- Alterações no Service Worker exigem revisão cuidadosa de atualização e uso offline.

## Limitações conhecidas
- A pré-visualização procura especificamente `style.css` e `script.js`; arquivos com outros nomes não são injetados automaticamente.
- O código principal está concentrado em um único HTML. Uma futura divisão em arquivos deve ser planejada como refatoração separada, com testes de regressão e autorização.
- Não há backend nem sincronização automática entre dispositivos; use backup para transportar projetos.
