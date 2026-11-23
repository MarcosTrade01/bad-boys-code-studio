# BAD BOYS CODE STUDIO 4.0

Editor web de HTML, CSS e JavaScript, preparado para uso no Android e publicação pelo GitHub Pages.

## Aplicativo
Acesse a versão publicada: https://marcostrade01.github.io/bad-boys-code-studio/

## Recursos
- Edição de HTML, CSS e JavaScript no navegador.
- Organização por projetos e arquivos.
- Pré-visualização em iframe isolado.
- Console para mensagens e erros da pré-visualização.
- Salvamento local no navegador.
- Exportação e importação de backup completo.
- PWA instalável e suporte a cache/offline.

## Como os dados são armazenados
Os projetos ficam no armazenamento local (`localStorage`) do navegador e não são sincronizados automaticamente entre aparelhos. Exporte backups periodicamente, especialmente antes de limpar os dados do navegador ou trocar de dispositivo.

## Documentação para manutenção
- [Instruções para agentes de IA](AGENTS.md)
- [Arquitetura atual](docs/ARCHITECTURE.md)
- [Checklist de qualidade e regressão](docs/QUALITY-CHECKLIST.md)
- [Histórico de trabalho e decisões](docs/WORKLOG.md)

## Princípios de manutenção
Preservar os projetos do usuário e a compatibilidade Android/PWA é prioridade. Evite mudanças desnecessárias de stack, dependências ou armazenamento. Consulte AGENTS.md antes de modificar o aplicativo.

## Limitações conhecidas
A pré-visualização injeta especificamente os arquivos `style.css` e `script.js` no `index.html`. Não há backend nem sincronização automática de projetos entre dispositivos.

## Verificações automáticas
O GitHub Actions executa verificações estáticas em atualizações da branch `main`, em pull requests direcionados a `main` e quando o fluxo é iniciado manualmente. O validador estático confere a estrutura básica e a sintaxe do HTML, CSS, JavaScript e PWA.

Um segundo job instala Playwright apenas no runner temporário do GitHub e executa testes de interação no Chromium sobre o aplicativo real. A suíte cobre criação e salvamento de projetos/arquivos, persistência após recarregar, pré-visualização, exportação/importação de backup e rejeição de backup inválido. Nenhuma dependência de teste é adicionada ao aplicativo publicado e não é necessário instalar ferramentas no Android.

Os testes no Chromium não substituem testes físicos no Android nem comprovam o funcionamento offline/PWA em aparelhos reais.
