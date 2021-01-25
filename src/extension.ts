import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


	vscode.workspace.onWillRenameFiles(e => {

		if (e.files.length === 1) {
			const [first] = e.files;

			const edit = new vscode.WorkspaceEdit();
			edit.insert(first.oldUri, new vscode.Position(0, 0), `MOVE from ${first.oldUri.toString()} to ${first.newUri.toString()}\n`);
			e.waitUntil(Promise.resolve(edit));
		}
	});
}
