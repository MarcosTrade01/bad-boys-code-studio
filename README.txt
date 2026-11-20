# BAD BOYS CODE STUDIO 3.0

## Publicar no GitHub Pages
1. Extraia todos os arquivos deste pacote.
2. No repositório `bad-boys-code-studio`, envie/substitua `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png` e `icon-512.png` na raiz (`/`).
3. Faça commit diretamente na branch `main`.
4. Aguarde o GitHub Pages publicar e abra o endereço HTTPS do site.
5. No Chrome Android, use o botão INSTALAR APP ou menu ⋮ > Instalar app / Adicionar à tela inicial.

## Observações
- PWA exige HTTPS; GitHub Pages fornece HTTPS.
- O service worker funciona no escopo do caminho em que o site está publicado.
- Os projetos ficam no armazenamento local do navegador. Exporte backups regularmente.
- O app é independente de bibliotecas externas/CDNs.
- O preview executa código do projeto em iframe isolado, mas não é um ambiente de segurança para executar código desconhecido.
