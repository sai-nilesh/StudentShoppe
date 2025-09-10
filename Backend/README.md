# npm init
npm i express mongoose dotenv
https://www.youtube.com/watch?v=cZAnibwI9u8
.container {
    width: 100%;
}
@media (min-width: 640px) {
    .container {
        max-width: 640px;
    }
}
@media (min-width: 768px) {
    .container {
        max-width: 768px;
    }
}
return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 text-white">
        <h1 className="text-3xl font-bold text-center my-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            placeholder="Condition"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            placeholder="Warranty"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="Owner_Name"
            value={formData.Owner_Name}
            onChange={handleChange}
            placeholder="Owner Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="Owner_Number"
            value={formData.Owner_Number}
            onChange={handleChange}
            placeholder="Owner Number"
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Update Product
          </button>
        </form>
      </div>
      <Footer />
    </>
  );