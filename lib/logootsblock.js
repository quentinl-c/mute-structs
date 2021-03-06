/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
 var LogootSBlock = function(id, list) {
	this.id = id || null;
	this.nbElement = list || 0;
	this.mine = false;
};

/**
 *
 */
LogootSBlock.prototype.addBlock = function(pos, length) {
    this.nbElement += length;
    this.id.begin = Math.min(this.id.begin, pos);
    this.id.end = Math.max(this.id.end, pos + length - 1);
};

/**
 *
 */
LogootSBlock.prototype.delBlock = function(begin, end, nbElement) {
	this.nbElement -= nbElement;
};

/**
 *
 */
LogootSBlock.prototype.copy = function() {
	return new LogootSBlock(this.id.copy(), this.nbElement);
};

LogootSBlock.prototype.copyFromJSON = function (block) {
	var base = Utils.copy(block.id.base);
	this.id = new IdentifierInterval(base, block.begin, block.end);
};

/**
 *
 */
LogootSBlock.prototype.toString = function() {
	return '{' + this.nbElement + ',' + this.id.toString() + ', ' + (this.mine ? 'mine' : 'its') + '}';
};

module.exports = LogootSBlock;
