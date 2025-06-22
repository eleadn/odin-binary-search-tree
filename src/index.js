#!/usr/bin/env node

const { BalancedBST } = require("./BST/balancedBST");

function prettyPrint(node, prefix = "", isLeft = true) {
	if (node === null) {
		console.log(null);
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
}

function randomArray(minVal, maxVal, count) {
	const arr = [];
	for (let i = 0; i < count; ++i) {
		const perc = Math.random();
		arr.push(Math.floor((1 - perc) * minVal + perc * maxVal));
	}
	return arr;
}

function printTree(bstOrder) {
	const elems = [];
	bstOrder((node) => elems.push(node.data));
	console.log(elems);
}

const arr = randomArray(0, 100, 10);
const bst = new BalancedBST(arr);

prettyPrint(bst.root);
console.log(`\nIs tree balanced : ${bst.isBalanced()}\n`);
console.log("level order :");
printTree((f) => bst.levelOrder(f));
console.log("\npre order :");
printTree((f) => bst.preOrder(f));
console.log("\npost order :");
printTree((f) => bst.postOrder(f));
console.log("\nin order :");
printTree((f) => bst.inOrder(f));

console.log("\nAdding elements to tree..\n");

const newElems = randomArray(100, 1000, 10);
for (let i = 0; i < newElems.length; ++i) {
	bst.insert(newElems[i]);
}

prettyPrint(bst.root);
console.log(`\nIs tree balanced : ${bst.isBalanced()}\n`);
console.log("balancing tree...\n");

bst.rebalance();

prettyPrint(bst.root);
console.log(`\nIs tree balanced : ${bst.isBalanced()}\n`);
console.log("level order :");
printTree((f) => bst.levelOrder(f));
console.log("\npre order :");
printTree((f) => bst.preOrder(f));
console.log("\npost order :");
printTree((f) => bst.postOrder(f));
console.log("\nin order :");
printTree((f) => bst.inOrder(f));
