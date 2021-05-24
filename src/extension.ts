import * as vscode from 'vscode';
import * as HeaderView from './headerView';

let headerViewContainer: Record<any, HeaderView.HeaderView> = {};

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push
	(
		vscode.commands.registerCommand('headerView.doalign', () => {
			}
		)
	);

	context.subscriptions.push
	( 
		vscode.commands.registerCommand('headerView.dotoggle', () => {
				vscode.window.showInformationMessage(Object.keys(headerViewContainer).length.toString());
			}
		)
	);

	context.subscriptions.push
	(
		vscode.commands.registerCommand('headerView.setlines', () => {
				vscode.window.showInputBox();
			}
		)
	);

	context.subscriptions.push
	(
		vscode.workspace.onDidCloseTextDocument( (document: vscode.TextDocument) => {
				removeForActiveDocument(document);
				vscode.window.showWarningMessage(document.uri.toString());
			}
		)
	);

	context.subscriptions.push( vscode.window.onDidChangeActiveTextEditor( (editor: vscode.TextEditor | undefined) => {
				if (editor !== undefined)
				{
					installForActiveDocument( editor.document );
				}
			}
		)
	);

	if (vscode.window.activeTextEditor !== undefined)
	{
		installForActiveDocument(vscode.window.activeTextEditor.document);
	}
}

export function deactivate() {}

async function  installForActiveDocument( document: vscode.TextDocument ) {
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

async function removeForActiveDocument( document: vscode.TextDocument ) {
	if (vscode.window.activeTextEditor !== undefined)
	{
		let key = document.uri.toString();
		if (headerViewContainer[key])
		{
			delete headerViewContainer[key];
		}
	}
}

