import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Save, X } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    isPromo: false,
    category: 'women',
    image: '',
    description: '',
    detailedDescription: '',
    specifications: '',
    materials: '',
    careInstructions: '',
    brand: '',
    sku: '',
    inStock: true,
    featured: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        isPromo: product.isPromo,
        category: product.category,
        image: product.image,
        description: product.description,
        detailedDescription: product.detailedDescription || '',
        specifications: product.specifications?.join('\n') || '',
        materials: product.materials || '',
        careInstructions: product.careInstructions || '',
        brand: product.brand || '',
        sku: product.sku || '',
        inStock: product.inStock,
        featured: product.featured || false
      });
      setImagePreview(product.image);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData: Omit<Product, 'id'> = {
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      isPromo: formData.isPromo,
      category: formData.category,
      image: formData.image,
      description: formData.description,
      detailedDescription: formData.detailedDescription || undefined,
      specifications: formData.specifications ? formData.specifications.split('\n').filter(spec => spec.trim()) : undefined,
      materials: formData.materials || undefined,
      careInstructions: formData.careInstructions || undefined,
      brand: formData.brand || undefined,
      sku: formData.sku || undefined,
      inStock: formData.inStock,
      featured: formData.featured
    };

    onSave(productData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-300 mb-2">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter brand name"
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-300 mb-2">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter SKU"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="new-arrivals">New Arrivals</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kids">Kids</option>
              <option value="accessories">Accessories</option>
              <option value="shoes">Shoes</option>
              <option value="sale">Sale</option>
            </select>
          </div>
        </div>

        {/* Promotion Section */}
        <div className="border border-gray-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isPromo"
              name="isPromo"
              checked={formData.isPromo}
              onChange={handleInputChange}
              className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
            />
            <label htmlFor="isPromo" className="ml-2 text-lg font-medium text-white">
              This is a promotional item
            </label>
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
              {formData.isPromo ? 'Promo Price ($) *' : 'Price ($) *'}
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          {formData.isPromo && (
            <div className="mt-4">
              <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-300 mb-2">
                Original Price ($) *
              </label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                required={formData.isPromo}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="0.00"
              />
              <p className="text-xs text-gray-400 mt-1">
                Original price must be higher than promo price
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
              Product Image *
            </label>
            <div className="space-y-4">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gold file:text-black hover:file:bg-yellow-400 transition-all duration-300"
              />
              
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-32 h-40 object-cover rounded-lg border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
              
              <p className="text-xs text-gray-400">
                Upload a high-quality image (JPG, PNG, WebP). Recommended size: 800x1000px
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="materials" className="block text-sm font-medium text-gray-300 mb-2">
              Materials
            </label>
            <input
              type="text"
              id="materials"
              name="materials"
              value={formData.materials}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="e.g., 100% Cotton, Leather, Silk"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Short Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            placeholder="Brief product description for catalog view"
          />
        </div>

        <div>
          <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-300 mb-2">
            Detailed Description
          </label>
          <textarea
            id="detailedDescription"
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            placeholder="Detailed product description for product detail page"
          />
        </div>

        <div>
          <label htmlFor="specifications" className="block text-sm font-medium text-gray-300 mb-2">
            Specifications/Features
          </label>
          <textarea
            id="specifications"
            name="specifications"
            value={formData.specifications}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            placeholder="Enter each specification on a new line&#10;e.g.:&#10;Premium leather construction&#10;Hand-stitched details&#10;Water-resistant coating"
          />
          <p className="text-xs text-gray-400 mt-1">
            Enter each specification on a new line
          </p>
        </div>

        <div>
          <label htmlFor="careInstructions" className="block text-sm font-medium text-gray-300 mb-2">
            Care Instructions
          </label>
          <textarea
            id="careInstructions"
            name="careInstructions"
            value={formData.careInstructions}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            placeholder="Care and maintenance instructions"
          />
        </div>

        <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-700">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleInputChange}
              className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-300">In Stock</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-300">Featured Product</span>
          </label>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {product ? 'Update Product' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;