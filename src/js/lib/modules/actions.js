import $ from '../core';

$.prototype.html = function(content) {
    for (let i = 0; i < this.length; i++) {
        if (content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }
    return this;
}

$.prototype.eq = function(i) {
    const swap = this[i];
    const objLength = Object.keys(this).length;

    for (let i = 0; i < objLength; i++) {
        delete this[i];
    }
    this[0] = swap;
    this.length = 1;
    return this;
}

$.prototype.index = function() {
    const parent = this[0].parentNode;
    const childs = [...parent.children];

    const findMyIndex = (item) => {
        return item == this[0];
    }

    return childs.findIndex(findMyIndex);
}

$.prototype.find = function(selector) {
    let numberOfItem = 0;
    let counter = 0;

    const copyObj = Object.assign({}, this);

    for (let i = 0; i < copyObj.length; i ++) {
        const arr = copyObj[i].querySelectorAll(selector);
        if (arr.length == 0) {
            continue;
        }

        for (let j = 0; j < arr.length; j++) {
            this[counter] = arr[j];
            counter++;
        }

        numberOfItem += arr.length;
    }
    this.length = numberOfItem;

    const objLength = Object.keys(this).length;
    for (; numberOfItem < objLength; numberOfItem++) {
        delete this[numberOfItem];
    }
    return this;
}

$.prototype.closest = function(selector) {
    let counter = 0;

    for (let i = 0; i < this.length; i++) {
        if (!this[i].closest(selector)) {
            continue;
        } else {
        this[i] = this[i].closest(selector);
        counter++;
    }
}
    this.length = counter;

    const objLength = Object.keys(this).length;
    for (; counter< objLength; counter++) {
        delete this[counter];
    }
    return this;
}


$.prototype.siblings = function() {
    let numberOfItem = 0;
    let counter = 0;

    const copyObj = Object.assign({}, this);

    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].parentNode.children;

        for (let j = 0; j < arr.length; j++) {
            if (copyObj[i] === arr[j]) {
                continue;
            }
            this[counter] = arr[j];
            counter++;
        }

        numberOfItem += arr.length - 1;
    }
    this.length = numberOfItem;

    const objLength = Object.keys(this).length;
    for (; numberOfItem < objLength; numberOfItem++) {
        delete this[numberOfItem];
    }
    return this;
}

// $.prototype.siblings = function () {
 
//     const newObj = [...this[0].parentElement.children].filter(item => item !== this[0])
 
//     for (let i = 0; i < this.length; i++) {
//         delete this[i]
//     }
 
//     Object.assign(this, newObj)
//     this.length = newObj.length
//     return this
// }