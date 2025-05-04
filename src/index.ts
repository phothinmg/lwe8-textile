import { textile } from "lwe8-textile-core";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { visit } from "unist-util-visit";
import type {
  TextileVisitor,
  TextileExtensionFn,
  Root,
} from "lwe8-textile-types";

// types
function treeWalk(tree: Root, callback: TextileVisitor) {
  visit(tree, callback);
  return tree;
}
class Textile {
  private _extensions: TextileExtensionFn[];
  private _tree: Root | {};
  private _html: string;
  private _text: string;
  private _visitor: TextileVisitor[];

  constructor(input: string) {
    this._extensions = [];
    this._tree = {};
    this._html = "";
    this._text = input;
    this._visitor = [];
  }
  private _int() {
    const _html = textile.parse(this._text);
    this._tree = fromHtml(_html, { fragment: true });
    if (this._extensions.length > 0) {
      for (const ext of this._extensions) {
        this._tree = treeWalk(this._tree as Root, ext().walk);
      }
    }
    if (this._visitor.length > 0) {
      for (const visitor of this._visitor) {
        this._tree = treeWalk(this._tree as Root, visitor);
      }
    }
    this._html = toHtml(this._tree as Root);
  }
  use(ext: TextileExtensionFn) {
    this._extensions.push(ext);
    return this;
  }
  visit(visitor: TextileVisitor) {
    this._visitor.push(visitor);
    return this;
  }
  get html() {
    this._int();
    return this._html;
  }
  get hast() {
    this._int();
    return this._tree as Root;
  }
}

export function lwe8Textile(text: string) {
  return new Textile(text);
}
