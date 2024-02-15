import * as vscode from 'vscode';

// Активация расширения
export function activate(context: vscode.ExtensionContext) {

  //Так как это расширение, часть лабы под номером 3; то сейчас будет в каждой строчке комменатрий, в духе - ну вот это. :3

  // Команда сохранения шаблона кода
  let saveCodeTemplate = vscode.commands.registerCommand('extension.saveCodeTemplate', async () => {
    // Получаем активный текстовый редактор
    let editor = vscode.window.activeTextEditor;
    if (editor) {
      // Получаем текущий выбор в редакторе
      const selection = editor.selection;
      // Запрашиваем у юзера имя шаблона
      const templateName = await vscode.window.showInputBox({ prompt: 'Enter a name for the code template' });
      if (templateName) {
        // Получаем идентификатор языка и вместе с ним фрагмент кода + получаем категорию языка
        const codeSnippet = editor.document.getText(selection);
        const languageId = editor.document.languageId;
        const category = getCategoryForLanguage(languageId);
        if (category) {
          // Формируем ключ шаблона на основе категории и имени шаблона
          const templateKey = `${category}_${templateName}`;
          try {
            // Сохраняем фрагмент кода в глобальном состоянии под ключом шаблона и выводим к нему сообщение, мол сохранился твой "hello world"
            context.globalState.update(templateKey, codeSnippet);
            vscode.window.showInformationMessage(`Code template '${templateName}' for ${languageId} has been saved.`);
          } catch (error) {
            // Выводим сообщение об ошибке при сохранении шаблона
            vscode.window.showErrorMessage(`An error occurred while saving the code template: ${error}`);
          }
        } else {
          // Выводим сообщение о том, что язык не поддерживается для шаблонов кода
          vscode.window.showErrorMessage(`Language ${languageId} not supported for code templates.`);
        }
      } else {
        // Выводим сообщение о том, что имя шаблона не предоставлено
        vscode.window.showErrorMessage('No template name provided.');
      }
    } else {
      // Выводим сообщение о том, что активный текстовый редактор не найден
      vscode.window.showErrorMessage('No active text editor found.');
    }
  });
  // Добавляем команду в подписку контекста расширения
  context.subscriptions.push(saveCodeTemplate);

  // Команда вставки шаблона кода
  let insertCodeTemplate = vscode.commands.registerCommand('extension.insertCodeTemplate', async () => {
    // Запрашиваем у юзера имя шаблона, который нужно вставить
    let templateName = await vscode.window.showInputBox({ prompt: 'Enter the name of the code template to insert' });
    if (templateName) {
      // Получаем идентификатор языка активного редактора + категорию языка
      const languageId = vscode.window.activeTextEditor?.document.languageId;
      const category = getCategoryForLanguage(languageId || '');
      if (category) {
        // Формируем ключ шаблона на основе категории и имени шаблона
        const templateKey = `${category}_${templateName}`;
        const savedSnippet = context.globalState.get(templateKey) as string;
        // Получаем сохраненный фрагмент кода из глобального состояния по ключу шаблона
        if (savedSnippet) {
          // Получаем активный текстовый редактор
          const editor = vscode.window.activeTextEditor;
          if (editor) {
            // Вставляем сохраненный фрагмент кода в активный редактор
            editor.edit(editBuilder => {
              return editBuilder.insert(editor.selection.start, savedSnippet);
            });
          }
        } else {
          // Выводим сообщение об ошибке, если шаблон не найден
          vscode.window.showErrorMessage(`Code template '${templateName}' for ${languageId} not found.`);
        }
      } else {
        // Выводим сообщение об ошибке, если язык не поддерживается для шаблонов кода
        vscode.window.showErrorMessage(`Language ${languageId} not supported for code templates.`);
      }
    }
  });
  // Добавляем команду в подписку контекста расширения
  context.subscriptions.push(insertCodeTemplate);


  // Делаю новую фичу, вы не видете этот код 0_0
  // Команда просмотра списка шаблонов
  // let listCodeTemplates = vscode.commands.registerCommand('extension.listCodeTemplates', async () => {
  //   const templates = context.globalState.get('templates') || {};
  //   const categories = Object.keys(templates);
  //   const templateList = categories.map(category => {
  //     return {
  //       category,
  //       templates: Object.keys(templates[category])
  //     };
  //   });
  //   const templateItems = templateList.map(template => {
  //     return {
  //       label: template.category,
  //       detail: template.templates.join(', ')
  //     };
  //   });
  //   const items = templateItems.sort((a, b) => {
  //     return a.label.localeCompare(b.label);
  //   });
  //   const choices = items.map(item => item.label);
  //   const selectedTemplate = await vscode.window.showQuickPick(choices, {
  //     placeHolder: 'Select a template category'
  //   });
  //   if (selectedTemplate) {
  //     const selectedTemplateItem = items.find(item => item.label === selectedTemplate);
  //     if (selectedTemplateItem) {
  //       const templateName = await vscode.window.showQuickPick(selectedTemplateItem.detail.split(', '), {
  //         placeHolder: 'Select a template'
  //       });
  //       if (templateName) {
  //         const templateKey = `${selectedTemplateItem.category}_${templateName}`;
  //         const savedSnippet = context.globalState.get(templateKey) as string;
  //         if (savedSnippet) {
  //           const editor = vscode.window.activeTextEditor;
  //           if (editor) {
  //             editor.edit(editBuilder => {
  //               return editBuilder.insert(editor.selection.start, savedSnippet);
  //             });
  //           }
  //         } else {
  //           vscode.window.showErrorMessage(`Code template '${templateName}' not found.`);
  //         }
  //       }
  //     }
  //   }
  // });
  // context.subscriptions.push(listCodeTemplates);


  // Назначение сочетаний клавиш
  let keybindings: { key: string, command: string, when: string }[] = vscode.workspace.getConfiguration('keyboard').get('keybindings') || [];
  keybindings.push(
    // Назначаем сочетание клавиш для сохранения кода
    {
      "key": "ctrl+shift+k",
      "command": "extension.saveCodeTemplate",
      "when": "editorTextFocus && (editorLangId == cpp || editorLangId == python || editorLangId == javascript || editorLangId == php || editorLangId == rust)"
    },
    // Назначаем сочетание клавиш для вставки кода
    {
      "key": "ctrl+shift+i",
      "command": "extension.insertCodeTemplate",
      "when": "editorTextFocus && (editorLangId == cpp || editorLangId == python || editorLangId == javascript || editorLangId == php || editorLangId == rust)"
    }
  );
  // Обновляем конфигурацию клавиатуры для VSE, чтобы сочетание клавиш работали
  vscode.workspace.getConfiguration('keyboard').update('keybindings', keybindings, true);

  // Определение категории для языка
  function getCategoryForLanguage(languageId: string): string | undefined {
    // Поддержка 5 языков: c, c++, python, javascript, php, rust. Проверяем на совпадение языка.
    switch (languageId) {
      case 'c':
      case 'cpp':
        return 'c_cpp';
      case 'python':
        return 'python';
      case 'javascript':
        return 'javascript';
      case 'php':
        return 'php';
      case 'rust':
        return 'rust';
      default:
        return undefined;
    }
  }
}