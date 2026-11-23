# Checklist de qualidade e regressão

Use este checklist antes de considerar uma atualização pronta. Marque apenas verificações realmente executadas.

## Antes da alteração
- [ ] Ler `AGENTS.md` e os documentos relevantes.
- [ ] Confirmar a branch e os arquivos que serão alterados.
- [ ] Identificar possíveis impactos em armazenamento, backup, iframe e PWA.
- [ ] Confirmar que existe backup recente quando a mudança puder afetar dados.

## Verificações básicas do editor
- [ ] Aplicativo abre sem erro de sintaxe no console.
- [ ] Projeto atual é restaurado após recarregar a página.
- [ ] É possível criar e abrir um projeto.
- [ ] É possível criar, alternar, renomear e excluir arquivo.
- [ ] Edição e salvamento mantêm o conteúdo após recarregar.
- [ ] Pré-visualização executa HTML, CSS e JavaScript.
- [ ] Console recebe mensagens e erros da pré-visualização.

## Backup e integridade dos dados
- [ ] Exportar backup completo gera JSON válido.
- [ ] Importar backup sem conflito adiciona os projetos esperados.
- [ ] Importar backup com nomes conflitantes pede confirmação.
- [ ] Conflitos atualizam o projeto existente sem criar duplicatas.
- [ ] Projeto e arquivo abertos são preservados quando possível.
- [ ] Arquivo inválido ou sem projetos válidos apresenta erro sem sobrescrever dados.

## PWA
- [ ] Manifesto é JSON válido e mantém escopo/caminhos corretos.
- [ ] Ícones referenciados existem.
- [ ] Service Worker registra sem erro em HTTPS.
- [ ] Atualização não deixa o usuário preso a uma versão antiga.
- [ ] Fallback offline abre o app shell depois de um carregamento online bem-sucedido.

## Segurança e compatibilidade
- [ ] Sandbox do iframe continua restrito e não ganhou permissões sem justificativa.
- [ ] Mensagens recebidas do iframe continuam verificando a janela de origem e a marca esperada.
- [ ] Não foram adicionados segredos, tokens ou dados pessoais.
- [ ] Caminhos relativos continuam funcionando no GitHub Pages.
- [ ] Interface continua utilizável em tela pequena/Android.

## Revisão final
- [ ] Revisar o conteúdo/diff de cada arquivo alterado.
- [ ] Executar as verificações relevantes e registrar o resultado.
- [ ] Informar claramente verificações não executadas e limitações.
- [ ] Registrar commit, mudanças, testes e pendências em `docs/WORKLOG.md`.
- [ ] Solicitar teste real no Android quando necessário.

## Registro honesto dos testes
Ao reportar, use categorias distintas:
- **Inspeção:** leitura e análise do código, sem execução.
- **Validação automatizada:** comando/script realmente executado e resultado observado.
- **Teste no navegador:** interação realizada em navegador.
- **Teste no Android:** validação realizada no aparelho físico.

Não transforme inspeção em alegação de teste executado.

## Verificação automatizada do repositório
- [ ] Conferir o resultado do fluxo **Verificações do projeto** na aba Actions do GitHub.
- [ ] Confirmar que o passo `node scripts/validate-project.mjs` terminou com sucesso.
- [ ] Confirmar que o job **Regressão no Chromium** terminou com sucesso.
- [ ] Se algum job falhar, ler a mensagem exata e corrigir a causa antes de considerar a atualização validada.

O validador estático não substitui os testes de interação. A suíte Playwright executa o aplicativo real no Chromium e cobre criação/salvamento de projetos e arquivos, persistência após recarregar, pré-visualização, exportação/importação e proteção contra backup inválido. Ela não substitui a validação física no Android nem comprova o comportamento offline/PWA em aparelhos reais.
