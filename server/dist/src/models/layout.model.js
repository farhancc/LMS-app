import mongoose from "mongoose";
const FAQschema = new mongoose.Schema({
    question: String,
    answer: String
});
const bannerSchema = new mongoose.Schema({
    public_id: String,
    url: String
});
const categorySchema = new mongoose.Schema({
    title: String
});
const laoutschema = new mongoose.Schema({
    type: String,
    faq: [FAQschema],
    categories: [categorySchema],
    banner: { image: bannerSchema,
        title: String,
        subtitle: String, }
});
const Layout = mongoose.model('Layout', laoutschema);
export default Layout;
