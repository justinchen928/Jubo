# 專案名稱

專案的簡短描述。

## 目錄

- [專案介紹](#專案介紹)
- [技術棧](#技術棧)
- [技術選型](#技術選型)
- [安裝與設定](#安裝與設定)
- [啟動應用](#啟動應用)
- [測試](#測試)

## 專案介紹

Jubo面試專案，這個項目是一個簡單的病人醫囑管理系統，您可以查看病人列表，點擊病人查看其醫囑，新增新的醫囑以及編輯現有的醫囑。前端使用 React 和 MaterialUI 元件構建，後端使用 Node.js 與 Express 並使用 PostgreSQL 存取資料庫。

### 功能
- 顯示病人列表。
- 點擊病人查看其醫囑於對話框中。
- 新增新的醫囑。
- 編輯現有的醫囑。

## 技術棧
### 前端
- 使用 React hooks (useState, useEffect)
- 使用 MaterialUI 作為 UI 元件
### 後端
- 使用 Node.js 與 Express
- 使用 PostgreSQL 作為數據庫
  - 使用 Sequelize 作為 ORM

## 技術選型
- react hooks vs redux
  - 相較於redux，react hooks可以使用更少的程式完成狀態的管理，不需要另外寫 store, reducer, action。另外只要針對特定component做render，不需要全部render。所以在這種小專案上，使用react hooks相對來說比較適合。
- Node.js + Express vs .NET Core
  - JavaScript 全棧開發。
  - 靈活輕巧的框架，快速開發
  - 小型專案應用合適。
- PostgreSQL
  - 病人資料會需要強調資料的一制性和完整性，在 ACID 上 PostgreSQL 比 MongoDB 適合。
  - 支援複雜的關聯查詢，在需要撈出病人的醫囑時，PostgreSQL 可以更容易做到。

## 安裝與設定

### 環境設定

複製 `.env.example` 檔案並重新命名為 `.env`：
   ```bash
   cp .env.example .env
   ```

### 啟動
建立並啟動 Docker 容器：
   ```bash
   docker-compose up -d --build
   ```

這將會啟動三個容器：
- postgres: PostgreSQL 資料庫
- backend: 後端服務，跑在 4000 port
- frontend: 前端服務，跑在 3000 port

### 確認運行
- 前端應該在瀏覽器中打開 http://localhost:3000
- 後端 API 應該在 http://localhost:4000
- swagger API文件可以在 http://localhost:4000/docs 中查看
## 測試

### 後端單元測試

```bash
cd backend
npm install
npm test
```


