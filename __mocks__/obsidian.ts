/**
 * Global Obsidian API mock for testing
 */
export class App {}
export class Plugin {
  loadData() {
    return Promise.resolve({});
  }
  saveData() {
    return Promise.resolve();
  }
}
export class PluginSettingTab {
  app: App;
  plugin: Plugin;
  containerEl: any;
  constructor(app: App, plugin: Plugin) {
    this.app = app;
    this.plugin = plugin;
  }
}
export class Setting {
  constructor(_container: any) {}
  setName(_: string) {
    return this;
  }
  setDesc(_: string) {
    return this;
  }
  addToggle(cb: any) {
    if (cb)
      cb({
        setValue: () => this,
        onChange: () => this,
        toggleEl: { addEventListener: () => {} },
      });
    return this;
  }
  addText(cb: any) {
    if (cb)
      cb({
        setPlaceholder: () => this,
        setValue: () => this,
        onChange: () => this,
        inputEl: { addEventListener: () => {} },
      });
    return this;
  }
  addTextArea(cb: any) {
    if (cb)
      cb({
        setValue: () => this,
        onChange: () => this,
        inputEl: { addEventListener: () => {} },
      });
    return this;
  }
  addDropdown(cb: any) {
    if (cb)
      cb({
        addOption: () => this,
        setValue: () => {
          return { onChange: () => {} };
        },
        onChange: () => this,
        selectEl: { addEventListener: () => {} },
      });
    return this;
  }
}
export class Notice {
  message: string;
  constructor(msg: string) {
    this.message = msg;
  }
}
export class TFile {
  path: string;
  name: string;
  extension: string;
  parent: { path: string } | null;
  constructor(path: string) {
    this.path = path;
    this.name = path.split("/").pop() || path;
    this.extension = (this.name.split(".").pop() || "").toLowerCase();
    const parts = path.split("/");
    parts.pop();
    this.parent = parts.length > 0 ? { path: parts.join("/") } : null;
  }
}
export class MarkdownView {
  editor: any;
  constructor() {
    this.editor = null;
  }
}
export class FileSystemAdapter {
  getBasePath() {
    return "/vault";
  }
}
export class Menu {}
export class MarkdownFileInfo {}
export type Editor = any;

export const Platform = {
  isMobileApp: false,
  isDesktopApp: true,
  isMacOS: false,
  isWin: false,
  isLinux: true,
};

export function addIcon(_name: string, _svg: string) {}

export function requestUrl(_opts: any): Promise<any> {
  return Promise.resolve({
    status: 200,
    text: '{"status":"success","message":"ok","data":{"public_url":"https://cdn.example.com/img.png"}}',
    arrayBuffer: new ArrayBuffer(0),
    headers: {},
  });
}

export function normalizePath(p: string): string {
  return (p || "")
    .replace(/\\/g, "/")
    .replace(/\/+/g, "/")
    .replace(/^\.\//, "")
    .replace(/\/$/, "") || "/";
}
