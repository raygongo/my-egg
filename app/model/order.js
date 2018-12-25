module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const OrderSchema = new Schema({
        "order_id": {
            type: String,
            required: true
        },
        "uid": {
            type: String
        },
        "trade_no": {
            type: String
        },
        "all_price": {
            type: Number
        },
        "all_num": {
            type: Number
        },
    });

    return mongoose.model('Order', OrderSchema, 'order');
}