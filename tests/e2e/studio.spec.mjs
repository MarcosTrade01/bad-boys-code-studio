import { test, expect } from "@playwright/test";

async function createProject(page, name) {
  await page.locator("#newProject").click();
  await page.locator("#modalInput").fill(name);
  await page.locator("#confirmModal").click();
  await expect(page.locator("#projectName")).toContainText(name);
}

async function openFile(page, name) {
  await page.locator("#fileList button").filter({ hasText: name }).click();
  await expect(page.locator("#activeName")).toHaveText(name);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#editor")).toBeVisible();
});

test("cria projeto, salva arquivos e recupera o conteúdo após recarregar", async ({ page }) => {
  await createProject(page, "Projeto Regressao");

  await page.locator("#editor").fill("<h1>conteudo salvo</h1>");
  await page.locator("#save").click();

  await page.locator("#newFile").click();
  await page.locator("#modalInput").fill("notas.txt");
  await page.locator("#confirmModal").click();
  await page.locator("#editor").fill("arquivo adicional persistido");
  await page.locator("#save").click();

  await openFile(page, "index.html");
  await expect(page.locator("#editor")).toHaveValue("<h1>conteudo salvo</h1>");
  await page.reload();

  await expect(page.locator("#projectName")).toContainText("Projeto Regressao");
  await expect(page.locator("#editor")).toHaveValue("<h1>conteudo salvo</h1>");
  await openFile(page, "notas.txt");
  await expect(page.locator("#editor")).toHaveValue("arquivo adicional persistido");
});

test("executa HTML, CSS e JavaScript na pré-visualização isolada", async ({ page }) => {
  await createProject(page, "Projeto Preview");

  await page.locator("#editor").fill('<!doctype html><html><body><h1 id="preview-ok">preview funcionando</h1></body></html>');
  await page.locator("#save").click();

  await openFile(page, "style.css");
  await page.locator("#editor").fill("#preview-ok { color: rgb(1, 2, 3); }");
  await page.locator("#save").click();

  await openFile(page, "script.js");
  await page.locator("#editor").fill('console.log("console-regression-ok");');
  await page.locator("#save").click();

  await page.locator("#run").click();
  const preview = page.frameLocator("#preview");
  await expect(preview.locator("#preview-ok")).toHaveText("preview funcionando");
  await expect(page.locator("#messages")).toContainText("console-regression-ok");
});

test("exporta backup válido e importa sem criar projetos duplicados", async ({ page }) => {
  await createProject(page, "Projeto Backup");
  await page.locator("#editor").fill("<p>versao original do backup</p>");
  await page.locator("#save").click();

  const downloadPromise = page.waitForEvent("download");
  await page.locator("#backup").click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  const backup = JSON.parse(await (await import("node:fs/promises")).readFile(downloadPath, "utf8"));

  expect(backup.app).toBe("BAD BOYS CODE STUDIO");
  expect(backup.projects["Projeto Backup"]["index.html"]).toBe("<p>versao original do backup</p>");

  await page.locator("#editor").fill("<p>versao alterada</p>");
  await page.locator("#save").click();

  const dialogPromise = page.waitForEvent("dialog");
  await page.locator("#restoreFile").setInputFiles({
    name: "backup-regressao.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(backup))
  });
  const dialog = await dialogPromise;
  expect(dialog.type()).toBe("confirm");
  await dialog.accept();

  await expect(page.locator("#editor")).toHaveValue("<p>versao original do backup</p>");
  await page.locator("#projects").click();
  await expect(page.locator(".projectrow")).toHaveCount(2);
});

test("backup inválido não sobrescreve os dados locais", async ({ page }) => {
  await createProject(page, "Projeto Protegido");
  await page.locator("#editor").fill("<p>nao apagar</p>");
  await page.locator("#save").click();

  const before = await page.evaluate(() => ({
    projects: localStorage.getItem("bbcs30-projects-v1"),
    active: localStorage.getItem("bbcs30-active-v1")
  }));

  const dialogPromise = page.waitForEvent("dialog");
  await page.locator("#restoreFile").setInputFiles({
    name: "backup-invalido.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify({ projects: {} }))
  });
  const dialog = await dialogPromise;
  expect(dialog.type()).toBe("alert");
  expect(dialog.message()).toContain("Nenhum projeto válido");
  await dialog.accept();

  const after = await page.evaluate(() => ({
    projects: localStorage.getItem("bbcs30-projects-v1"),
    active: localStorage.getItem("bbcs30-active-v1")
  }));
  expect(after).toEqual(before);
  await expect(page.locator("#editor")).toHaveValue("<p>nao apagar</p>");
});
