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
var IteratorHelperIdentifier = function (id1, id2) {
    this.id1 = id1;
    this.id2 = id2;
    this.nextOffset = null;
    this.result = null;
};

IteratorHelperIdentifier.prototype.compareBase = function () {
    var b1 = Utils.iterator(this.id1.base);
    var b2 = Utils.iterator(this.id2.base);

    while (b1.hasNext() && b2.hasNext()) {
        var i1 = b1.next();
        var i2 = b2.next();
        if (i1 > i2) {
            return Utils.Result.B1AfterB2;
        }
        else if (i1 < i2) {
            return Utils.Result.B1BeforeB2;
        }
    }
    if (b1.hasNext()) { //b2 is shorter than b1
        this.nextOffset = b1.next();
        if (this.nextOffset < this.id2.begin) {
            return Utils.Result.B1BeforeB2;
        }
        else if (this.nextOffset >= this.id2.end) {
            return Utils.Result.B1AfterB2;
        }
        else {
            return Utils.Result.B1InsideB2;
        }
    }
    else if (b2.hasNext()) { //b1 is shorter than b2
        this.nextOffset = b2.next();
        if (this.nextOffset < this.id1.begin) {
            return Utils.Result.B1AfterB2;
        }
        else if (this.nextOffset >= this.id1.end) {
            return Utils.Result.B1BeforeB2;
        }
        else {
            return Utils.Result.B2InsideB1;
        }
    }
    else { // both bases have the same size
        if (this.id1.end + 1 == this.id2.begin) {
            return Utils.Result.B1ConcatB2;
        }
        else if (this.id1.begin == this.id2.end + 1) {
            return Utils.Result.B2ConcatB1;
        }
        else if (this.id1.end < this.id2.begin) {
            return Utils.Result.B1BeforeB2;
        }
        else {
            return Utils.Result.B1AfterB2;
        }
    }
};

IteratorHelperIdentifier.prototype.computeResults = function() {
    if(this.result == null)
        this.result = this.compareBase();
    return this.result;
};

module.exports = IteratorHelperIdentifier;
