class LinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = this.setTail() || tail
    this.size = this.setSize()
  }

  iterate(callback) {
    let node = this.head
    if(!!this.head){
      while(!!node && !!node.next){
        callback(node)
        node = node.next
      }
      callback(node)
      return this.head
    }
  }

  setTail() {
    let node = this.head
    if(!!this.head){
      if(this.head.next !== null){
        while(!!node.next){
          node = node.next
        }
        this.tail = node
      } else {
        this.tail = this.head
      }
    } else {
      this.tail = null
    }
    return this.tail
  }

  setSize() {
    let count = 0
    this.iterate(node => count+= 1)
    this.size = count
    return this.size
  }

  // print each node's value on its own line
  // use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  print() {
    this.iterate(node => console.log(node.value));
  }

  // find the node with the target value and return it
  // if not found return null, use your iterate method to be DRY!
  find(target) {
    let result = null
    this.iterate((node) => {
      if(node.value === target){
        result = node
      }
    })
    return result
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
    let startedEmpty = this.isEmpty()
    node.next = this.head;
    this.head = node;
    this.setSize()
    // could probably just do this.size += 1
    if(startedEmpty){
      this.setTail()
      // alt: this.tail = node
    }
  }

  isEmpty() {
    return !this.head
  }


  // add node to end of list, no nodes should be removed
  // you may wish to use the iterate method
  addLast(node) {
    if(this.isEmpty()){
      this.head = node
    } else {
      this.iterate(existingNode => {
        if(existingNode.next === null){
          existingNode.next = node
        }
      })
    }
    // alternative:
      // this.tail.next = node
      // this.tail = node
    this.setTail()
    // could probably do this.tail = node
    this.setSize()
    // could probably do this.size += 1
  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
    let removed = null
    if(!this.isEmpty()){
      removed = this.head
      if(!!this.head.next){
        this.head = this.head.next
      } else {
        this.head = null
      }
    }
    this.setTail()
    this.setSize()
    return removed
  }


  // remove the tail node, iterate may be helpful
  // return the node you just removed
  removeLast() {
    if(this.head === null || this.head.next === null){
      return this.removeFirst()
    }
    let removed
    this.iterate(node => {
      if(!!node && node.next !== null){
        if(node.next.next === null){
          removed = node.next
          node.next = null
        }
      }
    })
    this.setTail()
    this.setSize()
    return removed
  }

  returnPrecedingNode(idx) {
    let count = 1
    let currentNode = this.head
    while(count < idx){
      if(!!currentNode.next){
        currentNode = currentNode.next
        count++
      }
    }
    return currentNode
  }

  // replace the node at the given index with the given node
  replace(idx, node) {
    if (idx === 0) {
      this.removeFirst();
      this.addFirst(node);
    } else {
      let precedingNode = this.returnPrecedingNode(idx)
      node.next = precedingNode.next.next
      precedingNode.next = node
    }
    this.setTail()
    return node
  }

  // insert the node at the given index
  // no existing nodes should be removed or replaced
  insert(idx, node) {
    if (idx === 0) {
      this.addFirst(node);
    } else {
      let precedingNode = this.returnPrecedingNode(idx)
      node.next = precedingNode.next
      precedingNode.next = node
    }
    this.setTail()
    this.setSize()
  }

  // remove the node at the given index, and return it
  remove(idx) {
    let removed
    if (idx === 0) {
      return this.removeFirst();
    } else {
      let precedingNode = this.returnPrecedingNode(idx)
      removed = precedingNode.next
      if(precedingNode.next === null){
        this.removeLast()
      } else {
        precedingNode.next = precedingNode.next.next
      }
    }
    this.setTail()
    this.setSize()
    removed.next = null
    return removed
  }

  clear() {
    this.head = null;
    this.tail = null
    this.setSize()
  }
}



class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

if (require.main === module) {
  let head = new Node('one', new Node('two', new Node('three', new Node('four'))));
  let list = new LinkedList(head);
  let emptyList = new LinkedList();
  let oneItemList = new LinkedList(new Node('just one'));

}

module.exports = {
  Node, LinkedList
};
