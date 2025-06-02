# Keyboard Shortcut Cheatsheet Editor React

This project is a React-based application that allows users to create, edit, and manage keyboard shortcut cheatsheets. It provides an intuitive interface for adding, organizing, and exporting shortcuts.

---

**Live Demo:** [https://monsterbrain.github.io/keyboard-shortcut-cheatsheet-editor-react](https://monsterbrain.github.io/keyboard-shortcut-cheatsheet-editor-react)

---

## Current Features

*   **Edit Table Title:** Customize the title of your shortcut cheatsheet.
*   **Add/Delete Rows:** Easily add new shortcuts or remove existing ones.
*   **Update Shortcuts:** Modify function names and key combinations on the fly.
*   **Move Rows:** Reorder shortcuts using intuitive up and down controls.
*   **Special Key Handling:** Accurately capture complex shortcuts involving modifier keys like Control, Shift, Alt, and Meta. Escape key clears the current input.
*   **Clear Shortcut:** Quickly clear a specific shortcut entry.
*   **Preview Mode:** Switch between editing and a clean preview of your cheatsheet.
*   **Export to HTML:** (Planned) Generate an HTML file of your cheatsheet.
*   **Export to Markdown:** (Planned) Generate a Markdown file of your cheatsheet.

## Upcoming Features

*   **Dark Mode:** A comfortable viewing experience in low-light environments.
*   **Full Export Functionality:** Complete implementation of "Export to HTML" and "Export to Markdown".
*   **Import Cheatsheets:** Allow users to import existing cheatsheets from various formats.
*   **User Accounts & Cloud Sync:** Save and sync cheatsheets across devices.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/monsterbrain/keyboard-shortcut-cheatsheet-editor-react.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd keyboard-shortcut-cheatsheet-editor-react
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

1.  **Start the development server:**
    ```bash
    npm start
    ```
    This will open the application in your default web browser, usually at `http://localhost:3000`.

2.  **Using the Editor:**
    *   Modify the table title by clicking on it and typing.
    *   Click the "Add Row" button to add new shortcuts.
    *   Edit the "Function" and "Shortcut" fields directly in the table.
    *   Use the arrow buttons to reorder rows.
    *   Use the trash icon to delete a row.
    *   Click the "Preview" button to see a clean version of your cheatsheet.
    *   (Once implemented) Use the "Export to HTML" or "Export to Markdown" buttons to save your cheatsheet.

## Deployment

This project is configured for easy deployment to GitHub Pages.

1.  **Build the project:**
    ```bash
    npm run build
    ```
    This command creates an optimized `build` folder for production.

2.  **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```
    This will push the contents of the `build` folder to the `gh-pages` branch of your repository, making it accessible online. The homepage URL is set in `package.json`.
