# Template save

## English Version of the Documentation

### General Information about the Extension

This extension for Visual Studio Code allows you to save and insert code templates for various programming languages. It provides two commands: `extension.saveCodeTemplate` and `extension.insertCodeTemplate`.

The main extension code (`extensions.ts`) is located in the following directory: `/src/extension.ts`

### Saving a Template (extension.saveCodeTemplate)

The `extension.saveCodeTemplate` command allows you to save a code template for a specific programming language, and it can also be invoked using the shortcut key combination - <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> (macOS) or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> (Windows).

The user needs to enter the template name, and the template will be saved in the global state using a key consisting of the category and template name. For example, if the template is named "Hello World" for the JavaScript language, it will be saved as "javascript_hello_world".

### Inserting a Template (extension.insertCodeTemplate)

The `extension.insertCodeTemplate` command allows you to insert a saved code template, and it can also be invoked using the shortcut key combination - <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (macOS) or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows). The user needs to enter the name of the template they want to insert, and the template will be inserted into the active text editor at the current cursor position.

### Function for Determining the Programming Language - getCategoryForLanguage

The `getCategoryForLanguage` function uses a switch statement to determine the category for each supported programming language. Currently, the supported languages are `C`, `C++`, `Python`, and `JavaScript`. For each language, the function returns the corresponding category, for example, "c_cpp" for C and C++. If the language is not supported, the function returns undefined.

Overall, this extension provides a simple way to save and use code templates for various programming languages in Visual Studio Code.


### How to Install the Extension?

In the root directory of this repository, there is a .vsix file that needs to be installed in Visual Studio Code.

First, you need to open the Command Palette. This can be done using the following key combination - <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (macOS) or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (Windows). Type `install from VSIX` and select the .vsix file from the root directory of the repository.


## Русская версия документации <a name="russian_documentation"></a>

### Общие сведения о расширении

Это расширение для Visual Studio Code позволяет сохранять и вставлять шаблоны кода для различных языков программирования. Оно предоставляет две команды: `extension.saveCodeTemplate` и `extension.insertCodeTemplate`.

Основной код расширения (`extensions.ts`), находиться в слеудющей директории `/src/extension.ts`

### Сохранение шаблона. (extension.saveCodeTemplate)

Команда `extension.saveCodeTemplate` позволяет сохранить шаблон кода для определенного языка программирования, так же можно вызвать ее с помощью горячих клавиш - <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> (macOS) или <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> (Windows). 

Пользователь должен ввести имя шаблона, и шаблон будет сохранен в глобальном состоянии с использованием ключа, состоящего из категории и имени шаблона. Например, если шаблон называется "Hello World" для языка JavaScript, он будет сохранен как "javascript_hello_world".

### Вставка шаблона. (extension.insertCodeTemplate)

Команда `extension.insertCodeTemplate` позволяет вставить сохраненный шаблон кода, так же можно вызвать ее с помощью горячих клавиш - <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (macOS) или <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows). Пользователь должен ввести имя шаблона, который он хочет вставить, и шаблон будет вставлен в активный текстовый редактор в текущей строке курсора.


### Функция определяющий язык программирования - getCategoryForLanguage

В функции `getCategoryForLanguage` используется оператор switch для определения категории для каждого поддерживаемого языка программирования. В настоящее время поддерживаются языки `C`, `C++`, `Python` и `JavaScript`. Для каждого языка программа возвращает соответствующую категорию, например, "c_cpp" для C и C++. Если язык не поддерживается, функция вернет undefined.


В целом, это расширение предоставляет простой способ сохранения и использования шаблонов кода для различных языков программирования в Visual Studio Code.


### Как установить расширение?

В корневой директории данного репоизтория есть файл .vsix, его нужно установить в Visual Studio Code.

Сначала вам необходимо открыть Command Palette. Это можно сделать через следующую комбинацию - <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (macOS) или <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (Windows). Вписать `install from VSIX` и выбрать .vsix файл из корневой директории репозитория.
