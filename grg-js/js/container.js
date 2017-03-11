class Container {
    constructor() {
        this.children = [];
        containers.push(this);
    }
    push(...args) {
        return this.children.push.apply(this.children, args);
    }
    splice(...args) {
        return this.children.splice.apply(this.children, args);
    }
    indexOf(...args) {
        return this.children.indexOf.apply(this.children, args);
    }
    *[Symbol.iterator]() {
        for (let sprite of this.children) {
            yield sprite;
        }
    }
}
