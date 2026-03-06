# Swagger Petstore API Functional — Playwright API (TypeScript)

Automated API testing suite for the Swagger Petstore API.

## 🚀 Quick Start

### Prerequisites

- Node.js (v20+)
- pnpm (`npm install -g pnpm`)

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Initialize environment:
   ```bash
   cp .env.example .env
   ```

## 🛠 Running Locally

Run all tests:

```bash
pnpm test
```

Generate and view report:

```bash
pnpm report
```

Reports are saved in `reports/playwright-api/`.

## 🤖 CI/CD

Tests run automatically on every push via GitHub Actions.

- **Workflow**: `.github/workflows/playwright.yml`
- **Artifacts**: HTML reports are uploaded as `playwright-report`.

## 📁 Project Structure

- `tests/`: Spec files containing Happy Path, Negative, and Boundary cases.
- `helpers/`: API client helpers for Pet and User operations.
- `playwright.config.ts`: Playwright configuration & reporting setup.
- `API_Test_Cases.md`: Detailed test definitions.

## 📝 Test Coverage Notes

- **Endpoints Covered**: `/pet`, `/user`.
- **Key Validations**:
  - Status code verification (200, 404, 400, etc.).
  - Deep field validation (ID matching, Name consistency, Status updates).
  - Error message parsing for negative cases.
- **Cleanup Strategy**:
  - Uses unique randomly generated IDs for Pet and User creation.
  - Explicit `DELETE` calls at the end of happy path tests to ensure environment remains clean.

## ⚠️ Known Assumptions & Limitations

- The public Petstore API is used; occasional latency or data sync issues may occur.
- Fixed boundary limits are based on standard Swagger Petstore behavior.
- No authentication is required for the targeted endpoints in this suite.
