import mongoose, { ConnectOptions } from 'mongoose';

export const setup = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;

    await mongoose.connect(`${process.env.DB}`, options);
    console.log(`Connected to mongoDB`);
  } catch (error) {
    console.log(`[MongoDB Connection Error]`, error);
  }
}