/*
 * @Author: corinchen
 * @Date: 2022-12-14 16:53:43
 * @LastEditTime: 2022-12-15 13:12:21
 * @LastEditors: corinchen
 * @Description: 
 * @FilePath: \upload-to-tencent\extension.js
 * for  good code
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const stringFormat = require('./util/stringFormat');
const upload = require('./util/upload.js');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let textEditor  = vscode.commands.registerCommand('extension.chooseImage',  async function (textEditor, edit, args) {
		const tencentConfig =  vscode.workspace.getConfiguration('upload_image')

		const uri = await vscode.window.showOpenDialog({
			canSelectFolders: false,
            canSelectMany: false,
            filters: {
              images: ['png', 'jpg', 'webp'],
            },
		})
		if (!uri) {
			return
		}
		const localFile = uri[0].fsPath
		let url = await upload.uploadImg(localFile, tencentConfig)
		if(tencentConfig.domain) {
			url = url.replace(/cos.*.com/g, tencentConfig.domain)
		}
		if(url) {
			addImageUrlToEditor(url)
		}
	});

	context.subscriptions.push(textEditor);
}


function addImageUrlToEditor(url) {
	let editor = vscode.window.activeTextEditor
	if (!editor) {
	  return
	}
	const { start, end, active } = editor.selection
	if (start.line === end.line && start.character === end.character) {
	  // 在光标位置插入内容
	  const activePosition = active
	  editor.edit((editBuilder) => {
		editBuilder.insert(activePosition, url)
	  })
	} else {
	  // 替换内容
	  const selection = editor.selection
	  editor.edit((editBuilder) => {
		editBuilder.replace(selection, url)
	  })
	}
  }
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
