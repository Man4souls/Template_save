import * as vscode from 'vscode';

// Активация расширения
export function activate(context: vscode.ExtensionContext) {

  // Команда сохранения шаблона кода
  let saveCodeTemplate = vscode.commands.registerCommand('extension.saveCodeTemplate', async () => {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const templateName = await vscode.window.showInputBox({ prompt: 'Enter a name for the code template' });
      if (templateName) {
        const codeSnippet = editor.document.getText(selection);
        const languageId = editor.document.languageId;
        const category = getCategoryForLanguage(languageId);
        if (category) {
          const templateKey = `${category}_${templateName}`;
          context.globalState.update(templateKey, codeSnippet);
          vscode.window.showInformationMessage(`Code template '${templateName}' for ${languageId} has been saved.`);
        } else {
          vscode.window.showErrorMessage(`Language ${languageId} not supported for code templates.`);
        }
      }
    } else {
      vscode.window.showErrorMessage('No active text editor found.');
    }
  });
  context.subscriptions.push(saveCodeTemplate);

  // Команда вставки шаблона кода
  let insertCodeTemplate = vscode.commands.registerCommand('extension.insertCodeTemplate', async () => {
    let templateName = await vscode.window.showInputBox({ prompt: 'Enter the name of the code template to insert' });
    if (templateName) {
      const languageId = vscode.window.activeTextEditor?.document.languageId;
      const category = getCategoryForLanguage(languageId || '');
      if (category) {
        const templateKey = `${category}_${templateName}`;
        const savedSnippet = context.globalState.get(templateKey) as string;
        if (savedSnippet) {
          const editor = vscode.window.activeTextEditor;
          if (editor) {
            editor.edit(editBuilder => {
              return editBuilder.insert(editor.selection.start, savedSnippet);
            });
          }
        } else {
          vscode.window.showErrorMessage(`Code template '${templateName}' for ${languageId} not found.`);
        }
      } else {
        vscode.window.showErrorMessage(`Language ${languageId} not supported for code templates.`);
      }
    }
  });
  context.subscriptions.push(insertCodeTemplate);

  // Назначение сочетаний клавиш
  let keybindings: { key: string, command: string, when: string }[] = vscode.workspace.getConfiguration('keyboard').get('keybindings') || [];
  keybindings.push(
    {
      "key": "ctrl+shift+k",
      "command": "extension.saveCodeTemplate",
      "when": "editorTextFocus && (editorLangId == cpp || editorLangId == python || editorLangId == javascript)"
    },
    {
      "key": "ctrl+shift+i",
      "command": "extension.insertCodeTemplate",
      "when": "editorTextFocus && (editorLangId == cpp || editorLangId == python || editorLangId == javascript)"
    }
  );
  vscode.workspace.getConfiguration('keyboard').update('keybindings', keybindings, true);

  // Определение категории для языка
  function getCategoryForLanguage(languageId: string): string | undefined {
    switch (languageId) {
      case 'c':
      case 'cpp':
        return 'c_cpp';
      case 'python':
        return 'python';
      case 'javascript':
        return 'javascript';
      default:
        return undefined;
    }
  }
}