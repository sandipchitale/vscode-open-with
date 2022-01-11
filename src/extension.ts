import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('vscode-open-with.open-with', openWith));
}

async function openWith(uri: vscode.Uri) {
    _openWithFSPath(uri.fsPath);
}

async function _openWithFSPath(fsPath: string) {
    const isFile = fs.statSync(fsPath).isFile();
    if (isFile) {
        const explorerProcess = child_process.spawn(
            `${process.env['WINDIR']}\\system32\\rundll32.exe`,
            [
                'shell32,OpenAs_RunDLL',
                fsPath
            ],
            {
                cwd: path.dirname(fsPath)
            }
        );
        explorerProcess.on('exit', (code) => {
        });
    } else {
        vscode.window.showInformationMessage('Open With Dialog... command works only on files.');
    }
}

export function deactivate() {}
