import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
  },
});

const Counter = mongoose.model('Counter', CounterSchema);

export default Counter;
