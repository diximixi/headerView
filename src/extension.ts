import * as vscode from 'vscode';
import * as HeaderView from './headerView';

let headerViewContainer: Record<any, HeaderView.HeaderView> = {};

export function activate(context: vscode.ExtensionContext) {

	vscode.workspace.textDocuments.forEach(element => {
		headerViewContainer[element.uri.toString()] = new HeaderView.HeaderView();
	});

	let disposable = vscode.commands.registerCommand('headerview.align', () => {
		
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('headerview.toggle', () => {
		vscode.window.showInformationMessage(Object.keys(headerViewContainer).length.toString());
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('headerview.lines', () => {
		vscode.window.showInputBox()
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}
