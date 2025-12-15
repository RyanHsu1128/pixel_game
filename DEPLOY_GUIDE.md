# 如何發佈到 GitHub Pages

我已經幫您將專案設定好發佈所需的所有配置（包含 `gh-pages` 套件、`vite.config.js` 設定、`package.json` 腳本）。

您現在只需要執行以下 3 個步驟即可完成發佈：

### 第一步：在 GitHub 上建立倉庫 (Repository)
1. 登入 [GitHub](https://github.com)。
2. 點擊右上角的 **+** 號 > **New repository**。
3. Repository name 輸入：**`pixel_game`** (必須與我們在 config 設定的一致)。
4. 選擇 **Public** (公開)。
5. **不要**勾選 "Initialize with a README" (因為我們已經有專案了)。
6. 點擊 **Create repository**。

### 第三步：設定 GitHub Pages 來源 (關鍵！解決 404/Error 必做)
1. 進入 Repository 的 **Settings**。
2. 左側選單點選 **Pages**。
3. 在 **Build and deployment** > **Source** 下拉選單中，選擇 **GitHub Actions** (原本可能是 "Deploy from a branch")。
4. 設定完成後，如果是第一次，您可能需要手動到 **Actions** 頁籤，點選最新的 workflow 並按 **Re-run jobs**，或者再推送一次空 commit 觸發部署。

### 第四步：連接遠端倉庫並推送
在 VS Code 終端機執行以下指令（將 `RyanHsu1128` 替換為您的 GitHub 帳號，如果您就是 RyanHsu1128 則直接複製）：

```bash
git remote add origin https://github.com/RyanHsu1128/pixel_game.git
git branch -M main
git push -u origin main
```

### 第三步：一鍵部署
推送成功後，只需要執行：

```bash
npm run deploy
```

執行後該指令會自動打包專案並推送到 `gh-pages` 分支。
約 1-2 分鐘後，您的遊戲就會在以下網址上線：
👉 **https://RyanHsu1128.github.io/pixel_game/**

---

**日後更新流程：**
1. 修改程式碼。
2. `git add .`
3. `git commit -m "update"`
4. `npm run deploy` (這個指令包含打包與發佈，也會自動推送到 gh-pages 分支)
