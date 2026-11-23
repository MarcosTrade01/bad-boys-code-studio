# Instruções para agentes — BAD BOYS CODE STUDIO

## Objetivo
Manter e evoluir o BAD BOYS CODE STUDIO 4.0 como editor web estático, simples e confiável, com foco em uso no Android e publicação pelo GitHub Pages.

## Antes de alterar
1. Leia este arquivo, `README.md` e os documentos relevantes em `docs/`.
2. Inspecione o código atual; não presuma que a documentação substitui o comportamento real.
3. Identifique os arquivos afetados e os riscos para projetos já salvos.
4. Faça a menor alteração que resolva o problema.
5. Preserve alterações e decisões existentes. Não apague, recrie ou substitua arquivos sem necessidade.

## Arquitetura e compatibilidade
- A aplicação é atualmente um site estático baseado em HTML, CSS e JavaScript, concentrado em `index.html`.
- A publicação é destinada ao GitHub Pages; mantenha caminhos relativos compatíveis com o subdiretório do projeto.
- Não introduza frameworks, servidores, bancos de dados, gerenciadores de pacotes ou dependências externas sem justificativa técnica e aprovação do responsável.
- Não exija computador, terminal local, Node.js ou instalação de ferramentas para o fluxo normal do usuário Android.
- Preserve o funcionamento como PWA e o uso offline existente.

## Dados do usuário — regra crítica
- Trate os projetos e arquivos armazenados no navegador como dados importantes do usuário.
- Preserve exatamente as chaves de armazenamento existentes: `bbcs30-projects-v1` e `bbcs30-active-v1`, salvo migração planejada, testada e aprovada.
- Não limpe, reinicialize, renomeie ou migre dados locais automaticamente.
- Não altere a lógica de backup/importação sem testar importação, conflitos de nomes, ausência de duplicatas e preservação do projeto/arquivo aberto.
- Nunca prometa recuperação de dados sem evidência. Recomende exportar backup antes de mudanças que possam afetar armazenamento.

## Limites técnicos que devem ser preservados
- Preserve o isolamento do iframe de pré-visualização e sua configuração `sandbox`; não amplie permissões sem análise de segurança e aprovação.
- Preserve a comunicação controlada entre a pré-visualização e o console do editor.
- Ao alterar o Service Worker, revise instalação, ativação, cache, atualização e fallback offline. Não apague caches ou recursos do usuário.
- A pré-visualização atual injeta `style.css` e `script.js` junto de `index.html`; considere essa convenção ao propor mudanças.
- Não inclua segredos, tokens, senhas ou dados pessoais em arquivos, commits, logs ou exemplos.

## Qualidade e validação
- Para cada mudança, declare o que foi alterado, o motivo, os riscos e os testes realmente executados.
- Faça revisão de regressão das funções afetadas: criar/abrir projetos, editar e salvar arquivos, alternar arquivos, pré-visualizar, console, backup e importação.
- Para mudanças no PWA, valide manifesto, caminhos, registro do Service Worker e comportamento offline quando possível.
- Prefira verificações simples e reproduzíveis, compatíveis com o projeto estático.
- Não diga que um teste passou se ele não foi executado. Diferencie análise de código, validação automatizada, teste no navegador e teste real no Android.
- Se não houver ambiente para executar um teste, informe a limitação e forneça passos curtos para o usuário validar no Android.

## GitHub e publicação
- Trabalhe na branch solicitada ou na branch padrão confirmada.
- Revise o diff/conteúdo antes de gravar cada arquivo.
- Não faça publicação, alteração destrutiva, exclusão de dados ou mudança ampla sem autorização explícita.
- Um commit no GitHub não comprova que a versão publicada no GitHub Pages já atualizou.
- Depois de uma alteração, informe o commit e peça validação no aparelho quando o comportamento depender do navegador ou do PWA.

## Comunicação e continuidade
- Use português brasileiro claro e direto.
- Trabalhe em etapas pequenas; não peça ao usuário para repetir informações já registradas nos documentos.
- Mantenha a documentação sincronizada com o código real.
- Registre decisões importantes, testes e pendências em `docs/WORKLOG.md`.
- Se houver dúvida que possa causar perda de dados, mudança de comportamento ou custo, pare e pergunte antes de agir.

## Princípio final
Estabilidade e preservação dos projetos do usuário vêm antes de novidades. Não refatore por estética nem adicione ferramentas só porque estão disponíveis.
