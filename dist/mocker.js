"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mockChar(char) {
    return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
}
function mock(text) {
    var mocked = text.split("").map(mockChar).join("");
    return mocked;
}
exports.default = mock;
//# sourceMappingURL=mocker.js.map