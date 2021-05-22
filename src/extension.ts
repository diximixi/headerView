import * as vscode from 'vscode';
import * as HeaderView from './headerView';

let headerViewContainer: Record<any, HeaderView.HeaderView> = {};

export function activate(context: vscode.ExtensionContext) {

	installForActiveDocument();
	
	let disposable = vscode.commands.registerCommand('headerview.doalign', () => {
		installForActiveDocument();
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('headerview.dotoggle', () => {
		vscode.window.showInformationMessage(Object.keys(headerViewContainer).length.toString());
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('headerview.setlines', () => {
		vscode.window.showInputBox();
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}

async function  installForActiveDocument() {
	if (vscode.window.activeTextEditor !== undefined)
	{
		let document = vscode.window.activeTextEditor.document;
		if (document.languageId !== "log")
		{
			let key = document.uri.toString();
			if (!headerViewContainer[key])
			{
				headerViewContainer[key] = new HeaderView.HeaderView();
				vscode.window.showInformationMessage("Added HeaderView-Object to " + key);
			}
		}
	}
}
