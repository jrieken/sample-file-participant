import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


	vscode.workspace.onWillRenameFiles(e => {

		if (e.files.length === 1) {
			const [first] = e.files;

			const edit = new vscode.WorkspaceEdit();
			edit.insert(first.oldUri, new vscode.Position(0, 0), `MOVE from ${first.oldUri.toString()} to ${first.newUri.toString()}\n`);

			let wait = Promise.resolve(undefined);
			if (first.oldUri.path.includes('slow')) {
				wait = new Promise(resolve => setTimeout(resolve, 5678));
			}
			e.waitUntil(wait.then(() => edit));
		}
	});
}
