window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  append(node, child) {
    node.appendChild(child);
  },
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    let array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    //重载
    if (arguments.length === 2) {
      return node.getAttribute(name);
    } else if (arguments.length === 3) {
      node.setAttribute(name, value);
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        //适配
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    //用于修改样式，参数可为3个，可为2个
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        for (let i in name) {
          node.style[i] = name[i];
        }
      }
    }
  },
  class: {
    add: (node, className) => {
      node.classList.add(className);
    },
    remove: (node, className) => {
      node.classList.remove(className);
    },
    has: (node, className) => {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter(
      (n) => n !== node
    );
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(elementList, fn) {
    for (let i = 0; i < elementList.length; i++) {
      fn.call(null, elementList[i]);
    }
  },
  index(node) {
    let x = dom.parent(node).children;
    let i;
    for (i = 0; i < x.length; i++) {
      if (x[i] === node) {
        break;
      }
    }
    return i;
  },
};
