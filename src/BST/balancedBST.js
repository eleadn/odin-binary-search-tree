class BalancedBST {
	constructor(array) {
		const sorted = [...new Set(array)].sort((a, b) => a - b);
		this.root = this.#buildTree(sorted);
	}

	insert(value) {
		this.#insert(this.root, value);
	}

	delete(value) {
		this.#delete(this.root, null, value, false);
	}

	find(value) {
		return this.#find(this.root, value);
	}

	levelOrder(callback) {
		if (callback === null || callback === undefined) {
			throw new Error("Callback function must not be null");
		}

		this.#levelOrder(this.root, [], callback);
	}

	preOrder(callback) {
		if (callback === null || callback === undefined) {
			throw new Error("Callback function must not be null");
		}

		this.#preOrder(this.root, callback);
	}

	inOrder(callback) {
		if (callback === null || callback === undefined) {
			throw new Error("Callback function must not be null");
		}

		this.#inOrder(this.root, callback);
	}

	postOrder(callback) {
		if (callback === null || callback === undefined) {
			throw new Error("Callback function must not be null");
		}

		this.#postOrder(this.root, callback);
	}

	height(value) {
		const searchNode = this.find(value);
		if (searchNode === null) {
			return null;
		}
		return this.#height(searchNode) - 1;
	}

	depth(value) {
		return this.#depth(this.root, value, 0);
	}

	isBalanced() {
		return this.#isBalanced(this.root);
	}

	rebalance() {
		const values = [];
		this.inOrder((node) => values.push(node.data));
		this.root = this.#buildTree(values);
	}

	#buildTree(array) {
		if (array.length === 1) {
			return this.#createNode(array[0]);
		}

		const middle = Math.floor(array.length / 2);
		const node = this.#createNode(array[middle]);
		node.left = this.#buildTree(array.slice(0, middle));
		if (middle < array.length - 1) {
			node.right = this.#buildTree(array.slice(middle + 1, array.length));
		}
		return node;
	}

	#createNode(data) {
		return { data: data, left: null, right: null };
	}

	#insert(node, value) {
		if (value === node.data) {
			return;
		}

		if (value > node.data) {
			if (node.right === null) {
				node.right = this.#createNode(value);
			} else {
				this.#insert(node.right, value);
			}
		} else {
			if (node.left === null) {
				node.left = this.#createNode(value);
			} else {
				this.#insert(node.left, value);
			}
		}
	}

	#delete(node, parent, value, isLeft) {
		if (node === null) {
			return;
		}

		if (node.data === value) {
			this.#deleteNode(node, parent, isLeft);
		} else if (node.data > value) {
			this.#delete(node.left, node, value, true);
		} else if (node.data < value) {
			this.#delete(node.right, node, value, false);
		}
	}

	#deleteNode(node, parent, isLeft) {
		if (node.left === null && node.right === null) {
			this.#deleteLeaf(parent, isLeft);
		} else if (node.left !== null && node.right !== null) {
			this.#deleteComplexNode(node, parent, isLeft);
		} else {
			this.#deleteSoleChild(node, parent, isLeft);
		}
	}

	#deleteLeaf(parent, isLeft) {
		if (parent === null) {
			this.root = null;
		} else if (isLeft) {
			parent.left = null;
		} else {
			parent.right = null;
		}
	}

	#deleteComplexNode(node, parent, isLeft) {
		const smallest = this.#findSmallestNode(node.right, node, false);
		if (smallest.isLeft) {
			smallest.parent.left = null;
		} else {
			smallest.parent.right = null;
		}

		if (smallest.node.data !== node.left.data) {
			smallest.node.left = node.left;
		}
		if (smallest.node.data !== node.right.data) {
			smallest.node.right = node.right;
		}

		if (parent === null) {
			this.root = smallest.node;
		} else if (isLeft) {
			parent.left = smallest.node;
		} else {
			parent.right = smallest.node;
		}

		node.left = null;
		node.right = null;
	}

	#findSmallestNode(node, parent, isLeft) {
		if (node.left === null) {
			return { node: node, parent: parent, isLeft: isLeft };
		}
		return this.#findSmallestNode(node.left, node, true);
	}

	#deleteSoleChild(node, parent, isLeft) {
		const newChild = node.left !== null ? node.left : node.right;
		if (parent === null) {
			this.root = newChild;
		} else if (isLeft) {
			parent.left = newChild;
		} else {
			parent.right = newChild;
		}
		node.left = null;
		node.right = null;
	}

	#find(node, value) {
		if (node === null) {
			return null;
		} else if (node.data === value) {
			return node;
		}

		if (node.data > value) {
			return this.#find(node.left, value);
		} else {
			return this.#find(node.right, value);
		}
	}

	#levelOrder(node, discovered, callback) {
		callback(node);

		if (node.left !== null) {
			discovered.push(node.left);
		}
		if (node.right !== null) {
			discovered.push(node.right);
		}

		if (discovered.length > 0) {
			const next = discovered.shift();
			this.#levelOrder(next, discovered, callback);
		}
	}

	#preOrder(node, callback) {
		callback(node);

		if (node.left !== null) {
			this.#preOrder(node.left, callback);
		}
		if (node.right !== null) {
			this.#preOrder(node.right, callback);
		}
	}

	#inOrder(node, callback) {
		if (node.left !== null) {
			this.#inOrder(node.left, callback);
		}

		callback(node);

		if (node.right !== null) {
			this.#inOrder(node.right, callback);
		}
	}

	#postOrder(node, callback) {
		if (node.left !== null) {
			this.#postOrder(node.left, callback);
		}
		if (node.right !== null) {
			this.#postOrder(node.right, callback);
		}

		callback(node);
	}

	#height(node) {
		let leftHeight = 0;
		let rightHeight = 0;

		if (node.left !== null) {
			leftHeight = this.#height(node.left);
		}
		if (node.right !== null) {
			rightHeight = this.#height(node.right);
		}

		return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
	}

	#depth(node, value, depth) {
		if (node.data === value) {
			return depth;
		}

		if (node.data > value) {
			if (node.left === null) {
				return null;
			} else {
				return this.#depth(node.left, value, depth + 1);
			}
		} else {
			if (node.right === null) {
				return null;
			} else {
				return this.#depth(node.right, value, depth + 1);
			}
		}
	}

	#isBalanced(node) {
		if (node.left === null && node.right === null) {
			return true;
		} else if (node.left !== null && node.right !== null) {
			return this.#isBalanced(node.left) && this.#isBalanced(node.right);
		} else {
			const child = node.left !== null ? node.left : node.right;
			if (child.left !== null || child.right !== null) {
				return false;
			} else {
				return true;
			}
		}
	}
}

module.exports = { BalancedBST };
