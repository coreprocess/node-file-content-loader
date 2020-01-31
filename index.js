const loaderUtils = require('loader-utils');

module.exports = function (content) {
    const options = loaderUtils.getOptions(this) || {};
    const context = options.context || this.rootContext;
    const filePath = loaderUtils.interpolateName(
        this,
        options.name || '[contenthash].[ext]',
        {
            context,
            content,
            regExp: options.regExp,
        }
    );
    this.emitFile(filePath, content);
    return (
        "const fs = require('fs');" +
        "const path = require('path');" +
        "const filePath = path.resolve(__dirname, " + JSON.stringify(filePath) + ");" +
        "try { module.exports = fs.readFileSync(filePath, { encoding: " + JSON.stringify(options.encoding || null) + " }); } " +
        "catch(error) { throw new Error('cannot read ' + filePath + ': ' + error); };"
    );
};

module.exports.raw = true;
