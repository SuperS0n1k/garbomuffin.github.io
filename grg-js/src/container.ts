class Container{
  public constructor(){
    containers.push(this);
  }

  protected children: Sprite[] = []

  public push(...args){
    return this.children.push.apply(this.children, args);
  }
  public splice(...args){
    return this.children.splice.apply(this.children, args);
  }
  public indexOf(...args){
    return this.children.indexOf.apply(this.children, args);
  }

  public *[Symbol.iterator](){
    for (let sprite of this.children){
      yield sprite;
    }
  }
}
