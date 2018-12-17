module.exports = (options, app) => {
    return async function print(ctx, next) {
        console.log(new Date());

        await next();
    }
}